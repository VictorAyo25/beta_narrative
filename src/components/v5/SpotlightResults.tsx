'use client';

import { useContent } from '@/context/ContentContext';
import { Reveal } from './primitives';

/** Results scene: a horizontal-scrolling rail of proof cards (swipe on mobile). */
export default function SpotlightResults() {
    const { content } = useContent();
    const { results } = content;
    const list = results.results ?? [];

    return (
        <div className="w-full">
            <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
                <Reveal>
                    <span className="inline-flex items-center gap-2.5 font-sans text-[12px] uppercase tracking-[0.22em] text-[#6B3FC0]">
                        <span aria-hidden className="block h-px w-7 bg-[#6B3FC0]/50" />
                        {results.sectionLabel}
                    </span>
                    <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                        {results.title} <span className="text-[#E8721A]">{results.titleEmphasis}</span>
                        {results.titleEmphasisEnd ? <> {results.titleEmphasisEnd}</> : null}
                    </h2>
                    <p className="mt-5 font-sans text-[13px] text-[#8A82A0]">Drag or scroll to explore →</p>
                </Reveal>
            </div>

            {/* Horizontal rail */}
            <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-12 [scrollbar-width:thin]">
                {list.map((r, i) => (
                    <div
                        key={r.stat}
                        className={`flex min-h-[260px] w-[300px] shrink-0 snap-start flex-col justify-between rounded-[1.75rem] border p-8 shadow-[0_30px_70px_-46px_rgba(42,35,66,0.55)] ${
                            i % 3 === 1
                                ? 'border-transparent bg-[#6B3FC0] text-white'
                                : i % 3 === 2
                                  ? 'border-[#E8721A]/30 bg-[#F6F2FC]'
                                  : 'border-[#2A2342]/12 bg-[#F6F2FC]'
                        }`}
                    >
                        <span
                            className={`font-display text-[clamp(2.2rem,3vw,3rem)] font-light leading-[0.95] tracking-[-0.02em] ${
                                i % 3 === 1 ? 'text-white' : 'text-[#2A2342]'
                            }`}
                        >
                            {r.stat}
                        </span>
                        <p
                            className={`mt-6 font-sans text-[14px] leading-relaxed ${
                                i % 3 === 1 ? 'text-white/85' : 'text-[#4A4163]'
                            }`}
                        >
                            {r.description}
                        </p>
                    </div>
                ))}
                {/* trailing spacer so the last card can rest away from the edge */}
                <div aria-hidden className="w-1 shrink-0 sm:w-4" />
            </div>
        </div>
    );
}
