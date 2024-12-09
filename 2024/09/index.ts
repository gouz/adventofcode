import { loadInputFile } from "../../utils";

const input = (await loadInputFile("2024/09", "input")).split("");

let isBlank = false;
let cpt = 0;
const newString: (string | number)[] = [];

for (let i = 0; i < input.length; i++) {
	if (isBlank) {
		for (let j = 0; j < Number(input[i]); j++) {
			newString.push(".");
		}
		isBlank = false;
	} else {
		for (let j = 0; j < Number(input[i]); j++) {
			newString.push(cpt);
		}
		cpt++;
		isBlank = true;
	}
}

for (let i = 0; i < newString.length; i++) {
	if (newString[i] === ".") {
		let j = newString.length - 1;
		while (j > 0 && newString[j] === ".") {
			j--;
		}
		newString[i] = newString[j];
		newString[j] = ".";
	}
}
newString[newString.indexOf(".")] = newString[newString.length - 1];
newString[newString.length - 1] = ".";

let sum = 0;
for (let i = 0; i < newString.length; i++) {
	if (newString[i] !== ".") sum += Number(newString[i]) * i;
}
console.log(sum);
