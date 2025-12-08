import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./08";

test("08", async () => {
  const sample = calc(await loadInputFile("2025/08", "sample"), 10);
  expect(sample.part1).toBe(40);
  const sample2 = calc(await loadInputFile("2025/08", "sample"), -1);
  expect(sample2.part2).toBe(25272);
  const input = calc(await loadInputFile("2025/08", "input"), 1000);
  expect(input.part1).toBe(75582);
  const input2 = calc(await loadInputFile("2025/08", "input"), -1);
  expect(input2.part2).toBe(59039696);
});
