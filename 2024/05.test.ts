import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./05";

test("05", async () => {
  const sample = calc(await loadInputFile("2024/05", "sample"));
  expect(sample.part1).toBe(143);
  expect(sample.part2).toBe(123);
  const input = calc(await loadInputFile("2024/05", "input"));
  console.log(input);
});
