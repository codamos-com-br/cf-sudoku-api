import { IRequest } from "itty-router";

export default async function handle(req: IRequest): Promise<Response> {
	return new Response("", { status: 200 });
}
