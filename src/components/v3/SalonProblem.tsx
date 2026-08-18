'use client';

import { useContent } from '@/context/ContentContext';
import { EyeOff, MessageSquareDashed, TrendingDown, SearchX, LucideIcon } from 'lucide-react';
import Eyebrow from './Eyebrow';
import Reveal from '../Reveal';

// Cycled if the CMS holds more than four pain points.
const ICONS: LucideIcon[] = [EyeOff, MessageSquareDashed, TrendingDown, SearchX];

export default function SalonProblem() {
    const { content } = useContent();
    const { pain } = content;

    return (
        <section id="problem" className="relative px-5 sm:px-8 py-24 sm:py-32 bg-[#E9DFF8]">
            <div className="mx-auto max-w-[1100px]">
                <div className="mx-auto max-w-[640px] text-center">
                    <Reveal className="flex justify-center">
                        <Eyebrow>{pain.sectionLabel}</Eyebrow>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="font-fraunces mt-6 text-[2rem] sm:text-[2.8rem] font-light leading-[1.1] tracking-[-0.015em] text-[#2A2342]">
                            {pain.title}{' '}
                            <span className="italic text-[#E8721A]">{pain.titleEmphasis}</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-5 max-w-[600px] font-sans text-[16px] leading-relaxed text-[#4A4163]">
                            {pain.lead}
                        </p>
                    </Reveal>
                </div>

                <div className="mx-auto mt-14 grid max-w-[820px] grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {pain.items.map((item, i) => {
                        const Icon = ICONS[i % ICONS.length];
                        return (
                            <Reveal key={i} delay={0.04 * i}>
                                <div className="flex h-full items-start gap-4 rounded-2xl border border-[#2A2342]/10 bg-[#F1EBFB] p-6 shadow-[0_18px_46px_-30px_rgba(42,35,66,0.5)] transition-shadow duration-300 hover:shadow-[0_24px_56px_-28px_rgba(42,35,66,0.45)]">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E6DBF6] text-[#6B3FC0]">
                                        <Icon size={19} strokeWidth={1.75} />
                                    </span>
                                    <p className="font-sans text-[15px] leading-relaxed text-[#4A4163]">
                                        {item}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
