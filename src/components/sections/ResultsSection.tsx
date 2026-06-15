'use client';

import { ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Kicker, Reveal, RevealGrid, TileReveal, tile } from './bento';

export default function ResultsSection() {
    const { content } = useContent();

    const results = content?.results || {
        sectionLabel: 'The Results',
        title: 'What strategic visibility',
        titleEmphasis: 'actually',
        titleEmphasisEnd: 'looks like.',
        results: [
            { stat: '5× Reach', description: 'A senior leader grew their LinkedIn reach 5× within 90 days — attracting inbound from decision-makers and industry peers.' },
            { stat: '+20% Engagement', description: 'Ghost-written articles and op-eds drove a 20% LinkedIn engagement lift — turning followers into conversations that convert.' },
            { stat: 'BusinessDay', description: 'Clients featured in national publications, positioning them as credible voices in their industries — not just practitioners.' },
            { stat: 'TV Features', description: 'Visibility strategy has placed executives in broadcast conversations — widening reach far beyond LinkedIn.' },
        ],
    };

    // Asymmetric bento rhythm: wide feature tiles (7 cols) alternate with
    // narrower surface tiles (5 cols); colour cycles for visual cadence.
    const layout = [
        { span: 'lg:col-span-7', tone: tile.orange, light: true },
        { span: 'lg:col-span-5', tone: tile.surface, light: false },
        { span: 'lg:col-span-5', tone: tile.surface, light: false },
        { span: 'lg:col-span-7', tone: tile.violet, light: true },
    ];

    return (
        <section id="results" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto w-full max-w-[1320px]">
                <Reveal>
                    <div className={`${tile.base} ${tile.surface} p-7 sm:p-10`}>
                        <Kicker>{results.sectionLabel}</Kicker>
                        <h2
                            className="display mt-6 max-w-3xl text-[clamp(1.7rem,3.4vw,2.7rem)] text-[#2A2342]"
                            style={{ lineHeight: 1.12 }}
                        >
                            {results.title}{' '}
                            <span className="text-[#E8721A]">{results.titleEmphasis}</span>
                            {results.titleEmphasisEnd ? ` ${results.titleEmphasisEnd}` : ''}
                        </h2>
                    </div>
                </Reveal>

                <RevealGrid className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
                    {results.results.map((result, i) => {
                        const cfg = layout[i % layout.length];
                        return (
                            <TileReveal
                                key={`${result.stat}-${i}`}
                                className={`${tile.base} ${cfg.tone} ${tile.lift} flex flex-col justify-between gap-8 p-7 sm:p-9 ${cfg.span}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <span
                                        className={`display text-[clamp(1.8rem,3vw,2.6rem)] leading-none ${
                                            cfg.light ? 'text-white' : 'text-[#2A2342]'
                                        }`}
                                    >
                                        {result.stat}
                                    </span>
                                    <ArrowUpRight
                                        size={20}
                                        className={cfg.light ? 'text-white/70' : 'text-[#6B3FC0]/50'}
                                    />
                                </div>
                                <p
                                    className={`max-w-xl font-sans text-[14.5px] leading-relaxed sm:text-[15px] ${
                                        cfg.light ? 'text-white/85' : 'text-[#6E6587]'
                                    }`}
                                >
                                    {result.description}
                                </p>
                            </TileReveal>
                        );
                    })}
                </RevealGrid>
            </div>
        </section>
    );
}
