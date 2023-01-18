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
