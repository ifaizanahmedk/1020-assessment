import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/effect-fade";
import { SLIDES } from "./constants";

const Hero = () => {
	const [swiperInstance, setSwiperInstance] = useState(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [nextSlideIndex, setNextSlideIndex] = useState(1);
	const [progress, setProgress] = useState(0);

	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const progressRef = useRef(null);

	const totalSlides = SLIDES.length;
	const autoplayDuration = 5000;

	useEffect(() => {
		animateTextChange();
	}, []);

	const animateTextChange = () => {
		if (!titleRef.current || !subtitleRef.current) return;

		const titleChildren = Array.from(titleRef.current.children);
		if (titleChildren.length === 0) return;

		const tl = gsap.timeline();

		tl.to([...titleChildren, subtitleRef.current], {
			y: -30,
			opacity: 0,
			duration: 0.5,
			stagger: 0.1,
			ease: "power2.in",
		})
			.fromTo(
				subtitleRef.current,
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
			)
			.fromTo(
				titleChildren,
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.12,
					ease: "power3.out",
				},
				"-=0.3"
			);
	};

	const handleSlideChange = (swiper) => {
		const current = swiper.realIndex;
		setCurrentSlide(current);
		setNextSlideIndex((current + 1) % totalSlides);
		setProgress(0);
		animateTextChange();
	};

	const handleProgress = (_swiper, time, progressValue) => {
		setProgress(progressValue * 100);
	};

	const handleNext = () => {
		if (swiperInstance) {
			swiperInstance.slideNext();
			setProgress(0);
		}
	};

	return (
		<section className="relative w-full h-screen overflow-hidden">
			<Swiper
				modules={[Autoplay, EffectFade]}
				effect="fade"
				speed={1200}
				autoplay={{
					delay: autoplayDuration,
					disableOnInteraction: false,
				}}
				loop={true}
				onSwiper={setSwiperInstance}
				onSlideChange={handleSlideChange}
				onAutoplayTimeLeft={handleProgress}
				className="h-full w-full">
				{SLIDES.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="relative w-full h-full">
							<img
								src={slide.image}
								alt={slide.alt}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-black/30" />
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="absolute inset-0 z-10 flex flex-col justify-center">
				<div className="container mx-auto max-w-8xl px-4 lg:px-0">
					<p
						ref={subtitleRef}
						className="text-sm md:text-base text-white/90 font-light tracking-wider mb-4 md:mb-6">
						{SLIDES[currentSlide].subtitle}
					</p>
					<h1
						ref={titleRef}
						className="!text-5xl md:!text-7xl lg:!text-8xl font-normal text-white leading-tight">
						<span className="block">
							{SLIDES[currentSlide].title[0]}
						</span>
						<span className="block">
							{SLIDES[currentSlide].title[1]}
						</span>
					</h1>
				</div>
			</div>

			<div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-20">
				<div className="container mx-auto max-w-8xl">
					<div className="flex items-end gap-8 md:gap-12 px-4 lg:px-0">
						<div className="relative">
							<button
								onClick={handleNext}
								className="group relative block"
								aria-label="Next slide">
								<svg
									className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)]"
									viewBox="0 0 120 120">
									<rect
										x="2"
										y="2"
										width="116"
										height="116"
										fill="none"
										stroke="rgba(255,255,255,0.3)"
										strokeWidth="2"
									/>
									<rect
										ref={progressRef}
										x="2"
										y="2"
										width="116"
										height="116"
										fill="none"
										stroke="white"
										strokeWidth="10"
										strokeDasharray="464"
										strokeDashoffset={
											464 - (464 * progress) / 100
										}
										style={{
											transition:
												"stroke-dashoffset 0.1s linear",
										}}
									/>
								</svg>

								<div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden">
									<img
										src={SLIDES[nextSlideIndex].image}
										alt={SLIDES[nextSlideIndex].alt}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 p-4"
									/>
									<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
								</div>

								<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs md:text-sm font-medium">
									Next
								</span>
							</button>
						</div>

						<div className="flex items-center gap-4 text-white pb-2">
							<span className="text-xl md:text-2xl font-light">
								{String(currentSlide + 1).padStart(2, "0")}
							</span>
							<div className="w-16 md:w-20 h-px bg-white/50" />
							<span className="text-xl md:text-2xl font-light">
								{String(totalSlides).padStart(2, "0")}
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
