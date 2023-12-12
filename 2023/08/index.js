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

const getInstructionsAndMap = (text) => {
  const [path, _, ...tupples] = text.split("\n");
  const instructions = path.split("");
  const map = {};
  [...tupples].forEach((t) => {
    const [key, lr] = t.split(" = (");
    const [l, r] = lr.split(", ");
    map[key] = { L: l, R: r.substring(0, 3) };
  });
  return { instructions, map };
};

const pathLength = (txt, text) => {
  const { instructions, map } = getInstructionsAndMap(text);
  let cpt = 0;
  let iter = 0;
  while (!txt.endsWith("Z")) {
    if (iter === instructions.length) iter = 0;
    txt = map[txt][instructions[iter]];
    cpt++;
    iter++;
  }
  return cpt;
};

console.log(pathLength("AAA", test1) === 2);
console.log(pathLength("AAA", test2) === 6);
console.log(`Part One: ${pathLength("AAA", dataset)}`);

const test3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const pathLength2 = (text) => {
  const { instructions, map } = getInstructionsAndMap(text);
  let starts = [...Object.keys(map)].filter((m) => m.endsWith("A"));

  const scores = [];

  starts.forEach((s) => {
    let txt = s;
    let cpt = 0;
    let iter = 0;
    while (!txt.endsWith("Z")) {
      if (iter === instructions.length) iter = 0;
      txt = map[txt][instructions[iter]];
      cpt++;
      iter++;
    }
    scores.push(cpt);
  });

  const gcd = (a, b) => (a ? gcd(b % a, a) : b);

  const lcm = (a, b) => (a * b) / gcd(a, b);

  return scores.reduce(lcm);
};

console.log(pathLength2(test3) === 6);
console.log(`Part Two: ${pathLength2(dataset)}`);
