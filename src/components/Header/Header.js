import React from "react";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "./constants";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "../../assets/js/Icons";

export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:mt-[21px]`}>
			<div
				className={`container mx-auto lg:px-5 ${
					isScrolled
						? "bg-white/95 backdrop-blur-md shadow-sm"
						: "bg-white"
				}`}>
				<div className="flex items-center justify-between h-20 lg:h-25 p-4 lg:p-8">
					<div className="hidden lg:flex items-center gap-8">
						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="text-sm font-medium text-nav-text hover:text-primary transition-colors">
								{link.label}
							</a>
						))}
					</div>

					<button className="hidden lg:flex items-center gap-2 px-4 py-2 border border-foreground/20 hover:border-foreground/40 hover:bg-transparent transition-colors text-sm font-medium">
						Contact us
						<ArrowRightIcon />
					</button>

					{/* Mobile Menu Button & Contact */}
					<div className="lg:hidden flex items-center justify-between gap-4 w-full">
						<button className="inline-flex items-center gap-4 px-4 py-2 text-sm border border-foreground/20 hover:border-foreground/40 hover:bg-transparent transition-colors">
							Contact us
							<ArrowRightIcon />
						</button>
						<button
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							className="p-2 text-foreground bg-secondary"
							aria-label="Toggle menu">
							{isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
						</button>
					</div>
				</div>

				{isMobileMenuOpen && (
					<div className="lg:hidden border-t border-border/20 px-4 py-4 animate-fade-in">
						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="block py-3 text-sm font-medium text-nav-text hover:text-primary transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}>
								{link.label}
							</a>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Header;
