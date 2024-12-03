import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2015/06");

const lights: number[][] = [];

for (let x = 0; x < 1000; x++) {
	lights[x] = [];
	for (let y = 0; y < 1000; y++) lights[x][y] = 0;
}

const regex = /(\w+) (\d+),(\d+) through (\d+),(\d+)/g;

[...dataset.split("\n")].forEach((line, _) => {
	let m: RegExpExecArray | null;
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	while ((m = regex.exec(line)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		const action = m[1];
		const x1 = Number(m[2]);
		const y1 = Number(m[3]);
		const x2 = Number(m[4]);
		const y2 = Number(m[5]);
		for (let x = x1; x <= x2; x++)
			for (let y = y1; y <= y2; y++) {
				if (action === "off") lights[x][y] = 0;
				else if (action === "on") lights[x][y] = 1;
				else lights[x][y] = lights[x][y] ? 0 : 1;
			}
	}
});

let count = 0;
for (let x = 0; x < 1000; x++)
	for (let y = 0; y < 1000; y++) if (lights[x][y]) count++;

console.log(`Part One: ${count}`);

for (let x = 0; x < 1000; x++) {
	lights[x] = [];
	for (let y = 0; y < 1000; y++) lights[x][y] = 0;
}
[...dataset.split("\n")].forEach((line, _) => {
	let m: RegExpExecArray | null;
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	while ((m = regex.exec(line)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}

		const action = m[1];
		const x1 = Number(m[2]);
		const y1 = Number(m[3]);
		const x2 = Number(m[4]);
		const y2 = Number(m[5]);

		for (let x = x1; x <= x2; x++)
			for (let y = y1; y <= y2; y++) {
				if (action === "off") {
					lights[x][y] -= 1;
					if (lights[x][y] < 0) lights[x][y] = 0;
				} else if (action === "on") lights[x][y] += 1;
				else lights[x][y] += 2;
			}
	}
});

count = 0;
for (let x = 0; x < 1000; x++)
	for (let y = 0; y < 1000; y++) count += lights[x][y];

console.log(`Part Two: ${count}`);
