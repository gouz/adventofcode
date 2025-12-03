import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./03";

test("03", async () => {
  const input = calc(await loadInputFile("2015/03", "input"));
  expect(input.part1).toBe(2565);
  expect(input.part2).toBe(2639);
});
