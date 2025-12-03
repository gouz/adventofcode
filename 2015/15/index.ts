type Ingredient = {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

const getCombinations = (maximum: number, nb: number): number[][] => {
  const res: number[][] = [];

  const genCombinations = (
    rest: number,
    position: number,
    current: number[],
  ) => {
    if (position === nb - 1) {
      res.push([...current, rest]);
      return;
    }

    for (let i = 1; i <= rest; i++) {
      genCombinations(rest - i, position + 1, [...current, i]);
    }
  };

  genCombinations(maximum, 0, []);
  return res;
};

export const calc = (input: string) => {
  const ingredients: Ingredient[] = [];

  input
    .split("\n")
    .filter((l) => l !== "")
    .map(
      (line) =>
        line
          .match(
            /^(\w+): (\w+) (-?\d+), (\w+) (-?\d+), (\w+) (-?\d+), (\w+) (-?\d+), (\w+) (-?\d+)$/,
          )
          ?.slice(1) || [],
    )
    .forEach(
      ([, , capacity, , durability, , flavor, , texture, , calories], _) => {
        ingredients.push({
          capacity: Number(capacity),
          durability: Number(durability),
          flavor: Number(flavor),
          texture: Number(texture),
          calories: Number(calories),
        });
      },
    );

  const calcScore = (spoons: number[]) =>
    Object.keys(ingredients[0])
      .filter((k) => k !== "calories")
      .map((k) =>
        ingredients
          .map((i, n) => i[k as keyof Ingredient] * spoons[n])
          .reduce((acc, i) => acc + i, 0),
      )
      .reduce((acc, i) => {
        return acc * Math.max(0, i);
      }, 1);

  const calcCalories = (spoons: number[]) =>
    ingredients
      .map((i, j) => i.calories * spoons[j])
      .reduce((acc, i) => acc + i, 0);

  let part1 = 0;
  let part2 = 0;
  getCombinations(100, ingredients.length).forEach((s, _) => {
    const score = calcScore(s);
    const totalCalories = calcCalories(s);
    if (part1 < score) part1 = score;
    if (totalCalories === 500 && part2 < score) part2 = score;
  });
  return {
    part1,
    part2,
  };
};
