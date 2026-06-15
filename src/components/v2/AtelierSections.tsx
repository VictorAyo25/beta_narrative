'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import AnimatedCounter from '@/components/AnimatedCounter';
import { resolveCredentials } from '@/lib/credentials';
import type { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Tasteful, once-only scroll reveal used across every section. */
function Reveal({
    children,
    delay = 0,
    className = '',
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/** Section eyebrow — a vertical orange blade leading a tracked mono label. */
function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <div className="inline-flex items-center gap-3">
            <span aria-hidden className="block h-3.5 w-[3px] bg-[#E8721A]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B3FC0]">
                {children}
            </span>
        </div>
    );
}

export default function AtelierSections() {
    const { content } = useContent();
    const { hero, pain, value, results, offer } = content;

    const valueParagraphs = value.body.split(/\n{2,}/).filter((p) => p.trim().length > 0);

    return (
        <>
            {/* ============ HERO ============ */}
            <section id="top" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
                <Reveal>
                    {hero.eyebrow && <Eyebrow>{hero.eyebrow}</Eyebrow>}
                </Reveal>
                <Reveal delay={0.05}>
                    <h1 className="mt-6 font-display text-[clamp(2.2rem,5.4vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                        {hero.title}{' '}
                        <span className="text-[#E8721A]">{hero.titleEmphasis}</span>
                        <span className="mt-1 block text-[#6B3FC0]">{hero.titleHighlight}</span>
                    </h1>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-6 max-w-xl font-sans text-[16px] leading-relaxed text-[#4A4163]">
                        {hero.subtitle}
                    </p>
                </Reveal>
                <Reveal delay={0.15}>
                    <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#E8721A] px-6 py-3.5 font-sans text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#C05A0E]"
                        >
                            {hero.ctaText || 'Build my brand →'}
                        </a>
                        <a
                            href="#results"
                            className="group inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-[#2A2342] transition-colors duration-200 hover:text-[#6B3FC0]"
                        >
                            See the results
                            <ArrowUpRight
                                size={15}
                                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </a>
                    </div>
                </Reveal>

                {resolveCredentials(value.credentials).length > 0 && (
                    <Reveal delay={0.2}>
                        <div className="mt-12 border-t border-[#2A2342]/12 pt-8">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                {resolveCredentials(value.credentials).map((cred) => (
                                    <div key={`${cred.number}-${cred.label}`}>
                                        <AnimatedCounter
                                            value={cred.number}
                                            className="font-display text-[1.9rem] leading-none text-[#2A2342]"
                                        />
                                        <p className="mt-2 font-sans text-[12.5px] leading-snug text-[#6E6588]">
                                            {cred.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                )}
            </section>

            {/* ============ PROBLEM ============ */}
            <section
                id="problem"
                className="scroll-mt-24 border-t border-[#2A2342]/12 py-20 sm:py-24 lg:py-28"
            >
                <Reveal>
                    <Eyebrow>{pain.sectionLabel}</Eyebrow>
                </Reveal>
                <Reveal delay={0.05}>
                    <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.14] tracking-[-0.015em] text-[#2A2342]">
                        {pain.title}{' '}
                        <span className="text-[#E8721A]">{pain.titleEmphasis}</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-5 max-w-xl font-sans text-[16px] leading-relaxed text-[#4A4163]">
                        {pain.lead}
                    </p>
                </Reveal>

                <div className="mt-10 border-t border-[#2A2342]/12">
                    {pain.items.map((item, i) => (
                        <Reveal key={item} delay={0.05 * i}>
                            <div className="flex items-start gap-4 border-b border-[#2A2342]/12 py-5">
                                <span className="mt-2 block h-px w-5 shrink-0 bg-[#6B3FC0]" />
                                <p className="font-sans text-[15px] leading-relaxed text-[#4A4163]">
                                    {item}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============ WHY ============ */}
            <section
                id="why"
                className="scroll-mt-24 border-t border-[#2A2342]/12 py-20 sm:py-24 lg:py-28"
            >
                <Reveal>
                    <Eyebrow>{value.sectionLabel}</Eyebrow>
                </Reveal>
                <Reveal delay={0.05}>
                    <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.14] tracking-[-0.015em] text-[#2A2342]">
                        {value.title}{' '}
                        <span className="text-[#E8721A]">{value.titleEmphasis}</span>
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <div className="mt-6 max-w-xl space-y-4">
                        {valueParagraphs.map((para, i) => (
                            <p
                                key={i}
                                className="font-sans text-[15.5px] leading-relaxed text-[#4A4163]"
                            >
                                {para}
                            </p>
                        ))}
                    </div>
                </Reveal>

                {resolveCredentials(value.credentials).length > 0 && (
                    <Reveal delay={0.15}>
                        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-[#2A2342]/12 pt-9 sm:grid-cols-3">
                            {resolveCredentials(value.credentials).map((cred) => (
                                <div key={`${cred.number}-${cred.label}`}>
                                    <AnimatedCounter
                                        value={cred.number}
                                        className="font-display text-[2.4rem] leading-none text-[#6B3FC0]"
                                    />
                                    <p className="mt-2.5 font-sans text-[13px] leading-snug text-[#6E6588]">
                                        {cred.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                )}
            </section>

            {/* ============ RESULTS ============ */}
            <section
                id="results"
                className="scroll-mt-24 border-t border-[#2A2342]/12 py-20 sm:py-24 lg:py-28"
            >
                <Reveal>
                    <Eyebrow>{results.sectionLabel}</Eyebrow>
                </Reveal>
                <Reveal delay={0.05}>
                    <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.14] tracking-[-0.015em] text-[#2A2342]">
                        {results.title}{' '}
                        <span className="text-[#E8721A]">{results.titleEmphasis}</span>
                        {results.titleEmphasisEnd ? <> {results.titleEmphasisEnd}</> : null}
                    </h2>
                </Reveal>

                <div className="mt-10 border-t border-[#2A2342]/12">
                    {results.results.map((result, i) => (
                        <Reveal key={result.stat} delay={0.05 * i}>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-[#2A2342]/12 py-7 sm:grid-cols-[minmax(0,11rem)_1fr]">
                                <div className="flex items-start gap-1.5">
                                    <span className="font-display text-[1.55rem] leading-tight text-[#2A2342]">
                                        {result.stat}
                                    </span>
                                    <ArrowUpRight size={16} className="mt-1 shrink-0 text-[#E8721A]" />
                                </div>
                                <p className="font-sans text-[15px] leading-relaxed text-[#4A4163]">
                                    {result.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ============ OFFER ============ */}
            <section
                id="offer"
                className="scroll-mt-24 border-t border-[#2A2342]/12 py-20 sm:py-24 lg:py-28"
            >
                <Reveal>
                    <Eyebrow>{offer.sectionLabel}</Eyebrow>
                </Reveal>
                <Reveal delay={0.05}>
                    <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-[1.14] tracking-[-0.015em] text-[#2A2342]">
                        {offer.title}{' '}
                        <span className="text-[#E8721A]">{offer.titleEmphasis}</span>
                    </h2>
                </Reveal>

                <div className="mt-10 space-y-6">
                    {offer.offers.map((pkg, i) => {
                        const isHighlight = pkg.packageName.toLowerCase().includes('executive');
                        const includes = pkg.includes.filter((line) => line.trim().length > 0);
                        return (
                            <Reveal key={pkg.packageName} delay={0.05 * i}>
                                <div
                                    className={`relative rounded-xl border bg-[#F1EBFB] p-7 shadow-[0_18px_44px_-26px_rgba(42,35,66,0.4)] sm:p-9 ${
                                        isHighlight
                                            ? 'border-[#E8721A]/40 ring-1 ring-[#E8721A]/30'
                                            : 'border-[#2A2342]/12'
                                    }`}
                                >
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] ${
                                                isHighlight
                                                    ? 'bg-[#E8721A]/12 text-[#C05A0E]'
                                                    : 'bg-[#D5C4EC] text-[#6B3FC0]'
                                            }`}
                                        >
                                            {pkg.badge}
                                        </span>
                                        {isHighlight && (
                                            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#6E6588]">
                                                Most chosen
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="mt-5 font-display text-[1.5rem] leading-tight text-[#2A2342]">
                                        {pkg.packageName}
                                    </h3>
                                    <p className="mt-1.5 font-sans text-[14px] text-[#6E6588]">
                                        {pkg.tagline}
                                    </p>

                                    <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[#2A2342]/12 pt-6">
                                        <span className="font-display text-[1.85rem] leading-none text-[#2A2342]">
                                            {pkg.price}
                                        </span>
                                        {pkg.priceSecond && (
                                            <span className="font-sans text-[14px] text-[#6E6588]">
                                                or {pkg.priceSecond}
                                            </span>
                                        )}
                                        <span className="font-sans text-[13px] text-[#8A82A0]">
                                            {pkg.priceNote}
                                        </span>
                                    </div>

                                    <p className="mt-6 font-display text-[15px] italic leading-relaxed text-[#2A2342]">
                                        {pkg.hook}
                                    </p>
                                    <p className="mt-3 font-sans text-[14.5px] leading-relaxed text-[#4A4163]">
                                        {pkg.description}
                                    </p>

                                    {includes.length > 0 && (
                                        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                                            {includes.map((line) => (
                                                <li key={line} className="flex items-start gap-2.5">
                                                    <Check
                                                        size={16}
                                                        className={`mt-0.5 shrink-0 ${
                                                            isHighlight ? 'text-[#E8721A]' : 'text-[#6B3FC0]'
                                                        }`}
                                                    />
                                                    <span className="font-sans text-[14px] leading-snug text-[#4A4163]">
                                                        {line}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <a
                                        href="#contact"
                                        className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-sans text-[14px] font-semibold transition-colors duration-300 ${
                                            isHighlight
                                                ? 'bg-[#E8721A] text-white hover:bg-[#C05A0E]'
                                                : 'border border-[#2A2342]/18 text-[#2A2342] hover:border-[#E8721A] hover:text-[#E8721A]'
                                        }`}
                                    >
                                        Apply for this package
                                    </a>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
