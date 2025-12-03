import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./06";

test("06", async () => {
  const input = calc(await loadInputFile("2015/06", "input"));
  expect(input.part1).toBe(400410);
  expect(input.part2).toBe(15343601);
});
