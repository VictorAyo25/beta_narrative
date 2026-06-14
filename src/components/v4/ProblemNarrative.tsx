'use client';

import { useContent } from '@/context/ContentContext';
import Kicker from './Kicker';
import Reveal from './Reveal';

/** Problem copy: title, lead, and the pain points as a calm hairline list. */
export default function ProblemNarrative() {
    const { content } = useContent();
    const { pain } = content;
    const items = pain.items ?? [];

    return (
        <div>
            <Reveal>
                <Kicker>{pain.sectionLabel}</Kicker>
                <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-normal leading-[1.08] tracking-[-0.015em] text-[#2A2342]">
                    {pain.title}{' '}
                    <span className="text-[#E8721A]">{pain.titleEmphasis}</span>
                </h2>
                <p className="mt-6 max-w-[50ch] font-sans text-[15.5px] leading-relaxed text-[#4A4163]">
                    {pain.lead}
                </p>
            </Reveal>

            <ul className="mt-9 border-t border-[#2A2342]/12">
                {items.map((item, i) => (
                    <Reveal key={item} delay={0.05 * i}>
                        <li className="flex items-start gap-4 border-b border-[#2A2342]/12 py-5">
                            <span className="mt-1 font-mono text-[11px] tabular-nums text-[#8A82A0]">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="font-sans text-[15px] leading-relaxed text-[#4A4163]">
                                {item}
                            </span>
                        </li>
                    </Reveal>
                ))}
            </ul>
        </div>
    );
}
