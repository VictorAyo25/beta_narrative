'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';

import AnimatedCounter from '../AnimatedCounter';

export default function HeroSection() {
    const { content } = useContent();
    const hero = content.hero;

    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#EEE8F8]">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y: y1 }} className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#C4A8E8]/25 blur-[120px]" />
                <motion.div style={{ y: y2 }} className="absolute bottom-[-20%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#E8721A]/20 blur-[100px]" />
                <motion.div style={{ y: y1 }} className="absolute top-[40%] right-[20%] w-[350px] h-[350px] rounded-full bg-[#E8721A]/10 blur-[80px]" />
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#EEE8F8]/95 via-[#EEE8F8]/65 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#EEE8F8] via-transparent to-[#EEE8F8]/20 z-10" />
                    <Image src="/images/Favour.JPG" alt="Favour Egbogun - Executive Brand Strategist" fill className="object-cover object-[center_25%] opacity-35 mix-blend-multiply filter grayscale contrast-110" priority sizes="100vw" />
                </div>
                <div className="absolute top-[15%] right-[8%] w-[2px] h-[50%] bg-gradient-to-b from-transparent via-[#C4A8E8]/70 to-transparent z-10" />
                <motion.div style={{ y: y1 }} className="absolute top-[12%] right-[8%] translate-x-[1px] w-3 h-3 rounded-full bg-[#C4A8E8]/80 z-10" />
            </div>

            {/* Main content */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-32 pb-20">
                <div className="max-w-3xl">


                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E8721A]/20 bg-[#E8721A]/5 mb-6 shadow-[0_0_20px_rgba(232,114,26,0.05)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8721A] animate-pulse shadow-[0_0_8px_rgba(232,114,26,0.5)]" />
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#E8721A] to-[#4A2D8F] bg-clip-text text-transparent mt-[1px]">{hero.eyebrow}</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold leading-[1.1] tracking-[-0.02em] mb-8">
                        <span className="text-[#1A0E35]">{hero.title}</span>{' '}
                        <em className="italic text-gradient not-italic">{hero.titleEmphasis}</em>
                        <br />
                        <span className="text-[#6B3FC0]">{hero.titleHighlight}</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} className="text-base sm:text-lg text-[#1A0E35] max-w-xl mb-12 font-normal leading-relaxed">
                        {hero.subtitle}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <a href="#contact" className="group relative inline-flex items-center justify-center text-sm font-semibold tracking-[0.12em] uppercase text-white bg-[#E8721A] px-8 py-4 rounded-full hover:bg-[#C05A0E] hover:shadow-[0_0_40px_rgba(232,114,26,0.5)] hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_24px_rgba(232,114,26,0.35)]">
                            {hero.ctaText.replace(/[→\->]/g, '').trim()}
                        </a>
                    </motion.div>
                </div>


            </div>
        </section>
    );
}
