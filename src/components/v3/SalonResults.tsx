'use client';

import { useContent } from '@/context/ContentContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

// Bento placement + tinting recipes, applied by tile index for visual rhythm.
// The first tile is the large feature; others fill the remaining cells.
const TILE_STYLES = [
    // 0 — feature: violet-tinted, spans 2×2
    {
        span: 'sm:col-span-2 sm:row-span-2',
        wrap: 'bg-[#6B3FC0] border-[#6B3FC0]',
        stat: 'text-white text-[2.6rem] sm:text-[3.4rem]',
        desc: 'text-white/85',
        feature: true,
    },
    // 1 — tall: surface
    {
        span: 'sm:row-span-2',
        wrap: 'bg-[#F6F2FC] border-[#2A2342]/10',
        stat: 'text-[#2A2342] text-[2rem] sm:text-[2.4rem]',
        desc: 'text-[#4A4163]',
        feature: false,
    },
    // 2 — wide accent: subtle orange
    {
        span: 'sm:col-span-1',
        wrap: 'bg-[#F5943A]/12 border-[#E8721A]/25',
        stat: 'text-[#C05A0E] text-[1.9rem] sm:text-[2.2rem]',
        desc: 'text-[#4A4163]',
        feature: false,
    },
    // 3 — surface
    {
        span: 'sm:col-span-1',
        wrap: 'bg-[#F6F2FC] border-[#2A2342]/10',
        stat: 'text-[#2A2342] text-[1.9rem] sm:text-[2.2rem]',
        desc: 'text-[#4A4163]',
        feature: false,
    },
] as const;

// Fallback styling for any tiles beyond the curated four.
const EXTRA_STYLE = {
    span: 'sm:col-span-1',
    wrap: 'bg-[#F6F2FC] border-[#2A2342]/10',
    stat: 'text-[#2A2342] text-[1.9rem] sm:text-[2.2rem]',
    desc: 'text-[#4A4163]',
    feature: false,
} as const;

export default function SalonResults() {
    const { content } = useContent();
    const { results } = content;

    return (
        <section id="results" className="relative px-5 sm:px-8 py-24 sm:py-32">
            <div className="mx-auto max-w-[1100px]">
                <div className="mx-auto max-w-[640px] text-center">
                    <Reveal className="flex justify-center">
                        <Eyebrow>{results.sectionLabel}</Eyebrow>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="font-fraunces mt-6 text-[2rem] sm:text-[2.8rem] font-light leading-[1.1] tracking-[-0.015em] text-[#2A2342]">
                            {results.title}{' '}
                            <span className="italic text-[#E8721A]">{results.titleEmphasis}</span>
                            {results.titleEmphasisEnd ? <> {results.titleEmphasisEnd}</> : null}
                        </h2>
                    </Reveal>
                </div>

                <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 auto-rows-[minmax(170px,auto)] gap-4 sm:gap-5">
                    {results.results.map((r, i) => {
                        const s = TILE_STYLES[i] ?? EXTRA_STYLE;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }}
                                className={`relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border p-7 sm:p-8 shadow-[0_22px_56px_-34px_rgba(42,35,66,0.5)] ${s.span} ${s.wrap}`}
                            >
                                {s.feature && (
                                    <>
                                        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-sans text-[11.5px] font-medium text-white/90">
                                            <Sparkles size={12} /> Signature outcome
                                        </span>
                                    </>
                                )}
                                <p className={`font-fraunces font-light leading-none tracking-[-0.02em] ${s.feature ? 'mt-6' : ''} ${s.stat}`}>
                                    {r.stat}
                                </p>
                                <p className={`mt-4 font-sans text-[14px] leading-relaxed ${s.desc}`}>
                                    {r.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
