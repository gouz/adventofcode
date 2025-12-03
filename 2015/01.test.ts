import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./01";

test("01", async () => {
  const input = calc(await loadInputFile("2015/01", "input"));
  expect(input.part1).toBe(232);
  expect(input.part2).toBe(1783);
});
