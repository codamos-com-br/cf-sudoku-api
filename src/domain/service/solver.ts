import { Err, Ok, Result } from "../../utils/result";
import Cell from "../cell";
import Grid from "../grid";

export type Env = {
	MAX_SOLVING_ATTEMPTS: string;
	SOLVER_TIMEOUT_MS: string;
};

type SolverStrategyResult = Grid | null;
type SolverStrategy = (input: Grid) => SolverStrategyResult;

const strategies: SolverStrategy[] = [
	// Level 0
	cleanup,
	unique,
	nakedSingle,

	// Level 1
	// Level 2
	// Level 3
];

export function cleanup(input: Grid): SolverStrategyResult {
	let changed = false;

	let newGrid = input;
	input.traverseCells((c: Cell) => {
		if (c.candidates.length === 1) {
			c.setNumber(c.candidates[0]);
			changed = true;
		}
	});

	return changed ? newGrid : null;
}

function unique(input: Grid): SolverStrategyResult {
	return input;
}

function nakedSingle(input: Grid): SolverStrategyResult {
	return input;
}

type SolverResult = {
	difficulty: number;
	grid: Grid;
	iterations: number;
	time: number;
};

export default function solve(input: Grid, env: Env): Result<SolverResult, string> {
	const start = Date.now();
	let iterations = 0;
	let difficulty = 0;

	const copy = Grid.fromString(input.toString());
	if (copy.err !== null) {
		return Err(copy.err);
	}

	let grid = copy.ok as Grid;
	let res: SolverStrategyResult = grid;

	do {
		for (let idx in strategies) {
			if (Date.now() - start > parseInt(env.SOLVER_TIMEOUT_MS)) {
				return Err("timeout");
			}

			res = strategies[idx](grid);
			difficulty = Math.max(parseInt(idx), difficulty);

			if (res) {
				grid = res;
				break;
			}
		}

		if (res?.solved()) {
			iterations++;
			return Ok({
				difficulty,
				grid: res,
				iterations,
				time: Date.now() - start,
			});
		}

		iterations++;
	} while (iterations < parseInt(env.MAX_SOLVING_ATTEMPTS));

	return Err("Sudoku grid is not solvable.");
}
