import React from "react";
import { useState, useEffect } from "react";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "../../assets/js/Icons";

const navLinks = [
	{ label: "About", href: "#about" },
	{ label: "News", href: "#news" },
	{ label: "Services", href: "#services" },
	{ label: "Our Team", href: "#team" },
	{ label: "Make Enquiry", href: "#enquiry" },
];

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
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-background/95 backdrop-blur-md shadow-sm"
					: "bg-background"
			}`}>
			<div className="container mx-auto px-4 lg:px-8">
				<div className="flex items-center justify-between h-16 lg:h-20">
					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center gap-8">
						{navLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="text-sm font-medium text-nav-text hover:text-primary transition-colors">
								{link.label}
							</a>
						))}
					</div>

					{/* Contact Button */}
					<button className="hidden lg:inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-md hover:border-foreground/40 hover:bg-transparent transition-colors text-sm font-medium">
						Contact us
						<ArrowRightIcon />
					</button>

					{/* Mobile Menu Button & Contact */}
					<div className="lg:hidden flex items-center gap-4 ml-auto">
						<button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-foreground/20 rounded-md hover:border-foreground/40 hover:bg-transparent transition-colors">
							Contact us
							<ArrowRightIcon />
						</button>
						<button
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							className="p-2 text-foreground"
							aria-label="Toggle menu">
							{isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="lg:hidden border-t border-border/20 py-4 animate-fade-in">
						{navLinks.map((link) => (
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
