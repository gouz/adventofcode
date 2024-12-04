import { loadInputFile } from "../../utils";

const dataset = (await loadInputFile("2024/04", "input"))
	.split("\n")
	.map((line) => line.split(""));

const topleft = (x: number, y: number) =>
	dataset[y - 1] &&
	dataset[y - 1][x - 1] === "M" &&
	dataset[y - 2] &&
	dataset[y - 2][x - 2] === "A" &&
	dataset[y - 3] &&
	dataset[y - 3][x - 3] === "S";
const top = (x: number, y: number) =>
	dataset[y - 1] &&
	dataset[y - 1][x] === "M" &&
	dataset[y - 2] &&
	dataset[y - 2][x] === "A" &&
	dataset[y - 3] &&
	dataset[y - 3][x] === "S";
const topright = (x: number, y: number) =>
	dataset[y - 1] &&
	dataset[y - 1][x + 1] === "M" &&
	dataset[y - 2] &&
	dataset[y - 2][x + 2] === "A" &&
	dataset[y - 3] &&
	dataset[y - 3][x + 3] === "S";
const right = (x: number, y: number) =>
	dataset[y][x + 1] === "M" &&
	dataset[y][x + 2] === "A" &&
	dataset[y][x + 3] === "S";
const downright = (x: number, y: number) =>
	dataset[y + 1] &&
	dataset[y + 1][x + 1] === "M" &&
	dataset[y + 2] &&
	dataset[y + 2][x + 2] === "A" &&
	dataset[y + 3] &&
	dataset[y + 3][x + 3] === "S";
const down = (x: number, y: number) =>
	dataset[y + 1] &&
	dataset[y + 1][x] === "M" &&
	dataset[y + 2] &&
	dataset[y + 2][x] === "A" &&
	dataset[y + 3] &&
	dataset[y + 3][x] === "S";
const downleft = (x: number, y: number) =>
	dataset[y + 1] &&
	dataset[y + 1][x - 1] === "M" &&
	dataset[y + 2] &&
	dataset[y + 2][x - 2] === "A" &&
	dataset[y + 3] &&
	dataset[y + 3][x - 3] === "S";
const left = (x: number, y: number) =>
	dataset[y][x - 1] === "M" &&
	dataset[y][x - 2] === "A" &&
	dataset[y][x - 3] === "S";

let count = 0;
dataset.forEach((line, y) => {
	line.forEach((char, x) => {
		if (char === "X") {
			if (topleft(x, y)) count += 1;
			if (top(x, y)) count += 1;
			if (topright(x, y)) count += 1;
			if (right(x, y)) count += 1;
			if (downright(x, y)) count += 1;
			if (down(x, y)) count += 1;
			if (downleft(x, y)) count += 1;
			if (left(x, y)) count += 1;
		}
	});
});

console.log(`Part One: ${count}`);

count = 0;

const xmas1 = (x: number, y: number) =>
	dataset[y + 1] &&
	dataset[y + 1][x + 1] === "A" &&
	dataset[y + 2] &&
	dataset[y + 2][x + 2] === "S" &&
	dataset[y][x + 2] === "M" &&
	dataset[y + 2] &&
	dataset[y + 2][x] === "S";

const xmas2 = (x: number, y: number) =>
	dataset[y + 1] &&
	dataset[y + 1][x + 1] === "A" &&
	dataset[y + 2] &&
	dataset[y + 2][x + 2] === "S" &&
	dataset[y][x + 2] === "S" &&
	dataset[y + 2] &&
	dataset[y + 2][x] === "M";

const xmas3 = (x: number, y: number) =>
	dataset[y + 1] &&
	dataset[y + 1][x + 1] === "A" &&
	dataset[y + 2] &&
	dataset[y + 2][x + 2] === "M" &&
	dataset[y][x + 2] === "S" &&
	dataset[y + 2] &&
	dataset[y + 2][x] === "M";

const xmas4 = (x: number, y: number) =>
	dataset[y + 1] &&
	dataset[y + 1][x + 1] === "A" &&
	dataset[y + 2] &&
	dataset[y + 2][x + 2] === "M" &&
	dataset[y][x + 2] === "M" &&
	dataset[y + 2] &&
	dataset[y + 2][x] === "S";

dataset.forEach((line, y) => {
	line.forEach((char, x) => {
		if (char === "M") {
			if (xmas1(x, y)) count += 1;
			if (xmas2(x, y)) count += 1;
		} else if (char === "S") {
			if (xmas3(x, y)) count += 1;
			if (xmas4(x, y)) count += 1;
		}
	});
});

console.log(`Part Two: ${count}`);
