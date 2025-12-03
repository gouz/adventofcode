import { loadInputFile } from "../../utils";

const map = (await loadInputFile("2024/08", "input"))
  .split("\n")
  .map((line) => line.split(""));

const antennas: { [key: string]: { x: number; y: number }[] } = {};
map.forEach((line, y) => {
  line.forEach((char, x) => {
    if (char !== ".") {
      if (!antennas[char]) antennas[char] = [];
      antennas[char].push({ x, y });
    }
  });
});

const maxCol = map[0].length;
const maxRow = map.length;

const antinodes = new Set();

Object.values(antennas).forEach((ants, _) => {
  ants.forEach((antenna, i, all) => {
    all
      .filter((_, j) => i !== j)
      .forEach((otherAntenna, _) => {
        const x = 2 * antenna.x - otherAntenna.x;
        const y = 2 * antenna.y - otherAntenna.y;
        if (x < 0 || x >= maxCol || y < 0 || y >= maxRow) return; // out of bounds
        antinodes.add(`${x},${y}`);
      });
  });
});
console.log(`Part 1: ${antinodes.size}`);

antinodes.clear();

Object.values(antennas).forEach((ants, _) => {
  ants.forEach((antenna, i, all) => {
    all
      .filter((_, j) => i !== j)
      .forEach((otherAntenna, _) => {
        let k = 1;
        while (true) {
          const x = (1 - k) * antenna.x + k * otherAntenna.x;
          const y = (1 - k) * antenna.y + k * otherAntenna.y;
          if (x < 0 || x >= maxCol || y < 0 || y >= maxRow) return; // out of bounds
          antinodes.add(`${x},${y}`);
          k++;
        }
      });
  });
});
console.log(`Part 2: ${antinodes.size}`);
