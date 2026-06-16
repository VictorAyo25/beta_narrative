'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

// Card tone cycles for visual rhythm as you move through the slides.
const TONES = [
    { wrap: 'bg-[#6B3FC0]', stat: 'text-white', desc: 'text-white/85', badge: 'bg-white/15 text-white/90', dark: true },
    { wrap: 'bg-[#F1EBFB] border border-[#2A2342]/10', stat: 'text-[#2A2342]', desc: 'text-[#4A4163]', badge: 'bg-[#6B3FC0]/10 text-[#6B3FC0]', dark: false },
    { wrap: 'bg-[#F5943A]/12 border border-[#E8721A]/25', stat: 'text-[#C05A0E]', desc: 'text-[#4A4163]', badge: 'bg-[#E8721A]/12 text-[#C05A0E]', dark: false },
] as const;

const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function SalonResultsSlide() {
    const { content } = useContent();
    const { results } = content;
    const list = results.results ?? [];

    const [[index, dir], setState] = useState<[number, number]>([0, 0]);

    if (list.length === 0) return null;

    const count = list.length;
    const active = ((index % count) + count) % count;
    const paginate = (step: number) => setState([index + step, step]);
    const goTo = (target: number) => setState([target, target > active ? 1 : -1]);

    const r = list[active];
    const tone = TONES[active % TONES.length];

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

                <Reveal delay={0.1}>
                    <div className="relative mx-auto mt-14 max-w-[760px]">
                        {/* Slide stage */}
                        <div className="overflow-hidden rounded-[2rem]">
                            <AnimatePresence mode="wait" custom={dir}>
                                <motion.div
                                    key={active}
                                    custom={dir}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.45, ease: EASE }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.18}
                                    onDragEnd={(_, info) => {
                                        if (info.offset.x < -80) paginate(1);
                                        else if (info.offset.x > 80) paginate(-1);
                                    }}
                                    className={`relative flex min-h-[320px] cursor-grab touch-pan-y flex-col justify-between rounded-[2rem] p-8 shadow-[0_30px_70px_-44px_rgba(42,35,66,0.55)] active:cursor-grabbing sm:min-h-[340px] sm:p-11 ${tone.wrap}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[11.5px] font-medium ${tone.badge}`}>
                                            <Sparkles size={12} /> Result {String(active + 1).padStart(2, '0')}
                                        </span>
                                        <span className={`font-mono text-[12px] ${tone.dark ? 'text-white/55' : 'text-[#6E6588]'}`}>
                                            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <p className={`font-fraunces text-[2.6rem] font-light leading-[1.04] tracking-[-0.02em] break-words sm:text-[3.4rem] ${tone.stat}`}>
                                        {r.stat}
                                    </p>
                                    <p className={`mt-4 max-w-[46ch] font-sans text-[15px] leading-relaxed sm:text-[16px] ${tone.desc}`}>
                                        {r.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="mt-7 flex items-center justify-center gap-5">
                            <button
                                type="button"
                                onClick={() => paginate(-1)}
                                aria-label="Previous result"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2342]/15 bg-[#F1EBFB] text-[#2A2342] transition-colors duration-200 hover:border-[#E8721A] hover:text-[#E8721A]"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <div className="flex items-center gap-2">
                                {list.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => goTo(i)}
                                        aria-label={`Go to result ${i + 1}`}
                                        aria-current={i === active}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            i === active ? 'w-7 bg-[#E8721A]' : 'w-2 bg-[#2A2342]/20 hover:bg-[#2A2342]/35'
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => paginate(1)}
                                aria-label="Next result"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2342]/15 bg-[#F1EBFB] text-[#2A2342] transition-colors duration-200 hover:border-[#E8721A] hover:text-[#E8721A]"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
