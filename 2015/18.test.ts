import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./18";

test("18", async () => {
  const input = calc(await loadInputFile("2015/18", "input"));
  expect(input.part1).toBe(654);
  expect(input.part2).toBe(57);
});
