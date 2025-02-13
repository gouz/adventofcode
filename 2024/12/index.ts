import { loadInputFile } from "../../utils";

const map = (await loadInputFile("2024/12", "sample"))
	.split("\n")
	.map((line) => line.split(""));

const fields: { [key: string]: number[][] } = {};

map.forEach((row, i) => {
	row.forEach((col, j) => {
		if (fields[col] === undefined) {
			fields[col] = [];
		}
		fields[col].push([j, i]);
	});
});

const splitFields = (field: number[][]) => {
	const fields: number[][][] = [];
	field.forEach((f, _) => {});
	return fields;
};

Object.values(fields).forEach((field, _) => {
	console.log(field);
});
