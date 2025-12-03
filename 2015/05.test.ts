import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./05";

test("05", async () => {
  const input = calc(await loadInputFile("2015/05", "input"));
  expect(input.part1).toBe(258);
  expect(input.part2).toBe(53);
});
