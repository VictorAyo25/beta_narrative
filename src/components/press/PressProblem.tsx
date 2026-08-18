'use client';

import { useContent } from '@/context/ContentContext';
import Reveal from '../Reveal';
import Kicker from './Kicker';

export default function PressProblem() {
    const { content } = useContent();
    const { pain } = content;

    return (
        <section id="problem" className="relative border-y border-[#2A2342]/10 bg-[#E9DFF8] px-5 sm:px-10 py-20 sm:py-24">
            <div className="mx-auto max-w-[1180px]">
                <Reveal>
                    <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-12">
                        <div className="lg:col-span-5">
                            <Kicker>{pain.sectionLabel}</Kicker>
                            <h2 className="font-newsreader mt-6 max-w-[14ch] text-[2rem] sm:text-[2.7rem] leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                                {pain.title} {pain.titleEmphasis}
                            </h2>
                        </div>
                        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
                            <p className="max-w-[52ch] font-sans text-[16px] leading-relaxed text-[#4A4163]">
                                {pain.lead}
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <ul className="mt-14 border-t border-[#2A2342]/12">
                        {pain.items.map((item, i) => (
                            <li
                                key={i}
                                className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-[#2A2342]/12 py-6 sm:grid-cols-[5rem_1fr] sm:gap-x-10 sm:py-7"
                            >
                                <span className="font-newsreader text-[20px] italic leading-none text-[#8B5CF6] sm:text-[26px]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="max-w-[62ch] font-sans text-[15.5px] leading-relaxed text-[#4A4163] sm:text-[16.5px]">
                                    {item}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    );
}
