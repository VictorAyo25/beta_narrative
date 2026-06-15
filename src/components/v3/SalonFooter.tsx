'use client';

import { useContent } from '@/context/ContentContext';
import LinkedInIcon from './LinkedInIcon';

const links = [
    { href: '#problem', label: 'The Problem' },
    { href: '#why', label: 'Why Us' },
    { href: '#results', label: 'Results' },
    { href: '#offer', label: 'Investment' },
    { href: '#contact', label: 'Apply' },
];

export default function SalonFooter() {
    const { content } = useContent();
    const linkedin = content.value.profileLinkedin;
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-[#2A2342]/10 bg-[#E1D3F2] px-5 sm:px-8 py-16">
            <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
                <a href="#top" className="font-fraunces text-[24px] font-semibold tracking-tight text-[#2A2342]">
                    Beta <span className="italic">Narrative</span>
                </a>
                <p className="mt-3 max-w-[420px] font-sans text-[13.5px] leading-relaxed text-[#6E6588]">
                    Executive brand strategy that turns undeniable expertise into undeniable visibility.
                </p>

                <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="font-sans text-[13.5px] text-[#4A4163] hover:text-[#2A2342] transition-colors"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                {linkedin && (
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="mt-7 flex h-10 w-10 items-center justify-center rounded-full border border-[#2A2342]/12 bg-[#F1EBFB] text-[#4A4163] hover:text-[#E8721A] hover:border-[#E8721A]/30 transition-colors"
                    >
                        <LinkedInIcon size={17} />
                    </a>
                )}

                <p className="mt-8 font-sans text-[12.5px] text-[#8A82A0]">
                    © {year} Beta Narrative. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
