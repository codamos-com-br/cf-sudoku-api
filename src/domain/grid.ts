import Cell from "./cell";

export default class Grid {
	public readonly cells: Cell[][];

	constructor(cells: Cell[][]) {
		this.cells = cells;
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

	public setNumber(n: number, col: number, row: number): Grid {
		const cells = this.cells.map((rows) =>
			rows.map((c) => new Cell(c.column, c.row, c.candidates, c.number))
		);
		cells[row][col] = cells[row][col].setNumber(n);

		return new Grid(cells);
	}

	public static fromString(sudoku: string): Grid {
		if (sudoku.length !== 81) {
			throw new Error('Invalid sudoku string: provide a 81-length digits stream.');
		}

		const res = Grid.empty();

		let i = 0;
		for (let r = 0; r < 9; ++r) {
			for (let c = 0; c < 9; ++c) {
				if (sudoku[i] < '0' || sudoku[i] > '9') {
					throw new Error('Invalid sudoku string: all characters must be a 0 to 9 digit.');
				}

				res.cells[r][c] = new Cell(c, r).setNumber(parseInt(sudoku[i++]));
			}
		}

		return res;
	}

	public toString(): string {
		return this.cells
			.map((cells) => cells.map((c) => c.number).join(""))
			.join("");
	}
}
