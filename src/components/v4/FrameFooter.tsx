const links = [
    { href: '#problem', label: 'The Problem' },
    { href: '#why', label: 'Why Us' },
    { href: '#results', label: 'Results' },
    { href: '#offer', label: 'Offer' },
    { href: '#contact', label: 'Apply' },
];

/** Calm full-width footer that closes the Frame experience. */
export default function FrameFooter() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-[#2A2342]/12 bg-[#E9DFF8] px-5 py-12 sm:px-8 lg:px-14 xl:px-20">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <a href="#top" className="font-display text-[19px] text-[#2A2342]">
                    Beta <span className="text-[#6B3FC0]">Narrative</span>
                </a>
                <nav className="flex flex-wrap gap-x-6 gap-y-2">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="font-sans text-[13px] text-[#4A4163] transition-colors duration-200 hover:text-[#E8721A]"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>
                <span className="font-sans text-[12px] text-[#8A82A0]">© {year} Beta Narrative</span>
            </div>
        </footer>
    );
}
