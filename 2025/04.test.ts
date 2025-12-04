import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./04";

test("04", async () => {
  const sample = calc(await loadInputFile("2025/04", "sample"));
  expect(sample.part1).toBe(13);
  expect(sample.part2).toBe(43);
  const input = calc(await loadInputFile("2025/04", "input"));
  expect(input.part1).toBe(1363);
  expect(input.part2).toBe(8184);
});
