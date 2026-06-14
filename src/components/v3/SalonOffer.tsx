'use client';

import { useContent } from '@/context/ContentContext';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { OfferContent } from '@/types';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;

function toTitle(name: string): string {
    // CMS stores package names ALL-CAPS; the Salon voice avoids shouting.
    return name
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function OfferCard({ offer, highlighted, index }: { offer: OfferContent; highlighted: boolean; index: number }) {
    const includes = offer.includes.filter((i) => i.trim().length > 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.08 * index, ease: EASE }}
            className={`relative flex flex-col rounded-[2rem] border p-8 sm:p-9 ${
                highlighted
                    ? 'border-[#E8721A]/40 bg-[#F6F2FC] ring-1 ring-[#E8721A]/30 shadow-[0_44px_100px_-46px_rgba(232,114,26,0.5)]'
                    : 'border-[#2A2342]/10 bg-[#F6F2FC] shadow-[0_30px_70px_-48px_rgba(42,35,66,0.5)]'
            }`}
        >
            {highlighted && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#E8721A] px-4 py-1.5 font-sans text-[12px] font-medium text-white shadow-[0_10px_24px_-10px_rgba(232,114,26,0.9)]">
                    <Star size={12} className="fill-white" /> Most popular
                </span>
            )}

            <p className="font-sans text-[12.5px] font-medium tracking-wide text-[#8B5CF6]">{offer.badge}</p>
            <h3 className="font-fraunces mt-2 text-[1.9rem] font-light leading-tight text-[#2A2342]">
                {toTitle(offer.packageName)}
            </h3>
            <p className="mt-2 font-sans text-[14.5px] leading-relaxed text-[#6E6588]">{offer.tagline}</p>

            <p className="mt-5 font-fraunces text-[15.5px] italic leading-relaxed text-[#4A4163]">
                &ldquo;{offer.hook}&rdquo;
            </p>

            <div className="mt-6 flex items-baseline gap-2 border-t border-[#2A2342]/10 pt-6">
                <span className="font-fraunces text-[2.2rem] font-light leading-none text-[#2A2342]">{offer.price}</span>
                {offer.priceSecond && (
                    <span className="font-sans text-[14px] text-[#6E6588]">/ {offer.priceSecond}</span>
                )}
            </div>
            <p className="mt-1.5 font-sans text-[12.5px] text-[#8A82A0]">{offer.priceNote}</p>

            <p className="mt-5 font-sans text-[14px] leading-relaxed text-[#4A4163]">{offer.description}</p>

            <ul className="mt-6 space-y-3">
                {includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                                highlighted ? 'bg-[#E8721A]/15 text-[#C05A0E]' : 'bg-[#EFE9F8] text-[#6B3FC0]'
                            }`}
                        >
                            <Check size={12} strokeWidth={2.5} />
                        </span>
                        <span className="font-sans text-[13.5px] leading-relaxed text-[#4A4163]">{item}</span>
                    </li>
                ))}
            </ul>

            <a
                href="#contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-sans text-[14px] font-medium transition-colors duration-200 ${
                    highlighted
                        ? 'bg-[#E8721A] text-white shadow-[0_14px_32px_-12px_rgba(232,114,26,0.8)] hover:bg-[#C05A0E]'
                        : 'border border-[#2A2342]/15 bg-transparent text-[#2A2342] hover:border-[#2A2342]/35 hover:bg-[#EFE9F8]'
                }`}
            >
                Apply for this
            </a>
        </motion.div>
    );
}

export default function SalonOffer() {
    const { content } = useContent();
    const { offer } = content;

    return (
        <section id="offer" className="relative px-5 sm:px-8 py-24 sm:py-32 bg-[#F1ECF9]">
            <div className="mx-auto max-w-[1100px]">
                <div className="mx-auto max-w-[640px] text-center">
                    <Reveal className="flex justify-center">
                        <Eyebrow>{offer.sectionLabel}</Eyebrow>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="font-fraunces mt-6 text-[2rem] sm:text-[2.8rem] font-light leading-[1.1] tracking-[-0.015em] text-[#2A2342]">
                            {offer.title}{' '}
                            <span className="italic text-[#E8721A]">{offer.titleEmphasis}</span>
                        </h2>
                    </Reveal>
                </div>

                <div className="mx-auto mt-14 grid max-w-[920px] grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-start">
                    {offer.offers.map((o, i) => (
                        <OfferCard
                            key={i}
                            offer={o}
                            index={i}
                            highlighted={/executive/i.test(o.packageName)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
