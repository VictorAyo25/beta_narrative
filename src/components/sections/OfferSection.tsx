'use client';

import { Check, Plus, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { defaultSiteContent } from '@/lib/default-content';
import { trackEvent } from '@/lib/analytics';
import { Kicker, Reveal, RevealGrid, TileReveal, tile } from './bento';

const ADDONS = [
    'Media advisory',
    'Event coverage',
    'Professional photography',
    'PR amplification',
    'Conference visibility support',
];

export default function OfferSection() {
    const { content } = useContent();

    const offerSection =
        content?.offer && 'offers' in content.offer ? content.offer : defaultSiteContent.offer;
    const { sectionLabel, title, titleEmphasis, offers = [] } = offerSection;

    return (
        <section id="offer" className="relative px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto w-full max-w-[1320px]">
                {/* Header */}
                <Reveal>
                    <div className={`${tile.base} ${tile.surface} p-7 sm:p-10`}>
                        <Kicker>{sectionLabel}</Kicker>
                        <h2
                            className="display mt-6 max-w-3xl text-[clamp(1.7rem,3.4vw,2.7rem)] text-[#2A2342]"
                            style={{ lineHeight: 1.12 }}
                        >
                            {title} <span className="text-[#E8721A]">{titleEmphasis}</span>
                        </h2>
                    </div>
                </Reveal>

                {/* Package tiles */}
                <RevealGrid className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-2">
                    {offers.map((plan, index) => {
                        const isExec = plan.packageName.toUpperCase().includes('EXECUTIVE');
                        const includes = plan.includes.filter((i) => i && i.trim() !== '');
                        return (
                            <TileReveal
                                key={index}
                                className={`${tile.base} ${tile.surface} flex flex-col p-7 sm:p-9 ${
                                    isExec ? 'ring-2 ring-[#E8721A]/45' : ''
                                }`}
                            >
                                {/* badge row */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
                                            isExec
                                                ? 'bg-[#E8721A]/12 text-[#C05A0E]'
                                                : 'bg-[#D5C4EC] text-[#6B3FC0]'
                                        }`}
                                    >
                                        {plan.badge}
                                    </span>
                                    {isExec && (
                                        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#6E6588]">
                                            Most chosen
                                        </span>
                                    )}
                                </div>

                                <h3 className="display mt-5 text-[clamp(1.7rem,2.6vw,2.3rem)] text-[#2A2342]">
                                    {plan.packageName}
                                </h3>
                                <p className="mt-2 font-sans text-[14px] text-[#6E6588]">{plan.tagline}</p>

                                {/* price */}
                                <div className="my-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-[#2A2342]/10 py-6">
                                    <span className="display text-[2.4rem] leading-none text-[#2A2342] sm:text-[2.8rem]">
                                        {plan.price}
                                    </span>
                                    {plan.priceSecond && (
                                        <>
                                            <span className="font-sans text-[13px] text-[#6E6588]">or</span>
                                            <span className="display text-[1.6rem] leading-none text-[#E8721A]">
                                                {plan.priceSecond}
                                            </span>
                                        </>
                                    )}
                                    {plan.priceNote && (
                                        <span className="w-full font-sans text-[13px] text-[#6E6588]">
                                            {plan.priceNote}
                                        </span>
                                    )}
                                </div>

                                {/* hook */}
                                <p
                                    className={`mb-5 border-l-2 pl-4 font-sans text-[15px] leading-relaxed text-[#2A2342] sm:text-base ${
                                        isExec ? 'border-[#E8721A]' : 'border-[#6B3FC0]'
                                    }`}
                                >
                                    {plan.hook}
                                </p>
                                <p className="mb-7 whitespace-pre-line font-sans text-[14px] leading-relaxed text-[#6E6588]">
                                    {plan.description}
                                </p>

                                {/* includes */}
                                {includes.length > 0 && (
                                    <>
                                        <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#6E6588]">
                                            What&apos;s included
                                        </p>
                                        <ul className="mb-8 space-y-3">
                                            {includes.map((line, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Check
                                                        size={15}
                                                        strokeWidth={2.5}
                                                        className={`mt-0.5 flex-shrink-0 ${
                                                            isExec ? 'text-[#E8721A]' : 'text-[#6B3FC0]'
                                                        }`}
                                                    />
                                                    <span className="font-sans text-[14px] leading-snug text-[#4A4163]">
                                                        {line}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/* CTA — id consumed by FloatingCTA visibility logic */}
                                <a
                                    id={`offer-cta-btn-${index}`}
                                    href="#contact"
                                    onClick={() =>
                                        trackEvent(
                                            'cta_click',
                                            `package:${plan.packageName.toLowerCase().replace(/\s+/g, '_')}`
                                        )
                                    }
                                    className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 font-sans text-[14px] font-semibold transition-colors duration-300 ${
                                        isExec
                                            ? 'bg-[#E8721A] text-white hover:bg-[#C05A0E]'
                                            : 'border border-[#2A2342]/20 text-[#2A2342] hover:border-[#E8721A] hover:text-[#E8721A]'
                                    }`}
                                >
                                    Secure your spot
                                    <ArrowRight size={15} />
                                </a>
                            </TileReveal>
                        );
                    })}
                </RevealGrid>

                {/* Add-ons tile */}
                <Reveal delay={0.05}>
                    <div className={`${tile.base} ${tile.paper} mt-3 flex flex-col gap-6 p-7 sm:mt-4 sm:flex-row sm:items-center sm:gap-10 sm:p-9`}>
                        <div className="flex-shrink-0">
                            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#6E6588]">
                                Enhancements
                            </p>
                            <h4 className="display mt-2 text-[1.5rem] text-[#2A2342] sm:text-[1.8rem]">
                                Optional add-ons
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {ADDONS.map((item) => (
                                <span
                                    key={item}
                                    className="group inline-flex items-center gap-2 rounded-full border border-[#2A2342]/12 bg-[#F1EBFB] px-4 py-2 transition-colors duration-300 hover:border-[#E8721A]/50"
                                >
                                    <Plus
                                        size={12}
                                        className="text-[#6B3FC0] transition-colors group-hover:text-[#E8721A]"
                                    />
                                    <span className="font-sans text-[13px] text-[#4A4163]">{item}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
