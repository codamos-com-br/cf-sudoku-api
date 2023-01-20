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

	g.cells[0][0].setNumber(7);
	expect(g.toString()).toBe("7" + "0".repeat(80));
});

test("From string deserialisation", () => {
	const empty = "0".repeat(81);
	const res = Grid.fromString(empty);
	expect(res.err).toBeNull();
	expect(res.ok).toEqual(Grid.empty());

	const firstRowFilled = "123456789" + "0".repeat(72);
	const frf = Grid.empty();
	frf.cells[0][0].setNumber(1);
	frf.cells[0][1].setNumber(2);
	frf.cells[0][2].setNumber(3);
	frf.cells[0][3].setNumber(4);
	frf.cells[0][4].setNumber(5);
	frf.cells[0][5].setNumber(6);
	frf.cells[0][6].setNumber(7);
	frf.cells[0][7].setNumber(8);
	frf.cells[0][8].setNumber(9);

	const res2 = Grid.fromString(firstRowFilled);
	expect(res2.err).toBeNull();
	expect(res2.ok).toEqual(frf);

	const invalidLengthSudokuString = "0".repeat(80);
	const res3 = Grid.fromString(invalidLengthSudokuString);
	expect(res3.ok).toBeNull();
	expect(res3.err).toEqual(
		"Invalid sudoku string: provide a 81-length digits stream."
	);

	const invalidCharactersSudokuString = "A" + "0".repeat(80);
	const res4 = Grid.fromString(invalidCharactersSudokuString);
	expect(res4.ok).toBeNull();
	expect(res4.err).toEqual(
		"Invalid sudoku string: all characters must be a 0 to 9 digit."
	);
});
