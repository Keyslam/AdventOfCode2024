import { Day } from '../shared/day';

export type Map = boolean[][];
export type Position = { x: number; y: number };

function parseInput(input: string): { map: Map; guardPosition: Position } {
	const map: Map = input //
		.split('\n')
		.map((line) =>
			line
				.replace(/\s/g, '')
				.split('')
				.map((v) => v === '#'),
		);

	const guardPositionIndex = input.replace(/\s/g, '').indexOf('^');
	const guardPosition: Position = {
		x: guardPositionIndex % map[0].length,
		y: Math.floor(guardPositionIndex / map.length),
	};

	return {
		map,
		guardPosition,
	};
}

function isObstacle(map: Map, position: Position): boolean {
	if (!isInBounds(map, position)) {
		return false;
	}

	return map[position.y][position.x];
}

function isInBounds(map: Map, position: Position): boolean {
	if (position.x < 0) return false;
	if (position.x > map[0].length - 1) return false;

	if (position.y < 0) return false;
	if (position.y > map.length - 1) return false;

	return true;
}

function hash(a: number, b: number): number {
	return 0.5 * (a + b) * (a + b + 1) + b;
}

function inverseHash(hash: number): { a: number; b: number } {
	const n = Math.floor((-1 + Math.sqrt(8 * hash + 1)) / 2);
	const b = hash - 0.5 * (n + 1) * n;
	const a = n - b;

	return { a, b };
}

const directions: Position[] = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
];

function getDistinctPositions(map: Map, startPosition: Position, startDirectionIndex: number): { positions: Set<Position>; loops: boolean } {
	const visitedIds = new Set<number>();
	const visitedDirections = new Set<number>();

	let currentPosition = startPosition;
	let directionIndex = startDirectionIndex;
	let loops = false;

	while (isInBounds(map, currentPosition)) {
		const key = hash(currentPosition.x, currentPosition.y);
		visitedIds.add(key);

		const directionKey = hash(key, directionIndex);
		if (visitedDirections.has(directionKey)) {
			loops = true;
			break;
		}
		visitedDirections.add(directionKey);

		while (true) {
			const direction = directions[directionIndex];
			const nextPosition = { x: currentPosition.x + direction.x, y: currentPosition.y + direction.y };

			if (isObstacle(map, nextPosition)) {
				directionIndex = (directionIndex + 1) % directions.length;
			} else {
				currentPosition = nextPosition;
				break;
			}
		}
	}

	return {
		positions: new Set(
			Array.from(visitedIds).map((id) => {
				const { a, b } = inverseHash(id);
				const position: Position = { x: a, y: b };
				return position;
			}),
		),
		loops: loops,
	};
}

const day6: Day = {
	solve_first(input: string): number {
		const { map, guardPosition } = parseInput(input);
		return getDistinctPositions(map, guardPosition, 0).positions.size + 1;
	},
	solve_second(input: string): number {
		const { map, guardPosition } = parseInput(input);
		return Array.from(getDistinctPositions(map, guardPosition, 0).positions).filter((position) => {
			map[position.y][position.x] = true;
			const loops = getDistinctPositions(map, guardPosition, 0).loops;
			map[position.y][position.x] = false;
			return loops;
		}).length;
	},
};

export default day6;
