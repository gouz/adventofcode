export const calc = (input: string) => {
  const file = input.split("\n").filter((l) => l !== "");
  const last = file.pop();
  const opsIndexes: number[] = [];
  for (let i = 0; i < last!.length; i++)
    if (last![i] !== " ") opsIndexes.push(i);
  opsIndexes.shift();
  const ops: string[] = [];
  const nums: string[][] = [];
  let lastPos = 0;
  opsIndexes.forEach((pos, i) => {
    nums[i] = [];
    ops.push(last!.substring(pos, lastPos));
    file.forEach((l, _) => {
      nums[i].push(l.substring(pos, lastPos));
    });
    lastPos = pos;
  });
  nums.push([]);
  ops.push(last!.substring(lastPos));
  file.forEach((l, _) => {
    nums[nums.length - 1].push(l.substring(lastPos));
  });
  let part1 = 0;
  let part2 = 0;
  nums.forEach((row, i) => {
    part1 += Number(eval(row.join(ops[i])));
    const part2nums: string[] = [];
    for (let j = 0; j < Math.max(...row.map((r) => r.length)); j++) {
      part2nums.push(
        row
          .map((r) => r[j])
          .join("")
          .trim(),
      );
    }
    part2 += Number(eval(part2nums.filter((n) => n !== "").join(ops[i])));
  });
  return { part1, part2 };
};
