import { Day } from './shared/day';
import getInput from './shared/getInput';

import { argv } from 'process';

async function loadDay(dayIndex: string) {
	try {
		const day: Day = (await import(`./days/day${dayIndex}.js`)).default;
		return day;
	} catch (error) {
		console.error(`Error loading day ${day}:`, error.message);
	}
}

async function runDay(dayIndex: string, benchmark: boolean) {
	const day = await loadDay(dayIndex);
	const input = await getInput(dayIndex);

	if (benchmark) console.time('first_solution');
	const first_solution = day.solve_first(input);
	console.log(`First solution: '${first_solution}'`);
	if (benchmark) console.timeLog('first_solution');

	if (benchmark) console.time('second_solution');
	const second_solution = day.solve_second(input);
	console.log(`Second solution: '${second_solution}'`);
	if (benchmark) console.timeLog('second_solution');
}

const day = argv[2];
const benchmark = argv[3] === '1';
runDay(day, benchmark);
