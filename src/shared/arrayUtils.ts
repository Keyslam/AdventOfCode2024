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
