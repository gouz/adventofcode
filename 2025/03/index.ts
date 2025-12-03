const getLargestSubstringCombination = (
  str: string,
  length: number,
): number => {
  const result: string[] = [];
  let startIndex = 0;

  for (let i = 0; i < length; i++) {
    const remaining = length - i - 1;
    const maxSearchIndex = str.length - remaining - 1;
    let maxChar = str[startIndex];
    let maxIndex = startIndex;

    for (let j = startIndex; j <= maxSearchIndex; j++) {
      if (str[j] > maxChar) {
        maxChar = str[j];
        maxIndex = j;
      }
    }

    result.push(maxChar);
    startIndex = maxIndex + 1;
  }

  return Number(result.join(""));
};

const joltage = (input: string, numBatteries = 2) => {
  return input
    .split("\n")
    .filter((n) => n !== "")
    .map((line) => getLargestSubstringCombination(line, numBatteries))
    .reduce((acc, curr) => acc + curr, 0);
};

export const calc = (input: string) => {
  return {
    part1: joltage(input, 2),
    part2: joltage(input, 12),
  };
};
