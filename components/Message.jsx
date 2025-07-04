import React from "react";
import { FaRegUser, FaRobot } from "react-icons/fa";

const Message = ({ role, content }) => {
	return (
		<div className="message">
			<div
				className={`message-icon ${
					role === "ai" ? "bg-blue-900/50" : "bg-gray-700/50"
				}`}
			>
				{role == "ai" ? <FaRobot size={24} /> : <FaRegUser size={20} />}
			</div>
			<div className="message-content">{content}</div>
		</div>
	);
};

export default Message;
