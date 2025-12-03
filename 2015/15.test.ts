import { expect, test } from "bun:test";
import { loadInputFile } from "../utils";
import { calc } from "./15";

test("15", async () => {
  const input = calc(await loadInputFile("2015/15", "sample"));
  expect(input.part1).toBe(62842880);
});
