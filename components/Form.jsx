"use client";
import { useState, useEffect } from "react";

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
		<section className="mt-10">
			<div
				className=" mb-10 w-fit mx-auto py-10 px-5
				rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5 fixed left-[50vw] translate-x-[-50%] bottom-10"
			>
				<form
					action=""
					className="flex flex-row justify-center items-center gap-5"
				>
					<textarea
						type="text"
						value={prompt}
						onChange={(e) => {
							setPrompt(e.target.value);
						}}
						className="w-[30vw] p-3 font-satoshi rounded-xl resize-y text-lg"
						disabled={wait}
						placeholder="Zadaj pytanie..."
					/>

					<input
						type="submit"
						value="Prześlij"
						onClick={(e) => {
							e.preventDefault();
							query(prompt);
						}}
						className="btn"
					/>
				</form>

				{valInfo != "" && !wait && (
					<div className="mt-5 text-red-600 font-bold text-center">
						{valInfo}
					</div>
				)}

				{wait && (
					<div className="mt-5 text-orange-600 font-bold text-center">
						Oczekiwanie na odpowiedź...
					</div>
				)}
			</div>
		</section>
	);
};

export default Form;
