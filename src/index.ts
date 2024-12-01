import { Day } from './shared/day';
import getInput from './shared/getInput';

import { argv } from 'process';

async function runDay(dayIndex: string) {
	try {
		const day: Day = (await import(`./days/day${dayIndex}.js`)).default;
		const input = await getInput(dayIndex);

		const first_solution = day.solve_first(input);
		console.log(`First solution: '${first_solution}'`);

		const second_solution = day.solve_second(input);
		console.log(`Second solution: '${second_solution}'`);
	} catch (error) {
		console.error(`Error loading day ${day}:`, error.message);
	}
}

const day = argv[2];
runDay(day);
