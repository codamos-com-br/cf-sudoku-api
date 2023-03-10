export default class Cell {
	public readonly column: number;
	public readonly row: number;
	public readonly box: number;
	public number: number;
	public candidates: number[];

	constructor(
		column: number,
		row: number,
		candidates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9],
		number: number = 0
	) {
		this.column = column;
		this.row = row;
		this.number = number;
		this.candidates = candidates;

		this.box = this.calculateBoxIndex(column, row);
	}

	private calculateBoxIndex(column: number, row: number): number {
		const bcol = Math.floor(column / 3);
		const brow = Math.floor(row / 3);

		return Math.floor(brow * 3 + bcol);
	}

	public setNumber(n: number): Cell {
		let candidates = [] as number[];
		if (n === 0) {
			candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		}

		this.candidates = candidates;
		this.number = n;
		return this;
	}

	public dropCandidate(candidate: number): Cell {
		this.candidates = this.candidates.filter((c) => c !== candidate);
		return this;
	}
}
