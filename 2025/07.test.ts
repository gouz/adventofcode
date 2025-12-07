import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./07";

test("07", async () => {
  const sample = calc(await loadInputFile("2025/07", "sample"));
  expect(sample.part1).toBe(21);
  expect(sample.part2).toBe(40);
  const input = calc(await loadInputFile("2025/07", "input"));
  expect(input.part1).toBe(1518);
  expect(input.part2).toBe(25489586715621);
});
