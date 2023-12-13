const test1 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

const test2 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const dataset = await Bun.file("input.txt").text();

const move = (map, { dir, x, y }) => {
  const char = map[y][x];
  map[y][x] = "X";
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

const path = (text) => {
  const map = transformToMap(text);
  const startPos = findS(map);
  map[startPos.y][startPos.x] = "X";
  let pos = findNext(map, startPos);
  let walk = 1;
  do {
    pos = move(map, pos);
    walk++;
  } while (!(pos.x === startPos.x && pos.y === startPos.y));
  return map.map((line) => line.join("").replace(/[^X]/g, ".")).join("\n");
};

console.log(path(test1));
