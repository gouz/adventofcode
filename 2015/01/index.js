const dataset = await Bun.file("input.txt").text();

console.log(
  `Part one: ${dataset.match(/\(/g).length - dataset.match(/\)/g).length}`
);

const walk = dataset.split("");

let floor = 0;
let i = 0;
while (floor !== -1) floor += dataset[i++] === "(" ? 1 : -1;

console.log(`Part two: ${i}`);
