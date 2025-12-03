export const calc = (input: string) => {
  const check: { [key: string]: number } = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  };

  const compare = (type: string, a: number, b: number) => {
    if (type === "cats" || type === "trees") {
      return a < b;
    } else if (type === "pomeranians" || type === "goldfish") {
      return a > b;
    } else {
      return a === b;
    }
  };

  let part1 = 0;
  let part2 = 0;
  input
    .split("\n")
    .filter((l) => l !== "")
    .map(
      (line) =>
        line
          .match(/^Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)$/)
          ?.slice(1) || [],
    )
    .forEach(([num, n1, v1, n2, v2, n3, v3], _) => {
      if (
        check[n1] === Number(v1) &&
        check[n2] === Number(v2) &&
        check[n3] === Number(v3)
      )
        part1 = Number(num);
      if (
        compare(n1, check[n1], Number(v1)) &&
        compare(n2, check[n2], Number(v2)) &&
        compare(n3, check[n3], Number(v3))
      )
        part2 = Number(num);
    });

  return {
    part1,
    part2,
  };
};
