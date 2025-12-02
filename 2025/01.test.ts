import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";

const calc = (
  start: number,
  steps: string,
): { part1: number; part2: number } => {
  let pos = start;
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

test("01", async () => {
  const sample = calc(50, await loadInputFile("2025/01", "sample"));
  expect(sample.part1).toBe(3);
  expect(sample.part2).toBe(6);
  const input = calc(50, await loadInputFile("2025/01", "input"));
  expect(input.part1).toBe(1066);
  expect(input.part2).toBe(6223);
});
