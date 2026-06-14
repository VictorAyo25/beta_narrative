'use client';

import { Check } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { Reveal, scrollToScene } from './primitives';
import Eyebrow from './Eyebrow';

/** Offer scene: two elevated pricing cards, Executive highlighted. */
export default function SpotlightOffer() {
    const { content } = useContent();
    const { offer } = content;
    const offers = offer.offers ?? [];

    return (
        <div className="mx-auto w-full max-w-[980px]">
            <Reveal className="text-center">
                <Eyebrow>{offer.sectionLabel}</Eyebrow>
                <h2 className="mx-auto mt-6 max-w-[20ch] font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                    {offer.title} <span className="text-[#E8721A]">{offer.titleEmphasis}</span>
                </h2>
            </Reveal>

            <div className="mt-12 grid items-start gap-6 md:grid-cols-2">
                {offers.map((plan, i) => {
                    const highlighted = plan.packageName.toLowerCase().includes('executive');
                    const includes = plan.includes.filter((x) => x && x.trim() !== '');
                    return (
                        <Reveal key={plan.packageName} delay={0.08 * i}>
                            <div
                                className={`relative flex h-full flex-col rounded-[1.75rem] border bg-[#F6F2FC] p-8 sm:p-9 ${
                                    highlighted
                                        ? 'border-[#E8721A]/40 shadow-[0_40px_90px_-50px_rgba(232,114,26,0.55)] ring-1 ring-[#E8721A]/20'
                                        : 'border-[#2A2342]/12 shadow-[0_30px_80px_-54px_rgba(42,35,66,0.5)]'
                                }`}
                            >
                                {highlighted && (
                                    <span className="absolute -top-3 left-8 rounded-full bg-[#E8721A] px-3 py-1 font-sans text-[10.5px] font-semibold uppercase tracking-wide text-white">
                                        Most popular
                                    </span>
                                )}
                                <span
                                    className={`inline-flex w-fit rounded-full px-3 py-1 font-sans text-[11px] font-semibold ${
                                        highlighted ? 'bg-[#E8721A]/12 text-[#C05A0E]' : 'bg-[#6B3FC0]/10 text-[#6B3FC0]'
                                    }`}
                                >
                                    {plan.badge}
                                </span>
                                <h3 className="mt-4 font-display text-[1.6rem] capitalize text-[#2A2342]">
                                    {plan.packageName.toLowerCase()}
                                </h3>
                                <p className="mt-1 font-sans text-[13.5px] text-[#6E6588]">{plan.tagline}</p>

                                <div className="mt-5 flex flex-wrap items-baseline gap-2.5">
                                    <span className="font-display text-[2.2rem] leading-none text-[#2A2342]">{plan.price}</span>
                                    {plan.priceSecond && (
                                        <span className="font-sans text-[13px] text-[#6E6588]">or {plan.priceSecond}</span>
                                    )}
                                </div>
                                <p className="mt-1.5 font-sans text-[12px] text-[#8A82A0]">{plan.priceNote}</p>

                                <p className="mt-5 font-sans text-[13.5px] leading-relaxed text-[#6E6588]">{plan.description}</p>

                                <ul className="mt-6 flex-1 space-y-2.5 border-t border-[#2A2342]/10 pt-6">
                                    {includes.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5">
                                            <span
                                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                                                    highlighted ? 'bg-[#E8721A]/15 text-[#C05A0E]' : 'bg-[#6B3FC0]/12 text-[#6B3FC0]'
                                                }`}
                                            >
                                                <Check size={10} strokeWidth={3} />
                                            </span>
                                            <span className="font-sans text-[13.5px] leading-snug text-[#4A4163]">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => scrollToScene('contact')}
                                    className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-sans text-[13.5px] font-semibold transition-colors duration-200 ${
                                        highlighted
                                            ? 'bg-[#E8721A] text-white hover:bg-[#C05A0E]'
                                            : 'border border-[#2A2342]/15 text-[#2A2342] hover:border-[#E8721A]/50 hover:text-[#C05A0E]'
                                    }`}
                                >
                                    Secure your spot
                                </button>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
}
