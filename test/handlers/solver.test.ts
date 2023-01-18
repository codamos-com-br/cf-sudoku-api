import handleRequest from "../../src/handler";

const defaultEnv = {
	SOLVER_TIMEOUT_MS: 10,
	MAX_SOLVING_ATTEMPTS: 100,
};

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
			}),
			defaultEnv
		);

		expect(res.status).toBe(200);
		expect(await res.text()).toBe(output);
	});
});

test("POST /api/v1/solve 408", async () => {
	const res = await handleRequest(
		new Request(
			`http://sudoku.codamos.com.br/api/v1/solve?input=489721563135486279267593841378614952621958437954372186713849625542167398896235714`,
			{
				method: "POST",
			}
		),
		{ ...defaultEnv, SOLVER_TIMEOUT_MS: -1 }
	);

	expect(res.status).toBe(408);
});

test("POST /api/v1/solve returns 400", async () => {
	const invalidLengthSudokuString = "0".repeat(80);

	const res = await handleRequest(
		new Request(
			`http://sudoku.codamos.com.br/api/v1/solve?input=${invalidLengthSudokuString}`,
			{
				method: "POST",
			}
		),
		defaultEnv
	);

	expect(res.status).toBe(400);
	expect(await res.text()).toBe(
		"Invalid sudoku string: provide a 81-length digits stream."
	);

	const invalidCharactersSudokuString = "a".repeat(81);
	const res2 = await handleRequest(
		new Request(
			`http://sudoku.codamos.com.br/api/v1/solve?input=${invalidCharactersSudokuString}`,
			{
				method: "POST",
			}
		)
	);

	expect(res2.status).toBe(400);
	expect(await res2.text()).toBe(
		"Invalid sudoku string: all characters must be a 0 to 9 digit."
	);
});

test("POST /api/v1/solve returns 500", async () => {
	const impossibleSudoku = "0".repeat(81);

	const res = await handleRequest(
		new Request(
			`http://sudoku.codamos.com.br/api/v1/solve?input=${impossibleSudoku}`,
			{
				method: "POST",
			}
		),
		defaultEnv
	);

	expect(res.status).toBe(500);
	expect(await res.text()).toBe("Could not solve sudoku game.");
});
