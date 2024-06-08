import { isRight, left } from 'fp-ts/lib/Either';

import sorted from '..';
import { default as fixtures } from './fixtures.json' assert { type: 'json'};

const comparators = {
	descending: function (a: number, b: number): number { return b - a; }
};

describe('checksort', () => {
	test.each(fixtures)('Returns $expected for $array', ({ array, expected, comparator }) => {
		const actual = sorted(array, comparator === 'descending' ? comparators.descending : undefined);

		expect(isRight(actual)).toBeTruthy();
		assert(isRight(actual)); // Expect by itself does not narrow types.
		expect(actual.right).toEqual(expected);
	});

	test('throws on non-Array inputs', () => {
		expect(sorted('foobar' as unknown as ReadonlyArray<number>)).toEqual(left(new TypeError('Expected Array, got string')));
	});
});
