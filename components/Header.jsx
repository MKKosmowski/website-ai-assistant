import React from "react";
import Sparkles from "./Sparkles";

const Header = ({ setMessages }) => {
	return (
		<header className="w-full p-4 border-b border-gray-800">
			<div className="flex items-center justify-between max-w-3xl mx-auto">
				<h1 className="font-extrabold text-4xl w-fit flex items-center">
					<Sparkles>
						<span className="gradient">Asystent</span>
					</Sparkles>
				</h1>
				<div className="flex items-center">
					<input
						type="button"
						value="Nowy Chat"
						onClick={(e) => {
							e.preventDefault();
							setMessages();
						}}
						className="btn"
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
