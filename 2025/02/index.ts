const isInValid = (i: number): boolean => {
  const s = String(i);
  if (s.length % 2 === 1) return false;
  const a = s.substring(0, s.length / 2);
  const b = s.substring(s.length / 2);
  return a.localeCompare(b) === 0;
};

const isInValidPart2 = (i: number): boolean => {
  const s = String(i);
  for (let i = 1; i <= s.length / 2; i++) {
    const sub = s.substring(0, i);
    let totest = "";
    while (totest.length < s.length) totest += sub;
    if (totest.localeCompare(s) === 0) return true;
  }
  return false;
};

export const calc = (steps: string): { part1: number; part2: number } => {
  let part1 = 0;
  let part2 = 0;
  steps.split(",").forEach((test, _) => {
    const [start, end] = test.split("-").map((s) => Number(s));
    for (let i = start; i <= end; i++) {
      if (isInValid(i)) {
        part1 += i;
      }
      if (isInValidPart2(i)) {
        part2 += i;
      }
    }
  });
  return {
    part1,
    part2,
  };
};
