import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/day-3.txt", { encoding: "utf8" });

{
  const filtered = input.match(/mul\(\d*,\d*\)/g);

  const res = filtered.reduce((res, cur) => {
    const [first, last] = cur.split(",");
    return res + first.slice(4) * last.slice(0, -1);
  }, 0);

  console.log(res);
}

// Part two
{
  const statements = input.match(/do\(\)|mul\(\d*,\d*\)|don\'t\(\)/g);

  let add = true;
  let res = 0;
  for (const statement of statements) {
    if (statement === `do()`) {
      add = true;
      continue;
    } else if (statement === `don't()`) {
      add = false;
      continue;
    }

    if (!add) continue;

    const [first, last] = statement.split(",");
    res += first.slice(4) * last.slice(0, -1);
  }

  console.log(res);
}
