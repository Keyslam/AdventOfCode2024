import { zip } from 'lodash';
import { pair, pairs } from '../shared/arrayUtils';
import { Day } from '../shared/day';

type Key = [number, number, number, number, number];
type Lock = [number, number, number, number, number];

function parseInput(input: string): { keys: Key[], locks: Lock[] } {
	const splitInput = input.split('\n\n');

	const keys: Key[] = [];
	const locks: Lock[] = [];

	splitInput
		.map((pattern) => pattern.replace(/\n/g, ''))
		.forEach((pattern) => {
			const isKey = !pattern.startsWith('#####');

			const counts: Key | Lock = [0, 0, 0, 0, 0];

			for (let col = 0; col < 5; col++) {
				for (let row = 0; row < 7; row++) {
					const index = col + row * 5;

					if (pattern[index] === '#') {
						counts[col]++;
					}
				}
			}

			if (isKey) {
				keys.push(counts);
			} else {
				locks.push(counts);
			}

		});

	return { keys, locks };
}

function doesOverlap(key: Key, lock: Lock) {
	for (let i = 0; i < 5; i++) {
		if (key[i] + lock[i] > 7) return true;
	}

	return false;
}

const day25: Day = {
	solve_first(input: string): number {
		const { keys, locks } = parseInput(input);
		const keyLockPairs = pair(keys, locks);

		// 59685 too high

		return keyLockPairs.filter(([key, lock]) => !doesOverlap(key, lock)).length;
	},
	solve_second(input: string): number {
		return 0;
	},
};

export default day25;
