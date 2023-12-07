const tests = [">", "^>v<", "^v^v^v^v^v"];
const testsResults = [2, 4, 2];
const testsPart2 = ["^v", "^>v<", "^v^v^v^v^v", "^<<^"];
const testsResultsPart2 = [3, 3, 11, 4];

const dataset = await Bun.file("input.txt").text();

let houses;

const calcNbHouses = (path) => {
  let x = 0;
  let y = 0;
  let nbHouses = 1;
  path.split("").forEach((d) => {
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

tests.forEach((test, i) => {
  houses = { 0: { 0: 1 } };
  const nbHouses = calcNbHouses(test);
  console.log(test, testsResults[i] === nbHouses);
});

houses = { 0: { 0: 1 } };
console.log(`Part one: ${calcNbHouses(dataset)}`);

const calcWithRobot = (path) => {
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

testsPart2.forEach((test, i) => {
  houses = { 0: { 0: 1 } };

  console.log(test, testsResultsPart2[i] === calcWithRobot(test));
});

houses = { 0: { 0: 1 } };
console.log(`Part two: ${calcWithRobot(dataset)}`);
