import Grid from "../../../src/domain/grid";
import { boardCleanup } from "../../../src/domain/service/solver";

test("Setting a number removes it from neighbour cells", () => {
	const g = Grid.empty();
	g.cells[0][0].setNumber(5);

	boardCleanup(g);

	expect(g.cellsAtBox(0).candidates.includes(5)).toBeFalsy();
	expect(g.cellsAtRow(0).candidates.includes(5)).toBeFalsy();
	expect(g.cellsAtColumn(0).candidates.includes(5)).toBeFalsy();
});
