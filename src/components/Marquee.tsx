const items = [
    'Executive Branding',
    'Thought Leadership',
    'Media Visibility',
    'Strategic Narrative',
    'Personal Authority',
];

export default function Marquee() {
    const row = [...items, ...items];
    return (
        <div className="relative overflow-hidden bg-[#E8721A] select-none">
            <div className="flex w-max animate-marquee py-4">
                {row.map((t, i) => (
                    <div key={i} className="flex items-center gap-7 px-7">
                        <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-white whitespace-nowrap">
                            {t}
                        </span>
                        <span className="block w-1.5 h-1.5 bg-white/90 rotate-45 flex-shrink-0" />
                    </div>
                ))}
            </div>
        </div>
    );
}
