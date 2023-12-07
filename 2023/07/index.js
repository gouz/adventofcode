const dataset = await Bun.file("test.txt").text();

const values = "23456789TJQKA".split("");

const calculated = [];
[...dataset.split("\n")].forEach((line) => {
  const [cards, bid] = line.split(" ");

  const occ = new Array(7).fill(0);

  values.forEach((c, i) => {
    const occurences = (cards.match(new RegExp(c, "g")) ?? []).length;
    if (occurences) {
      switch (occurences) {
        case 1:
          occ[0] = i + 1;
          break;
        case 2:
          if (occ[1]) occ[2] = occ[1];
          occ[1] = i + 1;
          break;
        case 3:
          if (occ[1]) occ[4] = occ[3];
          occ[3] = i + 1;
          break;
        case 4:
          occ[5] = i + 1;
          break;
        case 5:
          occ[6] = i + 1;
          break;
      }
    }
  });
  const sum =
    occ[0] +
    (occ[2]
      ? (occ[2] + occ[1]) * Math.pow(values.length, 2)
      : occ[1] * Math.pow(values.length, 1)) +
    (occ[4]
      ? (occ[4] + occ[3]) * Math.pow(values.length, 4)
      : occ[3] * Math.pow(values.length, 3)) +
    occ[5] * Math.pow(values.length, 5) +
    occ[6] * Math.pow(values.length, 6);
  calculated.push({
    cards,
    bid,
    sum: ("" + sum).toString(values.length).padStart(7, "0"),
  });
});

let sum1 = 0;
calculated
  .sort((a, b) => Number(a.sum) > Number(b.sum))
  .forEach((m, i) => {
    sum1 += Number(m.bid) * (i + 1);
  });

console.log(calculated);

console.log(`Part one: ${sum1}`);
