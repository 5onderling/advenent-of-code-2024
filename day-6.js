import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/day-6.txt", { encoding: "utf8" });

const map = input.split(/\n/).map((line) => line.split(""));
const startPlayer = "^";
const startLine = map.findIndex((line) => line.includes(startPlayer));
const startIndex = map[startLine].indexOf(startPlayer);

const loopSize = 2 * Math.pow(map.length, 2);

const walk = (map) => {
  const visitedFields = new Set();
  let player = startPlayer;
  let curLine = startLine;
  let curIndex = startIndex;

  let run = 0;
  while (true) {
    if (run++ > loopSize) return false;

    let nextLine = curLine;
    let nextIndex = curIndex;

    if (player === "^") --nextLine;
    else if (player === "v") ++nextLine;
    else if (player === "<") --nextIndex;
    else if (player === ">") ++nextIndex;

    const nextField = map[nextLine]?.[nextIndex];
    if (!nextField) break;

    if (nextField === "#") {
      if (player === "^") player = ">";
      else if (player === "v") player = "<";
      else if (player === "<") player = "^";
      else if (player === ">") player = "v";
      continue;
    }

    visitedFields.add(`${nextLine}:${nextIndex}`);
    curLine = nextLine;
    curIndex = nextIndex;
  }
  return visitedFields;
};

const visitedFields = walk(map);
console.log(visitedFields.size);

// Part two

let res = 0;

for (const field of visitedFields) {
  const [line, index] = field.split(":").map(Number);
  if (index === startIndex && line === startLine) continue;

  const newMap = structuredClone(map);
  newMap[line][index] = "#";

  if (!walk(newMap)) res++;
}

console.log(res);
