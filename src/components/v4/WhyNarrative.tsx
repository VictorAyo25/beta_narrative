'use client';

import { useContent } from '@/context/ContentContext';
import { resolveCredentials } from '@/lib/credentials';
import Kicker from './Kicker';
import Reveal from './Reveal';

/** Why copy: title, body paragraphs (split on blank lines), credentials note. */
export default function WhyNarrative() {
    const { content } = useContent();
    const { value } = content;

    const paragraphs = (value.body ?? '')
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

    const creds = resolveCredentials(value.credentials);

    return (
        <div>
            <Reveal>
                <Kicker>{value.sectionLabel}</Kicker>
                <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-normal leading-[1.08] tracking-[-0.015em] text-[#2A2342]">
                    {value.title}{' '}
                    <span className="text-[#6B3FC0]">{value.titleEmphasis}</span>
                </h2>
            </Reveal>

            <div className="mt-7 space-y-5">
                {paragraphs.map((p, i) => (
                    <Reveal key={i} delay={0.05 * i}>
                        <p className="max-w-[54ch] font-sans text-[15.5px] leading-relaxed text-[#4A4163]">
                            {p}
                        </p>
                    </Reveal>
                ))}
            </div>

            {creds.length > 0 && (
                <Reveal delay={0.1}>
                    <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-[#2A2342]/12 pt-7">
                        {creds.map((c) => (
                            <div key={c.label} className="flex items-baseline gap-2.5">
                                <span className="font-display text-[1.5rem] leading-none text-[#6B3FC0]">
                                    {c.number}
                                </span>
                                <span className="max-w-[18ch] font-sans text-[12px] leading-snug text-[#6E6588]">
                                    {c.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </Reveal>
            )}
        </div>
    );
}
