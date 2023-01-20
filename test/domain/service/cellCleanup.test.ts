import Grid from "../../../src/domain/grid";
import { cellCleanup } from "../../../src/domain/service/solver";

test("Cleanup strategy resolve 1-candidate cells", () => {
	const cells = Grid.empty().cells;
	let cell = cells[0][0]
		.dropCandidate(1)
		.dropCandidate(2)
		.dropCandidate(3)
		.dropCandidate(4)
		.dropCandidate(5)
		.dropCandidate(6)
		.dropCandidate(7)
		.dropCandidate(8);
	cells[0][0] = cell;

	const g = new Grid(cells);
	cellCleanup(g);

	expect(g.toString()).toBe("9" + "0".repeat(80));
});
