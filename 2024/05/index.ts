import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2024/05", "input");

const isBefore: { [key: string]: string[] } = {};
const isAfter: { [key: string]: string[] } = {};
const sets: string[][] = [];

dataset.split("\n").forEach((line, _) => {
	if (line.includes("|")) {
		const [from, to] = line.split("|");
		if (!isBefore[from]) isBefore[from] = [];
		isBefore[from].push(to);
		if (!isAfter[to]) isAfter[to] = [];
		isAfter[to].push(from);
	} else if (line.includes(",")) {
		sets.push(line.split(","));
	}
});

const isCorrect = (set: string[]) => {
	for (let i = 1; i <= set.length; i++) {
		const cur = set[i - 1];
		const before = set.toSpliced(i - 1);
		if (!before?.every((value) => isAfter[cur]?.includes(value))) return false;
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

const fixUpdate = (set: string[]) => {
	return set.toSorted((a, b) => {
		if (isBefore[a]?.includes(b)) return -1;
		if (isAfter[b]?.includes(a)) return 1;
		return 0;
	});
};
console.log(
	sets
		.filter((s) => !isCorrect(s))
		.map(fixUpdate)
		.map(getMiddle)
		.reduce((a, b) => a + Number(b), 0),
);
