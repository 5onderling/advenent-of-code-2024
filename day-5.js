import { readFileSync } from "node:fs";

const input = readFileSync("./inputs/day-5.txt", { encoding: "utf8" });

const [rulesStr, updatesStr] = input.split(/\n\n/);

const rules = rulesStr.split(/\n/);
const updates = updatesStr.split(/\n/).map((line) => line.split(","));

const invalidUpdates = [];

let res = 0;
updateLoop: for (const update of updates) {
  for (let index = 0; index < update.length; index++) {
    const updatePage = update[index];

    const validStart = update.slice(0, index).every((page) =>
      rules.find((rule) => {
        return rule.startsWith(page) && rule.endsWith(updatePage);
      })
    );
    if (!validStart) {
      invalidUpdates.push(update);
      continue updateLoop;
    }

    const validEnd = update.slice(index + 1).every((page) =>
      rules.find((rule) => {
        return rule.startsWith(updatePage) && rule.endsWith(page);
      })
    );
    if (!validEnd) {
      invalidUpdates.push(update);
      continue updateLoop;
    }
  }

  // is valid
  res += +update[Math.floor(update.length / 2)];
}

console.log(res);

// Part two
{
  let res = 0;
  for (const update of invalidUpdates) {
    const sortUpdate = structuredClone(update);
    for (let index = 0; index < update.length; index++) {
      const updatePage = update[index];
      const matchingRules = rules.filter(
        (rule) =>
          rule.includes(updatePage) &&
          update.toSpliced(index, 1).some((page) => rule.includes(page)) &&
          rule.endsWith(updatePage)
      );
      sortUpdate[matchingRules.length] = updatePage;
    }
    res += +sortUpdate[Math.floor(sortUpdate.length / 2)];
  }

  console.log(res);
}
