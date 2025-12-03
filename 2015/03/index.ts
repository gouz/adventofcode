export const calc = (input: string) => {
  let houses: { [key: number]: { [key: number]: number } } = {};

  const calcNbHouses = (path: string) => {
    let x = 0;
    let y = 0;
    let nbHouses = 1;
    path.split("").forEach((d, _) => {
      switch (d) {
        case "<":
          x -= 1;
          break;
        case ">":
          x += 1;
          break;
        case "^":
          y -= 1;
          break;
        case "v":
          y += 1;
          break;
        default:
          break;
      }
      if (!houses[x]) houses[x] = {};
      if (!houses[x][y]) {
        houses[x][y] = 1;
        nbHouses++;
      }
    });
    return nbHouses;
  };

  const calcWithRobot = (path: string) => {
    houses = { 0: { 0: 1 } };
    const santaPath = path
      .split("")
      .filter((_, i) => i % 2 === 0)
      .join("");
    const robotPath = path
      .split("")
      .filter((_, i) => i % 2 === 1)
      .join("");
    const nbHousesSanta = calcNbHouses(santaPath) - 1;
    const nbHousesRobot = calcNbHouses(robotPath) - 1;
    return nbHousesSanta + nbHousesRobot + 1;
  };

  houses = { 0: { 0: 1 } };

  return {
    part1: calcNbHouses(input),
    part2: calcWithRobot(input),
  };
};
