import { Day } from "../shared/day";

function parseInput(input: string): (number | undefined)[] {
	let id = 0;
	const out: (number | undefined)[] = [];

	for (let i = 0; i < input.length; i++) {
		const isData = i % 2 === 0;

		for (let j = 0; j < Number(input[i]); j++) {
			out.push(isData ? id : undefined);
		}

		if (isData) {
			id++;
		}
	}

	return out;
}

const day9: Day = {
	solve_first(input: string): number {
		const disk = parseInput(input);

		let startIndex = 0;
		let endIndex = disk.length - 1;
		while (true) {
			while (disk[startIndex] !== undefined) {
				startIndex++
			}

			while (disk[endIndex] === undefined) {
				endIndex--;
			}

			if (startIndex >= endIndex) {
				break;
			}

			disk[startIndex] = disk[endIndex];
			disk[endIndex] = undefined;
		}

		disk.splice(endIndex + 1);

		return disk //
			.map((id, i) => id * i)
			.reduce((acc, sum) => acc + sum, 0);
	},
	solve_second(input: string): number {
		const disk = parseInput(input);

		const visisted: Set<number> = new Set();

		let endIndex = disk.length;
		while (endIndex > 0) {
			while (disk[endIndex] === undefined || visisted.has(disk[endIndex])) {
				endIndex--;
			}

			let length = 1;
			while (disk[endIndex - length] === disk[endIndex]) {
				length++;
			}

			endIndex -= length - 1;


			let startIndex = 0;
			while (startIndex < endIndex) {
				startIndex++;

				let valid = true;
				for (let i = startIndex; i < startIndex + length; i++) {
					if (disk[i] !== undefined) {
						valid = false;
						break;
					}
				}

				if (valid) {
					break;
				}
			}

			if (startIndex !== endIndex) {
				for (let i = 0; i < length; i++) {
					disk[startIndex + i] = disk[endIndex + i];
					disk[endIndex + i] = undefined;
				}
			}


			visisted.add(disk[endIndex])
			endIndex--;
		}

		return disk //
			.map((id, i) => id !== undefined ? id * i : 0)
			.reduce((acc, sum) => acc + sum, 0);
	},
}

export default day9;