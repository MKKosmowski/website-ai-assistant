"use client";
import { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";

const Form = ({ messages, setMessages, contextHistory, setContextHistory }) => {
	const [prompt, setPrompt] = useState("");
	const [valInfo, setValInfo] = useState("");
	const [wait, setWait] = useState(false);

	function query(prompt) {
		if (prompt.trim() == "") {
			setValInfo("Pole nie może być puste!");
			return;
		} else if (wait) return;

		setWait(true);
		setPrompt("");
		setMessages((prev) => [...prev, { role: "user", content: prompt }]);
		setContextHistory((prev) => [...prev, { role: "user", content: prompt }]);
	}

	useEffect(() => {
		const getAIAnswer = async () => {
			const result = await fetch("/api/query", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ history: contextHistory }),
			});

			const { answer, history } = await result.json();
			setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
			setContextHistory(history);

			setWait(false);
		};

		if (messages.length > 0 && messages[messages.length - 1]?.role === "user") {
			getAIAnswer();
		}
	}, [messages]);

	useEffect(() => {
		if (!prompt.trim() == "") setValInfo("");
	}, [prompt]);

	return (
		<section className="fixed bottom-0 left-0 right-0 w-full pointer-events-none flex justify-center">
			<div className="w-full max-w-3xl p-4 pointer-events-auto">
				<div className="rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-2xl">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							query(prompt);
						}}
						className="relative flex items-center p-4 gap-4"
					>
						<textarea
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									query(prompt);
								}
							}}
							className="prompt_input"
							disabled={wait}
							placeholder="Zadaj pytanie..."
							rows={1}
						/>
						<button
							type="submit"
							disabled={wait || !prompt.trim()}
							className="p-2 rounded-md bg-blue-600 text-white transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
						>
							<IoSend size={20} />
						</button>
					</form>
					{valInfo && !wait && (
						<p className="pt-0 p-2 text-red-400 text-sm text-center">
							{valInfo}
						</p>
					)}
					{wait && (
						<p className="pt-0 p-2 text-blue-400 text-sm text-center animate-pulse">
							Oczekiwanie na odpowiedź...
						</p>
					)}
				</div>
			</div>
		</section>
	);
};

export default Form;
