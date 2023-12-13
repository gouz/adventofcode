const test1 = `.....
.S-7.
.|.|.
.L-J.
.....`;

const test2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

const dataset = await Bun.file("input.txt").text();

const move = (map, { dir, x, y }) => {
  const char = map[y][x];
  switch (char) {
    case "|":
      if (dir === "N") return { x, y: y + 1, dir };
      return { x, y: y - 1, dir };
    case "-":
      if (dir === "W") return { x: x + 1, y, dir };
      return { x: x - 1, y, dir };
    case "L":
      if (dir === "N") return { x: x + 1, y, dir: "W" };
      return { x, y: y - 1, dir: "S" };
    case "J":
      if (dir === "W") return { x, y: y - 1, dir: "S" };
      return { x: x - 1, y, dir: "E" };
    case "7":
      if (dir === "W") return { x, y: y + 1, dir: "N" };
      return { x: x - 1, y, dir: "E" };
    case "F":
      if (dir === "S") return { x: x + 1, y, dir: "W" };
      return { x, y: y + 1, dir: "N" };
  }
};

const transformToMap = (text) =>
  [...text.split("\n")].map((line) => line.split(""));

const findS = (map) => {
  for (let y = 0; y < map.length; y++)
    for (let x = 0; x < map[y].length; x++)
      if (map[y][x] === "S") return { x, y };
  return null;
};

const findNext = (map, { x, y }) => {
  if (map[y][x + 1] === "-" || map[y][x + 1] === "J" || map[y][x + 1] === "7")
    return { x: x + 1, y, dir: "W" };
  if (map[y + 1][x] === "|" || map[y + 1][x] === "L" || map[y + 1][x] === "J")
    return { x, y: y + 1, dir: "N" };
  if (map[y][x - 1] === "-" || map[y][x - 1] === "L" || map[y][x - 1] === "F")
    return { x: x - 1, y, dir: "E" };
  if (map[y - 1][x] === "|" || map[y - 1][x] === "7" || map[y - 1][x] === "F")
    return { x, y: y - 1, dir: "S" };
};

const calcPathLength = (text) => {
  const map = transformToMap(text);
  const startPos = findS(map);
  let pos = findNext(map, startPos);
  //console.log({ startPos, pos });
  let walk = 1;
  do {
    pos = move(map, pos);
    //console.log(pos);
    walk++;
  } while (!(pos.x === startPos.x && pos.y === startPos.y));
  return walk;
};

const calcFarthest = (text) => Math.round(calcPathLength(text) / 2);

console.log(calcFarthest(test1) === 4);
console.log(calcFarthest(test2) === 8);
console.log(`Part One: ${calcFarthest(dataset)}`);
