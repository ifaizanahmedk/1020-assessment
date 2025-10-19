import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import "./styles.css";

gsap.registerPlugin(Draggable);

const ProductsSlider = ({ slides = [] }) => {
	const productSliderRef = useRef(null);
	const draggableProxyRef = useRef(null);
	const cardRefs = useRef([]);
	const animationTimelineRef = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(1);

	const [isDragging, setIsDragging] = useState(false);
	const [cursorVisible, setCursorVisible] = useState(false);
	const cursorRef = useRef(null);

	const cardWidth = 485;
	const cardRotation = -25;
	const numCards = slides.length;
	const cardStep = 1 / numCards;
	const wrapWidth = cardWidth * numCards;

	const getWrappedIndex = gsap.utils.wrap(0, numCards);

	useEffect(() => {
		if (!slides.length) return;

		initializeProductSlider();
		setupDraggable();
		setupCustomCursor();

		return () => {
			document.removeEventListener("pointermove", handlePointerMove);
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("pointerup", handlePointerUp);
			document.removeEventListener("dragstart", preventDefaultDrag);

			if (productSliderRef.current) {
				productSliderRef.current.removeEventListener(
					"mouseenter",
					handleMouseEnter
				);
				productSliderRef.current.removeEventListener(
					"mouseleave",
					handleMouseLeave
				);
			}
		};
	}, [slides, cursorVisible]);

	const initializeProductSlider = () => {
		const baseTimeline = gsap.timeline({ paused: true });

		gsap.set(productSliderRef.current, {
			// perspective: 100,
			width: wrapWidth - cardWidth,
		});

		cardRefs.current.forEach((card, index) => {
			gsap.set(card, {
				width: cardWidth,
				scale: 1,
				opacity: 1,
				rotation: cardRotation,
				x: -cardWidth,
			});

			const cardTimeline = gsap
				.timeline({ repeat: 1 })
				.to(
					card,
					{
						duration: 1,
						x: `+=${wrapWidth}`,
						rotation: -cardRotation,
					},
					0
				)
				.to(
					card,
					{
						duration: cardStep,
						scale: 1,
						opacity: 1,
						repeat: 1,
						// yoyo: true,
					},
					0.5 - cardStep
				);

			baseTimeline.add(cardTimeline, index * -cardStep);
		});

		const loopTimeline = gsap
			.timeline({ repeat: -1, paused: true })
			.add(baseTimeline.tweenFromTo(1, 2))
			.progress(1);

		animationTimelineRef.current = loopTimeline;
	};

	const setupDraggable = () => {
		Draggable.create(draggableProxyRef.current, {
			type: "x",
			trigger: productSliderRef.current,
			inertia: true,
			allowContextMenu: true,
			onDrag: updateAnimationProgress,
			onThrowUpdate: updateAnimationProgress,
			snap: snapToCard,
			onPress: () => setIsDragging(true),
			onRelease: () => setIsDragging(false),
			onDragEnd: function () {
				const index = getWrappedIndex(
					(-this.endX / wrapWidth) * numCards - 3
				);
			},
		});
	};

	const updateAnimationProgress = function () {
		let progress = this.x / wrapWidth;
		progress = progress - Math.floor(progress);
		animationTimelineRef.current.progress(progress);
	};

	const snapToCard = (x) => {
		return Math.round(x / cardWidth) * cardWidth;
	};

	const handlePointerMove = (e) => {
		if (cursorRef.current && cursorVisible) {
			cursorRef.current.style.left = `${e.clientX}px`;
			cursorRef.current.style.top = `${e.clientY}px`;
		}
	};

	const handlePointerDown = (e) => {
		if (productSliderRef.current?.contains(e.target)) {
			setIsDragging(true);
			handlePointerMove(e);
		}
	};

	const handlePointerUp = () => setIsDragging(false);
	const handleMouseEnter = () => setCursorVisible(true);
	const handleMouseLeave = () => setCursorVisible(false);
	const preventDefaultDrag = (e) => e.preventDefault();

	const setupCustomCursor = () => {
		document.addEventListener("pointermove", handlePointerMove);
		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("pointerup", handlePointerUp);
		document.addEventListener("dragstart", preventDefaultDrag);

		if (productSliderRef.current) {
			productSliderRef.current.addEventListener(
				"mouseenter",
				handleMouseEnter
			);
			productSliderRef.current.addEventListener(
				"mouseleave",
				handleMouseLeave
			);
		}
	};

	return (
		<div className="product-slider-container w-full h-full flex flex-col items-center justify-center relative">
			<div
				className="product-slider-view w-full h-full"
				ref={productSliderRef}>
				{slides.map((slideContent, index) => (
					<div
						className="product-slider-card"
						key={slideContent.id}
						ref={(el) => (cardRefs.current[index] = el)}>
						<div className="card-content">
							<div className="relative overflow-hidden transition-all duration-500">
								<img
									src={slideContent.image}
									alt={slideContent.title}
									className="!w-[256px] lg:!w-[565px] h-[332px] lg:h-[620px] object-cover"
									draggable={false}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
			<div ref={draggableProxyRef} style={{ display: "none" }} />
			<div className="text-center mt-32 lg:mt-36">
				<h3 className="text-2xl lg:text-3xl font-normal text-foreground mb-2">
					{slides[currentIndex].title}
				</h3>
				<p className="text-muted-foreground text-sm lg:text-base">
					{slides[currentIndex].location}
				</p>
			</div>
			<div
				className={`custom-cursor ${
					isDragging ? "grabbing" : "grab"
				} fixed z-50 pointer-events-none`}
				ref={cursorRef}
				style={{
					visibility: cursorVisible ? "visible" : "hidden",
				}}>
				Drag
			</div>
		</div>
	);
};

export default ProductsSlider;
