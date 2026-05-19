'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { Sparkles } from 'lucide-react';

export default function ValueSection() {
    const { content } = useContent();

    const value = content?.value || {
        sectionLabel: 'Why Beta Narrative',
        title: 'Strategic visibility,',
        titleEmphasis: 'not just content.',
        body: 'With a foundation in public relations and strategic communication, Beta Narrative positions leaders for the opportunities their calibre deserves. We work with C-suite executives at multinationals, crafting narratives tailored to their target audience — and building the architecture around it.',
        credentials: [
            { number: '4+', label: 'Years crafting executive narratives for multinational leaders' },
            { number: '5×', label: 'LinkedIn reach growth in 90 days for a senior leader' },
            { number: '20%', label: 'LinkedIn engagement lift from op-eds and ghost-written content' },
        ],
    };

    return (
        <section id="why" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-[#0D0B1F] overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-[20%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#6B4FAD]/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-[#E8721A]/8 blur-[80px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                {/* Header with Image */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <SectionLabel>{value.sectionLabel}</SectionLabel>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#FAF9FF] mt-5 mb-6">
                            {value.title}{' '}
                            <em className="italic text-[#E8721A]">{value.titleEmphasis}</em>
                        </h2>
                        <p className="text-base text-[#AFA9CC]/65 font-light leading-relaxed">
                            {value.body}
                        </p>
                    </motion.div>

                    {/* Profile Image - Circular */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                            {/* Gradient border ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8721A] via-[#6B4FAD] to-[#E8721A] p-[3px]">
                                <div className="absolute inset-[3px] rounded-full bg-[#0D0B1F]" />
                            </div>

                            {/* Image container - circular */}
                            <div className="absolute inset-[4px] rounded-full overflow-hidden">
                                <Image
                                    src="/images/Favour.JPG"
                                    alt="Favour - PR & Communications Expert"
                                    fill
                                    className="object-cover object-[center_20%]"
                                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                                />
                                {/* Subtle overlay for better blending */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B1F]/30 via-transparent to-transparent" />
                            </div>

                            {/* Decorative glow effects */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#E8721A]/15 blur-2xl pointer-events-none" />
                            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#6B4FAD]/15 blur-2xl pointer-events-none" />

                            {/* Floating Caption Card */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-12 bg-gradient-to-br from-[#1C1740]/95 to-[#15112E]/95 backdrop-blur-xl border border-[#6B4FAD]/30 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-[#0D0B1F]/50 max-w-[240px] sm:max-w-[280px] z-10"
                            >
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E8721A] to-[#6B4FAD] rounded-t-2xl opacity-80" />
                                <div className="flex items-center gap-2.5 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-[#E8721A] animate-pulse" />
                                    <p className="font-serif text-[#FAF9FF] text-sm sm:text-base font-semibold tracking-wide">
                                        Favour Egbogun
                                    </p>
                                </div>
                                <p className="text-[#AFA9CC]/90 text-[11px] sm:text-xs font-light leading-relaxed">
                                    Strategic Communications & Brand Storyteller helping executives build boardroom-level influence.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Credentials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {value.credentials.map((cred, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.12 * index, ease: [0.16, 1, 0.3, 1] }}
                            className="card-hover group relative p-7 rounded-2xl border border-[#6B4FAD]/20 bg-gradient-to-br from-[#1C1740] to-[#15112E] overflow-hidden"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#E8721A]/0 to-[#6B4FAD]/0 group-hover:from-[#E8721A]/5 group-hover:to-[#6B4FAD]/5 transition-all duration-500" />

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8721A]/20 to-[#6B4FAD]/20 flex items-center justify-center">
                                        <Sparkles size={16} className="text-[#E8721A]" />
                                    </div>
                                </div>
                                <div className="font-sans text-4xl sm:text-5xl font-bold text-gradient leading-none mb-3 tracking-tight">
                                    {cred.number}
                                </div>
                                <p className="text-sm text-[#AFA9CC]/60 font-light leading-relaxed">
                                    {cred.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
