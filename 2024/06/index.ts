export const calc = (input: string): { part1: number; part2: number } => {
  let map = input.split("\n").map((line) => line.split(""));
  const originalMap = JSON.parse(JSON.stringify(map));

  // search start pos
  let row = -1;
  let col = -1;

  const maxRow = map.length;
  const maxCol = map[0].length;

  const findStart = () => {
    for (let y = 0; y < maxRow; y++) {
      for (let x = 0; x < maxCol; x++) {
        if (map[y][x] === "^") {
          row = y;
          col = x;
          return;
        }
      }
    }
  };
  const next = () => {
    switch (char) {
      case "^":
        return [row - 1, col];
      case ">":
        return [row, col + 1];
      case "v":
        return [row + 1, col];
      case "<":
        return [row, col - 1];
    }
    return [-1, -1];
  };

  const move = () => {
    const [y, x] = next();
    map[row][col] = "X";
    if (0 <= y && y < maxRow && 0 <= x && x < maxCol) {
      if (map[y][x] === "#" || map[y][x] === "O") {
        switch (char) {
          case "^":
            row = y + 1;
            col = x;
            char = ">";
            break;
          case ">":
            row = y;
            col = x - 1;
            char = "v";
            break;
          case "v":
            row = y - 1;
            col = x;
            char = "<";
            break;
          case "<":
            row = y;
            col = x + 1;
            char = "^";
        }
      } else {
        row = y;
        col = x;
      }
    } else {
      out = true;
    }
  };

  let char = "^";
  findStart();

  let out = false;
  while (!out) {
    move();
  }

  const part1 = map.reduce(
    (acc, row) => acc + row.filter((c) => c === "X").length,
    0,
  );

  let part2 = 0;

  for (let y = 0; y < maxRow; y++) {
    for (let x = 0; x < maxCol; x++) {
      map = JSON.parse(JSON.stringify(originalMap));
      map[y][x] = "X";
      if (map[y][x] !== "#") {
        map[y][x] = "O";
        char = "^";
        findStart();
        out = false;
        let timeout = false;
        const startTime = performance.now();
        while (!out && !timeout) {
          move();
          if (performance.now() - startTime > 15) {
            timeout = true;
          }
        }
        if (timeout) {
          part2++;
        }
      }
    }
  }

  return { part1, part2 };
};
