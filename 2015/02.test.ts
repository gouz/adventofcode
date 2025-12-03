import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./02";

test("02", async () => {
  const input = calc(await loadInputFile("2015/02", "input"));
  expect(input.part1).toBe(1588178);
  expect(input.part2).toBe(3783758);
});
