import * as fs from 'fs';
import { Digraph, Edge, Node, toDot } from 'ts-graphviz';
import { Day } from '../shared/day';

type Input = {
	label: string;
	value: boolean;
};

type Operation = 'OR' | 'AND' | 'XOR';

type Gate = {
	left: string;
	right: string;
	out: string;
	operation: Operation;
};

function parseInput(input: string): { inputs: Input[]; gates: Gate[] } {
	const splitInput = input.split('\n\n');

	const inputs: Input[] = [...splitInput[0].matchAll(/(\S\S\S): (\d)/g)].map((match) => ({
		label: match[1],
		value: match[2] === '1',
	}));

	const gates: Gate[] = [...splitInput[1].matchAll(/(\w+) (\w+) (\w+) -> (\w+)/g)].map((match) => ({
		left: match[1],
		right: match[3],
		out: match[4],
		operation: match[2] as Operation,
	}));

	return { inputs, gates };
}

function findValue(label: string, gates: Gate[], inputs: Input[]): boolean {
	const input = inputs.find((g) => g.label === label);
	if (input !== undefined) {
		return input.value;
	}

	return evaluateGate(
		gates.find((g) => g.out === label),
		gates,
		inputs,
	);
}

function evaluateGate(gate: Gate, gates: Gate[], inputs: Input[]): boolean {
	const left = findValue(gate.left, gates, inputs);
	const right = findValue(gate.right, gates, inputs);

	switch (gate.operation) {
		case 'AND':
			return left && right;
		case 'OR':
			return left || right;
		case 'XOR':
			return left !== right;
	}
}

function numberToBitsArray(num: number): boolean[] {
    const bits = num.toString(2);
    const result = Array.from(bits, bit => bit === "1");
    return result.reverse();
}

const day24: Day = {
	solve_first(input: string): number {
		const { inputs, gates } = parseInput(input);

		return gates
			.filter((gate) => gate.out.startsWith('z'))
			.map((gate) => ({ gate, index: Number.parseInt(gate.out.slice(1)) }))
			.sort((a, b) => (a.index > b.index ? 1 : -1))
			.map((v) => ({
				index: v.index,
				result: evaluateGate(v.gate, gates, inputs),
			}))
			.map((v) => (v.result ? Math.pow(2, v.index) : 0))
			.reduce((acc, value) => acc + value, 0);
	},
	solve_second(input: string): number {
		const { inputs, gates } = parseInput(input);

		{
			// z16 & hmk
			const z16 = gates.find(g => g.out === "z16");
			const hmk = gates.find(g => g.out === "hmk");
			z16.out = "hmk";
			hmk.out = "z16";
		}

		{
			// z20 & fhp
			const z20 = gates.find(g => g.out === "z20");
			const fhp = gates.find(g => g.out === "fhp");
			z20.out = "fhp";
			fhp.out = "z20";
		}

		{
			// rvf & tpc
			const rvf = gates.find(g => g.out === "rvf");
			const tpc = gates.find(g => g.out === "tpc");
			rvf.out = "tpc";
			tpc.out = "rvf";
		}

		{
			// z33 & fcd
			const z33 = gates.find(g => g.out === "z33");
			const fcd = gates.find(g => g.out === "fcd");
			z33.out = "fcd";
			fcd.out = "z33";
		}

		const left = inputs
			.filter((gate) => gate.label.startsWith('x'))
			.map((gate) => ({ gate, index: Number.parseInt(gate.label.slice(1)) }))
			.sort((a, b) => (a.index > b.index ? 1 : -1))
			.map(v => v.gate.value)
			.map((v, i) => (v ? Math.pow(2, i) : 0))
			.reduce((acc, value) => acc + value, 0);

		const right = inputs
			.filter((gate) => gate.label.startsWith('y'))
			.map((gate) => ({ gate, index: Number.parseInt(gate.label.slice(1)) }))
			.sort((a, b) => (a.index > b.index ? 1 : -1))
			.map(v => v.gate.value)
			.map((v, i) => (v ? Math.pow(2, i) : 0))
			.reduce((acc, value) => acc + value, 0);

		const expectedOut: boolean[] = numberToBitsArray(left + right);

		const out = gates
			.filter((gate) => gate.out.startsWith('z'))
			.map((gate) => ({ gate, index: Number.parseInt(gate.out.slice(1)) }))
			.sort((a, b) => (a.index > b.index ? 1 : -1))
			.map((v) => ({
				index: v.index,
				result: evaluateGate(v.gate, gates, inputs),
			}));

		const graph = new Digraph();

		const nodes: Record<string, Node> = {};

		inputs.forEach(input => {
			const node = new Node(input.label);
			nodes[input.label] = node;
			graph.addNode(node);
		});

		gates.forEach(gate => {
			const node = new Node(gate.out + ' ' + gate.operation);
			nodes[gate.out] = node;
			graph.addNode(node);
		});

		gates.forEach(gate => {
			const leftEdge = new Edge([nodes[gate.left], nodes[gate.out]]);
			const rightEdge = new Edge([nodes[gate.right], nodes[gate.out]]);
			graph.addEdge(leftEdge);
			graph.addEdge(rightEdge);
		})

		const dot = toDot(graph);
		fs.writeFileSync("my-cool-dot-file.txt", dot);

		for (let i = 0; i < out.length; i++) {
			console.log(i, out[i].result === expectedOut[i]);
		}


		return 0;
	},
};

export default day24;