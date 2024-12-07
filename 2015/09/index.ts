import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2015/09", "input");

const cities: { [key: string]: { [key: string]: number } } = {};

dataset
	.split("\n")
	.map((line) => line.split(" = "))
	.forEach(([route, distance], _) => {
		const [from, to] = route.split(" to ");
		if (!cities[from]) cities[from] = {};
		if (!cities[to]) cities[to] = {};
		cities[from][to] = Number(distance);
		cities[to][from] = Number(distance);
	});

const permutations = (array: string[]): string[][] => {
	if (array.length === 1) return [array];
	return array
		.map((_, index, array) =>
			permutations(array.filter((city) => city !== array[index])).map(
				(permutation) => [array[index], ...permutation],
			),
		)
		.reduce((a, b) => a.concat(b), []);
};

const getDistance = (route: string[]): number => {
	return route
		.map((city1, index, array) =>
			array[index + 1] ? cities[city1][array[index + 1]] : 0,
		)
		.reduce((distance, distanceToNextCity) => distance + distanceToNextCity, 0);
};

console.log(Math.min(...permutations(Object.keys(cities)).map(getDistance)));
console.log(Math.max(...permutations(Object.keys(cities)).map(getDistance)));
