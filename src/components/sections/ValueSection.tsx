'use client';

import { motion } from 'framer-motion';
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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl mb-16"
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
                                <div className="font-serif text-4xl sm:text-5xl font-bold text-gradient leading-none mb-3">
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
