import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./13";

test("13", async () => {
  const input = calc(await loadInputFile("2015/13", "input"));
  expect(input.part1).toBe(709);
  expect(input.part2).toBe(668);
});
