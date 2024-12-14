import { Day } from '../shared/day';

type Problem = {
	sum: number;
	components: number[];
};

function numberOfDigits(n: number): number {
	return Math.floor(Math.log10(n)) + 1;
}

function isSolveable(current: number, goal: number, components: number[], doConcat: boolean): boolean {
	if (current > goal) {
		return false;
	}

	if (components.length === 0) {
		return current === goal;
	}

	const sum = current + components[0];
	const mult = current * components[0];
	const concat = current * Math.pow(10, numberOfDigits(components[0])) + components[0];

	const restComponents = components.slice(1);

	return (
		isSolveable(sum, goal, restComponents, doConcat) ||
		isSolveable(mult, goal, restComponents, doConcat) ||
		(doConcat ? isSolveable(concat, goal, restComponents, doConcat) : false)
	);
}

function parseInput(input: string): Problem[] {
	return input //
		.split('\n')
		.map((line) => {
			const matches = line.match(/\d+/g);
			return {
				sum: Number.parseInt(matches[0]),
				components: matches.slice(1).map((v) => Number.parseInt(v)),
			};
		});
}

const day7: Day = {
	solve_first(input: string): number {
		return parseInput(input) //
			.filter((problem) => isSolveable(0, problem.sum, problem.components, false))
			.reduce((acc, problem) => acc + problem.sum, 0);
	},
	solve_second(input: string): number {
		return parseInput(input) //
			.filter((problem) => isSolveable(0, problem.sum, problem.components, true))
			.reduce((acc, problem) => acc + problem.sum, 0);
	},
};

export default day7;
