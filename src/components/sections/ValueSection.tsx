'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import AnimatedCounter from '../AnimatedCounter';
import { Kicker, Reveal, tile } from './bento';

const LinkedInIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function ValueSection() {
    const { content } = useContent();

    const value = content?.value || {
        sectionLabel: 'Why Beta Narrative',
        title: 'Strategic visibility,',
        titleEmphasis: 'not just content.',
        body: 'Founded by Favour Egbogun, Beta Narrative translates executive experience into undeniable digital authority.\n\nWe take your expertise — refined, real, and underrepresented online — and build a narrative so sharp, so unmistakably you, that the right people cannot scroll past.',
        credentials: [
            { number: '4+', label: 'Years crafting executive narratives' },
            { number: '5×', label: 'LinkedIn reach growth in 90 days' },
            { number: '20%', label: 'Engagement lift from op-eds' },
        ],
    };

    const paragraphs = value.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    const creds = value.credentials && value.credentials.length > 0 ? value.credentials.slice(0, 3) : [];
    const profileName = value.profileName || 'Favour Egbogun';
    const profileRole = value.profileRole || 'Communications Strategist';
    const linkedin = value.profileLinkedin || 'https://www.linkedin.com/in/favour-egbogun-3b748b166/';

    return (
        <section id="why" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
                {/* Narrative tile */}
                <Reveal className="lg:col-span-7">
                    <div className={`${tile.base} ${tile.surface} flex h-full flex-col p-7 sm:p-10`}>
                        <Kicker>{value.sectionLabel}</Kicker>
                        <h2
                            className="display mt-6 text-[clamp(1.7rem,3.4vw,2.7rem)] text-[#2A2342]"
                            style={{ lineHeight: 1.12 }}
                        >
                            {value.title}{' '}
                            <span className="text-[#E8721A]">{value.titleEmphasis}</span>
                        </h2>
                        <div className="mt-7 space-y-4">
                            {paragraphs.map((para, i) => (
                                <p
                                    key={i}
                                    className="font-sans text-[15px] leading-relaxed text-[#4A4163] sm:text-base"
                                >
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Portrait tile (links to LinkedIn) */}
                <Reveal delay={0.08} className="lg:col-span-5">
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${profileName} on LinkedIn`}
                        className={`${tile.base} ${tile.dark} ${tile.lift} block h-full min-h-[420px]`}
                    >
                        <Image
                            src={value.profileImage || '/images/Favour.JPG'}
                            alt={`${profileName} — Executive Brand Strategist`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover object-[center_16%] transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2342]/85 via-[#2A2342]/15 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                            <div>
                                <p className="font-display text-[19px] leading-tight text-white">{profileName}</p>
                                <p className="mt-0.5 font-sans text-[12.5px] text-white/75">{profileRole}</p>
                            </div>
                            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#E8721A]">
                                <LinkedInIcon size={16} />
                            </span>
                        </div>
                        <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-[#2A2342]/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                            Connect <ArrowUpRight size={11} />
                        </span>
                    </a>
                </Reveal>

                {/* Proof bar */}
                {creds.length > 0 && (
                    <Reveal delay={0.12} className="lg:col-span-12">
                        <div className={`${tile.base} ${tile.paper} grid grid-cols-1 divide-y divide-[#2A2342]/10 p-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0`}>
                            {creds.map((c, i) => (
                                <div key={`${c.number}-${i}`} className="flex items-center gap-4 p-6 sm:flex-col sm:items-start sm:gap-2.5 sm:p-7">
                                    <AnimatedCounter
                                        value={c.number}
                                        className="display text-[2.4rem] leading-none text-[#6B3FC0] sm:text-[2.7rem]"
                                    />
                                    <p className="font-sans text-[12.5px] leading-snug text-[#6E6587] sm:text-[13px]">
                                        {c.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
}
