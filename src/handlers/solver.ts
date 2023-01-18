import { IRequest } from "itty-router";
import Grid from "../domain/grid";
import Solver from "../domain/service/solver";

export default async function handle(req: IRequest): Promise<Response> {
	const sudokuString = (req.query["input"] as string) ?? "";

	const grid = Grid.fromString(sudokuString);
	if (grid.err !== null) {
		return new Response(grid.err, { status: 400 });
	}

	const solved = Solver.solve(grid.ok);
	if (solved.err !== null) {
		return new Response(`Could not solve sudoku game.`, { status: 500 });
	}

	return new Response(solved.ok.toString(), { status: 200 });
}
