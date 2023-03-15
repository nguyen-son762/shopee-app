export const convertNumberToPrice = (price: number) => {
  return `₫${price.toLocaleString()}`;
};
