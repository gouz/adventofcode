import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./14";

test("14", async () => {
  const input = calc(await loadInputFile("2015/14", "input"));
  expect(input.part1).toBe(2696);
  expect(input.part2).toBe(1084);
});
