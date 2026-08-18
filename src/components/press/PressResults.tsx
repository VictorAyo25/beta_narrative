'use client';

import { useContent } from '@/context/ContentContext';
import Reveal from '../Reveal';
import Kicker from './Kicker';

export default function PressResults() {
    const { content } = useContent();
    const { results } = content;

    return (
        <section id="results" className="relative border-y border-[#2A2342]/10 bg-[#E9DFF8] px-5 sm:px-10 py-24 sm:py-32">
            <div className="mx-auto max-w-[1180px]">
                <Reveal>
                    <div className="mx-auto max-w-[620px] text-center">
                        <Kicker className="justify-center">{results.sectionLabel}</Kicker>
                        <h2 className="font-newsreader mt-6 text-[2rem] sm:text-[2.8rem] leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                            {results.title}{' '}
                            <span className="italic text-[#E8721A]">{results.titleEmphasis}</span>
                            {results.titleEmphasisEnd ? ` ${results.titleEmphasisEnd}` : null}
                        </h2>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <dl className="mt-16 border-t border-[#2A2342]/15">
                        {results.results.map((r, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-1 gap-y-3 border-b border-[#2A2342]/15 py-8 sm:grid-cols-12 sm:gap-x-10 sm:py-10"
                            >
                                <dt className="font-newsreader text-[2.1rem] leading-[1] tracking-[-0.02em] text-[#2A2342] sm:col-span-5 sm:text-[2.9rem] lg:text-[3.2rem]">
                                    {r.stat}
                                </dt>
                                <dd className="max-w-[62ch] font-sans text-[15px] leading-relaxed text-[#4A4163] sm:col-span-7 sm:pt-2 sm:text-[15.5px]">
                                    {r.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </section>
    );
}
