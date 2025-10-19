import React from "react";

const MenuIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<line x1="3" y1="12" x2="21" y2="12"></line>
		<line x1="3" y1="6" x2="21" y2="6"></line>
		<line x1="3" y1="18" x2="21" y2="18"></line>
	</svg>
);

const CloseIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<line x1="18" y1="6" x2="6" y2="18"></line>
		<line x1="6" y1="6" x2="18" y2="18"></line>
	</svg>
);

const ArrowRightIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="22"
		height="16"
		viewBox="0 0 22 16"
		fill="none">
		<path
			d="M20.7439 8L0.871948 8M20.7439 8L13.2919 15M20.7439 8L13.2919 1"
			stroke="#221F20"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const PlaySVG = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-[1.5rem] h-[1.5rem] fill-white"
		viewBox="0 0 24 24">
		<path d="M8 5v14l11-7z" />
	</svg>
);

const PauseSVG = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="w-[1.5rem] h-[1.5rem] fill-white"
		viewBox="0 0 24 24">
		<path d="M6 19h4V5H6zm8-14v14h4V5h-4z" />
	</svg>
);

const SliderThumbRect = (progressRef) => (
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
			rx="8"
			ry="8"
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
			strokeDasharray="0 464"
			strokeLinecap="round"
		/>
	</svg>
);

export {
	MenuIcon,
	CloseIcon,
	ArrowRightIcon,
	PlaySVG,
	PauseSVG,
	SliderThumbRect,
};
