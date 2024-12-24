import { Day } from '../shared/day';

type Pc = {
	label: string;
	connections: Pc[];
};

function parseInput(input: string): Pc[] {
	const nodes: Record<string, Pc> = {};

	[...input.matchAll(/(\w+)-(\w+)/g)].forEach((match) => {
		const pcALabel = match[1];
		const pcBLabel = match[2];

		nodes[pcALabel] = nodes[pcALabel] !== undefined ? nodes[pcALabel] : { label: pcALabel, connections: [] };
		nodes[pcBLabel] = nodes[pcBLabel] !== undefined ? nodes[pcBLabel] : { label: pcBLabel, connections: [] };

		nodes[pcALabel].connections.push(nodes[pcBLabel]);
		nodes[pcBLabel].connections.push(nodes[pcALabel]);
	});

	return [...Object.values(nodes)];
}

const isValidSet = (set: Pc[]) => {
	for (let i = 0; i < set.length; i++) {
	  for (let j = i + 1; j < set.length; j++) {
		if (!set[j].connections.includes(set[i])) {
		  return false;
		}
	  }
	}
	return true;
  };

export function setsOfN(pcs: Pc[], setSize: number): Pc[][] {
	const seen = new Set<string>();
	const result: Pc[][] = [];

	const generateCombinations = (startIndex: number, currentSet: Pc[]) => {
	  if (currentSet.length === setSize) {
		const set = [...currentSet].sort((a, b) => a.label.localeCompare(b.label));
		const key = set.map(pc => pc.label).join('-');

		if (!seen.has(key)) {
		  seen.add(key);
		  result.push(set);
		}
		return;
	  }

	  for (let i = startIndex; i < pcs.length; i++) {
		const pc = pcs[i];
		const newSet = [...currentSet, pc];
		if (isValidSet(newSet)) {
		  generateCombinations(i + 1, newSet);
		}
	  }
	};

	generateCombinations(0, []);
	return result;
  }

const day23: Day = {
	solve_first(input: string): number {
		return setsOfN(parseInput(input), 3) //
			.filter((set) => set[0].label.startsWith('t') || set[1].label.startsWith('t') || set[2].label.startsWith('t'))
			.length;
	},
	solve_second(input: string): number {
		const pcs = parseInput(input);

		let setSize = 1;

		while (true) {
			const count = setsOfN(pcs, setSize).length;

			console.log(`${setSize}: ${count}`);
			if (count === 1) {
				break;
			}

			setSize++;
		}

		const set = setsOfN(pcs, setSize)[0];

		return set.map(pc => pc.label).join(',') as unknown as number;
	},
};

export default day23;
