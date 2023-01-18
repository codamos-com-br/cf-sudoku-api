import { IRequest } from "itty-router";
import Grid from "../domain/grid";
import Solver, { Env as SolverEnv } from "../domain/service/solver";

export default async function handle(
	req: IRequest,
	env: SolverEnv
): Promise<Response> {
	const sudokuString = (req.query["input"] as string) ?? "";

	const grid = Grid.fromString(sudokuString);
	if (grid.err !== null) {
		return new Response(grid.err, { status: 400 });
	}

	const solved = Solver.solve(grid.ok, env);
	if (solved.err !== null) {
		if (solved.err === "timeout") {
			return new Response("", { status: 408 });
		}

		return new Response(`Could not solve sudoku game.`, { status: 500 });
	}

	return new Response(solved.ok.grid.toString(), { status: 200 });
}
