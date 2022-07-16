import * as anchor from '@project-serum/anchor';
import { Limitless, IDL } from './limitless';
import { MarketState, SellRes, BuyRes, CreateParams, BuyParams, SellParams } from './interfaces';
import { generateTrackerAddresses } from './utils';
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import { deNormalize } from './calculations';
//constants
const PROGRAM_ID = "8ja5LGsRkrqBYoAAphJst49tqMuCCtuWv8ZoQVpkCPZd"
const TRACKER_ID = "NIRV"

//setup
export async function createProgramConnection(
  rpcUrl: string,
  anchorWallet: anchor.Wallet,
  confirmOpts: anchor.web3.ConfirmOptions
): Promise<anchor.Program<Limitless>> {
  const solConnection = new anchor.web3.Connection(rpcUrl);
  const provider = new anchor.AnchorProvider(solConnection, anchorWallet, confirmOpts);
  const idl = IDL as Limitless;
  const program = new anchor.Program<Limitless>(idl, new anchor.web3.PublicKey(PROGRAM_ID), provider);
  return program as anchor.Program<Limitless>
}

//queries
export async function getAllMarkets(
  program: anchor.Program<Limitless>,
  commitment: anchor.web3.Commitment
): Promise<MarketState[]> {
  let [marketTrackerBaseAddress, marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    program.programId
  );
  const trackerBase = await program.account.marketTrackerBase.fetch(marketTrackerBaseAddress, commitment);
  let marketsToFetch = trackerBase.index.toNumber();
  let totalFetched = 1;
  let allMarkets: MarketState[] = []
  while (marketsToFetch > 0) {
    let batchCount = 100;
    if (marketsToFetch <= 100) {
      batchCount = marketsToFetch;
    }
    let trackerAddresses = await generateTrackerAddresses(marketTrackerBaseAddress, program.programId, totalFetched, totalFetched + batchCount)
    let trackers: any[] = await program.account.marketTracker.fetchMultiple(trackerAddresses, commitment);
    let marketAddresses: any[] = []
    for (let i = 0; i < trackers.length; i++) {
      marketAddresses[i] = trackers[i].marketKey;
    }
    let markets = await program.account.marketState.fetchMultiple(marketAddresses, commitment);
    markets.forEach((x: any) => {
      if (!/[^A-Z]/.test(String.fromCharCode(...x.id).trim())) {
        allMarkets.push(x as MarketState)
      }
    });
    totalFetched += batchCount;
    marketsToFetch -= batchCount;
  }
  return allMarkets;
}
export async function getMarket(
  marketName: string,
  program: anchor.Program<Limitless>,
  commitment: anchor.web3.Commitment,
): Promise<MarketState> {
  let [marketTrackerBaseAddress, marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    program.programId
  );
  let [marketStateAddress, marketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(marketName)],
    program.programId
  );
  let marketState: any = await program.account.marketState.fetch(marketStateAddress, commitment);
  return marketState as MarketState;
}

