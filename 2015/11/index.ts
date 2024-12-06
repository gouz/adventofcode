const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const base26 = "0123456789abcdefghijlkmnop".split("");
const notAllowed = ["i", "o", "l"];
const rule1: string[] = [];
for (let i = 0; i < alphabet.length - 2; i++) {
	if (
		notAllowed.includes(alphabet[i]) ||
		notAllowed.includes(alphabet[i + 1]) ||
		notAllowed.includes(alphabet[i + 2])
	)
		continue;
	rule1.push(alphabet[i] + alphabet[i + 1] + alphabet[i + 2]);
}

const rule3: string[] = [];
for (let i = 0; i < alphabet.length; i++) {
	if (
		notAllowed.includes(alphabet[i]) ||
		notAllowed.includes(alphabet[i + 1]) ||
		notAllowed.includes(alphabet[i + 2])
	)
		continue;
	rule3.push(alphabet[i] + alphabet[i]);
}

const convTextToBase26 = (text: string) =>
	text
		.split("")
		.map((c) => base26[alphabet.indexOf(c)])
		.join("");

const convBase26ToText = (base26Text: string) =>
	base26Text
		.split("")
		.map((c) => alphabet[base26.indexOf(c)])
		.join("");

const isCorrect = (password: string) =>
	rule1.some((r) => password.includes(r)) &&
	rule3.filter((r) => password.includes(r)).length >= 2;

const nextPassword = (password: string): string => {
	let num = Number.parseInt(convTextToBase26(password), 26);
	do {
		num++;
	} while (!isCorrect(convBase26ToText(num.toString(26))));
	return convBase26ToText(num.toString(26));
};

const password = "cqjxjnds";
console.log(nextPassword(password));
console.log(nextPassword(nextPassword(password)));
