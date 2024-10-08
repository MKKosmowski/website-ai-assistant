"use client";

import { useState } from "react";

import Form from "@components/Form";
import Chat from "@components/Chat";
import Header from "@components/Header";

const Home = () => {
	const [messages, setMessages] = useState([]);

	return (
		<div>
			<Header setMessages={setMessages} />

			<main>
				<Chat messages={messages} />

				<Form messages={messages} setMessages={setMessages} />
			</main>
		</div>
	);
};

export default Home;
