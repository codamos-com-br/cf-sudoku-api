export class Result<T, E> {
	public readonly ok: T;
	public readonly err: E;

	constructor(ok: T, err: E) {
		this.ok = ok;
		this.err = err;
	}
}

export function Ok<T>(v: T): Result<T, any & null> {
	return new Result(v, null);
}

export function Err<T>(e: T): Result<any & null, T> {
	return new Result(null, e);
}
