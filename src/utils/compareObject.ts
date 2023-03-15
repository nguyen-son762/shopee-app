export const compareArray = (array1: any[], array2: any[]) => {
  return JSON.stringify(array1.sort()) === JSON.stringify(array2.sort());
};
