import { loadInputFile } from "../../utils";

const dataset = (await loadInputFile("2015/01")).split("");

console.log(
	`Part one: ${dataset.filter((d) => d === "(").length - dataset.filter((d) => d === ")").length}`,
);

let floor = 0;
let i = 0;
while (floor !== -1) floor += dataset[i++] === "(" ? 1 : -1;

console.log(`Part two: ${i}`);
