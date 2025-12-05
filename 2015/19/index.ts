export const calc = (input: string) => {
  const lines = input.split("\n").filter((l) => l !== "");
  const transforms = lines
    .filter((l) => l.includes("=>"))
    .map((l) => l.split("=>").map((t) => t.trim()));
  const formula = lines.pop();
  const possibilities: string[] = [];
  transforms.forEach(([from, to], _) => {
    const regexp = new RegExp(from, "g");
    let matches: RegExpExecArray | null = null;
    while ((matches = regexp.exec(formula)) !== null) {
      possibilities.push(
        matches.input.substring(0, matches.index) +
          to +
          matches.input.substring(matches.index + from.length),
      );
    }
  });
  return { part1: new Set(possibilities).size, part2: 0 };
};
