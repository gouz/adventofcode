import { loadInputFile } from "../../utils";

const dataset = await loadInputFile("2015/09", "sample");

type Trip = { from: string; to: string; distance: number };

const trips = dataset
	.split("\n")
	.map((line) => line.split(" = "))
	.flatMap(([route, distance]) => {
		const [from, to] = route.split(" to ");
		return [
			{
				from,
				to,
				distance: Number(distance),
			},
			{
				from: to,
				to: from,
				distance: Number(distance),
			},
		];
	}) as Trip[];

const getPossibilities = (city: string) =>
	trips.filter((trip) => trip.from === city);

const getDistance = (from: string, to: string) =>
	trips.filter((t) => t.from === from && t.to === to)[0].distance;

const cities: string[] = [...new Set([...trips.map(({ from }) => from)])];

const travels: string[][] = [];

for (let i = 0; i < cities.length; ++i) {
	const dest1 = [
		...new Set(getPossibilities(cities[i]).map((trip) => trip.to)),
	];
	for (let j = 0; j < dest1.length; ++j) {
		[...new Set(getPossibilities(dest1[j]).map((trip) => trip.to))]
			.filter((c) => c !== cities[i])
			.forEach((dest2, _) => travels.push([cities[i], dest1[j], dest2]));
	}
}

const travelsWithDistance: { travel: string[]; distance: number }[] = [];

travels.forEach((t, _) => {
	const distance = getDistance(t[0], t[1]) + getDistance(t[1], t[2]);
	travelsWithDistance.push({
		travel: t,
		distance,
	});
});

console.log(travelsWithDistance);

console.log(
	travelsWithDistance.toSorted((a, b) => a.distance - b.distance)[0].distance,
);
