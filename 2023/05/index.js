const time = performance.now();

const dataset = await Bun.file("05.txt").text();

const maps = [];
const seeds = [];

[...dataset.split("\n\n")].forEach((block, b) => {
  if (b === 0) {
    seeds.push(
      ...block
        .replace(/seeds: /, "")
        .split(" ")
        .map((i) => Number(i))
    );
  } else {
    const bmap = [];
    [...block.split("\n")].forEach((line, l) => {
      if (l !== 0) {
        bmap.push(line.split(" ").map((i) => Number(i)));
      }
    });
    maps.push(bmap.sort((a, b) => a[1] > b[2]));
  }
});

const calc = (src) => {
  let dest = src;
  maps.forEach((map) => {
    let s = dest;
    map.forEach(([a, b, c]) => {
      if (s >= b && s < b + c) {
        dest = s - b + a;
        return;
      }
    });
  });
  return dest;
};

console.log(`Part one: ${Math.min(...seeds.map((s) => calc(s)))}`); // test => 35

let min = Infinity;
let cpt = 0;
for (let j = 0; j < seeds.length; j += 2) {
  for (let i = seeds[j]; i < seeds[j] + seeds[j + 1]; i++) {
    let res = calc(i);
    console.log(i, res, ++cpt);
    if (res < min) min = res;
  }
}
console.log(`Part two: ${min}`); // test => 46

console.log(`${performance.now() - time} ms`);
