export function createIdentityArray(length: number): number[] {
	return Array.from({ length: length }).map((_, index) => index);
}

export function create2DIdentityArray(width: number, height: number): number[][] {
	return Array.from({ length: width }).map(() => createIdentityArray(height));
}

export function createFlat2DIdentityArray(width: number, height: number): { x: number; y: number }[] {
	return Array.from({ length: width * height }).map((_, index) => ({
		x: index % width,
		y: Math.floor(index / width),
	}));
}

export function pairs<T>(array: T[]): [T, T][] {
	return array //
		.flatMap((element, i) =>
			array //
				.slice(i + 1)
				.map((otherElement) => [element, otherElement] as [T, T]));
}

export function triplets<T>(array: T[]): [T, T, T][] {
	return array //
		.flatMap((element, i) =>
			array //
				.slice(i + 1)
				.flatMap((otherElement, j) =>
					array //
						.slice(i + j + 2)
						.map((thirdElement) => [element, otherElement, thirdElement] as [T, T, T])),
	);
}
