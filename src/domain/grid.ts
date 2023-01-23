import { Err, Ok, Result } from "../utils/result";
import Cell from "./cell";
import Unit from "./unit";

export default class Grid {
	public cells: Cell[][];
	public boxes: Map<number, Unit>;
	public rows: Map<number, Unit>;
	public columns: Map<number, Unit>;

	constructor(cells: Cell[][]) {
		this.cells = cells;
		this.boxes = new Map();
		this.rows = new Map();
		this.columns = new Map();

		for (let i = 0; i < 9; ++i) {
			this.boxes.set(i, new Unit(this.cells.flat().filter((c) => c.box === i)));
			this.rows.set(i, new Unit(this.cells.flat().filter((c) => c.row === i)));
			this.columns.set(
				i,
				new Unit(this.cells.flat().filter((c) => c.column === i))
			);
		}
	}

	static empty(): Grid {
		const cells: Cell[][] = [];
		for (let r = 0; r < 9; ++r) {
			cells.push([]);
			for (let c = 0; c < 9; ++c) {
				cells[r].push(new Cell(c, r));
			}
		}

		return new Grid(cells);
	}

	public static fromString(sudoku: string): Result<Grid, string> {
		if (sudoku.length !== 81) {
			return Err("Invalid sudoku string: provide a 81-length digits stream.");
		}

		const res = Grid.empty();

		let i = 0;
		for (let r = 0; r < 9; ++r) {
			for (let c = 0; c < 9; ++c) {
				if (sudoku[i] < "0" || sudoku[i] > "9") {
					return Err(
						"Invalid sudoku string: all characters must be a 0 to 9 digit."
					);
				}

				res.cells[r][c].setNumber(parseInt(sudoku[i++]));
			}
		}

		return Ok(res);
	}

	public toString(): string {
		return this.cells
			.map((cells) => cells.map((c) => c.number).join(""))
			.join("");
	}

	public solved(): boolean {
		return this.toString().includes("0") === false;
	}
}
