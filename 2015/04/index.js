const testPart1 = "abcdef";
const resultPart1 = "609043";
const inputPart1 = "bgvyzdsv";

const calcMinNum = (str, nbZero) => {
  const hasher = new Bun.CryptoHasher("md5");
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    hasher.update(`${str}${i}`);
    const res = hasher.digest("hex");
    if (res.startsWith("".padStart(nbZero, "0"))) {
      return i;
    }
  }
};

console.log(
  `Test Part One: ${Number(resultPart1) === calcMinNum(testPart1, 5)}`
);

console.log(`Part One: ${calcMinNum(inputPart1, 5)}`);
console.log(`Part Two: ${calcMinNum(inputPart1, 6)}`);
