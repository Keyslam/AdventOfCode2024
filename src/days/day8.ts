import { pairs } from '../shared/arrayUtils';
import { Day } from '../shared/day';
import { groupBy } from 'lodash';
import { hash } from '../shared/hash';

type Position = { x: number; y: number };
type Frequency = Position[];

function parseInput(input: string): { frequencies: Frequency[]; width: number; height: number } {
	const frequencies = Object.values(
		groupBy(
			input //
				.split('\n')
				.map((line, y) => {
					return line //
						.split('')
						.map((char, x) => ({ char, x, y }))
						.filter((v) => v.char !== '.');
				})
				.flat(),
			(v) => v.char,
		),
	).map((v) => v.map((v2) => ({ x: v2.x, y: v2.y })));

	const width = input.split('\n')[0].length;
	const height = input.split('\n').length;

	return { frequencies, width, height };
}

function antiNodePositions(frequency: Frequency, width: number, height: number): Position[] {
	return pairs(frequency)
		.map((v) => {
			const dx = v[0].x - v[1].x;
			const dy = v[0].y - v[1].y;

			return [
				{ x: v[0].x + dx, y: v[0].y + dy },
				{ x: v[1].x - dx, y: v[1].y - dy },
			];
		})
		.flat()
		.filter((v) => {
			return v.x >= 0 && v.y >= 0 && v.x < width && v.y < height;
		});
}

function antiNodePositionsWithResonance(frequency: Frequency, width: number, height: number): Position[] {
	return pairs(frequency)
		.map((v) => {
			const dx = v[0].x - v[1].x;
			const dy = v[0].y - v[1].y;

			const positions = [];
			for (let i = 0; i < 50; i++) {
				positions.push({ x: v[0].x + dx * i, y: v[0].y + dy * i });
				positions.push({ x: v[0].x - dx * i, y: v[0].y - dy * i });
			}

			return positions;
		})
		.flat()
		.filter((v) => {
			return v.x >= 0 && v.y >= 0 && v.x < width && v.y < height;
		});
}

const day8: Day = {
	solve_first(input: string): number {
		const { frequencies, width, height } = parseInput(input);
		return new Set(
			frequencies
				.map((frequency) => antiNodePositions(frequency, width, height))
				.flat()
				.map((p) => hash(p.x, p.y)),
		).size;
	},
	solve_second(input: string): number {
		const { frequencies, width, height } = parseInput(input);
		return new Set(
			frequencies
				.map((frequency) => antiNodePositionsWithResonance(frequency, width, height))
				.flat()
				.map((p) => hash(p.x, p.y)),
		).size;
	},
};

export default day8;
