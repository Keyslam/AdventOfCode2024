import { Day } from '../shared/day';

function parseInput(input: string): number[] {
	return input //
		.split(' ')
		.map((v) => Number.parseInt(v));
}

function hasEvenAmountOfDigits(value: number): boolean {
	if (value === 0) return false;
	return Math.floor(Math.log10(value)) % 2 === 1;
}

function split(value: number): [number, number] {
	const numberOfDigits = Math.floor(Math.log10(value)) + 1;
	const middleIndex = Math.ceil(numberOfDigits / 2);
	const divisor = 10 ** (numberOfDigits - middleIndex);

	const left = Math.floor(value / divisor);
	const right = value % divisor;

	return [left, right];
}

function hash(a: number, b: number): number {
	return 0.5 * (a + b) * (a + b + 1) + b;
}

function amountOfStones(currentValue: number, n: number, memo: Record<string, number>): number {
	if (currentValue === 0) {
		return blink(1, n - 1, memo);
	}

	if (hasEvenAmountOfDigits(currentValue)) {
		const [left, right] = split(currentValue);
		return blink(left, n - 1, memo) + blink(right, n - 1, memo);
	}

	return blink(currentValue * 2024, n - 1, memo);
}

function blink(currentValue: number, n: number, memo: Record<string, number>): number {
	if (n == 0) return 1;

	const key = hash(currentValue, n);
	if (!(key in memo)) {
		memo[key] = amountOfStones(currentValue, n, memo);
	}

	return memo[key];
}

const day11: Day = {
	solve_first(input: string): number {
		return parseInput(input)
			.map((value) => blink(value, 25, {}))
			.reduce((acc, sum) => acc + sum, 0);
	},
	solve_second(input: string): number {
		return parseInput(input)
			.map((value) => blink(value, 75, {}))
			.reduce((acc, sum) => acc + sum, 0);
	},
};

export default day11;
