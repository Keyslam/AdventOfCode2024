import { promises as fs } from 'fs';
import path from 'path';

const cacheDir = path.resolve('./aoc-cache');

export default async function getInput(dayIndex: string): Promise<string> {
	await fs.mkdir(cacheDir, { recursive: true });

	const cacheFile = path.join(cacheDir, `day-${dayIndex}.txt`);

	try {
		const cachedInput = await fs.readFile(cacheFile, 'utf8');
		console.log('Cache');
		return cachedInput;
	} catch (err) {
		if (err.code !== 'ENOENT') {
			throw new Error(`Error reading cache file: '${err.message}'`);
		}
	}

	const response = await fetch(`https://adventofcode.com/2024/day/${dayIndex}/input`, {
		method: 'GET',
		headers: {
			Cookie: `session=${process.env.AOC_KEY}`,
		},
	});

	if (response.status !== 200) {
		throw new Error(`Error getting input: '${response.statusText}'`);
	}

	const input = await response.text();
	console.log('Network');

	try {
		await fs.writeFile(cacheFile, input, 'utf8');
	} catch (err) {
		throw new Error(`Error writing to cache file: '${err.message}'`);
	}

	return input;
}
