import Grid from "../../../src/domain/grid";
import { cleanup } from "../../../src/domain/service/solver";

test("Cleanup does nothing", () => {
	const res = cleanup(Grid.empty());

	expect(res).toBeNull();
});

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
	const res = cleanup(g);

	expect(res).not.toBeNull();
	expect(res?.toString()).toBe("9" + "0".repeat(80));
});
