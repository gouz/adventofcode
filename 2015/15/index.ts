type Ingredient = {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
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

  const nbSpoonMaxPerIngredient = 100 / ingredients.length;

  const calcScore = (spoon: number) => {
    const capacity = ingredients
      .map((i) => i.capacity)
      .reduce((i, acc) => acc + i * spoon, 0);
    return 0;
  };

  let maxScore = 0;
  for (let i = 0; i <= nbSpoonMaxPerIngredient; i++) {
    const score = calcScore(i);
    if (maxScore < score) maxScore = score;
  }

  return {
    part1: maxScore,
  };
};
