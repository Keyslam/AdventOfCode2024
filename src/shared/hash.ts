export function hash(a: number, b: number): number {
	return 0.5 * (a + b) * (a + b + 1) + b;
}

export function inverseHash(hash: number): { a: number; b: number } {
	const n = Math.floor((-1 + Math.sqrt(8 * hash + 1)) / 2);
	const b = hash - 0.5 * (n + 1) * n;
	const a = n - b;

	return { a, b };
}
