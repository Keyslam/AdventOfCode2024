import { Day } from '../shared/day';

function parseInput(input: string): number[][] {
	const records = input //
		.split('\n')
		.map((line) =>
			line //
				.split(' ')
				.map((value) => Number.parseInt(value)),
		);

	records.pop();

	return records;
}

function isReportSafe(report: number[]): boolean {
	const sign = -Math.sign(report[0] - report[1]);
	const deltas = Array(...Array(report.length - 1)).map((_, i) => {
		return report[i + 1] - report[i];
	});

	if (deltas.some((x) => x === 0 || Math.abs(x) > 3)) {
		return false;
	}

	if (deltas.some((x) => Math.sign(x) !== sign)) {
		return false;
	}

	return true;
}

function createReportVariants(report: number[]): number[][] {
	const variants: number[][] = [];

	variants.push(report);

	for (let i = 0; i < report.length; i++) {
		const variant = Array.from(report);
		variant.splice(i, 1);
		variants.push(variant);
	}

	return variants;
}

const day2: Day = {
	solve_first(input: string): number {
		const reports = parseInput(input);

		return reports.filter((report) => isReportSafe(report)).length;
	},
	solve_second(input: string): number {
		const reports = parseInput(input);

		return reports.filter((report) => {
			const reportVariants = createReportVariants(report);
			return reportVariants.some((reportVariant) => isReportSafe(reportVariant));
		}).length;
	},
};

export default day2;
