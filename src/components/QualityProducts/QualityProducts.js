import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductsSlider from "@/components/ProductsSlider";

import { PRODUCTS } from "./constants";

import "./styles.css";

gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger);

const QualityProducts = () => {
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const descRef = useRef(null);

	useEffect(() => {
		if (titleRef.current) {
			gsap.fromTo(
				titleRef.current,
				{ y: 50, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%",
						end: "top 50%",
						toggleActions: "play none none none",
					},
				}
			);
		}

		if (descRef.current) {
			gsap.fromTo(
				descRef.current,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%",
						end: "top 50%",
						toggleActions: "play none none none",
					},
					delay: 0.3,
				}
			);
		}
	}, []);

	return (
		<section
			ref={sectionRef}
			className="relative py-20 lg:py-32 bg-secondary">
			<div className="mx-auto">
				<div className="max-w-7xl text-center mx-auto mb-16 lg:mb-24 px-4">
					<h2
						ref={titleRef}
						className="sec-products-title text-4xl lg:text-6xl font-normal text-foreground mb-12 overflow-hidden">
						Quality Products
					</h2>
					<p
						ref={descRef}
						className="sec-products-subtitle text-muted-foreground max-w-3xl mx-auto text-sm text-center text-[24px] leading-[1.25] text-[#7A7777] overflow-hidden">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat.
					</p>
				</div>

				<div className="relative h-[500px] lg:h-[700px] flex items-center justify-center">
					<ProductsSlider slides={PRODUCTS} />
				</div>
			</div>
		</section>
	);
};

export default QualityProducts;
