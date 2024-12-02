const list = await Bun.file(`${process.cwd()}/2024/01/input.txt`).text();

const parsed = list.split("\n").map((line) => {
	const splitted = line.split(" ");
	return { left: Number(splitted.shift()), right: Number(splitted.pop()) };
});

const left = parsed.map((l) => l.left).toSorted();
const right = parsed.map((l) => l.right).toSorted();

let part1 = 0;

left.forEach((l, i) => {
	part1 += Math.abs(l - right[i]);
});

console.log(part1);

let part2 = 0;

left.forEach((l, _) => {
	part2 += l * right.filter((r) => r === l).length;
});

console.log(part2);
