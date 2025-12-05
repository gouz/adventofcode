import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./19";

test("19", async () => {
  const input = calc(await loadInputFile("2015/19", "input"));
  expect(input.part1).toBe(535);
  expect(input.part2).toBe(781);
});
