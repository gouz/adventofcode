import { loadInputFile } from "../../utils";

const map = (await loadInputFile("2024/06", "input"))
	.split("\n")
	.map((line) => line.split(""));

// search start pos
let row = -1;
let col = -1;

const maxRow = map.length;
const maxCol = map[0].length;

for (let y = 0; y < maxRow; y++) {
	for (let x = 0; x < maxCol; x++) {
		if (map[y][x] === "^") {
			row = y;
			col = x;
			break;
		}
	}
}

let char = "^";

const next = () => {
	switch (char) {
		case "^":
			return [row - 1, col];
		case ">":
			return [row, col + 1];
		case "v":
			return [row + 1, col];
		case "<":
			return [row, col - 1];
	}
	return [-1, -1];
};

let out = false;

const move = () => {
	const [y, x] = next();
	map[row][col] = "X";
	if (0 <= y && y < maxRow && 0 <= x && x < maxCol) {
		if (map[y][x] === "#") {
			switch (char) {
				case "^":
					row = y + 1;
					col = x;
					char = ">";
					break;
				case ">":
					row = y;
					col = x - 1;
					char = "v";
					break;
				case "v":
					row = y - 1;
					col = x;
					char = "<";
					break;
				case "<":
					row = y;
					col = x + 1;
					char = "^";
			}
		} else {
			row = y;
			col = x;
		}
	} else {
		out = true;
	}
};

while (!out) {
	move();
}

console.log(
	map.reduce((acc, row) => acc + row.filter((c) => c === "X").length, 0),
);
