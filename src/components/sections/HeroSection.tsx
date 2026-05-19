'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    const { content, loading } = useContent();

    const hero = content?.hero || {
        eyebrow: 'Executive Brand Strategy',
        title: 'Your expertise is',
        titleEmphasis: 'undeniable.',
        titleHighlight: "Your visibility shouldn't lag behind.",
        subtitle: 'Built for leaders ready to stop blending in and start being sought after — consistently, strategically, and on their own terms.',
        ctaText: 'Build My Brand',
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0D0B1F]">
            {/* Background layers */}
            <div className="absolute inset-0 z-0">
                {/* Gradient orbs */}
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#534AB7]/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8721A]/10 blur-[100px]" />

                {/* Background image */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B1F] via-[#0D0B1F]/85 to-[#0D0B1F]/40 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B1F] via-transparent to-[#0D0B1F]/60 z-10" />
                    <Image
                        src="/images/Favour.JPG"
                        alt="Favour - PR & Communications Expert"
                        fill
                        className="object-cover object-center opacity-20"
                        priority
                        sizes="100vw"
                    />
                </div>

                {/* Decorative line */}
                <div className="absolute top-[15%] right-[8%] w-[2px] h-[50%] bg-gradient-to-b from-transparent via-[#E8721A]/50 to-transparent z-10" />
                <div className="absolute top-[12%] right-[8%] translate-x-[1px] w-3 h-3 rounded-full bg-[#E8721A]/60 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-32 pb-20">
                <div className="max-w-3xl">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <span className="w-10 h-[1px] bg-gradient-to-r from-[#E8721A] to-[#534AB7]" />
                        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase bg-gradient-to-r from-[#E8721A] to-[#AFA9EC] bg-clip-text text-transparent">
                            {loading ? 'Loading...' : hero.eyebrow}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold leading-[1.1] tracking-[-0.02em] mb-8"
                    >
                        <span className="text-[#FAF9FF]">{hero.title}</span>{' '}
                        <em className="italic text-gradient not-italic">{hero.titleEmphasis}</em>
                        <br />
                        <span className="text-[#AFA9EC]">{hero.titleHighlight}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="text-base sm:text-lg text-[#AFA9EC]/70 max-w-xl mb-12 font-light leading-relaxed"
                    >
                        {hero.subtitle}
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
                    >
                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase text-[#0D0B1F] bg-gradient-to-r from-[#E8721A] to-[#F5A96A] px-8 py-4 rounded-full hover:shadow-[0_0_40px_rgba(232,114,26,0.4)] transition-all duration-400 hover:scale-[1.03]"
                        >
                            {hero.ctaText}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                        <a
                            href="#results"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-[#AFA9EC] hover:text-[#FAF9FF] transition-colors duration-300"
                        >
                            See results
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </motion.div>
                </div>

                {/* Bottom stats bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 pt-10 border-t border-[#534AB7]/20"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {[
                            { num: '4+', label: 'Years Experience' },
                            { num: '5×', label: 'Avg. Reach Growth' },
                            { num: '20%', label: 'Engagement Lift' },
                            { num: '100%', label: 'Client Satisfaction' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="font-serif text-2xl sm:text-3xl font-semibold text-gradient mb-1">
                                    {stat.num}
                                </div>
                                <div className="text-xs text-[#8A86B8] tracking-wide">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
