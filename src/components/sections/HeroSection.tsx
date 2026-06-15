'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { trackEvent } from '@/lib/analytics';
import AnimatedCounter from '../AnimatedCounter';
import { EASE, Kicker, tile } from './bento';

/**
 * Bento Canvas hero — the headline, portrait and proof stats are tiles on a
 * 12-column lilac grid that animate in on load and collapse to a tidy stack on
 * mobile. The signature first impression for the v1 layout.
 */
export default function HeroSection() {
    const { content } = useContent();
    const { hero, value } = content;
    const portrait = value.profileImage || '/images/Favour.JPG';

    const stats = (value.credentials && value.credentials.length
        ? value.credentials
        : [
              { number: '4+', label: 'Years crafting executive narratives' },
              { number: '5×', label: 'LinkedIn reach growth in 90 days' },
              { number: '20%', label: 'Engagement lift from ghost-written op-eds' },
          ]
    ).slice(0, 3);

    const statTone = [tile.violet, tile.surface, tile.orange];
    const statText = ['text-white', 'text-[#E8721A]', 'text-white'];
    const statLabel = ['text-white/70', 'text-[#6E6587]', 'text-white/80'];

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
    };
    const item = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    };

    return (
        <section
            id="top"
            className="relative overflow-hidden px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-8 lg:pb-14"
        >
            {/* Ambient aurora wash behind the tiles */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-24 top-10 h-[460px] w-[460px] rounded-full bg-[#C4A8E8]/40 blur-[130px]" />
                <div className="absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-[#F5943A]/15 blur-[130px]" />
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12"
            >
                {/* ── Headline tile ── */}
                <motion.div
                    variants={item}
                    className={`${tile.base} ${tile.surface} flex flex-col justify-between gap-8 p-7 sm:p-10 lg:col-span-8 lg:row-span-2`}
                >
                    {/* faint index numeral in the corner */}
                    <span
                        aria-hidden
                        className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[8rem] leading-none text-[#6B3FC0]/[0.06] sm:text-[11rem]"
                    >
                        01
                    </span>

                    <div className="relative">
                        <Kicker>{hero.eyebrow}</Kicker>
                        <h1
                            className="display mt-6 text-[clamp(2.3rem,5.2vw,4.2rem)] text-[#2A2342]"
                            style={{ lineHeight: 1.04 }}
                        >
                            {hero.title}{' '}
                            <span className="text-[#E8721A]">{hero.titleEmphasis}</span>{' '}
                            <span className="text-[#6B3FC0]">{hero.titleHighlight}</span>
                        </h1>
                        <p className="mt-6 max-w-xl font-sans text-[15px] leading-relaxed text-[#4A4163] sm:text-base">
                            {hero.subtitle}
                        </p>
                    </div>

                    <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
                        <a
                            href="#contact"
                            onClick={() => trackEvent('cta_click', 'hero_cta')}
                            className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#E8721A] px-7 py-3.5 font-sans text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#C05A0E]"
                        >
                            {hero.ctaText.replace(/[→\->]/g, '').trim() || 'Build my brand'}
                            <ArrowRight
                                size={16}
                                className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                            />
                        </a>
                        <a
                            href="#results"
                            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#2A2342]/15 px-7 py-3.5 font-sans text-[14.5px] font-semibold text-[#2A2342] transition-colors duration-300 hover:border-[#6B3FC0] hover:text-[#6B3FC0]"
                        >
                            See the results
                        </a>
                    </div>
                </motion.div>

                {/* ── Portrait tile ── */}
                <motion.div
                    variants={item}
                    className={`${tile.base} ${tile.dark} ${tile.lift} min-h-[360px] p-0 sm:min-h-[440px] lg:col-span-4 lg:row-span-2 lg:min-h-0`}
                >
                    <Image
                        src={portrait}
                        alt={value.profileName || 'Favour Egbogun — Executive Brand Strategist'}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover object-[center_16%] transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2342]/85 via-[#2A2342]/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                        <div>
                            <p className="font-display text-[19px] leading-tight text-white">
                                {value.profileName || 'Favour Egbogun'}
                            </p>
                            <p className="mt-0.5 font-sans text-[12.5px] text-white/75">
                                {value.profileRole || 'Executive Brand Strategist'}
                            </p>
                        </div>
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#E8721A] text-white">
                            <ArrowDown size={16} />
                        </span>
                    </div>
                </motion.div>

                {/* ── Proof stat tiles ── */}
                <motion.div
                    variants={item}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:col-span-12"
                >
                    {stats.map((s, i) => (
                        <div
                            key={`${s.number}-${i}`}
                            className={`${tile.base} ${statTone[i]} ${tile.lift} flex items-center justify-between gap-4 p-6 sm:flex-col sm:items-start sm:gap-3 sm:p-7`}
                        >
                            <AnimatedCounter
                                value={s.number}
                                className={`display text-[2.6rem] leading-none sm:text-[3rem] ${statText[i]}`}
                            />
                            <p className={`font-sans text-[12.5px] leading-snug sm:text-[13px] ${statLabel[i]} max-w-[16rem] text-right sm:text-left`}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
