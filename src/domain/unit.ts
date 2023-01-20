import Cell from "./cell";

export default class Unit {
	public readonly cells: Cell[];
	public readonly candidates: number[];
	public readonly numbers: number[];

	constructor(cells: Cell[]) {
		this.cells = cells;

		this.candidates = [...new Set(cells.flatMap((c) => c.candidates))].sort();

		this.numbers = cells
			.map((c) => c.number)
			.filter((n) => n > 0)
			.sort();
	}
}
