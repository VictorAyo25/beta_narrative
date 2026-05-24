'use client';

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <footer className="relative py-12 px-5 sm:px-8 lg:px-10 border-t border-[#D9CFF2]/15 bg-[#EEE8F8]">
            {/* Top accent line */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#4A2D8F]/30 to-transparent" />

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="font-serif text-lg tracking-wide">
                        <span className="text-[#1A0E35]">Beta</span>
                        <span className="text-[#E8721A]"> </span>
                        <span className="text-[#6B3FC0]">Narrative</span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <a 
                            href="#problem" 
                            onClick={(e) => scrollToSection(e, '#problem')}
                            className="text-xs text-[#3D2A6E] hover:text-[#E8721A] transition-colors duration-300"
                        >
                            The Problem
                        </a>
                        <a 
                            href="#why" 
                            onClick={(e) => scrollToSection(e, '#why')}
                            className="text-xs text-[#3D2A6E] hover:text-[#E8721A] transition-colors duration-300"
                        >
                            Why Us
                        </a>
                        <a 
                            href="#results" 
                            onClick={(e) => scrollToSection(e, '#results')}
                            className="text-xs text-[#3D2A6E] hover:text-[#E8721A] transition-colors duration-300"
                        >
                            Results
                        </a>
                        <a 
                            href="#offer" 
                            onClick={(e) => scrollToSection(e, '#offer')}
                            className="text-xs text-[#3D2A6E] hover:text-[#E8721A] transition-colors duration-300"
                        >
                            Offer
                        </a>
                        <a 
                            href="#contact" 
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="text-xs text-[#3D2A6E] hover:text-[#E8721A] transition-colors duration-300"
                        >
                            Apply
                        </a>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-[#3D2A6E]/50 tracking-wide">
                        © {currentYear} Beta Narrative
                    </p>
                </div>
            </div>
        </footer>
    );
}
