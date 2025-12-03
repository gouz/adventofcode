import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./09";

test("09", async () => {
  const input = calc(await loadInputFile("2015/09", "input"));
  expect(input.part1).toBe(207);
  expect(input.part2).toBe(804);
});
