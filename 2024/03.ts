const formula = await Bun.file(`${process.cwd()}/2024/03/input.txt`).text();

const result = [...formula.matchAll(/(mul\(\d+,\d+\))/g)]
	.map(([, op]) => op)
	.map((op) => op.replace("mul(", "").replace(")", ""))
	.map((nums) => nums.split(",").map(Number))
	.reduce((a, b) => a + b[0] * b[1], 0);

console.log(result);
