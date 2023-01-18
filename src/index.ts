export interface Env {}

export const worker = {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return new Response(`Hello World from ${request.method}!`);
	},
};
