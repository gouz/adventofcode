const voyels = "aeiou".split("");
const excludes = ["ab", "cd", "pq", "xy"];

const tests = [
  {
    input: "ugknbfddgicrmopn",
    result: false,
  },
  { input: "aaa", result: false },
  { input: "jchzalrnumimnmhp", result: true },
  { input: "haegwjzuvuyypxyu", result: true },
  { input: "dvszwmarrgswjxmb", result: true },
];

const dataset = await Bun.file("input.txt").text();

const isNaughty = (line) => {
  let naughty = false;
  let nbVoyel = 0;
  if (!naughty) {
    voyels.forEach((e) => {
      nbVoyel += (line.match(new RegExp(e, "g")) || []).length;
    });
    if (nbVoyel < 3) naughty = true;
  }
  if (!naughty) {
    if (!(/([a-z])\1/g.exec(line) || []).length) naughty = true;
  }
  if (!naughty) {
    excludes.forEach((e) => {
      if (line.indexOf(e) !== -1) {
        naughty = true;
        return;
      }
    });
  }
  return naughty;
};

tests.forEach((line) => {
  console.log(line.input, isNaughty(line.input) === line.result);
});

console.log(
  `Part One: ${
    [...dataset.split("\n")].filter((line) => !isNaughty(line)).length
  }`
);
