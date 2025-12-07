import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./06";

test("06", async () => {
  const sample = calc(await loadInputFile("2025/06", "sample"));
  expect(sample.part1).toBe(4277556);
  expect(sample.part2).toBe(3263827);
  const input = calc(await loadInputFile("2025/06", "input"));
  expect(input.part1).toBe(6100348226985);
  expect(input.part2).toBe(12377473011151);
});
