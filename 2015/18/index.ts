const switchLight = (matrix: string[][], x: number, y: number): string => {
  let sum = 0;
  sum += (matrix[y - 1]?.[x - 1] ?? ".") === "#" ? 1 : 0;
  sum += (matrix[y - 1]?.[x] ?? ".") === "#" ? 1 : 0;
  sum += (matrix[y - 1]?.[x + 1] ?? ".") === "#" ? 1 : 0;
  sum += (matrix[y]?.[x - 1] ?? ".") === "#" ? 1 : 0;
  sum += (matrix[y]?.[x + 1] ?? ".") === "#" ? 1 : 0;
  sum += (matrix[y + 1]?.[x - 1] ?? ".") === "#" ? 1 : 0;
  sum += (matrix[y + 1]?.[x] ?? ".") === "#" ? 1 : 0;
  sum += (matrix[y + 1]?.[x + 1] ?? ".") === "#" ? 1 : 0;
  if (matrix[y][x] === "#" && sum !== 2 && sum !== 3) return ".";
  if (matrix[y][x] === "." && sum === 3) return "#";
  return matrix[y][x];
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

export const calc = (input: string) => {
  let matrix = input
    .split("\n")
    .filter((n) => n !== "")
    .map((l) => l.split(""));
  let matrix2 = matrixCopy(matrix);
  matrix2[0][0] = "#";
  matrix2[0][matrix2[0].length - 1] = "#";
  matrix2[matrix2.length - 1][0] = "#";
  matrix2[matrix2.length - 1][matrix2[0].length - 1] = "#";

  for (let n = 0; n < 100; n++) {
    const m = matrixCopy(matrix);
    const m2 = matrixCopy(matrix2);
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        m[y][x] = switchLight(matrix, x, y);
        m2[y][x] = switchLight(matrix2, x, y);
      }
    }
    matrix = matrixCopy(m);
    matrix2 = matrixCopy(m2);
    matrix2[0][0] = "#";
    matrix2[0][matrix2[0].length - 1] = "#";
    matrix2[matrix2.length - 1][0] = "#";
    matrix2[matrix2.length - 1][matrix2[0].length - 1] = "#";
  }
  return {
    part1: matrix
      .map((n) => n.filter((o) => o === "#").length)
      .reduce((acc, i) => acc + i, 0),
    part2: matrix2
      .map((n) => n.filter((o) => o === "#").length)
      .reduce((acc, i) => acc + i, 0),
  };
};
