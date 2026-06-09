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
        <section className="relative min-h-screen flex flex-col bg-[#F2F0F6] overflow-hidden">
            {/* Background portrait */}
            <div className="absolute inset-0 z-0">
                <div className="absolute right-0 top-0 h-full w-full lg:w-[52%]">
                    <Image
                        src="/images/Favour.JPG"
                        alt="Favour Egbogun — Executive Brand Strategist"
                        fill
                        className="object-cover object-[center_18%]"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-[#6B3FC0]/10 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[#16121F]/5" />
                </div>
                {/* Legibility scrims */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F2F0F6] from-30% via-[#F2F0F6]/80 to-transparent" />
                <div className="absolute inset-0 bg-[#F2F0F6]/45 lg:bg-transparent" />
            </div>

            {/* Rotated edge wordmark — Swiss signature */}
            <div className="hidden lg:block absolute left-3 top-1/2 -translate-y-1/2 z-20 origin-center -rotate-90">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6E6587] whitespace-nowrap">
                    Beta Narrative — © 2026
                </span>
            </div>

            {/* ── Top meta rule (masthead) ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease }}
                className="relative z-20 border-b border-[#16121F]/14 bg-[#F2F0F6]/70 backdrop-blur-sm pt-24 sm:pt-28"
            >
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="block w-2.5 h-2.5 bg-[#E8721A]" />
                        <span className="kicker text-[#16121F]">{hero.eyebrow}</span>
                    </div>
                    <span className="hidden sm:block kicker text-[#6E6587] text-right">Stop blending in</span>
                </div>
            </motion.div>

            {/* ── Dominant headline ── */}
            <div className="relative z-20 flex-1 flex items-center py-12 lg:py-16">
                <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.08, ease }}
                        className="display text-[clamp(2.5rem,6.6vw,5.2rem)] text-[#16121F] max-w-5xl"
                        style={{ lineHeight: 1.03 }}
                    >
                        {hero.title}{' '}
                        <span className="marker">{hero.titleEmphasis}</span>
                        <span className="block text-[#6B3FC0] mt-2 lg:pl-[16%]">{hero.titleHighlight}</span>
                    </motion.h1>
                </div>
            </div>

            {/* ── Horizontal action bar: subtitle | CTAs ── */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease }}
                className="relative z-20 border-t border-[#16121F]/14 bg-[#F2F0F6]/85 backdrop-blur-sm"
            >
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid lg:grid-cols-12">
                        <div className="lg:col-span-7 lg:border-r border-[#16121F]/14 py-7 lg:pr-12">
                            <p className="font-sans text-[15px] sm:text-base text-[#423B52] max-w-xl leading-relaxed whitespace-pre-line">
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
                className="relative z-20 border-t border-[#16121F]/14 bg-[#F2F0F6]/85 backdrop-blur-sm"
            >
                <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                        {stats.map((s, i) => (
                            <div
                                key={i}
                                className="flex items-baseline gap-4 py-6 border-t sm:border-t-0 sm:border-l border-[#16121F]/14 first:border-l-0 first:border-t-0 sm:pl-8 first:pl-0"
                            >
                                <AnimatedCounter value={s.number} className="display text-4xl sm:text-5xl text-[#16121F]" />
                                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6F6783] leading-snug max-w-[12rem]">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
