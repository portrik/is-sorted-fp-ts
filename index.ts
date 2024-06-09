import { Option, Some, isSome, none, some } from 'fp-ts/Option';

type Comparator<Content> = (a: Content, b: Content) => number;

/**
 * Map an `Array.prototype.map` step to an array of adjacent elements.
 *
 * @param current Current element
 * @param index Index of the current element
 * @param array Array being mapped
 *
 * @returns Some in case the next element exists. Otherwise none.
 */
function mapToPairs<Content>(current: Content, index: number, array: ReadonlyArray<Content>): Option<Readonly<[Content, Content]>> {
	const next = array[index + 1];
	if (next == null) {
		return none;
	}

	return some([current, next]);
}

/**
 * Check to see if an array is sorted.
 *
 * @example
 * checksort([0, 1, 2, 3], (a: number, b: number): number => a - b)); // Returns `true`
 *
 * @example
 * checksort([0, 1, 2, 3], (a: number, b: number): number => b - a)); // Returns `false`
 *
 * @example
 * checksort([{ value: 0 }, { value: 2 }, { value: 1 }], (a: { value: number }, b: { value: number }): number => a.value - b.value); // Returns `false`
 *
 * @param array Array of values to check
 * @param comparator Comparator function comparing two adjacent elements of the array. Should return number greater than 0 in case the values are not sorted.
 *
 * @returns Is the array sorted?
 */
function checksort<Content>(array: ReadonlyArray<Content>, comparator: Comparator<Content>): boolean {
	return array
		.map(mapToPairs)
		.filter(isSome)
		.every((option: Some<Readonly<[Content, Content]>>) => comparator(...option.value) <= 0);
}

export default checksort;
