import React from "react";
import { FaRegUser, FaRobot } from "react-icons/fa";

const Message = ({ role, content }) => {
	return (
		<div
			className={
				role == "ai" ? "message border-orange-600" : "message border-amber-400"
			}
		>
			<div className={role == "ai" ? "text-orange-600" : "text-amber-400"}>
				{role == "ai" ? <FaRobot size={35} /> : <FaRegUser size={30} />}
			</div>
			<div>{content}</div>
		</div>
	);
};

export default Message;
