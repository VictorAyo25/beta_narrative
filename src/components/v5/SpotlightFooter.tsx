'use client';

import { scrollToScene } from './primitives';

const links = [
    { id: 'problem', label: 'The Problem' },
    { id: 'why', label: 'Why Us' },
    { id: 'results', label: 'Results' },
    { id: 'offer', label: 'Offer' },
    { id: 'contact', label: 'Apply' },
];

/** Calm centered footer closing the Spotlight scenes. */
export default function SpotlightFooter() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-[#2A2342]/12 bg-[#E1D3F2] px-5 py-14 text-center sm:px-8">
            <button onClick={() => scrollToScene('top')} className="font-display text-[22px] text-[#2A2342]">
                Beta <span className="text-[#6B3FC0]">Narrative</span>
            </button>
            <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                {links.map((l) => (
                    <button
                        key={l.id}
                        onClick={() => scrollToScene(l.id)}
                        className="font-sans text-[13px] text-[#4A4163] transition-colors duration-200 hover:text-[#E8721A]"
                    >
                        {l.label}
                    </button>
                ))}
            </nav>
            <p className="mt-7 font-sans text-[12px] text-[#8A82A0]">© {year} Beta Narrative. All rights reserved.</p>
        </footer>
    );
}
