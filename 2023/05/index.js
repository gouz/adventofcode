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
    maps.push(bmap);
  }
});

const calc = (src) => {
  let dest = src;
  maps.forEach((map) => {
    let s = dest;
    map.forEach(([a, b, c]) => {
      if (s >= b && s < b + c) {
        dest = s - b + a;
      }
    });
  });
  return dest;
};

console.log(`Part one: ${Math.min(...seeds.map((s) => calc(s)))}`); // test => 35

console.log(`${performance.now() - time} ms`);
