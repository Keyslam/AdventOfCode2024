import { Day } from '../shared/day';

type Operation = {
	index: number;
	leftSide: number;
	rightSide: number;
};

function parseInput(input: string): Operation[] {
	const regex = /mul\((\d+),(\d+)\)/g;

	const operations = [...input.matchAll(regex)].map((match) => ({
		index: match.index,
		leftSide: Number.parseInt(match[1]),
		rightSide: Number.parseInt(match[2]),
	}));

	return operations;
}

function isEnabled(input: string): boolean {
	const disabledIndex = input.lastIndexOf(`don't()`);
	const enabledIndex = input.lastIndexOf(`do()`);

	return enabledIndex > disabledIndex || disabledIndex == -1;
}

const day3: Day = {
	solve_first(input: string) {
		return parseInput(input)
			.map((operation) => operation.leftSide * operation.rightSide)
			.reduce((acc, value) => acc + value, 0);
	},
	solve_second(input: string) {
		return parseInput(input)
			.filter((operation) => {
				const inputToThisPoint = input.substring(0, operation.index);
				return isEnabled(inputToThisPoint);
			})
			.map((operation) => operation.leftSide * operation.rightSide)
			.reduce((acc, value) => acc + value, 0);
	},
};

export default day3;
