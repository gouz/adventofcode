const time = performance.now();

const dataset = await Bun.file("04.txt").text();

const getCards = (game) => game.split(" ").filter((c) => c);

let sum = 0;

const copies = [];
const addCopy = (l) => {
  if (copies[l]) copies[l] += 1;
  else copies[l] = 1;
};

[...dataset.split("\n")].forEach((line, l) => {
  const [elf, me] = line
    .replace(/^Card (\d+): /, "")
    .split(" | ")
    .map((g) => getCards(g));
  const matches = elf.filter((c) => me.includes(c));
  addCopy(l);
  if (matches.length) {
    for (let c = 0; c < copies[l]; c++)
      for (let i = 0; i < matches.length; ++i) addCopy(l + i + 1);
    sum += Math.pow(2, matches.length - 1);
  }
});

console.log(`Part one: ${sum}`); // test => 13
console.log(`Part two: ${copies.reduce((a, b) => a + b)}`); // test => 30

console.log(`${performance.now() - time} ms`);
