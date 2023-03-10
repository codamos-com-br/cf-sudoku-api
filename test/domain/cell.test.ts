import Cell from "../../src/domain/cell";

test("Box calculation", () => {
	[
		{ c: new Cell(0, 0), expectedBox: 0 },
		{ c: new Cell(2, 2), expectedBox: 0 },
		{ c: new Cell(3, 2), expectedBox: 1 },
		{ c: new Cell(8, 8), expectedBox: 8 },
	].forEach(({ c, expectedBox }) => {
		expect(c.box).toBe(expectedBox);
	});
});

test("Dropping candidates", () => {
	const c = new Cell(0, 0).dropCandidate(1).dropCandidate(2).dropCandidate(3);

	expect(c.candidates).toEqual([4, 5, 6, 7, 8, 9]);
});

test("Setting a cell's number", () => {
	const c = new Cell(0, 0);
	c.setNumber(5);

	expect(c.candidates).toEqual([]);
	expect(c.number).toBe(5);
});
