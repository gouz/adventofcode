export const calc = (input: string) => {
  const names: { [key: string]: { [key: string]: number } } = {};

  input
    .split("\n")
    .map((line) =>
      line.match(
        /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)./,
      ),
    )
    .filter((l) => l !== null)
    .forEach(([_, giver, gainOrLose, amount, receiver], _o) => {
      names[giver] = names[giver] || {};
      names[giver][receiver] =
        Number(amount) * (gainOrLose === "lose" ? -1 : 1);
    });

  const permutations = (array: string[]): string[][] => {
    if (array.length === 1) return [array];
    return array
      .map((_, index, array) =>
        permutations(array.filter((city, i) => city !== array[index])).map(
          (permutation) => [array[index], ...permutation],
        ),
      )
      .reduce((a, b) => a.concat(b), []);
  };

  const sums = (names: { [key: string]: { [key: string]: number } }) =>
    permutations(Object.keys(names)).map((p) => {
      // copy first to last
      const table = [...p, p[0]];
      let sum = 0;
      for (let i = 0; i < table.length - 1; i++) {
        sum += names[table[i]][table[i + 1]] + names[table[i + 1]][table[i]];
      }
      return sum;
    });

  const part1 = Math.max(...[...new Set(sums(names))]);

  names.You = {};
  for (const name of Object.keys(names)) {
    if (name !== "You") {
      names[name].You = 0;
      names.You[name] = 0;
    }
  }

  const part2 = Math.max(...[...new Set(sums(names))]);

  return {
    part1,
    part2,
  };
};
