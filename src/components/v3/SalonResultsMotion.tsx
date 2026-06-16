'use client';

import { useContent } from '@/context/ContentContext';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

// Same bento recipe as 3a — columns step 1 -> 2 -> 3, stats wrap rather than clip.
const TILE_STYLES = [
    {
        span: 'sm:col-span-2 lg:row-span-2',
        wrap: 'bg-[#6B3FC0] border-[#6B3FC0]',
        stat: 'text-white text-[2.4rem] sm:text-[3rem] lg:text-[3.4rem]',
        desc: 'text-white/85',
        feature: true,
    },
    {
        span: 'lg:row-span-2',
        wrap: 'bg-[#F1EBFB] border-[#2A2342]/10',
        stat: 'text-[#2A2342] text-[1.9rem] sm:text-[2.1rem] lg:text-[2.3rem]',
        desc: 'text-[#4A4163]',
        feature: false,
    },
    {
        span: '',
        wrap: 'bg-[#F5943A]/12 border-[#E8721A]/25',
        stat: 'text-[#C05A0E] text-[1.8rem] sm:text-[2rem] lg:text-[2.2rem]',
        desc: 'text-[#4A4163]',
        feature: false,
    },
    {
        span: '',
        wrap: 'bg-[#F1EBFB] border-[#2A2342]/10',
        stat: 'text-[#2A2342] text-[1.8rem] sm:text-[2rem] lg:text-[2.2rem]',
        desc: 'text-[#4A4163]',
        feature: false,
    },
] as const;

const EXTRA_STYLE = {
    span: '',
    wrap: 'bg-[#F1EBFB] border-[#2A2342]/10',
    stat: 'text-[#2A2342] text-[1.8rem] sm:text-[2rem] lg:text-[2.2rem]',
    desc: 'text-[#4A4163]',
    feature: false,
} as const;

export default function SalonResultsMotion() {
    const { content } = useContent();
    const { results } = content;

    return (
        <section id="results" className="relative px-5 sm:px-8 py-24 sm:py-32 bg-[#E9DFF8]">
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

                <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(168px,auto)] gap-4 sm:gap-5">
                    {results.results.map((r, i) => {
                        const s = TILE_STYLES[i] ?? EXTRA_STYLE;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ type: 'spring', stiffness: 220, damping: 26, delay: 0.07 * i }}
                                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                                className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border p-7 shadow-[0_22px_56px_-34px_rgba(42,35,66,0.5)] transition-shadow duration-300 hover:shadow-[0_36px_80px_-36px_rgba(42,35,66,0.6)] sm:p-8 ${s.span} ${s.wrap}`}
                            >
                                {s.feature && (
                                    <>
                                        <motion.div
                                            aria-hidden
                                            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl"
                                            animate={{ x: [0, 18, 0], y: [0, 14, 0] }}
                                            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-sans text-[11.5px] font-medium text-white/90">
                                            <Sparkles size={12} /> Signature outcome
                                        </span>
                                    </>
                                )}
                                <p className={`font-fraunces font-light leading-[1.05] tracking-[-0.02em] break-words transition-transform duration-300 group-hover:translate-x-0.5 ${s.feature ? 'mt-6' : ''} ${s.stat}`}>
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
