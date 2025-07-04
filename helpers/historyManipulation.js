import OpenAI from "openai";

// Returns systemMessage (you are helpful AI [...])
// With summary of older messages
const summarizeMessages = async (messages, systemInfo, lastSummary = "") => {
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});

	// messages as string, not array of objects
	const messagesString = messages
		.map((message) => {
			if (message.role === "system") {
				return `System: ${message.content}`;
			} else if (message.role === "user") {
				return `User: ${message.content}`;
			} else {
				return `Assistant: ${message.content}`;
			}
		})
		.join("\n");

	const completion = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content:
					"You will be given a list of messages. Summarize them in a concise way. Write it as you will be the person who is reporting to person asked in conversation. E. g. 'you were asked about the capital of France and you replied that it is Paris.'. It should be max 1 paragraph. Don't use any prefixes or sufixes, just plain text like you are takling with a human. It's possible that you will receive a summary of very older messages. Include it in your summary (paraphrased). Include ALL information form old summary.",
			},
			{
				role: "user",
				content: `Summary of very older messages: ${lastSummary}\n\nMessages from conversation: ${messagesString}`,
			},
		],
	});

	const summary = completion.choices[0].message.content;

	return `${systemInfo} Here is summary of older messages (you are the assistant and the user you are talking is the 'user' from summary): ${summary}`;
};

export default summarizeMessages;
