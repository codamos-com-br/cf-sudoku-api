import { handleRequest } from "../../src/handler";

test("POST /api/v1/solve returns 200", async () => {
	const res = await handleRequest(
		new Request("http://sudoku.codamos.com.br/api/v1/solve", { method: "POST" })
	);

	expect(res.status).toBe(200);
});
