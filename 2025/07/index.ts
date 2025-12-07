export const calc = (input: string) => {
  const grid: string[][] = input
    .split("\n")
    .filter((r) => r !== "")
    .map((r) => r.split("").map((c) => (c === "^" || c === "S" ? c : "0")));
  const positions = new Set<number>();
  positions.add(grid[0].indexOf("S"));

  const dp: number[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(0),
  );

  dp[1][grid[0].indexOf("S")] = 1;

  let part1 = 0;
  for (let i = 1; i < grid.length; i++) {
    positions.forEach((p) => {
      if (grid[i][p] === "^") {
        grid[i][p - 1] = "|";
        grid[i][p + 1] = "|";
        positions.delete(p);
        positions.add(p - 1);
        positions.add(p + 1);
        if (i < grid.length - 1) {
          dp[i + 1][p - 1] += dp[i][p];
          dp[i + 1][p + 1] += dp[i][p];
        }
        part1++;
      } else {
        grid[i][p] = "|";
        if (i < grid.length - 1) {
          dp[i + 1][p] += dp[i][p];
        }
      }
    });
  }
  const part2 = dp[grid.length - 1].reduce((a, b) => a + b, 0);
  return { part1, part2 };
};
