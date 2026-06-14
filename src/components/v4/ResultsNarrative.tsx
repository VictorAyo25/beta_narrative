'use client';

import { useContent } from '@/context/ContentContext';
import Kicker from './Kicker';
import Reveal from './Reveal';

/** Results copy: title + each result as a stat/description row on a hairline grid. */
export default function ResultsNarrative() {
    const { content } = useContent();
    const { results } = content;
    const list = results.results ?? [];

    return (
        <div>
            <Reveal>
                <Kicker>{results.sectionLabel}</Kicker>
                <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-normal leading-[1.08] tracking-[-0.015em] text-[#2A2342]">
                    {results.title}{' '}
                    <span className="text-[#E8721A]">{results.titleEmphasis}</span>
                    {results.titleEmphasisEnd ? <> {results.titleEmphasisEnd}</> : null}
                </h2>
            </Reveal>

            <div className="mt-9 border-t border-[#2A2342]/12">
                {list.map((r, i) => (
                    <Reveal key={r.stat} delay={0.05 * i}>
                        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-[#2A2342]/12 py-6 sm:grid-cols-[160px_1fr]">
                            <span className="font-display text-[1.6rem] leading-none text-[#6B3FC0]">
                                {r.stat}
                            </span>
                            <p className="col-span-2 max-w-[48ch] font-sans text-[14.5px] leading-relaxed text-[#4A4163] sm:col-span-1">
                                {r.description}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}
