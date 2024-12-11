import { Day } from '../shared/day';

export type Map = boolean[][];
export type Position = { x: number; y: number };

function parseInput(input: string): Map {
	const map: Map = input //
		.split('\n')
		.map((line) => line.split('').map((v) => v === '#'));

	const guardPositionIndex = input.indexOf('^') - 1;
	const guardPosition: Position = {
		x: Math.floor(guardPositionIndex / map.length),
		y: guardPositionIndex % map.length,
	};
	console.log(guardPositionIndex, guardPosition, map.length);
	return [];
}

const day6: Day = {
	solve_first(input: string): number {
		parseInput(input);
		return 0;
	},
	solve_second(input: string): number {
		return 0;
	},
};

export default day6;
