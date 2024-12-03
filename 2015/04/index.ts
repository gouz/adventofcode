const inputPart1 = "bgvyzdsv";

const calcMinNum = (str: string, nbZero: number) => {
	const hasher = new Bun.CryptoHasher("md5");
	for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
		hasher.update(`${str}${i}`);
		const res = hasher.digest("hex");
		if (res.startsWith("".padStart(nbZero, "0"))) {
			return i;
		}
	}
};

console.log(`Part One: ${calcMinNum(inputPart1, 5)}`);
console.log(`Part Two: ${calcMinNum(inputPart1, 6)}`);
