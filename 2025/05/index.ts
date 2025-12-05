const mergeIntervals = (intervals: number[][]) => {
  const merged: number[][] = [];
  merged.push(intervals[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= merged[merged.length - 1][1] + 1) {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        intervals[i][1],
      );
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
};

export const calc = (input: string) => {
  const lines = input.split("\n").filter((l) => l !== "");
  const ranges = lines
    .filter((l) => l.includes("-"))
    .map((l) => l.split("-"))
    .map((l) => l.map(Number))
    .sort((a, b) => a[0] - b[0]);
  const ingredients = lines
    .filter((l) => !l.includes("-"))
    .map(Number)
    .sort((a, b) => a - b);
  let part1 = 0;
  ingredients.forEach((i, _) => {
    const r = ranges.filter((rang) => rang[0] <= i && i <= rang[1]).length;
    if (r !== 0) part1++;
  });

  const merged = mergeIntervals(ranges);
  const part2 = merged.reduce((acc, i) => i[1] - i[0] + 1 + acc, 0);

  return { part1, part2 };
};
