import "@styles/globals.css";

export const metadata = {
	title: "Ser GPT",
	description: "Sztuczna Inteligencja pomagająca w pracy w firmie.",
};

function RootLayout({ children }) {
	return (
		<html lang="pl-PL">
			<body>
				<div className="main">
					<div className="bggradient" />
				</div>

				<div className="app">{children}</div>
			</body>
		</html>
	);
}

export default RootLayout;
