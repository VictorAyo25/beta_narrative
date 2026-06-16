'use client';

import { useContent } from '@/context/ContentContext';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

export default function SalonWhy() {
    const { content } = useContent();
    const { value } = content;
    const paragraphs = value.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

    return (
        <section id="why" className="relative px-5 sm:px-8 py-24 sm:py-32 bg-[#E9DFF8]">
            <div className="mx-auto max-w-[720px]">
                <Reveal>
                    <Eyebrow>{value.sectionLabel}</Eyebrow>
                </Reveal>
                <Reveal delay={0.05}>
                    <h2 className="font-fraunces mt-6 text-[2rem] sm:text-[2.8rem] font-light leading-[1.1] tracking-[-0.015em] text-[#2A2342]">
                        {value.title}{' '}
                        <span className="italic text-[#E8721A]">{value.titleEmphasis}</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="mt-7 space-y-5">
                        {paragraphs.map((p, i) => (
                            <p key={i} className="font-sans text-[15.5px] sm:text-[16.5px] leading-relaxed text-[#4A4163]">
                                {p}
                            </p>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
