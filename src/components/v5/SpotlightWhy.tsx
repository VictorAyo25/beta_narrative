'use client';

import { useContent } from '@/context/ContentContext';
import AnimatedCounter from '@/components/AnimatedCounter';
import { resolveCredentials } from '@/lib/credentials';
import { Reveal } from './primitives';
import Eyebrow from './Eyebrow';

/** Why-us scene: layered heading + body paragraphs, then a big credentials row. */
export default function SpotlightWhy() {
    const { content } = useContent();
    const { value } = content;
    const paragraphs = (value.body ?? '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    const creds = resolveCredentials(value.credentials).slice(0, 3);

    return (
        <div className="mx-auto w-full max-w-[920px]">
            <Reveal>
                <Eyebrow>{value.sectionLabel}</Eyebrow>
                <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                    {value.title} <span className="text-[#E8721A]">{value.titleEmphasis}</span>
                </h2>
            </Reveal>

            <Reveal delay={0.1}>
                <div className="mt-8 max-w-[62ch] space-y-4 font-sans text-[15.5px] leading-relaxed text-[#4A4163] sm:text-[16px]">
                    {paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </Reveal>

            {creds.length > 0 && (
                <Reveal delay={0.16}>
                    <div className="mt-12 grid gap-8 border-t border-[#2A2342]/12 pt-10 sm:grid-cols-3">
                        {creds.map((c) => (
                            <div key={c.label}>
                                <AnimatedCounter
                                    value={c.number}
                                    className="block font-display text-[clamp(2.4rem,4vw,3.2rem)] font-light leading-none text-[#6B3FC0]"
                                />
                                <p className="mt-3 max-w-[26ch] font-sans text-[13.5px] leading-snug text-[#6E6588]">
                                    {c.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            )}
        </div>
    );
}
