export const randomizeWithoutDuplicates = <T>(prevArray: T[]): T[] => {
  let arr = [...prevArray];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return [...Array.from(new Set(arr))];
};

module.exports = { randomizeWithoutDuplicates };
