import Cell from "../../src/domain/cell";
import Unit from "../../src/domain/unit";

test("Unit tells which numbers are missing", () => {
	const u = new Unit(
		[{ col: 0, row: 0, number: 0 }].map(({ col, row, number }) =>
			new Cell(col, row).setNumber(number)
		)
	);

	expect(u.candidates()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

	const u2 = new Unit(
		[
			{ col: 0, row: 0, candidates: [1] },
			{ col: 1, row: 0, candidates: [2, 3, 5] },
			{ col: 2, row: 0, candidates: [] },
			{ col: 3, row: 0, candidates: [] },
			{ col: 4, row: 0, candidates: [] },
			{ col: 5, row: 0, candidates: [] },
			{ col: 6, row: 0, candidates: [] },
			{ col: 7, row: 0, candidates: [] },
			{ col: 8, row: 0, candidates: [] },
		].map(({ col, row, candidates }) => new Cell(col, row, candidates))
	);
	expect(u2.candidates()).toEqual([1, 2, 3, 5]);
});

test("Unit tells which numbers are present", () => {
	const u = new Unit(
		[{ col: 0, row: 0, number: 0 }].map(({ col, row, number }) =>
			new Cell(col, row).setNumber(number)
		)
	);

	expect(u.candidates()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

	const u2 = new Unit(
		[
			{ col: 0, row: 0, number: 1 },
			{ col: 1, row: 0, number: 0 },
			{ col: 2, row: 0, number: 2 },
			{ col: 3, row: 0, number: 3 },
			{ col: 4, row: 0, number: 0 },
			{ col: 5, row: 0, number: 5 },
			{ col: 6, row: 0, number: 0 },
			{ col: 7, row: 0, number: 0 },
			{ col: 8, row: 0, number: 0 },
		].map(({ col, row, number }) => new Cell(col, row).setNumber(number))
	);
	expect(u2.numbers).toEqual([1, 2, 3, 5]);
});
