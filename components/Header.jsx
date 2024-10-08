import React from "react";
import { LiaCheeseSolid } from "react-icons/lia";

const Header = ({ setMessages }) => {
	return (
		<header className="w-full h-20 flex flex-row items-center gap-10 px-10 font-satoshi">
			<h1 className="font-extrabold text-4xl w-fit flex items-center">
				<LiaCheeseSolid />
				&nbsp;<span className="gradient">Serowisor</span>&nbsp;
				<LiaCheeseSolid />
			</h1>
			<div className="flex justify-end w-full text-end">
				<input
					type="button"
					value="Nowy Chat"
					onClick={(e) => {
						e.preventDefault();
						setMessages([]);
					}}
					className="btn ml-10"
				/>
			</div>
		</header>
	);
};

export default Header;
