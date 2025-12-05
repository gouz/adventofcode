export const calc = (input: string) => {
  // const lines = input.split("\n").filter((l) => l !== "");
  // const transforms = lines
  //   .filter((l) => l.includes("=>"))
  //   .map((l) => l.split("=>").map((t) => t.trim()));
  // const formula = lines.pop();
  const transforms = [
    ["H", "HO"],
    ["H", "OH"],
    ["O", "HH"],
  ];
  const formula = "HOH";
  const possibilities = new Set();
  transforms.forEach(([from, to], _) => {
    const occurences = (formula.match(new RegExp(from, "g")) || []).length;
    for (let i = 0; i < occurences; i++) {
      possibilities.add(formula?.replace(from, to));
    }
  });
  console.log(possibilities);
  return { part1: possibilities.size, part2: 0 };
};
