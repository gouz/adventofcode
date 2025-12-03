import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./11";

test("11", async () => {
  const input = calc(await loadInputFile("2015/11", "input"));
  expect(input.part1).toBe("cqjxxyzz");
  expect(input.part2).toBe("cqkaabcc");
});
