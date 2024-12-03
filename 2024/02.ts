const list = await Bun.file(`${process.cwd()}/2024/02/input.txt`).text();

const parsed = list.split("\n").map((line) => line.split(" ").map(Number));

const isSafe = (report: number[]) => {
	const deltas: number[] = [];
	for (let i = 1; i < report.length; i++) {
		deltas.push(report[i] - report[i - 1]);
	}
	const nbNeg = deltas.filter((n) => n < 0).length;
	const nbPos = deltas.filter((n) => n > 0).length;
	const nbNul = deltas.filter((n) => n === 0).length;
	if (nbNul !== 0) return false;
	if ((nbPos === 0 && nbNeg !== 0) || (nbPos !== 0 && nbNeg === 0)) {
		return Math.max(...deltas.map(Math.abs)) <= 3;
	}
	return false;
};

let part1 = 0;
parsed.forEach((report, i) => {
	part1 += isSafe(report) ? 1 : 0;
});
console.log(part1);

let part2 = 0;
parsed.forEach((report, _) => {
	part2 +=
		isSafe(report) || report.map((_, i) => report.toSpliced(i, 1)).some(isSafe)
			? 1
			: 0;
});
console.log(part2);
