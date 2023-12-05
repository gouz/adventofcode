const time = performance.now();

const dataset = await Bun.file("02.txt").text();

const max = {
  red: 12,
  green: 13,
  blue: 14,
};

let sum = 0;
let sum2 = 0;

[...dataset.split("\n")].forEach((line) => {
  const [gameID, runs] = line.split(":");
  let ok = true;
  const maxi = {
    red: 0,
    green: 0,
    blue: 0,
  };
  [...runs.split(";")].forEach((run) => {
    ["red", "green", "blue"].forEach((color) => {
      const nb = run.match(new RegExp(`(\\d+) ${color}`, "g"));
      if (nb) {
        const num = Number(nb[0].replace(` ${color}`, ""));
        if (num > max[color]) ok = false;
        if (num > maxi[color]) maxi[color] = num;
      }
    });
  });
  sum2 += maxi.red * maxi.green * maxi.blue;
  if (ok) {
    sum += Number(gameID.replace("Game ", ""));
  }
});

console.log(`Part one: ${sum}`);
console.log(`Part two: ${sum2}`);

console.log(`${performance.now() - time} ms`);
