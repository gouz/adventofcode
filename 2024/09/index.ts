import { loadInputFile } from "../../utils";

const input = (await loadInputFile("2024/09", "input")).split("");

let isBlank = false;
let cpt = 0;
const newString: (string | number)[] = [];

for (let i = 0; i < input.length; i++) {
	if (isBlank) {
		for (let j = 0; j < Number(input[i]); j++) {
			newString.push(".");
		}
		isBlank = false;
	} else {
		for (let j = 0; j < Number(input[i]); j++) {
			newString.push(cpt);
		}
		cpt++;
		isBlank = true;
	}
}

for (let i = 0; i < newString.length; i++) {
	if (newString[i] === ".") {
		let j = newString.length - 1;
		while (j > 0 && newString[j] === ".") {
			j--;
		}
		newString[i] = newString[j];
		newString[j] = ".";
	}
}
newString[newString.indexOf(".")] = newString[newString.length - 1];
newString[newString.length - 1] = ".";

let sum = 0;
for (let i = 0; i < newString.length; i++) {
	if (newString[i] !== ".") sum += Number(newString[i]) * i;
}
console.log(`Part 1: ${sum}`);
cpt = 0;
isBlank = false;
const part2: (string | number)[] = [];
for (let i = 0; i < input.length; i++) {
	if (isBlank) {
		for (let j = 0; j < Number(input[i]); j++) {
			part2.push(".");
		}
		isBlank = false;
	} else {
		for (let j = 0; j < Number(input[i]); j++) {
			part2.push(cpt);
		}
		cpt++;
		isBlank = true;
	}
}

const blocks: { [key: string]: { start: number; length: number } } = {};

part2.forEach((p, i) => {
	if (p !== ".") {
		if (blocks[p] === undefined) {
			blocks[p] = { start: i, length: 1 };
		} else {
			blocks[p].length++;
		}
	}
});

const keys = Object.keys(blocks).reverse();

while (keys.length) {
	let i = 0;
	let plop = 0;
	let start = -1;
	let toFill = false;
	let found = false;
	const K = keys.shift() || -1;
	while (i < part2.length && !found) {
		if (part2[i] === ".") {
			if (!toFill) start = i;
			toFill = true;
			plop++;
		} else if (blocks[K].start > start) {
			if (toFill) {
				if (K !== -1 && blocks[K].length <= plop) {
					found = true;
					let l = 0;
					for (let j = 0; j < blocks[K].length; j++) {
						part2[start + j] = K;
						part2[blocks[K].start + l++] = ".";
					}
				}
				toFill = false;
				plop = 0;
			}
		}
		i++;
	}
}

sum = 0;
for (let i = 0; i < part2.length; i++) {
	if (part2[i] !== ".") sum += Number(part2[i]) * i;
}

console.log(`Part 2: ${sum}`);
