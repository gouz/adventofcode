import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2015/07");

type Operation = {
	var: string;
	operation: string[];
};

const operations = dataset
	.split("\n")
	.map((line) => line.split(" -> "))
	.map((op) => [...op[0].split(" "), op[1]])
	.map((arr) => ({
		var: arr.pop(),
		operation: arr,
	}))
	.toSorted((a, b) => a.operation.length - b.operation.length) as (
	| Operation
	| undefined
)[];

let variables: { [key: string]: number } = {};

const getValue = (val: string) => {
	if (
		Number.isNaN(Number(val)) &&
		variables[val] !== undefined &&
		variables[val] !== -1
	)
		return variables[val];
	if (!Number.isNaN(Number(val))) return Number(val);
	return -1;
};

const applyOperation = (op: Operation) => {
	if (op.operation.length === 1) {
		const val = getValue(op.operation[0]);
		if (val !== -1) {
			variables[op.var] = val;
			return true;
		}
		return false;
	}
	if (op.operation[0] === "NOT") {
		const val = getValue(op.operation[1]);
		if (val !== -1) {
			variables[op.var] = ~val;
			if (variables[op.var] < 0) variables[op.var] += 65536;
			return true;
		}
		return false;
	}
	if (op.operation[1] === "AND") {
		const val0 = getValue(op.operation[0]);
		const val2 = getValue(op.operation[2]);
		if (val0 !== -1 && val2 !== -1) {
			variables[op.var] = val0 & val2;
			return true;
		}
		return false;
	}
	if (op.operation[1] === "OR") {
		const val0 = getValue(op.operation[0]);
		const val2 = getValue(op.operation[2]);
		if (val0 !== -1 && val2 !== -1) {
			variables[op.var] = val0 | val2;
			return true;
		}
		return false;
	}
	if (op.operation[1] === "LSHIFT") {
		const val0 = getValue(op.operation[0]);
		const val2 = getValue(op.operation[2]);
		if (val0 !== -1 && val2 !== -1) {
			variables[op.var] = val0 << val2;
			return true;
		}
		return false;
	}
	if (op.operation[1] === "RSHIFT") {
		const val0 = getValue(op.operation[0]);
		const val2 = getValue(op.operation[2]);
		if (val0 !== -1 && val2 !== -1) {
			variables[op.var] = val0 >> val2;
			return true;
		}
		return false;
	}
	return false;
};

const op1 = [...operations];

while (op1.length) {
	const op = op1[0];
	if (op)
		if (applyOperation(op)) {
			op1.shift();
		} else {
			op1.push(op1.shift());
		}
}

console.log(`Part one: ${variables.a}`);

const op2 = [...operations].filter((op) => op?.var !== "b");
variables = { b: variables.a };

while (op2.length) {
	const op = op2[0];
	if (op)
		if (applyOperation(op)) {
			op2.shift();
		} else {
			op2.push(op2.shift());
		}
}

console.log(`Part two: ${variables.a}`);
