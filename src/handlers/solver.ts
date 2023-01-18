import { IRequest } from "itty-router";
import Grid from "../domain/grid";

export default async function handle(req: IRequest): Promise<Response> {
	const sudokuString = (req.query["input"] as string) ?? "";

	const { ok, err } = Grid.fromString(sudokuString);
	if (err !== null) {
		return new Response(err, { status: 400 });
	}

	return new Response(ok?.toString(), { status: 200 });
}
