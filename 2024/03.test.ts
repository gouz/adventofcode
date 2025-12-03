import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./03";

test("03", async () => {
  const sample = calc(await loadInputFile("2024/03", "sample"));
  expect(sample.part1).toBe(161);
  expect(sample.part2).toBe(48);
  const input = calc(await loadInputFile("2024/03", "input"));
  console.log(input);
});
