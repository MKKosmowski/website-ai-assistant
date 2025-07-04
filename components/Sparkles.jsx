"use client";
import React, { useState, useEffect } from "react";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const useSparkles = (
	{ color = "hsl(195, 100%, 50%)" } = {
		color: "hsl(195, 100%, 50%)",
	}
) => {
	const [sparkles, setSparkles] = useState([]);

	useEffect(() => {
		const generateSparkle = () => {
			const now = Date.now();
			const sparkle = {
				id: String(now + random(0, 1000)),
				createdAt: now,
				color: `hsl(195, 100%, ${random(70, 100)}%)`,
				size: random(10, 25),
				style: {
					top: random(0, 100) + "%",
					left: random(0, 100) + "%",
					zIndex: 3,
				},
			};
			return sparkle;
		};

		const interval = setInterval(() => {
			const newSparkle = generateSparkle();
			const now = Date.now();
			const nextSparkles = sparkles
				.filter((sp) => now - sp.createdAt < 1000)
				.concat(newSparkle);
			setSparkles(nextSparkles);
		}, 300);

		return () => clearInterval(interval);
	}, [color, sparkles]);

	return sparkles;
};

const SparkleInstance = ({ size, color, style }) => (
	<span className="sparkle-instance" style={style}>
		<svg
			width={size}
			height={size}
			viewBox="0 0 168 168"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M84 0L96.3165 59.6835L156 72L108.317 96.3165L120 156L84 116.317L48 156L59.6835 96.3165L12 72L71.6835 59.6835L84 0Z"
				fill={color}
			/>
		</svg>
	</span>
);

const Sparkles = ({ children }) => {
	const sparkles = useSparkles();
	return (
		<span style={{ position: "relative", display: "inline-block" }}>
			<span style={{ position: "relative", zIndex: 1 }}>{children}</span>
			{sparkles.map((sparkle) => (
				<SparkleInstance
					key={sparkle.id}
					color={sparkle.color}
					size={sparkle.size}
					style={sparkle.style}
				/>
			))}
		</span>
	);
};

export default Sparkles;
