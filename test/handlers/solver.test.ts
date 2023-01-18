import { handleRequest } from "../../src/handler";

test("POST /api/v1/solve returns 200", async () => {
	const solvableStrings = [
		{
			input:
				"489721563135486279267593841378614952621958437954372186713849625542167398896235714",
			output:
				"489721563135486279267593841378614952621958437954372186713849625542167398896235714",
		},
	];

	solvableStrings.forEach(async ({ input, output }) => {
		const res = await handleRequest(
			new Request(`http://sudoku.codamos.com.br/api/v1/solve?input=${input}`, {
				method: "POST",
			})
		);

		expect(res.status).toBe(200);
		expect(await res.text()).toBe(output);
	});
});
