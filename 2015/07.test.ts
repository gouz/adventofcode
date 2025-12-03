import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./07";

test("07", async () => {
  const input = calc(await loadInputFile("2015/07", "input"));
  expect(input.part1).toBe(956);
  expect(input.part2).toBe(40149);
});
