export const calc = (input: string) => {
  const dataset = input.split("");

  let floor = 0;
  let part2 = 0;
  while (floor !== -1) floor += dataset[part2++] === "(" ? 1 : -1;

  return {
    part1:
      dataset.filter((d) => d === "(").length -
      dataset.filter((d) => d === ")").length,
    part2,
  };
};
