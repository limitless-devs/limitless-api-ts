import * as anchor from '@project-serum/anchor';
import { Limitless } from './limitless';

export interface MarketState {
    baseMintAddress: anchor.web3.PublicKey,
    baseMintTokenAddress: anchor.web3.PublicKey,
    quoteMintAddress: anchor.web3.PublicKey,
    quoteMintTokenAddress: anchor.web3.PublicKey,
    quoteMintFloorTokenAddress: anchor.web3.PublicKey,
    platformFeeVaultAddress: anchor.web3.PublicKey,
    maxCqd: anchor.BN,
    cqd: anchor.BN,
    askOffset: anchor.BN,
    bidOffset: anchor.BN,
    spread: anchor.BN,
    minSize: anchor.BN,
    gradient: anchor.BN,
    askPrice: anchor.BN,
    bidPrice: anchor.BN,
    baseDecimals: number,
    quoteDecimals: number,
    startQ: anchor.BN,
    totalSoldBase: anchor.BN,
    totalSoldQuote: anchor.BN,
    totalBoughtBase: anchor.BN,
    totalBoughtQuote: anchor.BN,
    totalSells: anchor.BN,
    totalBuys: anchor.BN,
    totalMinted: anchor.BN,
    totalBurned: anchor.BN,
    totalBurnCost: anchor.BN,
    id: number[],
    latestTradeBuy: boolean,
    latestTradeQuantity: anchor.BN,
    latestTradeCost: anchor.BN,
    latestTradeTS: anchor.BN,
    latestTradeWallet: anchor.web3.PublicKey,
    creator: anchor.web3.PublicKey,
    launchDate: anchor.BN,
    preMint: anchor.BN,
    preMintClaimed: boolean,
    continuousMint: boolean,
    creatorMinted: anchor.BN,
    buyFee: number,
    sellFee: number,
    receiveAddress: anchor.web3.PublicKey,
    platformFee: number,
    index: anchor.BN
  
}
export interface CreateParams {
  marketName: string,
  startQ: number,
  askOffset: number,
  minTradeSize: number,
  gradient: number,
  preMint: number,
  contMint: boolean,
  buyFee: number,
  sellFee: number,
  launchDate: number,
  feeQuoteTokenAddress: anchor.web3.PublicKey,
  userQuoteTokenAddress: anchor.web3.PublicKey,
  program: anchor.Program<Limitless>,
  confirmOpts: anchor.web3.ConfirmOptions
}
export interface SellParams {
  marketName: string,
  quantity: number,
  minProceeds: number,
  userBaseToken: anchor.web3.PublicKey,
  userQuoteToken: anchor.web3.PublicKey,
  program: anchor.Program<Limitless>,
  confirmOpts: anchor.web3.ConfirmOptions
}
export interface SellRes {
  txSig: string,
  txResponse: anchor.web3.TransactionResponse
  proceeds: number,
  quantity: number,
}
export interface BuyParams {
  marketName: string,
  quantity: number,
  maxCost: number,
  userBaseToken: anchor.web3.PublicKey,
  userQuoteToken: anchor.web3.PublicKey,
  program: anchor.Program<Limitless>,
  confirmOpts: anchor.web3.ConfirmOptions
}
export interface BuyRes {
  txSig: string,
  txResponse: anchor.web3.TransactionResponse
  cost: number,
  quantity: number,
}