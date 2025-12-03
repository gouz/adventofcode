import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./02";

test("02", async () => {
  const sample = calc(await loadInputFile("2024/02", "sample"));
  expect(sample.part1).toBe(2);
  expect(sample.part2).toBe(4);
  const input = calc(await loadInputFile("2024/02", "input"));
  console.log(input);
});
