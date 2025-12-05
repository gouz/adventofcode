import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./03";

test("03", async () => {
  const sample = calc(await loadInputFile("2025/03", "sample"));
  expect(sample.part1).toBe(357);
  expect(sample.part2).toBe(3121910778619);
  const input = calc(await loadInputFile("2025/03", "input"));
  expect(input.part1).toBe(17229);
  expect(input.part2).toBe(170520923035051);
});
