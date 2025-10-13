import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
	const titleRef = useRef(null);
	const btnRef = useRef(null);

	useEffect(() => {
		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
		tl.from(titleRef.current, { y: 50, opacity: 0, duration: 1 });
		tl.from(
			btnRef.current,
			{ scale: 0.8, opacity: 0, duration: 0.6 },
			"-=0.3"
		);
	}, []);

	return (
		<section className="text-center p-10 bg-white shadow-md rounded-2xl">
			<h1
				ref={titleRef}
				className="text-4xl font-bold mb-6 text-indigo-600">
				Welcome to React + Tailwind + GSAP
			</h1>
			<button
				ref={btnRef}
				className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
				Animate Me
			</button>
		</section>
	);
};

export default Hero;
