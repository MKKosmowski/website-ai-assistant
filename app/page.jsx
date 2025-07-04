"use client";

import { useState } from "react";

import Form from "@components/Form";
import Chat from "@components/Chat";
import Header from "@components/Header";

const Home = () => {
	const [messages, setMessages] = useState([]);
	const [contextHistory, setContextHistory] = useState([]);

	const clearChat = () => {
		setMessages([]);
		setContextHistory([]);
	};

	return (
		<div>
			<Header setMessages={clearChat} />

			<main>
				<Chat messages={messages} />

				<Form
					messages={messages}
					setMessages={setMessages}
					contextHistory={contextHistory}
					setContextHistory={setContextHistory}
				/>
			</main>
		</div>
	);
};

export default Home;
