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
				input.boxes.get(c.box)?.cells,
				input.rows.get(c.row)?.cells,
				input.columns.get(c.column)?.cells,
			]
				.flat()
				.forEach((neighbour) => {
					if (neighbour === undefined) {
						return;
					}

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

export function unique(input: Grid): void {
	for (let c of input.cells.flat()) {
		if (c.number > 0) {
			continue;
		}

		for (let n of c.candidates) {
			if (
				!input.boxes
					.get(c.box)
					?.without(c)
					.cells.flatMap((c2) => c2.candidates)
					.includes(n) ||
				!input.rows
					.get(c.row)
					?.without(c)
					.cells.flatMap((c2) => c2.candidates)
					.includes(n) ||
				!input.columns
					.get(c.column)
					?.without(c)
					.cells.flatMap((c2) => c2.candidates)
					.includes(n)
			) {
				c.setNumber(n);
				break;
			}
		}
	}
}

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
