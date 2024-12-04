import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/day-4.txt", { encoding: "utf8" });

{
  const horizontal = input.match(/XMAS/g).length;
  const horizontalReverse = input.match(/SAMX/g).length;

  const inputMatrix = input.split(/\n/).map((line) => Array.from(line));

  const lineLength = inputMatrix[0].length;

  const verticalizedInput = Array.from({ length: inputMatrix.length }).map(() =>
    Array.from({ length: lineLength }).map(() => "")
  );
  const diagonalizedInput = Array.from({
    length: inputMatrix.length + lineLength,
  }).map(() => Array.from({ length: lineLength }).map(() => ""));
  const diagonalizedReverseInput = Array.from({
    length: inputMatrix.length + lineLength,
  }).map(() => Array.from({ length: lineLength }).map(() => ""));

  inputMatrix.forEach((line, lineIndex) => {
    line.forEach((char, charIndex) => {
      verticalizedInput[charIndex][lineIndex] = char;

      const index = lineIndex - charIndex + line.length;
      diagonalizedInput[index][charIndex] = char;

      const index2 = lineIndex + charIndex;
      diagonalizedReverseInput[index2][charIndex] = char;
    });
  });

  const verticalizedString = verticalizedInput
    .map((line) => line.join(""))
    .join(/\n/);
  const vertical = verticalizedString.match(/XMAS/g).length;
  const verticalReverse = verticalizedString.match(/SAMX/g).length;

  const diagonalizedString = diagonalizedInput
    .map((line) => line.join(""))
    .join(/\n/);
  const diagonal = diagonalizedString.match(/XMAS/g).length;
  const diagonalReverse = diagonalizedString.match(/SAMX/g).length;

  const diagonalizedReverseString = diagonalizedReverseInput
    .map((line) => line.join(""))
    .join(/\n/);
  const diagonalReverse2 = diagonalizedReverseString.match(/XMAS/g).length;
  const diagonalReverseReverse =
    diagonalizedReverseString.match(/SAMX/g).length;

  console.log(
    horizontal +
      horizontalReverse +
      vertical +
      verticalReverse +
      diagonal +
      diagonalReverse +
      diagonalReverse2 +
      diagonalReverseReverse
  );
}

// Part two
{
  const lineLength = input.split(/\n/)[0].length;

  const inputSingleLine = input.replace(/\n/g, "...");

  const xes = inputSingleLine.match(
    new RegExp(
      `(?<=(M.M.{${lineLength + 1}}A.{${lineLength + 1}}S.S))|(?<=(M.S.{${
        lineLength + 1
      }}A.{${lineLength + 1}}M.S))|(?<=(S.M.{${lineLength + 1}}A.{${
        lineLength + 1
      }}S.M))|(?<=(S.S.{${lineLength + 1}}A.{${lineLength + 1}}M.M))`,
      "g"
    )
  );

  console.log(xes.length);
}
