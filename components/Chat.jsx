import React from "react";
import Message from "./Message";

const Chat = ({ messages }) => {
	return (
		<section className="mt-10 mb-72">
			{messages.length > 0 ? (
				messages.map((mes, key) => {
					const role = mes.role == "assistant" ? "ai" : "user";
					const content = mes.content;

					return <Message key={key} role={role} content={content} />;
				})
			) : (
				<Message role="ai" content="Napisz swoją pierwszą wiadomość!" />
			)}
		</section>
	);
};

export default Chat;
