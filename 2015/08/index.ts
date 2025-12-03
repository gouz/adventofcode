export const calc = (input: string) => {
  const numInMemory = (str: string) =>
    str
      .slice(1, -1)
      .replace(/\\x([0-9a-f]{2})/gi, (_, pair) =>
        String.fromCharCode(Number.parseInt(pair, 16)),
      )
      .replaceAll("\\\\", "=")
      .replaceAll('\\"', "+").length;

  return {
    part1: input
      .split("\n")
      .map((line) => line.length - numInMemory(line))
      .reduce((a, b) => a + b),
    part2: input
      .split("\n")
      .map((line) => JSON.stringify(line).length - line.length)
      .reduce((a, b) => a + b),
  };
};
