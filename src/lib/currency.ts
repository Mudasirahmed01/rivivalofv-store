// Currency conversion utility for Pakistani Rupees
// 1 USD ≈ 280 PKR (approximate rate)

export const USD_TO_PKR = 280;

export const formatPKR = (usdAmount: number): string => {
  const pkrAmount = Math.round(usdAmount * USD_TO_PKR);
  return `Rs ${pkrAmount.toLocaleString("en-PK")}`;
};

export const formatPKRShort = (usdAmount: number): string => {
  const pkrAmount = Math.round(usdAmount * USD_TO_PKR);
  if (pkrAmount >= 1000) {
    return `Rs ${(pkrAmount / 1000).toFixed(1)}K`;
  }
  return `Rs ${pkrAmount.toLocaleString("en-PK")}`;
};
