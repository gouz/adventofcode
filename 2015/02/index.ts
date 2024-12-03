import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2015/02");

const surface = (dim: number[]) => {
	const [l, w, h] = dim;
	return 2 * l * w + 2 * w * h + 2 * h * l;
};

const extras = (dim: number[]) => {
	const [l, w, h] = dim;
	return Math.min(l * w, l * h, w * h);
};
const ribbon = (dim: number[]) => {
	const [l, w, h] = dim;
	return Math.min(2 * (l + w), 2 * (l + h), 2 * (w + h)) + l * w * h;
};

const calc = (spl: number[]) => surface(spl) + extras(spl);

let sum = 0;
let sumRibbon = 0;
[...dataset.split("\n")].forEach((line, _) => {
	const spl = line.split("x").map((n) => Number(n));
	sum += calc(spl);
	sumRibbon += ribbon(spl);
});

console.log(`Part one: ${sum}`);
console.log(`Part two: ${sumRibbon}`);
