const list = await Bun.file(`${process.cwd()}/2024/02/input.txt`).text();

const parsed = list.split("\n").map((line) => line.split(" ").map(Number));

const getDist = (report: number[]) => {
	let direction = 0;
	let dist = 0;
	for (let i = 1; i < report.length; i++) {
		const delta = report[i] - report[i - 1];
		const dir = delta >= 0 ? 1 : -1;
		if (direction === 0) direction = dir;
		if (direction !== dir || delta === 0) {
			dist = 99;
			break;
		}
		const d = Math.abs(delta);
		if (d > dist) dist = d;
	}
	return dist;
};

let part1 = 0;
parsed.forEach((report, _) => {
	if (getDist(report) <= 3) part1++;
});
console.log(part1);

let part2 = 0;
parsed.forEach((report, _) => {
	// clean
	let direction = 0;
	for (let i = 1; i < report.length; i++) {
		const delta = report[i] - report[i - 1];
		const dir = delta >= 0 ? 1 : -1;
		if (direction === 0) direction = dir;
		if (direction !== dir || delta === 0) {
			report.splice(i, 1);
			break;
		}
	}
	if (getDist(report) <= 3) {
		part2++;
	}
});
console.log(part2);
