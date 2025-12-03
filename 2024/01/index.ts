export const calc = (input: string): { part1: number; part2: number } => {
  const parsed = input.split("\n").map((line) => {
    const splitted = line.split(" ");
    return { left: Number(splitted.shift()), right: Number(splitted.pop()) };
  });

  const left = parsed.map((l) => l.left).toSorted();
  const right = parsed.map((l) => l.right).toSorted();

  let part1 = 0;
  let part2 = 0;

  left.forEach((l, i) => {
    part1 += Math.abs(l - right[i]);
    part2 += l * right.filter((r) => r === l).length;
  });

  return { part1, part2 };
};
