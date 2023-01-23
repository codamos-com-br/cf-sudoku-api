import Cell from "./cell";

export default class Unit {
	public readonly cells: Cell[];
	public readonly numbers: number[];

	constructor(cells: Cell[]) {
		this.cells = cells;

		this.numbers = cells
			.map((c) => c.number)
			.filter((n) => n > 0)
			.sort();
	}

	public without(c: Cell): Unit {
		return new Unit(this.cells.filter((c2) => c !== c2));
	}

	public candidates(): number[] {
		return [...new Set(this.cells.flatMap((c) => c.candidates))].sort();
	}
}
