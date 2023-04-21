export const removeRedundantString = (text: string) => {
  return text.replace("Thành phố ", "").replace("Tỉnh ", "") || "";
};

export const customAddressOptions = <T extends { name: string }>(items: T[]) => {
  const cityListModified = (items || []).reduce((prev: Record<string, T[]>, current) => {
    const splitItem = removeRedundantString(current.name);
    const firstCharacter = splitItem.slice(0, 1);
    if (prev && prev[firstCharacter]) {
      prev[firstCharacter].push(current);
    } else {
      prev[firstCharacter] = [current];
    }
    return prev;
  }, {});
  return Object.keys(cityListModified)
    .map((key) => {
      return {
        title: key,
        data: cityListModified[key]
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};
