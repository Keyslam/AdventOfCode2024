import { Day } from '../shared/day';
import { countBy } from 'lodash';

function parseInput(input: string): { leftList: number[]; rightList: number[] } {
	const locationIds = input
		.split(/(\s+)/)
		.filter((s) => s.trim().length > 0)
		.map((s) => Number.parseInt(s));

	const leftList = locationIds.filter((_, index) => index % 2 === 0);
	const rightList = locationIds.filter((_, index) => index % 2 === 1);

	return { leftList, rightList };
}

const day1: Day = {
	solve_first(input: string) {
		const { leftList, rightList } = parseInput(input);

		leftList.sort();
		rightList.sort();

		const deltas = leftList.map((leftValue, index) => {
			const rightValue = rightList[index];
			const delta = Math.abs(leftValue - rightValue);

			return delta;
		});

		const deltaSum = deltas.reduce((acc, value) => acc + value, 0);

		return deltaSum;
	},
	solve_second(input: string) {
		const { leftList, rightList } = parseInput(input);

		const rightCounts = countBy(rightList);

		const similarityScore = leftList //
			.map((value) => value * (rightCounts[value] ?? 0))
			.reduce((acc, value) => acc + value, 0);

		return similarityScore;
	},
};

export default day1;
