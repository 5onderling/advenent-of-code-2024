import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/day-1.txt", { encoding: "utf8" });

const numbers = input.split(/\s+/).map((number) => +number);

const array1 = numbers.filter((_, index) => index % 2 === 1).sort();

const array2 = numbers.filter((_, index) => index % 2 === 0).sort();

let distance = 0;
array1.forEach((number, index) => {
  distance += Math.abs(number - array2[index]);
});

console.log(distance);

// Part two
let similarity = 0;
array1.forEach((number) => {
  similarity += number * array2.filter((entry) => entry === number).length;
});

console.log(similarity);
