'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const footerLinks = [
    { href: '#problem', label: 'Problem' },
    { href: '#why', label: 'Why Us' },
    { href: '#results', label: 'Results' },
    { href: '#offer', label: 'Offer' },
    { href: '#contact', label: 'Apply' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 76;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <footer className="relative px-4 pb-10 pt-2 sm:px-6 lg:px-8">
            <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
                {/* Wordmark / closing CTA tile */}
                <div className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-[1.6rem] border border-[#2A2342] bg-[#2A2342] p-8 text-white shadow-[0_28px_64px_-42px_rgba(42,35,66,0.85)] sm:p-10 lg:col-span-8">
                    <span
                        aria-hidden
                        className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[9rem] leading-none text-white/[0.05] sm:text-[12rem]"
                    >
                        BN
                    </span>
                    <div className="relative">
                        <Link href="/" className="block">
                            <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-white">
                                Beta <span className="text-[#C4A8E8]">Narrative</span>
                            </h2>
                        </Link>
                        <p className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-white/70">
                            Strategic visibility for leaders ready to stop blending in — and start
                            being sought after.
                        </p>
                    </div>
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        className="group/btn relative inline-flex w-fit items-center gap-2 rounded-full bg-[#E8721A] px-7 py-3.5 font-sans text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#C05A0E]"
                    >
                        Claim your spot
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                        />
                    </a>
                </div>

                {/* Navigation tile */}
                <nav className="flex flex-col rounded-[1.6rem] border border-[#2A2342]/10 bg-[#F1EBFB] p-3 shadow-[0_26px_60px_-46px_rgba(42,35,66,0.65)] lg:col-span-4">
                    {footerLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="group flex items-center justify-between rounded-2xl px-5 py-4 font-sans text-[15px] text-[#4A4163] transition-colors duration-200 hover:bg-[#E6DBF6] hover:text-[#E8721A]"
                        >
                            {link.label}
                            <ArrowRight
                                size={15}
                                className="text-[#6B3FC0]/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#E8721A]"
                            />
                        </a>
                    ))}
                </nav>

                {/* Bottom bar */}
                <div className="flex flex-col items-start justify-between gap-2 px-2 pt-2 sm:flex-row sm:items-center lg:col-span-12">
                    <p className="font-sans text-[12px] text-[#6E6587]">© {currentYear} Beta Narrative</p>
                    <p className="font-sans text-[12px] text-[#6E6587]">Executive Brand Strategy</p>
                </div>
            </div>
        </footer>
    );
}
