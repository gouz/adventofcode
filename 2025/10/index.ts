const parseString = (str: string) => {
  const bracketMatch = str.match(/\[(.*?)\]/);
  const bracketContent = bracketMatch ? bracketMatch[1] : "";

  const parenthesesMatches = str.matchAll(/\(([^)]+)\)/g);
  const parenthesesList = Array.from(parenthesesMatches, (m) =>
    m[1].split(",").map(Number),
  );

  const braceMatch = str.match(/\{([^}]+)\}/);
  const braceContent = (braceMatch ? braceMatch[1] : "").split(",").map(Number);

  return {
    lamps: bracketContent,
    actions: parenthesesList,
    joltages: braceContent,
  };
};

const nbActions = (line: {
  lamps: string;
  actions: number[][];
  joltages: number[];
}) => {
  const lamps = "".padEnd(line.lamps.length, ".").split("");
  let nba = 0;
  line.actions.forEach((buttons) => {
    buttons.forEach((but) => {
      lamps[but] = lamps[but] === "#" ? "." : "#";
    });
    if (lamps.join("") !== line.lamps) nba++;
  });
  return nba;
};

export const calc = (input: string) => {
  const parsed = input
    .split("\n")
    .filter((l) => l !== "")
    .map(parseString)
    .map(nbActions);
  return {
    part1: parsed.reduce((acc, i) => acc + i, 0),
    part2: 0,
  };
};
