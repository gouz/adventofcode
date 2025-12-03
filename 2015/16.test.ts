import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./16";

test("15", async () => {
  const input = calc(await loadInputFile("2015/16", "input"));
  expect(input.part1).toBe(373);
  expect(input.part2).toBe(260);
});
