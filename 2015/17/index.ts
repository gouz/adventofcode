const getAllCombinations = (arr: number[]): number[][] => {
  const result: number[][] = [[]];
  for (const element of arr) {
    const length = result.length;
    for (let i = 0; i < length; i++) {
      result.push([...result[i], element]);
    }
  }
  return result;
};

export const calc = (input: string) => {
  const containers = input
    .split("\n")
    .filter((n) => n !== "")
    .map(Number);
  const full = 150;
  const combis = getAllCombinations(containers).filter(
    (tab) => tab.reduce((acc, i) => acc + i, 0) === full,
  );
  const nbs = combis.map((n) => n.length);
  const mini = Math.min(...nbs);
  return {
    part1: combis.length,
    part2: nbs.filter((n) => n === mini).length,
  };
};
