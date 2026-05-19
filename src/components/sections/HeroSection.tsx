'use client';

/**
 * Hero Section Component
 * 
 * Main hero section with headline, subtitle, and CTA.
 */

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';

export default function HeroSection() {
    const { content, loading } = useContent();

    const hero = content?.hero || {
        eyebrow: 'Executive Brand Strategy',
        title: 'Your expertise is',
        titleEmphasis: 'undeniable.',
        titleHighlight: "Your visibility shouldn't lag behind.",
        subtitle: 'Built for leaders ready to stop blending in and start being sought after.',
        ctaText: 'Build My Brand →',
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0D0B1F]">
            {/* Decorative Elements */}
            <div className="absolute top-[10%] right-0 w-[3px] h-[55%] bg-[#E8721A]/60" />
            <div className="absolute top-[8%] right-[30px] w-2.5 h-2.5 rounded-full bg-[#E8721A]" />

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B1F] via-[#0D0B1F]/90 to-[#0D0B1F]/70 z-10" />
                <Image
                    src="/images/favour.jpg"
                    alt="Favour - PR & Communications Expert"
                    fill
                    className="object-cover object-center opacity-30"
                    priority
                    sizes="100vw"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-[#E8721A] mb-6"
                    >
                        <span className="w-7 h-px bg-[#E8721A]" />
                        {loading ? 'Loading...' : hero.eyebrow}
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-[#FAF9FF] mb-6"
                    >
                        {hero.title}{' '}
                        <em className="italic text-[#E8721A]">{hero.titleEmphasis}</em>
                        <br />
                        <span className="text-[#AFA9EC] font-semibold">{hero.titleHighlight}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg text-[#AFA9EC]/75 max-w-xl mb-10 font-light leading-relaxed"
                    >
                        {hero.subtitle}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.a
                        href="#contact"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block text-sm font-medium tracking-[0.14em] uppercase text-[#FAF9FF] bg-[#E8721A] px-8 py-4 rounded-sm hover:bg-[#F5A96A] transition-all duration-250"
                    >
                        {hero.ctaText}
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
