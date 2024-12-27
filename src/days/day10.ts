import { Day } from '../shared/day';

type Cell = {
	value: number;
	x: number;
	y: number;
};

type Map = Cell[][];

function parseInput(input: string): Map {
	return input
		.trim()
		.split('\n')
		.map((line, y) => line.split('').map((v, x) => ({ value: Number(v), x, y })));
}

const directions: { x: number; y: number }[] = [
	{ x: -1, y: 0 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
];

function creep(cell: Cell | undefined, map: Map, endpoints: Set<Cell>): void {
	if (cell === undefined) {
		return;
	}

	if (cell.value === 9) {
		endpoints.add(cell);
		return;
	}

	for (const direction of directions) {
		const x = cell.x+direction.x;
		const y = cell.y+direction.y;

		if (x < 0 || x >= map.length || y < 0 || y>= map[0].length) continue;

		const otherCell = map[y][x];

		if (otherCell === undefined) continue;
		if (otherCell.value !== cell.value + 1) continue;

		creep(otherCell, map, endpoints);
	}
}

type Summer = { value: number }

function creepSummer(cell: Cell | undefined, map: Map, summer: Summer): void {
	if (cell === undefined) {
		return;
	}

	if (cell.value === 9) {
		summer.value += 1;
		return;
	}

	for (const direction of directions) {
		const x = cell.x+direction.x;
		const y = cell.y+direction.y;

		if (x < 0 || x >= map.length || y < 0 || y>= map[0].length) continue;

		const otherCell = map[y][x];

		if (otherCell === undefined) continue;
		if (otherCell.value !== cell.value + 1) continue;

		creepSummer(otherCell, map, summer);
	}
}


const day10: Day = {
	solve_first(input: string): number {
		const map = parseInput(input);

		return map //
			.flat()
			.filter((x) => x.value === 0)
			.map(cell => {
				const endpoints = new Set<Cell>();
				creep(cell, map, endpoints);
				return endpoints.size;
			})
			.reduce((acc, sum) => acc + sum, 0);
	},
	solve_second(input: string): number {
		const map = parseInput(input);

		return map //
			.flat()
			.filter((x) => x.value === 0)
			.map(cell => {
				const summer = { value: 0 };
				creepSummer(cell, map, summer);
				return summer.value;
			})
			.reduce((acc, sum) => acc + sum, 0);
	},
};

export default day10;
