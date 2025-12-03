const transform = (str: string) => {
  const splits = str.split("");
  let num = splits.shift();
  let cpt = 1;
  let result = "";
  while (splits.length) {
    const n = splits.shift();
    if (n === num) {
      cpt++;
    } else {
      result += `${cpt}${num}`;
      num = n;
      cpt = 1;
    }
  }
  return `${result}${cpt}${num}`;
};

export const calc = (input: string) => {
  const dataset = input.split("\n").shift();
  let part1 = dataset ?? "";
  for (let i = 0; i < 40; i++) part1 = transform(part1);
  let part2 = dataset ?? "";
  for (let i = 0; i < 50; i++) part2 = transform(part2);
  return {
    part1: part1.length,
    part2: part2.length,
  };
};
