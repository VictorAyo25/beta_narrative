'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { Award, Users, MessageSquare } from 'lucide-react';
import AnimatedCounter from '../AnimatedCounter';

export default function ValueSection() {
    const { content } = useContent();

    const value = content?.value || {
        sectionLabel: 'Why Beta Narrative',
        title: 'Strategic visibility,',
        titleEmphasis: 'not just content.',
        body: "Founded by Favour Egbogun, Beta Narrative translates executive experience into undeniable digital authority. Drawing from a deep foundation in strategic communications, we work with leaders at every stage, from rising professionals stepping into their power, to seasoned executives ready for the world to catch up. We take your expertise, refined, real, and underrepresented online, and build a narrative so sharp, so unmistakably you, that the right people cannot scroll past. Your audience, your pillars, your voice, your legacy. We just make sure the world finally hears it.",
        credentials: [
            { number: '4+', label: 'Years crafting executive narratives for multinational leaders' },
            { number: '5×', label: 'LinkedIn reach growth in 90 days for a senior leader' },
            { number: '20%', label: 'LinkedIn engagement lift from op-eds and ghost-written content' },
        ],
    };

    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

    return (
        <section id="why" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-[#FAF7F2] overflow-hidden">
            {/* Background accents */}
            <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#D9CFF2]/10 blur-[100px] pointer-events-none" />
            <motion.div style={{ y: y2 }} className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-[#E8721A]/8 blur-[80px] pointer-events-none" />

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
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#1A112E] mt-5 mb-6">
                            {value.title}{' '}
                            <em className="italic text-[#E8721A]">{value.titleEmphasis}</em>
                        </h2>
                        <p className="text-base text-[#1A112E]/80 font-light leading-relaxed">
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
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8721A] via-[#4A2D8F] to-[#E8721A] p-[3px]">
                                <div className="absolute inset-[3px] rounded-full bg-[#FAF7F2]" />
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
                                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2]/30 via-transparent to-transparent" />
                            </div>

                            {/* Decorative glow effects */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-[#E8721A]/15 blur-2xl pointer-events-none" />
                            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#D9CFF2]/15 blur-2xl pointer-events-none" />

                            {/* Floating Caption Pill */}
                            <motion.div 
                                initial={{ opacity: 0, x: -10, y: 10 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute bottom-6 sm:bottom-10 -left-4 sm:-left-8 lg:-left-12 bg-[#FFFFFF] border border-[#D9CFF2]/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full px-6 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.2)] z-10 flex items-center gap-3.5"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#E8721A] animate-pulse shadow-[0_0_10px_rgba(232,114,26,0.8)]" />
                                <div className="flex flex-col">
                                    <span className="font-serif text-[#1A112E] text-sm sm:text-[15px] font-semibold tracking-wide drop-shadow-md leading-none mb-1.5">
                                        Favour Egbogun
                                    </span>
                                    <span className="text-[#4A2D8F]/90 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] leading-none">
                                        Communications Strategist
                                    </span>
                                </div>
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
                            className="group relative p-7 rounded-2xl border border-[#1A112E]/5 bg-[#FAF7F2]/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(232,114,26,0.15)] hover:border-[#E8721A]/30 hover:bg-[#FAF7F2]/50 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1A112E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-xl border border-[#E8721A]/20 bg-[#E8721A]/10 flex items-center justify-center group-hover:bg-[#E8721A]/20 group-hover:border-[#E8721A]/40 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(232,114,26,0.5)]">
                                        {index === 0 && <Award size={16} className="text-[#E8721A]" />}
                                        {index === 1 && <Users size={16} className="text-[#E8721A]" />}
                                        {index === 2 && <MessageSquare size={16} className="text-[#E8721A]" />}
                                    </div>
                                </div>
                                <div className="font-sans text-4xl sm:text-5xl font-bold text-gradient leading-none mb-3 tracking-tight">
                                    <AnimatedCounter value={cred.number} />
                                </div>
                                <p className="text-sm text-[#59497A]/85 font-light leading-relaxed">
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
