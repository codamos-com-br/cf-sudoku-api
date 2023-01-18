export type Result<T, E> = { ok: T | null; err: E | null };

export function Ok<T>(v: T): Result<T, any & null> {
	return { ok: v, err: null };
}

export function Err<T>(e: T): Result<any & null, T> {
	return { ok: null, err: e };
}
