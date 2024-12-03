import { loadInputFile } from "../../utils";

const voyels = "aeiou".split("");
const excludes = ["ab", "cd", "pq", "xy"];

const dataset = await loadInputFile("2015/05");

const isNaughty = (line: string) => {
	let naughty = false;
	let nbVoyel = 0;
	if (!naughty) {
		voyels.forEach((e, _) => {
			nbVoyel += (line.match(new RegExp(e, "g")) || []).length;
		});
		if (nbVoyel < 3) naughty = true;
	}
	if (!naughty) {
		if (!(/([a-z])\1/g.exec(line) || []).length) naughty = true;
	}
	if (!naughty) {
		excludes.forEach((e, _) => {
			if (line.indexOf(e) !== -1) {
				naughty = true;
				return;
			}
		});
	}
	return naughty;
};

console.log(
	`Part One: ${
		[...dataset.split("\n")].filter((line) => !isNaughty(line)).length
	}`,
);

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const part2 = (str: string) => {
	const hasTwice = /([a-zA-Z]{2,}).*?\1/.test(str);
	if (hasTwice) {
		let found = false;
		alphabet.forEach((char, _) => {
			const haveMiddle = new RegExp(`${char}(\\w{1})${char}`, "g").test(str);
			if (haveMiddle) found = true;
		});
		return found;
	}
	return false;
};

console.log(
	`Part Two: ${[...dataset.split("\n")].filter((line) => part2(line)).length}`,
);
