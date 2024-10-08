import LlamaAI from "llamaai";

export const POST = async (req, res) => {
	const { history } = await req.json();

	const systemMess =
		"You are a helpful AI assistant working in a cheese company. Generate concise and succinct statements. If you are unsure of the answer to a question, say so. If you are unsure of meaning of the question, also say so. Answer in the language of the question! Answer without any prefixes or sufixes, just plain text like you are takling with a human. You are always very kind.";

	const chain = [{ role: "system", content: systemMess }, ...history];

	try {
		// initialization
		const apiToken = process.env.LLAMAAPI_TOKEN;
		const llamaAPI = new LlamaAI(apiToken);

		// building the request
		const apiRequestJson = {
			model: "llama3-70b",
			messages: chain,
		};

		// getting the response from llama
		const lamaRes = await llamaAPI.run(apiRequestJson);
		const answer = await lamaRes.choices[0].message.content;

		// response with data
		return new Response(JSON.stringify({ answer: `${answer}` }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ answer: `Błąd serwera: ${error}` }), {
			status: 500,
		});
	}
};
