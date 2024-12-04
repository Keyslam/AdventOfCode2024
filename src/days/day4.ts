import { createFlat2DIdentityArray, createIdentityArray } from '../shared/arrayUtils';
import { Day } from '../shared/day';

type Kernel = {
	dx: number;
	dy: number;
	character: string;
}[];

type WordSearch = {
	characters: string[][];
	width: number;
	height: number;
};

function parseInput(input: string): WordSearch {
	const characters = input //
		.split('\n')
		.map((line) => line.split(''));

	return {
		characters: characters,
		width: characters[0].length,
		height: characters.length,
	};
}

function getFirstKernels(): Kernel[] {
	return createFlat2DIdentityArray(3, 3)
		.map(({ x, y }) => ({ x: x - 1, y: y - 1 }))
		.filter(({ x, y }) => !(x == 0 && y == 0))
		.map(({ x, y }) => createIdentityArray(4).map((i) => ({ dx: i * x, dy: i * y, character: 'XMAS'[i] })));
}

function getSecondKernels(): Kernel[] {
	return createIdentityArray(4).map((i) => {
		const firstFlipped = i < 2;
		const secondFlipped = i % 2 == 0;

		const kernel: Kernel = [
			{ dx: 0, dy: 0, character: 'A' },
			{ dx: -1, dy: -1, character: firstFlipped ? 'M' : 'S' },
			{ dx: 1, dy: 1, character: firstFlipped ? 'S' : 'M' },
			{ dx: 1, dy: -1, character: secondFlipped ? 'M' : 'S' },
			{ dx: -1, dy: 1, character: secondFlipped ? 'S' : 'M' },
		];

		return kernel;
	});
}

function evaluateKernel(wordSearch: WordSearch, kernel: Kernel, x: number, y: number): boolean {
	return kernel.every((step) => {
		const searchX = x + step.dx;
		const searchY = y + step.dy;

		if (searchX < 0 || searchX >= wordSearch.width || searchY < 0 || searchY >= wordSearch.height) return false;

		return wordSearch.characters[searchY][searchX] === step.character;
	});
}

function evaluateKernels(wordSearch: WordSearch, kernels: Kernel[]): number {
	return createFlat2DIdentityArray(wordSearch.width, wordSearch.height)
		.map(({ x, y }) => kernels.filter((kernel) => evaluateKernel(wordSearch, kernel, x, y)).length)
		.reduce((acc, matchingKernels) => acc + matchingKernels, 0);
}

const day4: Day = {
	solve_first(input: string) {
		const wordSearch = parseInput(input);
		const kernels = getFirstKernels();

		return evaluateKernels(wordSearch, kernels);
	},
	solve_second(input: string) {
		const wordSearch = parseInput(input);
		const kernels = getSecondKernels();

		return evaluateKernels(wordSearch, kernels);
	},
};

export default day4;
