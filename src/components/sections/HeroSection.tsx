'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { ArrowRight } from 'lucide-react';
import AnimatedCounter from '../AnimatedCounter';

export default function HeroSection() {
    const { content } = useContent();
    const hero = content.hero;

    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#FAF7F2]">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y: y1 }} className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#BCAED9]/10 blur-[120px]" />
                <motion.div style={{ y: y2 }} className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8721A]/10 blur-[100px]" />
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/60 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-[#FAF7F2]/30 z-10" />
                    <Image src="/images/Favour.JPG" alt="Favour Egbogun - Executive Brand Strategist" fill className="object-cover object-center opacity-30 mix-blend-multiply filter grayscale contrast-125" priority sizes="100vw" />
                </div>
                <div className="absolute top-[15%] right-[8%] w-[2px] h-[50%] bg-gradient-to-b from-transparent via-[#E8721A]/50 to-transparent z-10" />
                <motion.div style={{ y: y1 }} className="absolute top-[12%] right-[8%] translate-x-[1px] w-3 h-3 rounded-full bg-[#E8721A]/60 z-10" />
            </div>

            {/* Main content */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-32 pb-20">
                <div className="max-w-3xl">


                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E8721A]/20 bg-[#E8721A]/5 mb-6 shadow-[0_0_20px_rgba(232,114,26,0.05)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8721A] animate-pulse shadow-[0_0_8px_rgba(232,114,26,0.5)]" />
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#E8721A] to-[#4A2D8F] bg-clip-text text-transparent mt-[1px]">{hero.eyebrow}</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold leading-[1.1] tracking-[-0.02em] mb-8">
                        <span className="text-[#1A112E]">{hero.title}</span>{' '}
                        <em className="italic text-gradient not-italic">{hero.titleEmphasis}</em>
                        <br />
                        <span className="text-[#4A2D8F]">{hero.titleHighlight}</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} className="text-base sm:text-lg text-[#4A2D8F]/70 max-w-xl mb-12 font-light leading-relaxed">
                        {hero.subtitle}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <a href="#contact" className="group relative inline-flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase text-[#1A112E] bg-[#1A112E]/5 backdrop-blur-md border border-[#1A112E]/10 px-8 py-4 rounded-full hover:bg-[#1A112E]/10 hover:border-[#E8721A]/50 transition-all duration-400 overflow-hidden shadow-[0_0_20px_rgba(232,114,26,0.1)] hover:shadow-[0_0_40px_rgba(232,114,26,0.3)] hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#E8721A]/0 via-[#E8721A]/10 to-[#F5A96A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            {hero.ctaText.replace(/[→\->]/g, '').trim()}
                            <ArrowRight size={16} className="text-[#E8721A] group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                        <a href="#results" className="group inline-flex items-center gap-2 text-sm font-medium text-[#4A2D8F] hover:text-[#1A112E] transition-colors duration-300">
                            See results
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mt-20 pt-10 border-t border-[#BCAED9]/25">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div>
                            <div className="font-sans text-3xl sm:text-4xl font-bold text-[#E8721A] mb-1"><AnimatedCounter value="4+" /></div>
                            <div className="text-xs text-[#59497A] tracking-wide">Years Experience</div>
                        </div>
                        <div>
                            <div className="font-sans text-3xl sm:text-4xl font-bold text-[#E8721A] mb-1"><AnimatedCounter value="5×" /></div>
                            <div className="text-xs text-[#59497A] tracking-wide">LinkedIn Reach in 90 Days</div>
                        </div>
                        <div>
                            <div className="font-sans text-3xl sm:text-4xl font-bold text-[#E8721A] mb-1"><AnimatedCounter value="20%" /></div>
                            <div className="text-xs text-[#59497A] tracking-wide">Engagement Lift</div>
                        </div>
                        <div>
                            <div className="font-sans text-3xl sm:text-4xl font-bold text-[#E8721A] mb-1"><AnimatedCounter value="100%" /></div>
                            <div className="text-xs text-[#59497A] tracking-wide">Client Satisfaction</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
