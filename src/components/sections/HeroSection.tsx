'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    const { content } = useContent();
    const hero = content.hero;

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0D0B1F]">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#6B4FAD]/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8721A]/10 blur-[100px]" />
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B1F] via-[#0D0B1F]/85 to-[#0D0B1F]/40 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B1F] via-transparent to-[#0D0B1F]/60 z-10" />
                    <Image src="/images/Favour.JPG" alt="Favour Egbogun - Executive Brand Strategist" fill className="object-cover object-center opacity-20" priority sizes="100vw" />
                </div>
                <div className="absolute top-[15%] right-[8%] w-[2px] h-[50%] bg-gradient-to-b from-transparent via-[#E8721A]/50 to-transparent z-10" />
                <div className="absolute top-[12%] right-[8%] translate-x-[1px] w-3 h-3 rounded-full bg-[#E8721A]/60 z-10" />

                {/* Image Caption Overlay - Favour Egbogun Brand Caption */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-6 right-5 sm:right-8 lg:right-10 z-20 max-w-sm"
                >
                    <div className="bg-gradient-to-r from-[#0D0B1F]/90 to-[#15112E]/90 backdrop-blur-md border border-[#E8721A]/30 rounded-xl px-5 py-4 shadow-[0_0_30px_rgba(232,114,26,0.15)]">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#E8721A]"></div>
                            <span className="text-[10px] sm:text-xs font-semibold text-[#E8721A] tracking-wide uppercase">Founder, Beta Narrative</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#FAF9FF] font-medium leading-relaxed">
                            Favour Egbogun
                        </p>
                        <p className="text-[10px] sm:text-xs text-[#B8A4E8]/90 leading-relaxed mt-1">
                            Executive Brand Strategist helping C-suite leaders become the obvious choice for boards, stages & opportunities.
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-32 pb-20">
                <div className="max-w-3xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-4 mb-8">
                        <span className="w-10 h-[1px] bg-gradient-to-r from-[#E8721A] to-[#6B4FAD]" />
                        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase bg-gradient-to-r from-[#E8721A] to-[#B8A4E8] bg-clip-text text-transparent">{hero.eyebrow}</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold leading-[1.1] tracking-[-0.02em] mb-8">
                        <span className="text-[#FAF9FF]">{hero.title}</span>{' '}
                        <em className="italic text-gradient not-italic">{hero.titleEmphasis}</em>
                        <br />
                        <span className="text-[#B8A4E8]">{hero.titleHighlight}</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} className="text-base sm:text-lg text-[#B8A4E8]/70 max-w-xl mb-12 font-light leading-relaxed">
                        {hero.subtitle}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <a href="#contact" className="group inline-flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase text-[#0D0B1F] bg-gradient-to-r from-[#E8721A] to-[#F5A96A] px-8 py-4 rounded-full hover:shadow-[0_0_40px_rgba(232,114,26,0.4)] transition-all duration-400 hover:scale-[1.03]">
                            {hero.ctaText}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                        <a href="#results" className="group inline-flex items-center gap-2 text-sm font-medium text-[#B8A4E8] hover:text-[#FAF9FF] transition-colors duration-300">
                            See results
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mt-20 pt-10 border-t border-[#6B4FAD]/20">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div>
                            <div className="font-sans text-3xl sm:text-4xl font-bold text-[#E8721A] mb-1">4+</div>
                            <div className="text-xs text-[#9B8EC4] tracking-wide">Years Experience</div>
                        </div>
                        <div>
                            <div className="font-sans text-3xl sm:text-4xl font-bold text-[#E8721A] mb-1">5×</div>
                            <div className="text-xs text-[#9B8EC4] tracking-wide">LinkedIn Reach in 90 Days</div>
                        </div>
                        <div>
                            <div className="font-sans text-3xl sm:text-4xl font-bold text-[#E8721A] mb-1">20%</div>
                            <div className="text-xs text-[#9B8EC4] tracking-wide">Engagement Lift</div>
                        </div>
                        <div>
                            <div className="font-sans text-3xl sm:text-4xl font-bold text-[#E8721A] mb-1">100%</div>
                            <div className="text-xs text-[#9B8EC4] tracking-wide">Client Satisfaction</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
