const test = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const dataset = await Bun.file("input.txt").text();

const getLastNumber = (line) => {
  const numbers = line.split(" ").map((a) => Number(a));
  const suits = [];
  suits.push(numbers);
  const all0 = (arr) => [...arr].filter((a) => a === 0).length === arr.length;

  let diff;
  let prev = [...numbers];
  do {
    diff = [];
    for (let i = 1; i < prev.length; i++) {
      diff.push(prev[i] - prev[i - 1]);
    }
    prev = [...diff];
    suits.push(prev);
  } while (!all0(diff));

  // calc next number
  for (let j = suits.length - 2; j > 0; j--) {
    suits[j - 1].push(
      suits[j - 1][suits[j - 1].length - 1] + suits[j][suits[j].length - 1]
    );
  }
  return suits[0].pop();
};

const getPartOne = (text) => {
  let sum = 0;
  [...text.split("\n")].forEach((line) => {
    sum += getLastNumber(line);
  });
  return sum;
};

console.log(getPartOne(test) === 114);
console.log(`Part One: ${getPartOne(dataset)}`);

const getExtraNumber = (line) => {
  const numbers = line.split(" ").map((a) => Number(a));
  const suits = [];
  suits.push(numbers);
  const all0 = (arr) => [...arr].filter((a) => a === 0).length === arr.length;

  let diff;
  let prev = [...numbers];
  do {
    diff = [];
    for (let i = 1; i < prev.length; i++) {
      diff.push(prev[i] - prev[i - 1]);
    }
    prev = [...diff];
    suits.push(prev);
  } while (!all0(diff));

  // calc extra number
  for (let j = suits.length - 2; j >= 0; j--) {
    suits[j] = [suits[j][0] - suits[j + 1][0], ...suits[j]];
  }
  return suits[0].shift();
};

const getPartTwo = (text) => {
  let sum = 0;
  [...text.split("\n")].forEach((line) => {
    sum += getExtraNumber(line);
  });
  return sum;
};

console.log(getPartTwo("10 13 16 21 30 45"));
console.log(`Part Two: ${getPartTwo(dataset)}`);
