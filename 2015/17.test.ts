import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./17";

test("17", async () => {
  const input = calc(await loadInputFile("2015/17", "input"));
  expect(input.part1).toBe(654);
  expect(input.part2).toBe(57);
});
