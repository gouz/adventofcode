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

const cleanReport = (report: number[]) => {
	const deltas: number[] = [];
	for (let i = 1; i < report.length; i++) {
		deltas.push(report[i] - report[i - 1]);
	}
	const nbNeg = deltas.filter((n) => n < 0).length;
	const nbPos = deltas.filter((n) => n > 0).length;
	const nbNul = deltas.filter((n) => n === 0).length;
	if (nbNul === 1) return report.toSpliced(deltas.indexOf(0) + 1, 1);
	if (nbNul === 0 && nbPos === 1)
		return report.toSpliced(
			deltas.map((n) => (n > 0 ? 1 : -1)).indexOf(1) + 1,
			1,
		);
	if (nbNul === 0 && nbNeg === 1)
		return report.toSpliced(deltas.map((n) => (n > 0 ? 1 : -1)).indexOf(-1), 1);
	return report;
};

let part2 = 0;
parsed.forEach((report, _) => {
	const newReport = cleanReport(report);
	part2 += isSafe(newReport) ? 1 : 0;
});
console.log(part2);
