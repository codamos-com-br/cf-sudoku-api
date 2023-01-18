import Cell from "./cell";

export default class Unit {
	public readonly cells: Cell[];
	public readonly candidates: number[];
	public readonly numbers: number[];

	constructor(cells: Cell[]) {
		this.cells = cells;

		let candidates = [];
		for (let c of cells) {
			candidates.push(...c.candidates);
		}
		this.candidates = [...new Set(candidates)].sort();

		this.numbers = cells
			.map((c) => c.number)
			.filter((n) => n > 0)
			.sort();
	}
}
