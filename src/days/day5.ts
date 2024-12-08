import { Day } from "../shared/day";

type RuleHash = number;
type Page = number;

type Rule = {
	former: Page,
	latter: Page,
}

type Update = Page[];

function hashRule(rule: Rule): RuleHash {
	const smallest = Math.min(rule.former, rule.latter);
	const largest = Math.max(rule.former, rule.latter);
	return 0.5 * (smallest + largest) * (smallest + largest + 1) + largest;
}

function parseInput(input: string): {
	rules: Record<RuleHash, Rule>,
	updates: Update[],
} {
	const splitInput = input.split("\n\n");

	const rules: Record<RuleHash, Rule> = splitInput[0]
		.split("\n")
		.map(line => {
			const splitLine = line.split("|");
			return {former: Number.parseInt(splitLine[0]), latter: Number.parseInt(splitLine[1])}
		})
		.reduce((out, rule) => {
			const hash = hashRule(rule);
			out[hash] = rule;
			return out;
		}, {});

	const updates: Update[] = splitInput[1]
		.split("\n")
		.map(line => line.split(",").map(value => Number.parseInt(value)));

	return {
		rules,
		updates,
	}
}

function findIllegalPages(rules: Record<RuleHash, Rule>, update: Update): { formerIndex: number, latterIndex: number}  {
	for (let formerIndex = 0; formerIndex < update.length; formerIndex++) {
		for (let latterIndex = formerIndex + 1; latterIndex < update.length; latterIndex++) {
			const rule: Rule = { former: update[formerIndex], latter: update[latterIndex] };
			const hash = hashRule(rule);

			const realRule = rules[hash];
			if (realRule === undefined) {
				continue;
			}

			if (rule.former !== realRule.former) {
				return {
					formerIndex: formerIndex,
					latterIndex: latterIndex,
				};
			}
		}
	}

	return undefined;
}

const day5: Day = {
	solve_first(input: string): number {
		const { rules, updates } = parseInput(input);

		return updates
			.filter(update => findIllegalPages(rules, update) === undefined)
			.map(update => update[Math.floor(update.length / 2)])
			.reduce((acc, value) => acc + value, 0);
	},
	solve_second(input: string): number {
		const { rules, updates } = parseInput(input);

		return updates
			.filter(update => findIllegalPages(rules, update) !== undefined)
			.map((update) => {
				let illegalPages = findIllegalPages(rules, update);

				do {
					[update[illegalPages.formerIndex], update[illegalPages.latterIndex]] = [update[illegalPages.latterIndex], update[illegalPages.formerIndex]];
					illegalPages = findIllegalPages(rules, update);
				} while (illegalPages !== undefined);

				return update;
			})
			.map(update => update[Math.floor(update.length / 2)])
			.reduce((acc, value) => acc + value, 0);
	}
}

export default day5;