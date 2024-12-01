export default async function getInput(dayIndex: string): Promise<string> {
	const response = await fetch(`https://adventofcode.com/2024/day/${dayIndex}/input`, {
		method: 'GET',
		headers: {
			Cookie: `session=${process.env.AOC_KEY}`,
		},
	});

	if (response.status !== 200) {
		throw new Error(`Error getting input: '${response.statusText}'`);
	}

	return await response.text();
}
