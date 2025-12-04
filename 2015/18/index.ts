export const calc = (input: string) => {
  const data = `.#.#.#
...##.
#....#
..#...
#.#..#
####..`;
  const map = data.split("\n").map((l) => l.split(""));
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      console.log(y, x, map[y][x]);
    }
  }
  return { part1: 0, part2: 0 };
};
