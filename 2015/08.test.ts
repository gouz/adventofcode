import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./08";

test("08", async () => {
  const input = calc(await loadInputFile("2015/08", "input"));
  expect(input.part1).toBe(1350);
  expect(input.part2).toBe(2085);
});
