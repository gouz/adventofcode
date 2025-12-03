const surface = (dim: number[]) => {
  const [l, w, h] = dim;
  return 2 * l * w + 2 * w * h + 2 * h * l;
};

const extras = (dim: number[]) => {
  const [l, w, h] = dim;
  return Math.min(l * w, l * h, w * h);
};
const ribbon = (dim: number[]) => {
  const [l, w, h] = dim;
  return Math.min(2 * (l + w), 2 * (l + h), 2 * (w + h)) + l * w * h;
};

const add = (spl: number[]) => surface(spl) + extras(spl);

export const calc = (input: string) => {
  let part1 = 0;
  let part2 = 0;
  [...input.split("\n")].forEach((line, _) => {
    const spl = line.split("x").map((n) => Number(n));
    part1 += add(spl);
    part2 += ribbon(spl);
  });
  return { part1, part2 };
};
