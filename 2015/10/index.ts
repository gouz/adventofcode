const transform = (str: string) => {
	const splits = str.split("");
	let num = splits.shift();
	let cpt = 1;
	let result = "";
	while (splits.length) {
		const n = splits.shift();
		if (n === num) {
			cpt++;
		} else {
			result += `${cpt}${num}`;
			num = n;
			cpt = 1;
		}
	}
	return `${result}${cpt}${num}`;
};

let input = "1113222113";
for (let i = 0; i < 40; i++) input = transform(input);
console.log(`Part One: ${input.length}`);

input = "1113222113";
for (let i = 0; i < 50; i++) input = transform(input);
console.log(`Part Two: ${input.length}`);
