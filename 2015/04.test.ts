import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./04";

test("04", async () => {
  expect(calc("abcdef").part1).toBe(609043);
  expect(calc("pqrstuv").part1).toBe(1048970);
  const input = calc(await loadInputFile("2015/04", "input"));
  expect(input.part1).toBe(254575);
  expect(input.part2).toBe(1038736);
});
