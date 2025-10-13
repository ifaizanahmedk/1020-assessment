import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PRODUCTS } from "./constants";

import "swiper/css";
import "swiper/css/effect-creative";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const QualityProducts = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const descRef = useRef(null);
	const cursorRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	const swiperSectionRef = useRef(null);
	const [cursorVisible, setCursorVisible] = useState(false);

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

	useEffect(() => {
		const moveCursor = (e) => {
			const cursor = cursorRef.current;
			if (cursor && cursorVisible) {
				cursor.style.left = `${e.clientX}px`;
				cursor.style.top = `${e.clientY}px`;
			}
		};

		const handleDown = (e) => {
			if (
				swiperSectionRef.current &&
				swiperSectionRef.current.contains(e.target)
			) {
				setIsDragging(true);
				moveCursor(e);
			}
		};

		const handleUp = () => setIsDragging(false);

		const handleMouseEnter = () => setCursorVisible(true);
		const handleMouseLeave = () => setCursorVisible(false);

		// Track mouse movements and clicks
		document.addEventListener("pointermove", moveCursor);
		document.addEventListener("pointerdown", handleDown);
		document.addEventListener("pointerup", handleUp);

		// Track mouse enter/leave for the Swiper area
		if (swiperSectionRef.current) {
			swiperSectionRef.current.addEventListener(
				"mouseenter",
				handleMouseEnter
			);
			swiperSectionRef.current.addEventListener(
				"mouseleave",
				handleMouseLeave
			);
		}

		document.addEventListener("dragstart", (e) => e.preventDefault());

		return () => {
			document.removeEventListener("pointermove", moveCursor);
			document.removeEventListener("pointerdown", handleDown);
			document.removeEventListener("pointerup", handleUp);
			document.removeEventListener("dragstart", (e) =>
				e.preventDefault()
			);

			// Clean up mouse enter/leave events
			if (swiperSectionRef.current) {
				swiperSectionRef.current.removeEventListener(
					"mouseenter",
					handleMouseEnter
				);
				swiperSectionRef.current.removeEventListener(
					"mouseleave",
					handleMouseLeave
				);
			}
		};
	}, [cursorVisible]);

	return (
		<section
			ref={sectionRef}
			className="relative py-20 lg:py-32 bg-secondary">
			<div className="mx-auto">
				<div className="max-w-7xl text-center mx-auto mb-16 lg:mb-24 px-4">
					<h2
						ref={titleRef}
						className="text-4xl lg:text-6xl font-normal text-foreground mb-6">
						Quality Products
					</h2>
					<p
						ref={descRef}
						className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm lg:text-base">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat.
					</p>
				</div>

				<div className="relative h-[500px] lg:h-[700px] flex items-center justify-center overflow-hidden">
					<div
						className={`custom-cursor ${
							isDragging ? "grabbing" : "grab"
						} fixed z-50 pointer-events-none`}
						ref={cursorRef}
						style={{
							visibility: cursorVisible ? "visible" : "hidden", // Show cursor only when inside Swiper
						}}>
						Drag
					</div>
					<Swiper
						ref={swiperSectionRef}
						// modules={[EffectCreative]}
						// effect="creative"
						grabCursor={true}
						centeredSlides={true}
						initialSlide={1}
						// spaceBetween={125}
						slidesPerView={"auto"}
						loop={true}
						// coverflowEffect={{
						//   rotate: 0,
						//   stretch: 0,
						//   depth: 200,
						//   modifier: 1,
						//   slideShadows: false,
						// }}
						// creativeEffect={{
						//   prev: {
						//     shadow: false,
						//     translate: ["-120%", 0, -500],
						//     rotate: [0, 0, -30], // Tilt left (Z-axis)
						//   },
						//   next: {
						//     shadow: false,
						//     translate: ["120%", 0, -500],
						//     rotate: [0, 0, 30], // Tilt right (Z-axis)
						//   },
						// }}
						pagination={false}
						onSlideChange={(swiper) =>
							setCurrentIndex(swiper.realIndex)
						}
						className="w-full max-w-640 quality-swiper">
						{PRODUCTS.map((product, index) => (
							<SwiperSlide
								key={product.id}
								className="!w-[256px] lg:!w-[565px] px-6 lg:px-15">
								<div
									className={`relative w-full h-[332px] lg:h-[620px] overflow-hidden transition-all duration-500 ${
										index === currentIndex
											? "scale-100"
											: "scale-90 opacity-80"
									}`}>
									<img
										src={product.image}
										alt={product.title}
										className="w-full h-full object-cover"
										draggable={false}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className="text-center mt-12 lg:mt-16">
					<h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
						{PRODUCTS[currentIndex].title}
					</h3>
					<p className="text-muted-foreground text-sm lg:text-base">
						{PRODUCTS[currentIndex].location}
					</p>
				</div>
			</div>
		</section>
	);
};

export default QualityProducts;
