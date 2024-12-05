import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2024/05", "input");

const before: { [key: string]: string[] } = {};
const after: { [key: string]: string[] } = {};
const sets: string[][] = [];

dataset.split("\n").forEach((line, _) => {
	if (line.includes("|")) {
		const [from, to] = line.split("|");
		if (!before[from]) before[from] = [];
		before[from].push(to);
		if (!after[to]) after[to] = [];
		after[to].push(from);
	} else if (line.includes(",")) {
		sets.push(line.split(","));
	}
});

const isCorrect = (set: string[]) => {
	const lSet = [...set];
	const rSet = [...set];
	for (let i = 0; i < set.length - 1; i++) {
		const l = lSet.shift() || "";
		const r = rSet.pop() || "";
		if (!lSet.filter((value) => before[l]?.includes(value)).length)
			return false;
		if (!rSet.filter((value) => after[r]?.includes(value)).length) return false;
	}
	return true;
};

const getMiddle = (set: string[]) => set[Math.floor(set.length / 2)];

console.log(
	sets
		.filter(isCorrect)
		.map(getMiddle)
		.reduce((a, b) => a + Number(b), 0),
);
