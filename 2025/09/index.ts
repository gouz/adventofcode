export const calc = (input: string) => {
  const pairs = input
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split(",").map(Number))
    .sort((a, b) => a[0] - b[0]);

  const rows: { [key: number]: number[] } = {};
  const cols: { [key: number]: number[] } = {};

  pairs.forEach(([col, row]) => {
    if (!rows[row]) rows[row] = [];
    rows[row].push(col);
    if (!cols[col]) cols[col] = [];
    cols[col].push(row);
    rows[row].sort((a, b) => a - b);
    cols[col].sort((a, b) => a - b);
  });

  console.log(rows);

  Object.entries(rows).forEach((row) => {
    const [num_row, [colMin, colMax]] = row;

    for (let c = colMin; c <= colMax; c++) {
      if (cols[c]) {
        cols[c] = [
          Math.min(cols[c][0], Number(num_row)),
          Math.max(cols[c][1], Number(num_row)),
        ];
      }
    }
  });

  Object.entries(cols).forEach((col) => {
    const [num_col, [rowMin, rowMax]] = col;
    for (let c = rowMin; c <= rowMax; c++) {
      if (rows[c]) {
        rows[c] = [
          Math.min(rows[c][0], Number(num_col)),
          Math.max(rows[c][1], Number(num_col)),
        ];
      }
    }
  });

  const areas: number[] = [];
  const constrainedAreas: number[] = [];

  const newArea = (a: number[], b: number[]) => {
    const c = [a[0], b[1]];
    const d = [b[0], a[1]];
    c[0] = Math.min(Math.max(c[0], rows[c[1]][0]), rows[c[1]][1]);
    c[1] = Math.min(Math.max(c[1], cols[c[0]][0]), cols[c[0]][1]);
    d[0] = Math.min(Math.max(d[0], rows[d[1]][0]), rows[d[1]][1]);
    d[1] = Math.min(Math.max(d[1], cols[d[0]][0]), cols[d[0]][1]);
    if (a[0] === c[0] && a[1] === d[1] && b[0] === d[0] && b[1] === c[1]) {
      return (Math.abs(a[1] - c[1]) + 1) * (Math.abs(b[0] - c[0]) + 1);
    }
    return 0;
  };

  for (let i = 0; i < pairs.length; i++) {
    for (let j = i + 1; j < pairs.length; j++) {
      const area =
        (Math.abs(pairs[i][0] - pairs[j][0]) + 1) *
        (Math.abs(pairs[i][1] - pairs[j][1]) + 1);
      areas.push(area);
      constrainedAreas.push(newArea(pairs[i], pairs[j]));
    }
  }

  return { part1: Math.max(...areas), part2: Math.max(...constrainedAreas) };
};
