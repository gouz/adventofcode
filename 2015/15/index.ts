import { loadInputFile } from "../../utils";

const caracteristics = [
	"capacity",
	"durability",
	"flavor",
	"texture",
	"calories",
];

type Ingredient = { [key: string]: string };

const ingredients: Ingredient[] = [];

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
			ingredients.push({
				name: name,
				capacity: capacity,
				durability: durability,
				flavor: flavor,
				texture: texture,
				calories: calories,
			});
		},
	);

console.log("Ingredients:", ingredients);

const sums: number[] = [];

for (let i = 0; i < 100; i++) {
	let sum = 0;
	caracteristics.forEach((car, _) => {
		ingredients.forEach((ingredient, j) => {
			sum += Number(ingredient[car]) * i;
		});
	});
	sums.push(sum);
}

console.log(sums);
