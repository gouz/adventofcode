export const loadInputFile = async (date: string, file = "input") =>
	await Bun.file(`${process.cwd()}/${date}/${file}.txt`).text();
