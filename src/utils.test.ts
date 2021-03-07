import { randomizeWithoutDuplicates } from "./utils";

test("randomizeWithoutDuplicates() : Removes duplicates", () => {
  const arr1 = [6, 3, 1, 7, 5, 1, 1, 3, 6, 7];
  expect(randomizeWithoutDuplicates(arr1).length).toBe(5);
  const arr2 = ["Mike", "Bob", "3", 3, "Jill", 3, "Mike", "Tom", "Bob", "Mike"];
  expect(randomizeWithoutDuplicates(arr2).length).toBe(6);
  const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 4, 2, 1, 5, 6, 4, 3, 2, 5, 3, 1, 0];
  expect(randomizeWithoutDuplicates(arr3).length).toBe(9);
});
