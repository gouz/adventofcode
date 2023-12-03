const dataset = await Bun.file("01.txt").text();

const makeNum = (a, b) => 10 * Number(a) + Number(b);

const calc = (text) => {
  let calculus = 0;
  [...text.split("\n")].forEach((l) => {
    if (l.length === 1) calculus += makeNum(l, l);
    else {
      const nums = [...l.split("")];
      calculus += makeNum(nums.shift(), nums.pop());
    }
  });
  return calculus;
};

console.log(`Part One: ${calc(dataset.replace(/[a-zA-Z]+/g, ""))}`);

let parttwo = dataset;
Object.entries({
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
}).forEach(([k, v]) => {
  parttwo = parttwo.replace(new RegExp(k, "g"), v);
});

console.log(`Part Two: ${calc(parttwo.replace(/[a-zA-Z]+/g, ""))}`);
