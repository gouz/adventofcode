const time = performance.now();

const dataset = await Bun.file("03.txt").text();

const map = [];
const regexNum = /(\d+)/g;
const regexSpecials = /([^\d.]+)/g;

let sum = 0;
let sum2 = 0;

[...dataset.split("\n")].forEach((line) => {
  const lineMap = [];
  // fetch numbers
  let matchNum;
  while ((matchNum = regexNum.exec(line)) !== null) {
    if (matchNum.index === regexNum.lastIndex) {
      regexNum.lastIndex++;
    }
    const pos = Number(matchNum.index);
    lineMap.push({
      val: Number(matchNum[0]),
      start: pos - 1,
      end: pos + matchNum[0].length,
      burn: false,
    });
  }
  map.push(lineMap);
});
[...dataset.split("\n")].forEach((line, l) => {
  // fetch special chars
  let matchSpecial;
  while ((matchSpecial = regexSpecials.exec(line)) !== null) {
    if (matchSpecial.index === regexSpecials.lastIndex) {
      regexSpecials.lastIndex++;
    }
    // check if a previous num is adjacent
    const posSpe = Number(matchSpecial.index);
    const isGear = matchSpecial[0] === "*";
    const mapGear = [];
    map[l - 1]?.forEach((num) => {
      if (num.start <= posSpe && posSpe <= num.end) {
        if (!num.burn) sum += num.val;
        if (isGear) mapGear.push(num.val);
        num.burn = true;
      }
    });
    map[l].forEach((num) => {
      if (num.start === posSpe || posSpe === num.end) {
        if (!num.burn) sum += num.val;
        if (isGear) mapGear.push(num.val);
        num.burn = true;
      }
    });
    map[l + 1]?.forEach((num) => {
      if (num.start <= posSpe && posSpe <= num.end) {
        if (!num.burn) sum += num.val;
        if (isGear) mapGear.push(num.val);
        num.burn = true;
      }
    });
    if (mapGear.length === 2) {
      sum2 += mapGear.reduce((a, b) => a * b);
    }
  }
});

console.log(`Part one: ${sum}`); // test => 4361
console.log(`Part two: ${sum2}`); // test => 467835

console.log(`${performance.now() - time} ms`);
