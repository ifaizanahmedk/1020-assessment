import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";
import "swiper/css/effect-fade";

import Pagination from "@/components/Pagination";
import { SLIDES } from "./constants";

import "./styles.css";

const Hero = () => {
	const [swiperInstance, setSwiperInstance] = useState(null);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [nextSlideIndex, setNextSlideIndex] = useState(1);

	const titleRef = useRef(null);
	const subtitleRef = useRef(null);
	const progressRef = useRef(null);

	const totalSlides = SLIDES.length;
	const autoplayDuration = 3000;

	const pathLength = 464;

	useEffect(() => {
		animateTextOnChange();
		animateProgressBar();
	}, [currentSlide]);

	const animateTextOnChange = () => {
		if (!titleRef.current || !subtitleRef.current) return;

		const titleChildren = Array.from(titleRef.current.children);
		const currSlideIdx = document.querySelector(".curr-slide-idx");
		if (titleChildren.length === 0) return;

		const tl = gsap.timeline();

		tl.fromTo(
			[...titleChildren, subtitleRef.current],
			{ y: 0, opacity: 0 },
			{
				y: -30,
				opacity: 0,
				duration: 0.4,
				stagger: 0.15,
				ease: "power3.in",
			}
		)
			.fromTo(
				currSlideIdx,
				{ y: 10, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.2,
					stagger: 0.1,
					ease: "power4.out",
				},
				"-=0.4"
			)
			.fromTo(
				subtitleRef.current,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.75,
					ease: "power4.out",
				}
			)
			.fromTo(
				titleChildren,
				{ y: 60, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					stagger: 0.18,
					ease: "power4.out",
				},
				"-=0.4"
			);
	};

	const animateProgressBar = () => {
		if (!progressRef.current) return;

		gsap.set(progressRef.current, { strokeDashoffset: 0 });

		const progressAnimation = gsap.fromTo(
			progressRef.current,
			{
				strokeDashoffset: 0,
			},
			{
				strokeDashoffset: pathLength,
				duration: autoplayDuration / 1000,
				ease: "linear",
				stroke: "#fff",
				strokeWidth: 10,
			}
		);

		return progressAnimation;
	};

	const handleNext = useCallback(() => {
		if (swiperInstance) {
			swiperInstance.slideNext();
			animateProgressBar();
		}
	}, [totalSlides, swiperInstance]);

	const handleProgress = (_swiper, time, progressValue) => {
		if (!progressRef.current) return;

		const dashOffset = pathLength - pathLength * progressValue;

		gsap.to(progressRef.current, {
			strokeDashoffset: dashOffset,
			duration: 0.1,
			ease: "linear",
		});
	};

	const handleBeforeSlideChangeStart = (swiper) => {
		const activeSlide = swiper.slides[swiper.activeIndex];
		const nextSlide = swiper.slides[swiper.activeIndex + 1];
		const prevSlide = swiper?.slides[swiper?.activeIndex - 1];

		if (!activeSlide) return;

		const mainImg = activeSlide.querySelector(".slide-main-img");
		const nextMainImg = nextSlide.querySelector(".slide-main-img");

		swiper.wrapperEl.style.backgroundImage = `url(${nextMainImg.src})`;

		activeSlide.style.opacity = `1 !important`;
		nextSlide.style.opacity = `1 !important`;

		activeSlide.style.zIndex = 10;
		nextSlide.style.zIndex = 5;

		activeSlide.style.transitionDuration = 0;
		nextSlide.style.transitionDuration = 0;

		if (prevSlide) {
			prevSlide.style.opacity = `0`;
			prevSlide.style.zIndex = 1;
		}
	};

	const handleSlideChangeTransitionStart = (swiper) => {
		const currSlide = swiper.slides[swiper.previousIndex];
		const nextSlide = swiper.slides[swiper.activeIndex];
		if (!currSlide) return;
		const topHalf = currSlide.querySelector(".slide-half-top");
		const bottomHalf = currSlide.querySelector(".slide-half-bottom");
		const tl = gsap.timeline();
		tl.fromTo(
			topHalf,
			{
				height: "450px",
				duration: 0,
				ease: "power1.in",
			},
			{
				height: 0,
				duration: 3.5,
				ease: "power1.out",
			},
			0.09
		).fromTo(
			bottomHalf,
			{
				height: "450px",
				duration: 0,
				ease: "power1.in",
			},
			{
				height: 0,
				duration: 3.5,
				ease: "power1.out",
			},
			0.09
		);
	};

	const handleOnSlideChange = (swiper) => {
		setCurrentSlide(swiper.realIndex);
		setNextSlideIndex((swiper.realIndex + 1) % totalSlides);
		const prevSlide = swiper.slides[swiper.previousIndex];
		if (!prevSlide) return;
		const topHalf = prevSlide.querySelector(".slide-half-top");
		const bottomHalf = prevSlide.querySelector(".slide-half-bottom");
		gsap.set([topHalf, bottomHalf], { height: "450px" });
	};

	return (
		<section className="relative w-full h-[900px] overflow-hidden">
			<Swiper
				modules={[Autoplay, EffectFade]}
				effect="fade"
				speed={3000}
				fadeEffect={{ crossFade: false }}
				autoplay={{
					delay: autoplayDuration,
					disableOnInteraction: false,
				}}
				loop={true}
				onSwiper={setSwiperInstance}
				allowSlidePrev={false}
				allowTouchMove={false}
				onBeforeSlideChangeStart={handleBeforeSlideChangeStart}
				onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
				onSlideChange={handleOnSlideChange}
				onAutoplayTimeLeft={handleProgress}
				className="relative h-full w-full">
				{SLIDES.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="relative w-full h-full">
							<div className="slide-half-top absolute top-0 w-full h-[900px] flex items-start justify-center transition-transform duration-800 ease-out overflow-hidden">
								<div className="slide-half-top-wrapper w-full h-[450px]">
									<div
										className="slide-half-top-img w-full h-[900px]"
										style={{
											backgroundImage: `url(${slide.image})`,
										}}></div>
								</div>
							</div>
							<div className="slide-half-bottom absolute top-auto bottom-0 w-full h-[900px] flex items-end justify-center transition-transform duration-800 ease-out overflow-hidden">
								<div className="slide-half-bottom-wrapper w-full h-[450px]">
									<div
										className="slide-half-bottom-img w-full h-[900px]"
										style={{
											backgroundImage: `url(${slide.image})`,
										}}></div>
								</div>
							</div>
							<img
								src={slide.image}
								alt={slide.alt}
								className="w-full h-full object-cover slide-main-img opacity-0"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className="absolute inset-0 z-10 flex flex-col justify-center">
				<div className="container mx-auto max-w-8xl px-4 lg:px-0">
					<p
						ref={subtitleRef}
						className="text-sm md:text-base text-white/90 font-light tracking-wider mb-4 md:mb-6 overflow-hidden">
						{SLIDES[currentSlide].subtitle}
					</p>
					<h1
						ref={titleRef}
						className="max-w-3xl !text-5xl lg:!text-6xl font-normal text-white leading-none capitalize overflow-hidden">
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
					<div className="flex items-center gap-8 md:gap-12 px-4 lg:px-0">
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
										strokeDasharray={pathLength}
										strokeDashoffset={pathLength}
									/>
								</svg>

								<div className="relative w-24 h-24 md:w-28 md:h-28 overflow-hidden">
									<img
										src={SLIDES[nextSlideIndex].image}
										alt={SLIDES[nextSlideIndex].alt}
										className="w-full h-full object-cover p-4"
									/>
									<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
								</div>
								<span
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white
										text-sm lg:text-base font-normal transition-transform duration-300 group-hover:scale-130">
									Next
								</span>
							</button>
						</div>
						<Pagination
							currentPage={currentSlide}
							totalPages={totalSlides}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
