import { MarketState } from "./interfaces"
export function lookupCost(
    currentQty: number,
    newQty: number,
    divisor: number,
    askOffset: number,
    decimals: number
): number {
    divisor = divisor * 2
    let cost = ((Math.pow(newQty, 2) / divisor) + (askOffset * newQty)) - ((Math.pow(currentQty, 2) / divisor) + (askOffset * currentQty))
    let base = 10
    let base_pow = Math.pow(base, decimals)
    cost = cost + base_pow
    let costNorm = cost / base_pow
    return costNorm;
}
export function lookupProceeds(
    currentQty: number,
    newQty: number,
    divisor: number,
    bidOffset: number,
    decimals: number
): number {
    divisor = divisor * 2
    let proceeds = ((Math.pow(currentQty, 2) / divisor) + (bidOffset * currentQty)) - ((Math.pow(newQty, 2) / divisor) + (bidOffset * newQty))
    let base = 10
    let base_pow = Math.pow(base, decimals)
    proceeds = proceeds - base_pow
    let proceedsNorm = proceeds / base_pow
    return proceedsNorm;
}
export function lookupLimitUp(
    gradient: number,
    askOffset: number,
    startQ: number,
    cost: number,
    quoteDecimals: number
): number {
    let divisor = gradient * 2;
    let base = 10;
    let basePow = Math.pow(base, quoteDecimals);
    let eq_pt_1 = Math.pow(askOffset, 2) * Math.pow(divisor, 2);
    let eq_pt_2 = 4 * askOffset * divisor * startQ;
    let eq_pt_3 = 4 * ((divisor * cost * basePow) + Math.pow(startQ, 2));
    let eq_pt_4 = eq_pt_1 + eq_pt_2 + eq_pt_3;
    let eq_pt_5 = Math.sqrt(eq_pt_4);
    let eq_pt_6 = eq_pt_5 - (askOffset * divisor);
    let limit_quantity = eq_pt_6 / 2;
    return limit_quantity;
}
export function lookupLimitDown(
    gradient: number,
    bidOffset: number,
    startQ: number,
    cost: number,
    quoteDecimals: number
): number {
    let divisor = gradient * 2;
    let base = 10;
    let basePow = Math.pow(base, quoteDecimals);
    let eq_pt_1 = Math.pow(bidOffset, 2) * Math.pow(divisor, 2);
    let eq_pt_2 = 4 * divisor * (cost * basePow);
    let eq_pt_3 = 4 * bidOffset * divisor * startQ;
    let eq_pt_4 = 4 * Math.pow(startQ, 2)
    let eq_pt_5 = eq_pt_1 - eq_pt_2 + eq_pt_3 + eq_pt_4;
    let eq_pt_6 = Math.sqrt(eq_pt_5);
    let eq_pt_7 = eq_pt_6 - (bidOffset * divisor)
    let limit_quantity = eq_pt_7 / 2;
    return limit_quantity;
}
export function getMinimumQuantity(
    gradient: number,
    quoteDecimals: number,
    minSize: number
) : number {
    let divisor = gradient * 2;
    let base = 10;
    let basePow = Math.pow(base, quoteDecimals);
    let minProceeds = 4;
    let minProceedsPow = minProceeds * basePow;
    let eq_1 = Math.pow(minSize, 2) + (divisor * minProceedsPow)
    let eq_2 = 2 * minSize
    let res = eq_1 / eq_2
    return res;
}
export function lookupFee(
    amount: number,
    fee: number
): number {
    let res = (amount * fee) / 10000;
    return res;
}
export function calculateQuantityFromBuyCost(
    cost: number,
    slippagePercent: number,
    market: MarketState
): [number, number] {
    let costNorm = cost * Math.pow(10, market.quoteDecimals);
    let mfee = lookupFee(costNorm, market.buyFee);
    let pFee = lookupFee(costNorm, market.platformFee);
    if (mfee < 1) { mfee = 1 };
    if (pFee < 1) { pFee = 1 };
    let costNormFee = costNorm - mfee - pFee;
    slippagePercent = slippagePercent / 100
    let slippage = costNormFee * slippagePercent;
    costNormFee = costNormFee - slippage;
    let quantity = lookupLimitUp(
        market.gradient.toNumber(),
        market.askOffset.toNumber(),
        market.cqd.toNumber(),
        costNormFee,
        market.quoteDecimals
    );
    let delta = quantity - market.cqd.toNumber();
    return [delta, costNorm];
}
export function calculateQuantityFromSellProceeds(
    proceeds: number,
    slippagePercent: number,
    market: MarketState,
): [number, number] {
    let proceedsNorm = proceeds * Math.pow(10, market.quoteDecimals);
    let mfee = lookupFee(proceedsNorm, market.buyFee);
    let pFee = lookupFee(proceedsNorm, market.platformFee);
    if (mfee < 1) { mfee = 1 };
    if (pFee < 1) { pFee = 1 };
    let proceedsNormFee = proceedsNorm + 2 * (mfee + pFee);
    slippagePercent = slippagePercent / 100
    let slippage = proceedsNormFee * slippagePercent;
    proceedsNormFee = proceedsNormFee + slippage;
    let quantity = lookupLimitDown(
        market.gradient.toNumber(),
        market.bidOffset.toNumber(),
        market.cqd.toNumber(),
        proceedsNormFee,
        market.quoteDecimals
    );
    let delta = market.cqd.toNumber() - quantity;
    return [delta, proceedsNorm];
}
export function calculateTotalBuyCost(
    buyQty: number,
    slippagePercent: number,
    market: MarketState,
): [number, number] {
    let buyQtyNorm = buyQty * Math.pow(10, market.quoteDecimals);
    let newQty = market.cqd.toNumber() + buyQtyNorm;
    let cost = lookupCost(market.cqd.toNumber(), newQty, market.gradient.toNumber(), market.askOffset.toNumber(), market.quoteDecimals);
    let pFee = lookupFee(cost, market.platformFee);
    let mFee = lookupFee(cost, market.buyFee);
    let totalCost = cost + pFee + mFee;
    slippagePercent = slippagePercent / 100;
    let slippage = totalCost * slippagePercent;
    totalCost = totalCost + slippage;
    return [buyQtyNorm, totalCost];
}
export function calculateTotalSellProceeds(
    sellQty: number,
    slippagePercent: number,
    market: MarketState
): [number, number] {
    let sellQtyNorm = sellQty * Math.pow(10, market.quoteDecimals);
    let newQty = market.cqd.toNumber() - sellQtyNorm;
    let cost = lookupProceeds(market.cqd.toNumber(), newQty, market.gradient.toNumber(), market.bidOffset.toNumber(), market.quoteDecimals);
    let pFee = lookupFee(cost, market.platformFee);
    let mFee = lookupFee(cost, market.buyFee);
    let totalProceeds = cost - pFee - mFee;
    slippagePercent = slippagePercent / 100;
    let slippage = totalProceeds * slippagePercent;
    totalProceeds = totalProceeds - slippage;
    return [sellQtyNorm, totalProceeds];
}
export function deNormalize(
  price: number,
  quoteDecimals: number
): number {
  let base = 10;
  let basePow = Math.pow(base, quoteDecimals);
  return price / basePow;
}
