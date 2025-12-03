import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./12";

test("12", async () => {
  const input = calc(await loadInputFile("2015/12", "input"));
  expect(input.part1).toBe(111754);
  expect(input.part2).toBe(65402);
});
