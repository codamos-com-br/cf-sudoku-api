import { Err, Ok, Result } from "../../utils/result";
import Grid from "../grid";

export type Env = {
	MAX_SOLVING_ATTEMPTS: string;
	SOLVER_TIMEOUT_MS: string;
};

type SolverStrategy = (input: Grid) => Grid;

const strategies: SolverStrategy[] = [
	// Level 0
	cleanup,
	unique,
	nakedSingle,

	// Level 1
	// Level 2
	// Level 3
];

function cleanup(input: Grid): Grid {
	return input;
}

function unique(input: Grid): Grid {
	return input;
}

function nakedSingle(input: Grid): Grid {
	return input;
}

type SolverResult = {
	difficulty: number;
	grid: Grid;
	iterations: number;
	time: number;
};

export default class Solver {
	public static solve(input: Grid, env: Env): Result<SolverResult, string> {
		const start = Date.now();
		let iterations = 0;
		let difficulty = 0;

		const copy = Grid.fromString(input.toString());
		if (copy.err !== null) {
			return Err(copy.err);
		}

		let res = copy.ok as Grid;

		do {
			for (let idx in strategies) {
				if (Date.now() - start > parseInt(env.SOLVER_TIMEOUT_MS)) {
					return Err("timeout");
				}

				res = strategies[idx](res);
				difficulty = Math.max(parseInt(idx), difficulty);
			}

			if (res.solved()) {
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
}
