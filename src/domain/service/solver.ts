import { Err, Ok, Result } from "../../utils/result";
import Grid from "../grid";

export default class Solver {
	public static solve(input: Grid): Result<Grid, string> {
		if (input.cells[0][0].number === 0) {
			return Err("Not implemented");
		}

		return Ok(input);
	}
}
