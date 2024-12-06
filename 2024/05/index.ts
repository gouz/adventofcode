import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2024/05", "sample");

const hasAfter: { [key: string]: string[] } = {};
const hasBefore: { [key: string]: string[] } = {};
const sets: string[][] = [];

dataset.split("\n").forEach((line, _) => {
	if (line.includes("|")) {
		const [from, to] = line.split("|");
		if (!hasAfter[from]) hasAfter[from] = [];
		hasAfter[from].push(to);
		if (!hasBefore[to]) hasBefore[to] = [];
		hasBefore[to].push(from);
	} else if (line.includes(",")) {
		sets.push(line.split(","));
	}
});

const isCorrecAfter = (set: string[]) => {
	const lSet = [...set];
	for (let i = 0; i < set.length - 1; i++) {
		const l = lSet.shift() || "";
		if (!lSet.filter((value) => hasAfter[l]?.includes(value)).length)
			return false;
	}
	return true;
};

const isCorrectBefore = (set: string[]) => {
	const rSet = [...set];
	for (let i = 0; i < set.length - 1; i++) {
		const r = rSet.pop() || "";
		if (!rSet.filter((value) => hasBefore[r]?.includes(value)).length)
			return false;
	}
	return true;
};

const isCorrect = (set: string[]) => isCorrecAfter(set) && isCorrectBefore(set);

const getMiddle = (set: string[]) => set[Math.floor(set.length / 2)];

console.log(
	sets
		.filter(isCorrect)
		.map(getMiddle)
		.reduce((a, b) => a + Number(b), 0),
);
