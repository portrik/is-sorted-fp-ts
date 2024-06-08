import { Either, left, right } from 'fp-ts/Either';

function defaultComparator(a: number, b: number): number {
	return a - b;
}

function checksort(array: ReadonlyArray<number>, comparator: typeof defaultComparator = defaultComparator): Either<TypeError, boolean> {
	if (!Array.isArray(array)) {
		return left(new TypeError('Expected Array, got ' + (typeof array)));
	}

	for (let i = 1, length = array.length; i < length; ++i) {
		if (comparator(array[i - 1], array[i]) > 0) {
			return right(false);
		}
	}

	return right(true);
}

export default checksort;
