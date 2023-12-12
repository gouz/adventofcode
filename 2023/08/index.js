const test1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const test2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const dataset = await Bun.file("input.txt").text();

const pathLength = (text) => {
  const [path, _, ...tupples] = text.split("\n");
  const instructions = path.split("");
  const leftrights = {};
  [...tupples].forEach((t) => {
    const [key, lr] = t.split(" = (");
    const [l, r] = lr.split(", ");
    leftrights[key] = { L: l, R: r.substring(0, 3) };
  });

  let cpt = 0;
  let iter = 0;
  let txt = "AAA";
  while (txt !== "ZZZ") {
    if (iter === instructions.length) iter = 0;
    txt = leftrights[txt][instructions[iter]];
    cpt++;
    iter++;
  }
  return cpt;
};

console.log(pathLength(test1) === 2);
console.log(pathLength(test2) === 6);
console.log(`Part One: ${pathLength(dataset)}`);
