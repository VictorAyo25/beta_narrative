'use client';

import { useContent } from '@/context/ContentContext';
import { Reveal } from './primitives';

/** A calm statement scene — centered heading, then the pains as quiet rows. */
export default function SpotlightProblem() {
    const { content } = useContent();
    const { pain } = content;
    const items = pain.items ?? [];

    return (
        <div className="mx-auto w-full max-w-[900px] text-center">
            <Reveal>
                <span className="inline-flex items-center gap-2.5 font-sans text-[12px] uppercase tracking-[0.22em] text-[#6B3FC0]">
                    <span aria-hidden className="block h-px w-7 bg-[#6B3FC0]/50" />
                    {pain.sectionLabel}
                </span>
                <h2 className="mx-auto mt-6 max-w-[18ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                    {pain.title} <span className="text-[#E8721A]">{pain.titleEmphasis}</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[56ch] font-sans text-[15.5px] leading-relaxed text-[#4A4163] sm:text-[16px]">
                    {pain.lead}
                </p>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-[760px] gap-x-12 gap-y-0 text-left sm:grid-cols-2">
                {items.map((item, i) => (
                    <Reveal key={item} delay={0.05 * i}>
                        <div className="flex items-start gap-3.5 border-t border-[#2A2342]/12 py-5">
                            <span aria-hidden className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8721A]" />
                            <p className="font-sans text-[14.5px] leading-relaxed text-[#4A4163]">{item}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}
