import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./02";

test("02", async () => {
  const sample = calc(await loadInputFile("2025/02", "sample"));
  expect(sample.part1).toBe(1227775554);
  expect(sample.part2).toBe(4174379265);
  const input = calc(await loadInputFile("2025/02", "input"));
  expect(input.part1).toBe(22062284697);
  expect(input.part2).toBe(46666175279);
});
