'use client';

import { Check } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import Kicker from './Kicker';
import Reveal from './Reveal';

/** Offer copy: the ways to work together as calm stacked cards; Executive highlighted. */
export default function OfferNarrative() {
    const { content } = useContent();
    const { offer } = content;
    const offers = offer.offers ?? [];

    return (
        <div>
            <Reveal>
                <Kicker>{offer.sectionLabel}</Kicker>
                <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-normal leading-[1.08] tracking-[-0.015em] text-[#2A2342]">
                    {offer.title}{' '}
                    <span className="text-[#E8721A]">{offer.titleEmphasis}</span>
                </h2>
            </Reveal>

            <div className="mt-9 space-y-5">
                {offers.map((plan, i) => {
                    const highlighted = plan.packageName.toLowerCase().includes('executive');
                    const includes = plan.includes.filter((x) => x && x.trim() !== '');
                    return (
                        <Reveal key={plan.packageName} delay={0.06 * i}>
                            <div
                                className={`rounded-2xl border bg-[#F1EBFB] p-7 sm:p-8 ${
                                    highlighted
                                        ? 'border-[#E8721A]/35 shadow-[0_30px_70px_-44px_rgba(232,114,26,0.5)] ring-1 ring-[#E8721A]/15'
                                        : 'border-[#2A2342]/12 shadow-[0_24px_60px_-44px_rgba(42,35,66,0.5)]'
                                }`}
                            >
                                <span
                                    className={`inline-flex rounded-full px-3 py-1 font-sans text-[11px] font-semibold ${
                                        highlighted ? 'bg-[#E8721A]/12 text-[#C05A0E]' : 'bg-[#6B3FC0]/10 text-[#6B3FC0]'
                                    }`}
                                >
                                    {plan.badge}
                                </span>
                                <h3 className="mt-4 font-display text-[1.45rem] capitalize text-[#2A2342]">
                                    {plan.packageName.toLowerCase()}
                                </h3>
                                <p className="mt-1 font-sans text-[13.5px] text-[#6E6588]">{plan.tagline}</p>

                                <div className="mt-5 flex flex-wrap items-baseline gap-2.5">
                                    <span className="font-display text-[2rem] leading-none text-[#2A2342]">{plan.price}</span>
                                    {plan.priceSecond && (
                                        <span className="font-sans text-[13px] text-[#6E6588]">or {plan.priceSecond}</span>
                                    )}
                                </div>
                                <p className="mt-1.5 font-sans text-[12px] text-[#8A82A0]">{plan.priceNote}</p>

                                <p className="mt-5 font-fraunces text-[15.5px] italic leading-relaxed text-[#4A4163]">
                                    {plan.hook}
                                </p>
                                <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-[#6E6588]">
                                    {plan.description}
                                </p>

                                <ul className="mt-6 space-y-2.5 border-t border-[#2A2342]/10 pt-6">
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

                                <a
                                    href="#contact"
                                    className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-sans text-[13.5px] font-semibold transition-colors duration-200 ${
                                        highlighted
                                            ? 'bg-[#E8721A] text-white hover:bg-[#C05A0E]'
                                            : 'border border-[#2A2342]/15 text-[#2A2342] hover:border-[#E8721A]/50 hover:text-[#C05A0E]'
                                    }`}
                                >
                                    Secure your spot
                                </a>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
}
