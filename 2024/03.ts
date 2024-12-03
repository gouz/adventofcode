const formula = await Bun.file(`${process.cwd()}/2024/03/input.txt`).text();

const calc = (formula: string) =>
	[...formula.matchAll(/(mul\(\d+,\d+\))/g)]
		.map(([, op]) => op)
		.map((op) => op.replace("mul(", "").replace(")", ""))
		.map((nums) => nums.split(",").map(Number))
		.reduce((a, b) => a + b[0] * b[1], 0);

const part1 = calc(formula);

console.log(part1);

const part2 = [...formula.split("do()")]
	.map((f) => f.split("don't()"))
	.map((g) => g.toSpliced(1))
	.flatMap((f) => f.flatMap(calc))
	.reduce((a, b) => a + b, 0);

console.log(part2);
