'use client';

import { useContent } from '@/context/ContentContext';
import LinkedInIcon from '../v3/LinkedInIcon';

const links = [
    { href: '#problem', label: 'The Problem' },
    { href: '#why', label: 'Why Us' },
    { href: '#results', label: 'Results' },
    { href: '#offer', label: 'Investment' },
    { href: '#contact', label: 'Apply' },
];

export default function PressFooter() {
    const { content } = useContent();
    const linkedin = content.value.profileLinkedin;
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-[#2A2342]/12 bg-[#E1D3F2] px-5 sm:px-10 py-14">
            <div className="mx-auto max-w-[1180px]">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <a href="#top" className="font-newsreader text-[23px] tracking-tight text-[#2A2342]">
                            Beta <span className="italic">Narrative</span>
                        </a>
                        <p className="mt-3 max-w-[38ch] font-sans text-[13.5px] leading-relaxed text-[#6E6588]">
                            Executive brand strategy that turns undeniable expertise into undeniable visibility.
                        </p>
                    </div>

                    <nav className="flex flex-col gap-2.5 sm:items-end">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="link-underline w-fit font-sans text-[13.5px] text-[#4A4163] hover:text-[#2A2342] transition-colors"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="mt-12 flex items-center justify-between gap-4 border-t border-[#2A2342]/12 pt-6">
                    <p className="font-sans text-[12.5px] text-[#8A82A0]">© {year} Beta Narrative. All rights reserved.</p>
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-[#4A4163] hover:text-[#E8721A] transition-colors"
                        >
                            <LinkedInIcon size={17} />
                        </a>
                    )}
                </div>
            </div>
        </footer>
    );
}
