import Cell from "../../src/domain/cell";
import Grid from "../../src/domain/grid";

test("Empty grid creates cells", () => {
	const g = Grid.empty();

	expect(g.cells[0][0]).toEqual(new Cell(0, 0));
	expect(g.cells[8][8]).toEqual(new Cell(8, 8));
});

test("Grid to string serialisation", () => {
	const g = Grid.empty();

	expect(g.toString()).toBe("0".repeat(81));

	const g1 = g.setNumber(7, 0, 0);
	expect(g1).not.toEqual(g);
	expect(g1.toString()).toBe("7" + "0".repeat(80));
});

test("From string deserialisation", () => {
	const empty = '0'.repeat(81);
	expect(Grid.fromString(empty)).toEqual(Grid.empty());

	const firstRowFilled = '123456789' + '0'.repeat(72);
	const frf = Grid.empty()
		.setNumber(1, 0, 0)
		.setNumber(2, 1, 0)
		.setNumber(3, 2, 0)
		.setNumber(4, 3, 0)
		.setNumber(5, 4, 0)
		.setNumber(6, 5, 0)
		.setNumber(7, 6, 0)
		.setNumber(8, 7, 0)
		.setNumber(9, 8, 0);
	expect(Grid.fromString(firstRowFilled)).toEqual(frf);

	expect(() => {
		const invalidSudokuString = '0'.repeat(80);
		Grid.fromString(invalidSudokuString);
	}).toThrow(new Error('Invalid sudoku string: provide a 81-length digits stream.'));

	expect(() => {
		const invalidSudokuString = 'A' + '0'.repeat(80);
		Grid.fromString(invalidSudokuString);
	}).toThrow(new Error('Invalid sudoku string: all characters must be a 0 to 9 digit.'));
});
