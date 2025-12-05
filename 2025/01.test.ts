import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./01";

test("01", async () => {
  const sample = calc(await loadInputFile("2025/01", "sample"));
  expect(sample.part1).toBe(3);
  expect(sample.part2).toBe(6);
  const input = calc(await loadInputFile("2025/01", "input"));
  expect(input.part1).toBe(1066);
  expect(input.part2).toBe(6223);
});
