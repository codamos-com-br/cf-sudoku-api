import { handleRequest } from "../../src/handler";

test("POST /api/v1/solve returns 200", async () => {
	const sudokuString =
		"409701003005400200060503040078614900000958400954372186013840020042100308890235014";
	const res = await handleRequest(
		new Request(
			`http://sudoku.codamos.com.br/api/v1/solve?input=${sudokuString}`,
			{ method: "POST" }
		)
	);

	expect(res.status).toBe(200);
});
