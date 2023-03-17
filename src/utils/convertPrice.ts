export const convertNumberToPrice = (price: number) => {
  return `₫${Number(price).toLocaleString()}`;
};
