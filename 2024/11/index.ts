const initial = "0 5601550 3914 852 50706 68 6 645371";

const getNbStones = (input: string, blinks: number): number => {
	const cache: Record<number, Record<number, number>> = {};

	const stoneCount = (blink: number, stone: number): number => {
		if (blink === blinks) return 1;

		let result = cache[blink]?.[stone];
		if (result === undefined) {
			const stoneDigits = Math.floor(Math.log10(stone) + 1);

			if (stone === 0) {
				result = stoneCount(blink + 1, 1);
			} else if (stoneDigits % 2 === 0) {
				const divisor = 10 ** (stoneDigits / 2);
				result =
					stoneCount(blink + 1, Math.floor(stone / divisor)) +
					stoneCount(blink + 1, stone % divisor);
			} else {
				result = stoneCount(blink + 1, stone * 2024);
			}

			cache[blink] = cache[blink] ?? {};
			cache[blink][stone] = result;
		}
		return result;
	};

	return input
		.split(" ")
		.map(Number)
		.map((stone) => stoneCount(0, stone))
		.reduce((sum, stoneCount) => sum + stoneCount, 0);
};

console.log(`Part 1: ${getNbStones(initial, 25)}`);
console.log(`Part 2: ${getNbStones(initial, 75)}`);
