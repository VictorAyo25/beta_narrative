'use client';

import { useContent } from '@/context/ContentContext';
import { Check } from 'lucide-react';
import { OfferContent } from '@/types';
import Reveal from '../Reveal';
import Kicker from './Kicker';

function toTitle(name: string): string {
    return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function OfferCard({ offer, premium }: { offer: OfferContent; premium: boolean }) {
    return (
        <div
            className={`flex flex-col rounded-[14px] border bg-[#F1EBFB] p-7 shadow-[var(--shadow-card)] sm:p-9 ${
                premium ? 'border-[#E8721A]/45' : 'border-[#2A2342]/12'
            }`}
        >
            <span aria-hidden className={`-mt-7 mb-7 h-[3px] w-14 sm:-mt-9 sm:mb-9 ${premium ? 'bg-[#E8721A]' : 'bg-[#6B3FC0]/35'}`} />

            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#8B5CF6]">{offer.badge}</p>
            <h3 className="font-newsreader mt-3 text-[1.9rem] leading-tight tracking-[-0.02em] text-[#2A2342]">
                {toTitle(offer.packageName)}
            </h3>
            <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-[#6E6588]">{offer.tagline}</p>

            <p className="font-newsreader mt-6 text-[16px] italic leading-relaxed text-[#4A4163]">
                &ldquo;{offer.hook}&rdquo;
            </p>

            <div className="mt-7 flex items-baseline gap-2 border-t border-[#2A2342]/12 pt-7">
                <span className="font-newsreader text-[2.3rem] leading-none tracking-[-0.02em] text-[#2A2342]">{offer.price}</span>
                {offer.priceSecond && <span className="font-sans text-[14px] text-[#6E6588]">/ {offer.priceSecond}</span>}
            </div>
            <p className="mt-2 font-sans text-[12.5px] text-[#8A82A0]">{offer.priceNote}</p>

            <p className="mt-6 font-sans text-[14px] leading-relaxed text-[#4A4163]">{offer.description}</p>

            <ul className="mt-7 space-y-3.5 border-t border-[#2A2342]/12 pt-7">
                {offer.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check size={14} strokeWidth={2.25} className={`mt-1 shrink-0 ${premium ? 'text-[#E8721A]' : 'text-[#6B3FC0]'}`} />
                        <span className="font-sans text-[13.5px] leading-relaxed text-[#4A4163]">{item}</span>
                    </li>
                ))}
            </ul>

            <a
                href="#contact"
                className={`mt-9 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-sans text-[14px] font-medium transition-colors duration-200 ${
                    premium
                        ? 'bg-[#E8721A] text-white hover:bg-[#C05A0E]'
                        : 'border border-[#2A2342]/20 text-[#2A2342] hover:border-[#2A2342]/45'
                }`}
            >
                Apply for this
            </a>
        </div>
    );
}

export default function PressOffer() {
    const { content } = useContent();
    const { offer } = content;

    // Lead with the Executive package regardless of the order the CMS returns.
    const orderedOffers = [...offer.offers].sort(
        (a, b) => Number(/executive/i.test(b.packageName)) - Number(/executive/i.test(a.packageName)),
    );

    return (
        <section id="offer" className="relative px-5 sm:px-10 py-28 sm:py-36">
            <div className="mx-auto max-w-[1180px]">
                <Reveal>
                    <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-12 lg:gap-x-12">
                        <div className="lg:col-span-6">
                            <Kicker>{offer.sectionLabel}</Kicker>
                            <h2 className="font-newsreader mt-6 max-w-[15ch] text-[2rem] sm:text-[2.8rem] leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                                {offer.title} {offer.titleEmphasis}
                            </h2>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="mt-16 grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
                        {orderedOffers.map((o, i) => (
                            <OfferCard key={o.packageName || i} offer={o} premium={/executive/i.test(o.packageName)} />
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
