'use client';

import { useContent } from '@/context/ContentContext';
import { Reveal } from './primitives';
import Eyebrow from './Eyebrow';

/** Results scene: a horizontal-scrolling rail of proof cards (swipe on mobile). */
export default function SpotlightResults() {
    const { content } = useContent();
    const { results } = content;
    const list = results.results ?? [];

    return (
        <div className="w-full">
            <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
                <Reveal>
                    <Eyebrow>{results.sectionLabel}</Eyebrow>
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
                        className={`flex min-h-[268px] w-[290px] shrink-0 snap-start flex-col justify-between rounded-[1.75rem] border p-7 shadow-[0_30px_70px_-46px_rgba(42,35,66,0.55)] sm:w-[320px] sm:p-8 ${
                            i % 3 === 1
                                ? 'border-transparent bg-[#6B3FC0] text-white'
                                : i % 3 === 2
                                  ? 'border-[#E8721A]/30 bg-[#F6F2FC]'
                                  : 'border-[#2A2342]/12 bg-[#F6F2FC]'
                        }`}
                    >
                        <span
                            className={`font-display text-[1.7rem] font-normal leading-[1.1] tracking-[-0.015em] [overflow-wrap:break-word] sm:text-[1.95rem] ${
                                i % 3 === 1 ? 'text-white' : 'text-[#2A2342]'
                            }`}
                        >
                            {r.stat}
                        </span>
                        <p
                            className={`mt-6 font-sans text-[13.5px] leading-relaxed sm:text-[14px] ${
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
