import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./15";

test("15", async () => {
  const sample = calc(await loadInputFile("2015/15", "sample"));
  expect(sample.part1).toBe(62842880);
  expect(sample.part2).toBe(57600000);
  const input = calc(await loadInputFile("2015/15", "input"));
  expect(input.part1).toBe(222870);
  expect(input.part2).toBe(117936);
});
