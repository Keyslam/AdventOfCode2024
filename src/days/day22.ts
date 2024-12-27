import { Day } from "../shared/day";

function parseInput(input: string): bigint[] {
	return [...input.matchAll(/(\d+)/g)]
		.map(match => BigInt(Number.parseInt(match[1])));
}

function mix(a: bigint, b: bigint): bigint {
	return a ^ b;
}

function prune(secret: bigint): bigint {
	return secret % BigInt(16777216);
}

function getNextSecret(secret: bigint): bigint {
	secret = prune(mix(secret * BigInt(64), secret));
	secret = prune(mix(secret / BigInt(32), secret));
	secret = prune(mix(secret * BigInt(2048), secret));

	return secret;
}

const day22: Day = {
	solve_first(input: string): number {
		return parseInput(input).map(secret => {
			for (let i = 0; i < 2000; i++) {
				secret = getNextSecret(secret);
			}
			return secret;
		})
		.reduce((acc, sum) => acc + sum, BigInt(0)).toString() as unknown as number;
	},
	solve_second(input: string): number {
		const sequences: Record<string, bigint[]> = {}

		parseInput(input).forEach(secret => {
			const visitedSequences: Set<string> = new Set();

			const deltas: bigint[] = [];
			const bananas: bigint[] = [];

			for (let i = 0; i < 2000; i++) {
				bananas[i] = secret % BigInt(10);
				const nextSecret = getNextSecret(secret);

				if (i !== 0) {
					const delta = bananas[i] - bananas[i - 1];
					deltas[i] = delta;
				}

				if (i > 3) {
					const key = [deltas[i-3], deltas[i-2], deltas[i-1], deltas[i]].join(',');

					if (!visitedSequences.has(key)) {
						visitedSequences.add(key);
						sequences[key] = sequences[key] !== undefined ? sequences[key] : [];
						sequences[key].push(bananas[i])
					}

				}

				secret = nextSecret;
			}
		})

		const bananas = [...Object.values(sequences)]
			.map(sequence => ({
				sequence: sequence,
				bananas: sequence.reduce((acc, sum) => acc + sum, BigInt(0))
			}));

		return Math.max(...bananas.map(x => Number(x.bananas)));
	}
}

export default day22;