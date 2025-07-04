import OpenAI from "openai";
import summarizeMessages from "@helpers/historyManipulation";

export const POST = async (req, res) => {
	// Data and constants
	let { history } = await req.json();
	const systemInfo = `You are a helpful AI assistant working in a cheese company. Generate concise and succinct statements. If you are unsure of the answer to a question, say so. If you are unsure of meaning of the question, also say so. Answer in the language of the question! Answer without any prefixes or sufixes, just plain text like you are takling with a human. You are always very kind.`;
	const recentMessagesAmount = 5;

	// OpenAI initialization
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	try {
		// Extracting recent messages and summarizing older
		if (history.length - 1 > recentMessagesAmount) {
			let lastSummary = "";
			const separator =
				"Here is summary of older messages (you are the assistant and the user you are talking is the 'user' from summary):";

			// Check for a system message and extract summary if it exists
			if (history[0].role === "system") {
				const systemContent = history[0].content;
				if (systemContent.includes(separator)) {
					lastSummary = systemContent.split(separator)[1]?.trim() || "";
				}
				// Always remove the old system message, as it will be replaced by a new one.
				history.shift();
			}

			const recentMessages = history.slice(-recentMessagesAmount);
			const oldMessages = history.slice(0, -recentMessagesAmount);

			const summary = await summarizeMessages(
				oldMessages,
				systemInfo,
				lastSummary
			);

			// Rebuild history with the new summary and recent messages
			history = [{ role: "system", content: summary }, ...recentMessages];
		}

		// Adding systemMessage if it is not in history
		if (history[0].role !== "system") {
			history.unshift({ role: "system", content: systemInfo });
		}

		// Getting AI completion
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: history,
		});

		const answer = completion.choices[0].message.content;
		history.push({ role: "assistant", content: answer });

		return new Response(JSON.stringify({ answer: answer, history: history }), {
			status: 200,
		});
	} catch (error) {
		return new Response(JSON.stringify({ answer: `Błąd serwera: ${error}` }), {
			status: 500,
		});
	}
};
