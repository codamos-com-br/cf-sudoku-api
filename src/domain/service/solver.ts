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
	type OccurrenceMap = { [candidate: number]: number };
	type UnitOccurrenceMap = { [unit: number]: OccurrenceMap };

	const map: { [unitType: string]: UnitOccurrenceMap } = {
		box: {},
		col: {},
		row: {},
	};

	// Zeroes the map
	for (let i = 0; i < 9; ++i) {
		map.box[i] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
		map.col[i] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
		map.row[i] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
	}

	// Fill the map
	for (let i = 0; i < 9; ++i) {
		input.boxes
			.get(i)
			?.cells.flatMap((c) => c.candidates)
			.forEach((n) => map.box[i][n]++);
		input.rows
			.get(i)
			?.cells.flatMap((c) => c.candidates)
			.forEach((n) => map.row[i][n]++);
		input.columns
			.get(i)
			?.cells.flatMap((c) => c.candidates)
			.forEach((n) => map.col[i][n]++);
	}

	for (let c of input.cells.flat().filter((c) => c.number === 0)) {
		for (let n of c.candidates) {
			if (
				map.box[c.box][n] === 1 ||
				map.row[c.row][n] === 1 ||
				map.col[c.column][n] === 1
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
