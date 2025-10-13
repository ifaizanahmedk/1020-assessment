import React from "react";
import Hero from "./components/Hero";
import Header from "./components/Header";
import QualityProducts from "./components/QualityProducts";

const App = () => {
	return (
		<div className="min-h-screen">
			<Header />
			<main>
				<Hero />
				<QualityProducts />
			</main>
		</div>
	);
};

export default App;
