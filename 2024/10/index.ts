import { loadInputFile } from "../../utils";

const map = (await loadInputFile("2024/10", "input"))
	.split("\n")
	.map((line) => line.split("").map(Number));

const starts: number[][] = [];

map.forEach((line, y) => {
	line.forEach((value, x) => {
		if (value === 0) {
			starts.push([x, y]);
		}
	});
});

const maxX = map[0].length - 1;
const maxY = map.length - 1;

const hike = (pos: number[], num: number, key: string) => {
	const [x, y] = pos;
	if (map[y][x] === 9) ends[key].push(`${x}:${y}`);
	if (x < maxX && map[y][x + 1] === num + 1) hike([x + 1, y], num + 1, key);
	if (x > 0 && map[y][x - 1] === num + 1) hike([x - 1, y], num + 1, key);
	if (y < maxY && map[y + 1][x] === num + 1) hike([x, y + 1], num + 1, key);
	if (y > 0 && map[y - 1][x] === num + 1) hike([x, y - 1], num + 1, key);
};

const ends: { [key: string]: string[] } = {};

starts.forEach((start, _) => {
	ends[`${start.join(":")}`] = [];
	hike(start, 0, `${start.join(":")}`);
});

let sum = 0;
for (const [_, value] of Object.entries(ends)) {
	sum += [...new Set(value)].length;
}
console.log(`Part 1: ${sum}`);

sum = 0;
for (const [_, value] of Object.entries(ends)) {
	sum += value.length;
}
console.log(`Part 2: ${sum}`);