//commands
export async function createMarket(
  params: CreateParams
): Promise<string> {
  let [marketTrackerBaseAddress, marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    params.program.programId
  );
  const trackerBase = await params.program.account.marketTrackerBase.fetch(marketTrackerBaseAddress)
  const index = trackerBase.index.toNumber() + 1
  let [marketTrackerAddress, marketTrackerBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(index.toString())],
    params.program.programId
  );
  let [marketStateAddress, marketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(params.marketName)],
    params.program.programId
  );
  let [baseMintAddress, baseMintBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketStateAddress.toBuffer(), Buffer.from("base_mint")],
    params.program.programId
  );
  let [baseTokenAddress, baseTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketStateAddress.toBuffer(), Buffer.from("base_token")],
    params.program.programId
  );
  let [quoteTokenAddress, quoteTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketStateAddress.toBuffer(), Buffer.from("quote_token")],
    params.program.programId
  );
  let [quoteFloorTokenAddress, quoteFloorTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketStateAddress.toBuffer(), Buffer.from("quote_floor_token")],
    params.program.programId
  );
  let [platformFeeAddress, platformFeeAddressBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketStateAddress.toBuffer(), Buffer.from("platform_fee_vault")],
    params.program.programId
  );
  const tx = await params.program.methods
    .initializeMarket(params.marketName, {
      startQuantity: new anchor.BN(params.startQ),
      askOffset: new anchor.BN(params.askOffset),
      bidOffset: new anchor.BN(0),
      minTradeSize: new anchor.BN(params.minTradeSize),
      gradient: new anchor.BN(params.gradient),
      preMint: new anchor.BN(params.preMint),
      continuousMint: params.contMint,
      buyFee: params.buyFee,
      sellFee: params.sellFee,
      launchDate: new anchor.BN(params.launchDate)
    })
    .accounts({
      creator: params.program.provider.publicKey,
      marketTrackerBase: marketTrackerBaseAddress,
      marketTracker: marketTrackerAddress,
      userQuoteToken: params.userQuoteTokenAddress,
      marketState: marketStateAddress,
      baseMint: baseMintAddress,
      baseTokenVault: baseTokenAddress,
      quoteMint: trackerBase.quoteMint,
      quoteTokenVault: quoteTokenAddress,
      quoteTokenFloorVault: quoteFloorTokenAddress,
      platformFeeVault: platformFeeAddress,
      feeReceiveAddress: params.feeQuoteTokenAddress,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    })
    .rpc(params.confirmOpts);
  return tx;
}
export async function buy(
  params: BuyParams
): Promise<BuyRes> {
  if (params.execResponse && (params.confirmOpts.commitment != "finalized" && params.confirmOpts.commitment != "confirmed")) {
    params.confirmOpts.commitment = "confirmed"
  }
  let [marketTrackerBaseAddress, _marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    params.program.programId
  );
  let [marketStateAddress, _marketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(params.marketName)],
    params.program.programId
  );
  const marketState = await params.program.account.marketState.fetch(marketStateAddress);
  const tx = await params.program.methods
    .buy({
      quantity: new anchor.BN(params.quantity),
      maxCost: new anchor.BN(params.maxCost)
    })
    .accounts({
      user: params.program.provider.publicKey,
      marketTrackerBase: marketTrackerBaseAddress,
      marketState: marketStateAddress,
      baseMint: marketState.baseMintAddress,
      userBaseToken: params.userBaseToken,
      baseTokenVault: marketState.baseMintTokenAddress,
      userQuoteToken: params.userQuoteToken,
      quoteTokenVault: marketState.quoteMintTokenAddress,
      quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
      platformFeeVault: marketState.platformFeeVaultAddress,
      feeReceiveAddress: marketState.receiveAddress,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
    })
    .rpc(params.confirmOpts);
  if (params.execResponse) {
    let getTxRes = await params.program.provider.connection.getTransaction(tx, { commitment: "confirmed" })
    let logMsg = "";
    getTxRes?.meta?.logMessages?.forEach((x: string) => {
      if (x.includes(":=")) {
        logMsg = x;
      }
    })
    let logVals = logMsg.slice(logMsg.indexOf(":=") + ":=".length).split(",");
    return {
      txSig: tx,
      txResponse: getTxRes,
      cost: deNormalize(Number(logVals[0]), marketState.quoteDecimals),
      quantity: deNormalize(Number(logVals[1]), marketState.quoteDecimals)
    } as BuyRes
  } else {
    return {
      txSig: tx,
      txResponse: undefined,
      cost: undefined,
      quantity: undefined
    } as BuyRes
  }

}
export async function sell(
  params: SellParams
): Promise<SellRes> {
  if (params.execResponse && (params.confirmOpts.commitment != "finalized" && params.confirmOpts.commitment != "confirmed")) {
    params.confirmOpts.commitment = "confirmed"
  }
  let [marketTrackerBaseAddress, _marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    params.program.programId
  );
  let [marketStateAddress, _marketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(params.marketName)],
    params.program.programId
  );
  const marketState = await params.program.account.marketState.fetch(marketStateAddress);
  const tx = await params.program.methods
    .sell({
      quantity: new anchor.BN(params.quantity),
      minProceeds: new anchor.BN(params.minProceeds)
    })
    .accounts({
      user: params.program.provider.publicKey,
      marketTrackerBase: marketTrackerBaseAddress,
      marketState: marketStateAddress,
      baseMint: marketState.baseMintAddress,
      userBaseToken: params.userBaseToken,
      baseTokenVault: marketState.baseMintTokenAddress,
      userQuoteToken: params.userQuoteToken,
      quoteTokenVault: marketState.quoteMintTokenAddress,
      quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
      platformFeeVault: marketState.platformFeeVaultAddress,
      feeReceiveAddress: marketState.receiveAddress,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
    })
    .rpc(params.confirmOpts);
  if (params.execResponse) {
    let getTxRes = await params.program.provider.connection.getTransaction(tx, { commitment: "confirmed" })
    let logMsg = "";
    getTxRes?.meta?.logMessages?.forEach((x: string) => {
      if (x.includes(":=")) {
        logMsg = x;
      }
    })
    let logVals = logMsg.slice(logMsg.indexOf(":=") + ":=".length).split(",");
    return {
      txSig: tx,
      txResponse: getTxRes,
      proceeds: deNormalize(Number(logVals[0]), marketState.quoteDecimals),
      quantity: deNormalize(Number(logVals[1]), marketState.quoteDecimals)
    } as SellRes
  } else {
    return {
      txSig: tx,
      txResponse: undefined,
      proceeds: undefined,
      quantity: undefined
    } as SellRes
  }
}
export async function transferFees(
  marketName: string,
  program: anchor.Program<Limitless>,
  commitment: anchor.web3.Commitment,
) : Promise<string> {
  let [marketTrackerBaseAddress, marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    program.programId
  );
  //get first market - to market
  let [marketTrackerAddress, marketTrackerBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from("1")],
    program.programId
  );
  let toMarketTrackerAddress = await program.account.marketTracker.fetch(marketTrackerAddress);
  let toMarket = await program.account.marketState.fetch(toMarketTrackerAddress.marketKey);
  //from market
  let [marketStateAddress, marketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(marketName)],
    program.programId
  );
  let fromMarket = await program.account.marketState.fetch(marketStateAddress);
  const tx = await program.methods
      .transferFees()
      .accounts({
        marketTrackerBase: marketTrackerBaseAddress,
        toMarketState: toMarketTrackerAddress.marketKey,
        toQuoteTokenFloorVault: toMarket.quoteMintFloorTokenAddress,
        fromMarketState: marketStateAddress,
        fromPlatformFeeVault: fromMarket.platformFeeVaultAddress,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc({commitment});
  return tx
}
export async function updateLaunchDate(
  newDate: Date,
  marketName: string,
  program: anchor.Program<Limitless>,
  commitment: anchor.web3.Commitment,
) : Promise<string> {
  let [marketTrackerBaseAddress, marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    program.programId
  );
  let [marketStateAddress, toMarketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(marketName)],
    program.programId
  );
  const start = newDate.getTime() / 1000;
  const tx = await program.methods
  .updateLaunchDate(new anchor.BN(start))
  .accounts({
    user: program.provider.publicKey,
    marketTrackerBase: marketTrackerBaseAddress,
    marketState: marketStateAddress,
    systemProgram: anchor.web3.SystemProgram.programId,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
  })
  .rpc({commitment});
  return tx;
}
export async function updateFeeDown(
  isBuy: boolean,
  newFee: number,
  marketName: string,
  program: anchor.Program<Limitless>,
  commitment: anchor.web3.Commitment,
) : Promise<string> {
  let [marketTrackerBaseAddress, marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    program.programId
  );
  let [marketStateAddress, toMarketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(marketName)],
    program.programId
  );
  const tx = await program.methods
      .updateFeeDown(newFee, isBuy)
      .accounts({
        user: program.provider.publicKey,
        marketTrackerBase: marketTrackerBaseAddress,
        marketState: marketStateAddress,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc({commitment});
  return tx;
}
export async function transferToFloor(
    amount: number,
    marketName: string,
    program: anchor.Program<Limitless>,
    commitment: anchor.web3.Commitment,
    userQuoteToken: anchor.web3.PublicKey,
) : Promise<string> {
  let [marketTrackerBaseAddress, marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    program.programId
  );
  let [marketStateAddress, toMarketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(marketName)],
    program.programId
  );
  let marketState = await program.account.marketState.fetch(marketStateAddress);
  const tx = await program.methods.transferToFloor(new anchor.BN(amount)).accounts({
    user: program.provider.publicKey,
    marketTrackerBase: marketTrackerBaseAddress,
    marketState: marketStateAddress,
    quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
    userQuoteToken: userQuoteToken,
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: anchor.web3.SystemProgram.programId
  }).rpc({commitment});
  return tx;
}
export async function updateFeeReceiveaddress(
    marketName: string,
    program: anchor.Program<Limitless>,
    commitment: anchor.web3.Commitment,
    newAddress: anchor.web3.PublicKey,
    preInstructions?: anchor.web3.TransactionInstruction[]
) : Promise<string> {
  let [marketTrackerBaseAddress, marketTrackerBaseBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(TRACKER_ID)],
    program.programId
  );
  let [marketStateAddress, toMarketBump] = await anchor.web3.PublicKey.findProgramAddress(
    [marketTrackerBaseAddress.toBuffer(), Buffer.from(marketName)],
    program.programId
  );
  const tx = await program.methods.updateFeeReceiveAddress().accounts({
    user: program.provider.publicKey,
    marketTrackerBase: marketTrackerBaseAddress,
    marketState: marketStateAddress,
    newFeeReceiveAddress: newAddress,
    tokenProgram: TOKEN_PROGRAM_ID,
    systemProgram: anchor.web3.SystemProgram.programId
  })
  .preInstructions(preInstructions ?? [])
  .rpc({commitment});
  return tx
}

//calculations
export * from './calculations'
