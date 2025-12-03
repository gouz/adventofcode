export const calc = (steps: string): { part1: number; part2: number } => {
  let pos = 50;
  let part1 = 0;
  let part2 = 0;
  steps.split("\n").forEach((step) => {
    const direction = step.substring(0, 1);
    const n = Number(step.slice(1));
    for (let i = 0; i < n; i++) {
      direction === "L" ? pos-- : pos++;
      if (pos < 0 || pos > 99) {
        pos = ((pos % 100) + 100) % 100;
      }
      if (pos === 0) part2++;
    }
    if (pos === 0) part1++;
  });
  return {
    part1,
    part2,
  };
};
