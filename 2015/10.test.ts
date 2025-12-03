import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./10";

test("10", async () => {
  const input = calc(await loadInputFile("2015/10", "input"));
  expect(input.part1).toBe(252594);
  expect(input.part2).toBe(3579328);
});
