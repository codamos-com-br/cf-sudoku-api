import handleRequest from "./handler";

export interface Env {}

export default {
	async fetch(req: Request, env: Env, _: ExecutionContext): Promise<Response> {
		return await handleRequest(req, env);
	},
};
