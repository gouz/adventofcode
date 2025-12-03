import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./04";

test("04", async () => {
  const sample = calc(await loadInputFile("2024/04", "sample"));
  expect(sample.part1).toBe(18);
  expect(sample.part2).toBe(9);
  const input = calc(await loadInputFile("2024/04", "input"));
  console.log(input);
});
