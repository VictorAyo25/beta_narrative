'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { trackEvent } from '@/lib/analytics';
import AnimatedCounter from '../AnimatedCounter';

export default function HeroSection() {
    const { content } = useContent();
    const hero = content.hero;

    const ease = [0.16, 1, 0.3, 1] as const;

    const stats = (content?.value?.credentials && content.value.credentials.length
        ? content.value.credentials
        : [
            { number: '4+', label: 'Years of strategy' },
            { number: '5×', label: 'LinkedIn reach' },
            { number: '20%', label: 'Engagement lift' },
        ]).slice(0, 3);

    return (
        <section className="relative min-h-screen flex flex-col bg-[#E1D3F2] overflow-hidden">
            {/* Background portrait */}
            <div className="absolute inset-0 z-0">
                <div className="absolute right-0 top-0 h-full w-full lg:w-[52%]">
                    <Image
                        src="/images/Favour.JPG"
                        alt="Favour Egbogun — Executive Brand Strategist"
                        fill
                        className="object-cover object-[center_18%]"
                        priority
                        sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                    <div className="absolute inset-0 bg-[#6B3FC0]/10 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[#2A2342]/5" />
                </div>
                {/* Legibility scrims */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#E1D3F2] from-30% via-[#E1D3F2]/80 to-transparent" />
                <div className="absolute inset-0 bg-[#E1D3F2]/45 lg:bg-transparent" />
            </div>

            {/* ── Top meta rule (masthead) ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease }}
                className="relative z-20 border-b border-[#2A2342]/12 bg-[#E1D3F2]/70 backdrop-blur-sm pt-24 sm:pt-28"
            >
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-5 flex items-center gap-4">
                    <span className="kicker text-[#6B3FC0] whitespace-nowrap">{hero.eyebrow}</span>
                    <span aria-hidden className="h-px flex-1 bg-[#2A2342]/14" />
                    <span aria-hidden className="block h-1.5 w-1.5 rotate-45 bg-[#E8721A] flex-shrink-0" />
                </div>
            </motion.div>

            {/* ── Dominant headline ── */}
            <div className="relative z-20 flex-1 flex items-center py-12 lg:py-16">
                <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.08, ease }}
                        className="display text-[clamp(2.1rem,4.8vw,3.9rem)] text-[#2A2342] max-w-4xl"
                        style={{ lineHeight: 1.08 }}
                    >
                        {hero.title}{' '}
                        <span className="text-[#E8721A]">{hero.titleEmphasis}</span>
                        <span className="block text-[#6B3FC0] mt-1.5 lg:pl-[8%]">{hero.titleHighlight}</span>
                    </motion.h1>
                </div>
            </div>

            {/* ── Horizontal action bar: subtitle | CTAs ── */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease }}
                className="relative z-20 border-t border-[#2A2342]/14 bg-[#E1D3F2]/85 backdrop-blur-sm"
            >
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-12">
                        <div className="lg:col-span-7 lg:border-r border-[#2A2342]/14 py-7 lg:pr-12">
                            <p className="font-sans text-[15px] sm:text-base text-[#4A4163] max-w-xl leading-relaxed whitespace-pre-line">
                                {hero.subtitle}
                            </p>
                        </div>
                        <div className="lg:col-span-5 py-7 lg:pl-12 flex flex-col sm:flex-row gap-3 sm:items-center">
                            <a
                                href="#contact"
                                onClick={() => trackEvent('cta_click', 'hero_cta')}
                                className="btn-solid justify-center"
                            >
                                {hero.ctaText.replace(/[→\->]/g, '').trim()}
                            </a>
                            <a href="#results" className="btn-ghost justify-center">
                                See the results
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Stat strip ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.42, ease }}
                className="relative z-20 border-t border-[#2A2342]/14 bg-[#E1D3F2]/85 backdrop-blur-sm"
            >
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                        {stats.map((s, i) => (
                            <div
                                key={i}
                                className="flex items-baseline gap-4 py-6 border-t sm:border-t-0 sm:border-l border-[#2A2342]/14 first:border-l-0 first:border-t-0 sm:pl-8 first:pl-0"
                            >
                                <AnimatedCounter value={s.number} className="display text-4xl sm:text-5xl text-[#2A2342]" />
                                <span className="font-sans text-[13px] text-[#6E6587] leading-snug max-w-[12rem]">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
