const isAccessible = (matrix: string[][], x: number, y: number): boolean => {
  if (matrix[y][x] !== ".") {
    let sum = 0;
    sum += (matrix[y - 1]?.[x - 1] ?? ".") !== "." ? 1 : 0;
    sum += (matrix[y - 1]?.[x] ?? ".") !== "." ? 1 : 0;
    sum += (matrix[y - 1]?.[x + 1] ?? ".") !== "." ? 1 : 0;
    sum += (matrix[y]?.[x - 1] ?? ".") !== "." ? 1 : 0;
    sum += (matrix[y]?.[x + 1] ?? ".") !== "." ? 1 : 0;
    sum += (matrix[y + 1]?.[x - 1] ?? ".") !== "." ? 1 : 0;
    sum += (matrix[y + 1]?.[x] ?? ".") !== "." ? 1 : 0;
    sum += (matrix[y + 1]?.[x + 1] ?? ".") !== "." ? 1 : 0;
    if (sum < 4) {
      matrix[y][x] = "x";
      return true;
    }
  }
  return false;
};

const matrixCopy = (m: string[][]): string[][] => {
  const matrix: string[][] = [];
  for (let y = 0; y < m.length; y++) {
    matrix[y] = [];
    for (let x = 0; x < m[y].length; x++) {
      matrix[y][x] = m[y][x];
    }
  }
  return matrix;
};

const matrixClean = (m: string[][]) => {
  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (m[y][x] === "x") {
        m[y][x] = ".";
      }
    }
  }
};

export const calc = (input: string) => {
  const matrix = input
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split(""));
  const matrix2 = matrixCopy(matrix);
  let part1 = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (isAccessible(matrix, x, y)) {
        part1 += 1;
      }
    }
  }
  let part2 = 0;
  let stop = false;
  while (!stop) {
    let _part1 = 0;
    for (let y = 0; y < matrix2.length; y++) {
      for (let x = 0; x < matrix2[y].length; x++) {
        if (isAccessible(matrix2, x, y)) {
          _part1 += 1;
        }
      }
    }
    part2 += _part1;
    matrixClean(matrix2);
    stop = _part1 === 0;
  }
  return { part1, part2 };
};
