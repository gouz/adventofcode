const calcMinNum = (str: string, nbZero: number) => {
  const input = str.split("\n").shift();
  const hasher = new Bun.CryptoHasher("md5");
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    hasher.update(`${input}${i}`);
    const res = hasher.digest("hex");
    if (res.startsWith("".padStart(nbZero, "0"))) {
      return i;
    }
  }
};

export const calc = (input: string) => ({
  part1: calcMinNum(input, 5),
  part2: calcMinNum(input, 6),
});
