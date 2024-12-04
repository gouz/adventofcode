import { loadInputFile } from "../../utils";

let dataset = await loadInputFile("2015/08", "input");

const numInMemory = (str: string) =>
	str
		.slice(1, -1)
		.replace(/\\x([0-9a-f]{2})/gi, (_, pair) =>
			String.fromCharCode(Number.parseInt(pair, 16)),
		)
		.replaceAll("\\\\", "=")
		.replaceAll('\\"', "+").length;

// part1
console.log(
	dataset
		.split("\n")
		.map((line) => line.length - numInMemory(line))
		.reduce((a, b) => a + b),
);

// part2
dataset = await loadInputFile("2015/08", "input");

console.log(
	dataset
		.split("\n")
		.map((line) => JSON.stringify(line).length - line.length)
		.reduce((a, b) => a + b),
);
