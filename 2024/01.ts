const list = await Bun.file(`${process.cwd()}/2024/01/01/input.txt`).text();
const parsed = list.split("\n").map((line) => {
	const splitted = line.split(" ");
	return { left: Number(splitted.shift()), right: Number(splitted.pop()) };
});

const left = parsed.map((l) => l.left).toSorted();
const right = parsed.map((l) => l.right).toSorted();

let distance = 0;

left.forEach((l, i) => {
	distance += Math.abs(l - right[i]);
});

console.log(distance);
