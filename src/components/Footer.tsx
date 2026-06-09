'use client';

import Link from 'next/link';

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
        <footer className="relative bg-[#E9E3F4] border-t border-[#2A2342]/14">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                {/* Top: nav grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 border-b border-[#2A2342]/14">
                    {footerLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="group flex items-center py-6 px-1 border-r border-[#2A2342]/12 last:border-r-0 hover:bg-[#F6F2FC] transition-colors duration-300"
                        >
                            <span className="font-sans text-[14px] text-[#4A4163] group-hover:text-[#E8721A] transition-colors">{link.label}</span>
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, '#contact')}
                        className="hidden lg:flex items-center gap-2 py-6 px-1 bg-[#E8721A] text-white hover:bg-[#C05A0E] transition-colors duration-300"
                    >
                        <span className="font-sans text-[14px] font-medium pl-1">Apply</span>
                    </a>
                </div>

                {/* Wordmark */}
                <div className="py-14 sm:py-20">
                    <Link href="/" className="block">
                        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-[#2A2342]">
                            Beta <span className="text-[#6B3FC0]">Narrative</span>
                        </h2>
                    </Link>
                    <p className="mt-5 max-w-md font-sans text-[15px] text-[#6F6783] leading-relaxed">
                        Strategic visibility for leaders ready to stop blending in — and start
                        being sought after.
                    </p>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-t border-[#2A2342]/14">
                    <p className="font-sans text-[12px] text-[#6E6587]">
                        © {currentYear} Beta Narrative
                    </p>
                    <p className="font-sans text-[12px] text-[#6E6587]">
                        Executive Brand Strategy
                    </p>
                </div>
            </div>
        </footer>
    );
}
