import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./05";

test("05", async () => {
  const sample = calc(await loadInputFile("2025/05", "sample"));
  expect(sample.part1).toBe(3);
  expect(sample.part2).toBe(14);
  const input = calc(await loadInputFile("2025/05", "input"));
  expect(input.part1).toBe(635);
  expect(input.part2).toBe(369761800782619);
});
