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

// tests.forEach((line) => {
//   console.log(line.input, isNaughty(line.input) === line.result);
// });

console.log(
  `Part One: ${
    [...dataset.split("\n")].filter((line) => !isNaughty(line)).length
  }`
);

const part2tests = [
  {
    str: "qjhvhtzxzqqjkmpb",
    res: true,
  },
  {
    str: "xxyxx",
    res: true,
  },
  {
    str: "uurcxstgmygtbstg",
    res: false,
  },
  {
    str: "ieodomkazucvgmuy",
    res: false,
  },
];

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const part2 = (str) => {
  const hasTwice = /([a-zA-Z]{2,}).*?\1/.test(str);
  if (hasTwice) {
    let found = false;
    alphabet.forEach((char) => {
      const haveMiddle = new RegExp(`${char}(\\w{1})${char}`, "g").test(str);
      if (haveMiddle) found = true;
    });
    return found;
  }
  return false;
};

// part2tests.forEach((test) =>
//   console.log(test.str, part2(test.str) === test.res)
// );

console.log(
  `Part Two: ${[...dataset.split("\n")].filter((line) => part2(line)).length}`
);
