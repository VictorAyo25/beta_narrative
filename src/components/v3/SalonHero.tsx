'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { resolveCredentials } from '@/lib/credentials';
import Eyebrow from './Eyebrow';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SalonHero() {
    const { content } = useContent();
    const { hero, value } = content;
    const portrait = value.profileImage || '/images/Favour.JPG';

    // Up to three credential chips flanking the portrait.
    const chips = resolveCredentials(value.credentials).slice(0, 3);

    return (
        <section id="top" className="relative overflow-hidden px-5 sm:px-8 pt-36 sm:pt-40 pb-20 sm:pb-28">
            {/* Soft lilac glows */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-24 h-[440px] w-[640px] -translate-x-1/2 rounded-full bg-[#C4A8E8]/30 blur-[120px]" />
                <div className="absolute left-1/2 bottom-0 h-[360px] w-[520px] -translate-x-1/2 rounded-full bg-[#F5943A]/10 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-[1100px] text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex justify-center"
                >
                    <Eyebrow>{hero.eyebrow}</Eyebrow>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                    className="font-fraunces mx-auto mt-7 max-w-[15ch] text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem] font-light leading-[1.04] tracking-[-0.02em] text-[#2A2342]"
                >
                    {hero.title}{' '}
                    <span className="italic text-[#E8721A]">{hero.titleEmphasis}</span>{' '}
                    <span className="text-[#6B3FC0]">{hero.titleHighlight}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
                    className="mx-auto mt-7 max-w-[600px] font-sans text-[16px] sm:text-[17px] leading-relaxed text-[#4A4163]"
                >
                    {hero.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
                    className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <a
                        href="#contact"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E8721A] px-7 py-3.5 font-sans text-[14.5px] font-medium text-white shadow-[0_14px_34px_-12px_rgba(232,114,26,0.75)] hover:bg-[#C05A0E] transition-colors duration-200"
                    >
                        {hero.ctaText.replace(/[→\s]+$/, '')}
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                    <a
                        href="#results"
                        className="inline-flex items-center justify-center rounded-full border border-[#2A2342]/15 bg-[#F6F2FC]/60 px-7 py-3.5 font-sans text-[14.5px] font-medium text-[#2A2342] hover:border-[#2A2342]/30 hover:bg-[#F6F2FC] transition-colors duration-200"
                    >
                        See the results
                    </a>
                </motion.div>

                {/* Portrait + flanking credential chips */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.34, ease: EASE }}
                    className="relative mx-auto mt-16 sm:mt-20 max-w-[560px]"
                >
                    {/* glow behind the frame */}
                    <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.75rem] bg-gradient-to-b from-[#C4A8E8]/40 to-[#F5943A]/15 blur-2xl" />

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-[#2A2342]/10 bg-[#F6F2FC] shadow-[0_40px_90px_-44px_rgba(42,35,66,0.55)]">
                        <div className="relative aspect-[4/5] w-full">
                            <Image
                                src={portrait}
                                alt={value.profileName || 'Favour Egbogun'}
                                fill
                                priority
                                sizes="(max-width: 640px) 90vw, 560px"
                                className="object-cover"
                                style={{ objectPosition: 'center 18%' }}
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2A2342]/35 to-transparent" />
                        </div>

                        {value.profileName && (
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
                                <p className="font-fraunces text-[20px] text-white">{value.profileName}</p>
                                {value.profileRole && (
                                    <p className="font-sans text-[12.5px] text-white/80">{value.profileRole}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Credential chips — flank on large screens, stack below on mobile */}
                    {chips.length > 0 && (
                        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 lg:mt-0">
                            {chips.map((c, i) => (
                                <div
                                    key={c.label}
                                    className={`rounded-2xl border border-[#2A2342]/10 bg-[#F6F2FC]/85 backdrop-blur-sm px-4 py-3.5 text-center shadow-[0_16px_40px_-26px_rgba(42,35,66,0.5)] lg:absolute ${
                                        i === 0
                                            ? 'lg:-left-24 lg:top-10 lg:w-44 lg:text-left'
                                            : i === 1
                                            ? 'lg:-right-24 lg:top-1/3 lg:w-44 lg:text-right'
                                            : 'lg:-left-20 lg:bottom-12 lg:w-44 lg:text-left'
                                    }`}
                                >
                                    <p className="font-fraunces text-[26px] leading-none text-[#6B3FC0]">{c.number}</p>
                                    <p className="mt-1.5 font-sans text-[11.5px] leading-snug text-[#6E6588]">{c.label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
