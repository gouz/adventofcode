import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./06";

test("06", async () => {
  const sample = calc(await loadInputFile("2024/06", "sample"));
  expect(sample.part1).toBe(41);
  expect(sample.part2).toBe(6);
  const input = calc(await loadInputFile("2024/06", "input"));
  console.log(input);
});
