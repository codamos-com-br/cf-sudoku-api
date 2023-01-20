import { Err, Ok, Result } from "../../utils/result";
import Cell from "../cell";
import Grid from "../grid";

export type Env = {
	MAX_SOLVING_ATTEMPTS: string;
	SOLVER_TIMEOUT_MS: string;
};

type SolverStrategyResult = Grid | null;
type SolverStrategy = (input: Grid) => SolverStrategyResult;

const strategies: ((g: Grid) => void)[] = [
	// Level 0
	boardCleanup,
	cellCleanup,
	unique,
	nakedSingle,

	// Level 1
	// Level 2
	// Level 3
];

export function boardCleanup(input: Grid): void {
	input.cells
		.flat()
		.filter((c) => c.number !== 0)
		.forEach((c) => {
			[
				input.cellsAtBox(c.box).cells,
				input.cellsAtColumn(c.column).cells,
				input.cellsAtRow(c.row).cells,
			]
				.flat()
				.forEach((neighbour) => {
					neighbour.dropCandidate(c.number);
				});
		});
}

export function cellCleanup(input: Grid): void {
	input.cells
		.flat()
		.filter((c) => c.candidates.length === 1)
		.forEach((c) => c.setNumber(c.candidates[0]));
}

function unique(input: Grid): void {}

function nakedSingle(input: Grid): void {}

type SolverResult = {
	grid: Grid;
	iterations: number;
	time: number;
};

export default function solve(
	input: Grid,
	env: Env
): Result<SolverResult, string> {
	const grid = Grid.fromString(input.toString()).ok as Grid;
	const start = Date.now();
	let iterations = 0;

	const copy = Grid.fromString(input.toString());
	if (copy.err !== null) {
		return Err(copy.err);
	}

	do {
		for (let idx in strategies) {
			if (Date.now() - start > parseInt(env.SOLVER_TIMEOUT_MS)) {
				return Err("timeout");
			}

			strategies[idx](grid);
		}

		if (grid?.solved()) {
			iterations++;
			return Ok({
				grid,
				iterations,
				time: Date.now() - start,
			});
		}

		iterations++;
	} while (iterations < parseInt(env.MAX_SOLVING_ATTEMPTS));

	return Err("Sudoku grid is not solvable.");
}
