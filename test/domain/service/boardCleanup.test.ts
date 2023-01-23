import Grid from "../../../src/domain/grid";
import { boardCleanup } from "../../../src/domain/service/solver";

test("Setting a number removes it from neighbour cells", () => {
	const g = Grid.empty();
	g.cells[0][0].setNumber(5);

	boardCleanup(g);

	expect(g.boxes.get(0)?.candidates().includes(5)).toBeFalsy();
	expect(g.rows.get(0)?.candidates().includes(5)).toBeFalsy();
	expect(g.columns.get(0)?.candidates().includes(5)).toBeFalsy();
});
