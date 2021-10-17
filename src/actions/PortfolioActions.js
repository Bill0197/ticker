export const STORE_TRANSACTION_TO_PORTFOLIO = "STORE_TRANSACTION_TO_PORTFOLIO";

export const storeTransactionToPortfolio = (data) => {
  return {
    type: STORE_TRANSACTION_TO_PORTFOLIO,
    data: data
  };
};

