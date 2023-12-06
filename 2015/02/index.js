const dataset = await Bun.file("input.txt").text();
//const dataset = `2x3x4\n1x1x10`;

const surface = ([l, w, h]) => 2 * l * w + 2 * w * h + 2 * h * l;
const extras = ([l, w, h]) => Math.min(l * w, l * h, w * h);
const ribbon = ([l, w, h]) =>
  Math.min(2 * (l + w), 2 * (l + h), 2 * (w + h)) + l * w * h;

const calc = (spl) => surface(spl) + extras(spl);

let sum = 0;
let sumRibbon = 0;
[...dataset.split("\n")].forEach((line) => {
  const spl = line.split("x").map((n) => Number(n));
  sum += calc(spl);
  sumRibbon += ribbon(spl);
});

console.log(`Part one: ${sum}`);
console.log(`Part two: ${sumRibbon}`);
