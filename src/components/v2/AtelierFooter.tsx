'use client';

import { useContent } from '@/context/ContentContext';
import { atelierNavItems } from './nav-items';

const LINKEDIN_FALLBACK = 'https://www.linkedin.com/in/favour-egbogun-3b748b166/';

export default function AtelierFooter() {
    const { content } = useContent();
    const year = new Date().getFullYear();
    const linkedin = content.value.profileLinkedin || LINKEDIN_FALLBACK;

    return (
        <footer className="border-t border-[#2A2342]/12 py-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <a
                        href="#top"
                        className="font-display text-[18px] tracking-[-0.01em] text-[#2A2342]"
                    >
                        Beta <span className="text-[#6B3FC0]">Narrative</span>
                    </a>
                    <p className="mt-2 max-w-xs font-sans text-[13px] leading-relaxed text-[#6E6588]">
                        Executive personal-brand strategy by {content.value.profileName || 'Favour Egbogun'}.
                    </p>
                </div>

                <nav className="flex flex-wrap gap-x-6 gap-y-2">
                    {atelierNavItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="font-sans text-[13px] text-[#6E6588] transition-colors duration-200 hover:text-[#E8721A]"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>

            <div className="mt-10 flex flex-col gap-2 border-t border-[#2A2342]/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-sans text-[12px] text-[#8A82A0]">
                    © {year} Beta Narrative. All rights reserved.
                </span>
                <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[12px] text-[#8A82A0] transition-colors duration-200 hover:text-[#6B3FC0]"
                >
                    LinkedIn
                </a>
            </div>
        </footer>
    );
}
