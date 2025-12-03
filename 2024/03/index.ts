export const calc = (input: string): { part1: number; part2: number } => {
  const calculate = (formula: string) =>
    [...formula.matchAll(/(mul\(\d+,\d+\))/g)]
      .map(([, op]) => op)
      .map((op) => op.replace("mul(", "").replace(")", ""))
      .map((nums) => nums.split(",").map(Number))
      .reduce((a, b) => a + b[0] * b[1], 0);

  const part1 = calculate(input);
  const part2 = [...input.split("do()")]
    .map((f) => f.split("don't()"))
    .map((g) => g.toSpliced(1))
    .flatMap((f) => f.flatMap(calculate))
    .reduce((a, b) => a + b, 0);
  return { part1, part2 };
};
