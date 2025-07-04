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
		<div className="flex flex-col h-screen">
			<Header setMessages={clearChat} />
			<Chat messages={messages} />
			<Form
				messages={messages}
				setMessages={setMessages}
				contextHistory={contextHistory}
				setContextHistory={setContextHistory}
			/>
		</div>
	);
};

export default Home;
