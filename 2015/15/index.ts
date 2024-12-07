import { loadInputFile } from "../../utils";

const caracteristics = [
	"capacity",
	"durability",
	"flavor",
	"texture",
	"calories",
];

type Ingredient = {
	capacity: number;
	durability: number;
	flavor: number;
	texture: number;
	calories: number;
};

const ingredients: {
	[key: string]: Ingredient;
} = {};

(await loadInputFile("2015/15", "sample"))
	.split("\n")
	.map(
		(line) =>
			line
				.match(
					/^(\w+): (\w+) (-?\d+), (\w+) (-?\d+), (\w+) (-?\d+), (\w+) (-?\d+), (\w+) (-?\d+)$/,
				)
				?.slice(1) || [],
	)
	.forEach(
		([name, , capacity, , durability, , flavor, , texture, , calories], _) => {
			ingredients[name] = {
				capacity: Number(capacity),
				durability: Number(durability),
				flavor: Number(flavor),
				texture: Number(texture),
				calories: Number(calories),
			};
		},
	);

console.log("Ingredients:", ingredients);
