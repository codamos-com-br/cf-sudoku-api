import { IRequest, Router } from "itty-router";
import handleSolve from "./handlers/solver";

const r = Router();

function notFoundHandler(req: IRequest): Response {
	return new Response("Not found", { status: 404 });
}

r.post("/api/v1/solve", handleSolve).get("*", notFoundHandler);

export const handleRequest = (req: Request) => r.handle(req);
