'use client';

import { useContent } from '@/context/ContentContext';
import { Kicker, Reveal, RevealGrid, TileReveal, tile } from './bento';

export default function PainSection() {
    const { content } = useContent();

    const pain = content?.pain || {
        sectionLabel: 'The Problem',
        title: "You're leading rooms.",
        titleEmphasis: "The internet doesn't know it.",
        lead: "The leaders who get called to speak, consult, and serve on boards aren't always the most qualified. They're the most visible.",
        items: [
            'You worry about sounding like every other executive — generic, forgettable, corporate.',
            "You post inconsistently, if at all, because you're unsure what to say or how to frame it.",
            "Your visibility doesn't reflect the weight of your experience and the value you carry.",
            "You're ready for consultancy and speaking gigs — but the right people can't find you.",
        ],
    };

    return (
        <section
            id="problem"
            className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
        >
            <div className="mx-auto w-full max-w-[1320px]">
                {/* Header band: title tile + violet pull-quote tile */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
                    <Reveal className="lg:col-span-7">
                        <div className={`${tile.base} ${tile.surface} h-full p-7 sm:p-10`}>
                            <Kicker>{pain.sectionLabel}</Kicker>
                            <h2
                                className="display mt-6 text-[clamp(1.7rem,3.4vw,2.7rem)] text-[#2A2342]"
                                style={{ lineHeight: 1.12 }}
                            >
                                {pain.title}{' '}
                                <span className="text-[#E8721A]">{pain.titleEmphasis}</span>
                            </h2>
                        </div>
                    </Reveal>
                    <Reveal delay={0.08} className="lg:col-span-5">
                        <div className={`${tile.base} ${tile.violet} flex h-full items-center p-7 sm:p-10`}>
                            <p className="font-sans text-[16px] leading-relaxed text-white/90 sm:text-[17px]">
                                {pain.lead}
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* Problem tiles — indexed bento cards */}
                <RevealGrid className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
                    {pain.items.map((item, i) => (
                        <TileReveal
                            key={item}
                            className={`${tile.base} ${tile.surface} ${tile.lift} flex items-start gap-5 p-7 sm:p-9`}
                        >
                            <span className="font-display text-[2rem] leading-none text-[#6B3FC0]/45 sm:text-[2.4rem]">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="pt-1 font-sans text-[15.5px] leading-relaxed text-[#4A4163] sm:text-[16px]">
                                {item}
                            </p>
                        </TileReveal>
                    ))}
                </RevealGrid>
            </div>
        </section>
    );
}
