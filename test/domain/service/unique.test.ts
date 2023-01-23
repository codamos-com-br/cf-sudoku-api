import Grid from "../../../src/domain/grid";
import { unique } from "../../../src/domain/service/solver";

test("Unique solver", () => {
	const g = Grid.empty();

	// Given no cell in Unit contains candidate [5]
	g.boxes.get(0)?.cells.forEach((c) => c.dropCandidate(5));

	// And cell(0,0) contains candidate[5]
	g.cells[0][0].candidates.push(5);

	// When Unique solver is applied
	unique(g);

	// Then cell(0,0) is unique, and resolves to 5
	expect(g.cells[0][0].number).toBe(5);
});
