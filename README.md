## limitless-api-ts

```
TODO: yarn
TODO: npm
```

This typescript api client will allow you to create, manage and trade markets on the Limitless Protocol. 

Check out the [limitless-trader](https://github.com/limitless-devs/limitless-trader) repository for example implentations.

## Quick Usage Ovierview 

```
import {
    createProgramConnection as createProgramLimitless,
    getAllMarkets,
    deNormalize,
    createMarket,
    getMarket,
    getMinimumQuantity,
    buy,
    sell,
    calculateQuantityFromBuyCost,
    calculateQuantityFromSellProceeds,
    calculateTotalBuyCost,
    calculateTotalSellProceeds,
} from 'limitless-api-ts'

//create connector
let kpJson = JSON.parse(fs.readFileSync("/home/your-username/.config/solana/id.json").toString());
let kp = Keypair.fromSecretKey(new Uint8Array(kpJson));
let anchorWallet = new anchor.Wallet(kp);
let confirmOpts = { commitment: "confirmed" } as anchor.web3.ConfirmOptions;
let limitlessProgram = await createProgramLimitless(rpcUrl, anchorWallet, confirmOpts);

//get all markets 
const markets = await getAllMarkets(limitlessProgram, confirmOpts.commitment);
for (let index = 0; index < markets.length; index++) {
    const market = markets[index];
    console.log(
        `Market Name: ${String.fromCharCode(...market.id).trim()} ` +
        `Bid: ${deNormalize(market.bidPrice.toNumber(), market.quoteDecimals)} ` +
        `Ask ${deNormalize(market.askPrice.toNumber(), market.quoteDecimals)} `
    );
    //only print the first 10
    if (index > 10) break;
}

//get or create your token accounts, can be ATAs or regual token accounts. 
let market = await getMarket("LIMITLESS", limitlessProgram, "confirmed");
let baseAddress = await spl.getOrCreateAssociatedTokenAccount(
    limitlessProgram.provider.connection,
    anchorWallet.payer,
    market.baseMintAddress,
    limitlessProgram.provider.publicKey
);
let quoteAddress = await spl.getOrCreateAssociatedTokenAccount(
    limitlessProgram.provider.connection,
    anchorWallet.payer,
    market.quoteMintAddress,
    limitlessProgram.provider.publicKey,
);

//lets do some trading

//slippage percentage
let slippage = 1;

//buy
console.log("Buying 100 tokens..");
let buyQty = 100;
//this normalizes the quantity and gives an expected maximum cost according to the slippage percentage set
let [buyQtyNormalized, totalCost] = calculateTotalBuyCost(buyQty, slippage, market);
console.log(`Buying ${deNormalize(buyQtyNormalized, market.quoteDecimals)} base tokens for maximum ${deNormalize(totalCost, market.quoteDecimals)} quote tokens`);
let buyRes = await buy({
    marketName: currentMarketName,
    quantity: buyQtyNormalized,
    maxCost: totalCost,
    userBaseToken: baseAddress.address,
    userQuoteToken: quoteAddress.address,
    program: limitlessProgram,
    confirmOpts: { commitment: "finalized" },
    //if execResponse is false, will return only txSig - if execResponse is true, will return the actual cost to execute + transaction details
    execResponse: true
});
console.log(`Bought ${buyRes.quantity} base tokens for ${buyRes.cost} quote tokens! Tx: ${buyRes.txSig}`);

//sell
console.log("Selling 100 tokens..");
let sellQty = 100;
let [sellQtyNormalized, totalProceeds] = calculateTotalSellProceeds(sellQty, slippage, market);
console.log(`Selling ${deNormalize(sellQtyNormalized, market.quoteDecimals)} base tokens for minimum ${deNormalize(totalProceeds, market.quoteDecimals)} quote tokens`);
let sellRes = await sell({
    marketName: currentMarketName,
    quantity: sellQtyNormalized,
    minProceeds: totalProceeds,
    userBaseToken: baseAddress.address,
    userQuoteToken: quoteAddress.address,
    program: limitlessProgram,
    confirmOpts: { commitment: "finalized" },
    execResponse: true
});
console.log(`Sold ${sellRes.quantity} base tokens for ${sellRes.proceeds} quote tokens! Tx: ${sellRes.txSig}`);
```
