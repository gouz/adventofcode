const dataset = await Bun.file("input.txt").text();

const [time, distance] = dataset
  .split("\n")
  .map((line) => line.match(/(\d+)/g).map((n) => Number(n)));

const calc = (t, d) => {
  // thx @rakiz : ax2 + bx + c = 0
  // distance < (race_time - x) * x  =>  distance < race_time*x - x*x
  // =>   x² - race_time*x + distance < 0  (ax²+bx+c=0)
  const a = 1;
  const b = -t;
  const c = d;
  const epsi = 0.00000001;
  const delta = Math.sqrt(b * b - 4 * a * c);
  const sol1 = Math.ceil((-b - delta) / 2 + epsi);
  const sol2 = Math.floor((-b + delta) / 2 - epsi);
  return sol2 - sol1 + 1;
};

let part1 = 1;
[...time].forEach((t, i) => {
  part1 *= calc(t, distance[i]);
});

console.log(`Part one: ${part1}`);

let newTime = time.join("");
let newDistance = distance.join("");

console.log(`Part two: ${calc(newTime, newDistance)}`);
