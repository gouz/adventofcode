import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./07";

test("07", async () => {
  const sample = calc(await loadInputFile("2024/07", "sample"));
  expect(sample.part1).toBe(3749);
  expect(sample.part2).toBe(11387);
  const input = calc(await loadInputFile("2024/07", "input"));
  console.log(input);
});
