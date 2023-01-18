import handleRequest from "../src/handler";

test("Any other route returns 'Not found'", async () => {
	const result = await handleRequest(
		new Request("http://api.codamos.com.br/", { method: "GET" })
	);
	expect(result.status).toBe(404);

	const text = await result.text();
	expect(text).toBe("Not found");
});
