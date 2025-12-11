import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./10";

test("10", async () => {
  const sample = calc(await loadInputFile("2025/10", "sample"));
  expect(sample.part1).toBe(7);
  // expect(sample.part2).toBe(24);
  const input = calc(await loadInputFile("2025/10", "input"));
  expect(input.part1).toBe(4765757080);
  // expect(input.part2).toBe(59039696);
});
