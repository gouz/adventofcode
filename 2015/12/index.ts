import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2015/12");

console.log(dataset.match(/-?\d+/g)?.reduce((a, b) => a + Number(b), 0));

const countNonRedNumbers = (obj: { [key: string]: object | string }) =>
	(Array.isArray(obj)
		? obj
		: Object.keys(obj)
					.map((key) => obj[key])
					.includes("red")
			? []
			: Object.keys(obj).map((key) => obj[key])
	).reduce((sum, item) => {
		if (typeof item === "number") return sum + item;
		if (typeof item === "object") return sum + countNonRedNumbers(item);
		return sum;
	}, 0);

console.log(countNonRedNumbers(JSON.parse(dataset)));
