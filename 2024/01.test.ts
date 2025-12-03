import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./01";

test("01", async () => {
  const sample = calc(await loadInputFile("2024/01", "sample"));
  expect(sample.part1).toBe(11);
  expect(sample.part2).toBe(31);
  const input = calc(await loadInputFile("2024/01", "input"));
  console.log(input);
});
