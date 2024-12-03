import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/day-2.txt", { encoding: "utf8" });

const lines = input
  .split(/\n/)
  .map((line) => line.split(/\s+/).map((number) => +number));

const isDistanceUnsafe = (num1, num2) => {
  const difference = Math.abs(num1 - num2);
  return difference < 1 || difference > 3;
};

const checkLine = (numbers) => {
  /** @type {boolean|undefined} */
  let increasing;
  for (let index = 0; index < numbers.length - 1; index++) {
    const number = numbers[index];
    const nextNumber = numbers[index + 1];

    if (isDistanceUnsafe(number, nextNumber)) return false;

    if (increasing === undefined) increasing = number < nextNumber;

    if (increasing !== number < nextNumber) return false;
  }
  return true;
};

const safeLines = lines.filter(checkLine);

console.log(safeLines.length);

// Part two
const safeLines2 = lines.filter((numbers) => {
  return numbers.some((_, index) => checkLine(numbers.toSpliced(index, 1)));
});

console.log(safeLines2.length);
