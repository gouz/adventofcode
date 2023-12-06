const dataset = await Bun.file("input.txt").text();

const [time, distance] = dataset
  .split("\n")
  .map((line) => line.match(/(\d+)/g));

let part1 = 1;
[...time].forEach((t, i) => {
  let win = 0;
  for (let j = 1; j <= t; j++) {
    let boatD = (t - j) * j;
    if (boatD > distance[i]) {
      win++;
    }
  }
  if (win !== 0) {
    part1 = win * part1;
  }
});

console.log(`Part one: ${part1}`);

let newTime = time.join("");
let newDistance = distance.join("");

let part2 = 1;
let win = 0;
for (let j = 1; j <= newTime; j++) {
  let boatD = (newTime - j) * j;
  if (boatD > newDistance) {
    win++;
  }
}
if (win !== 0) {
  part2 = win * part2;
}

console.log(`Part two: ${part2}`);
