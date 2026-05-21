'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { AlertTriangle } from 'lucide-react';

export default function PainSection() {
    const { content } = useContent();

    const pain = content?.pain || {
        sectionLabel: 'The Problem',
        title: "You're leading rooms.",
        titleEmphasis: "The internet doesn't know it.",
        lead: "The leaders who get called to speak, consult, and serve on boards aren't always the most qualified. They're the most visible.",
        items: [
            'You worry about sounding like every other executive — generic, forgettable, corporate.',
            "You post inconsistently, if at all, because you're unsure what to say or how to frame it.",
            "Your visibility doesn't reflect the weight of your experience and the value you carry.",
            "You're ready for consultancy and speaking gigs — but the right people can't find you.",
        ],
    };

    return (
        <section id="problem" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-[#F2EEF9] overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#E8721A]/5 blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Left Column - Heading */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <SectionLabel>{pain.sectionLabel}</SectionLabel>
                            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#1A112E] mt-5 mb-6">
                                {pain.title}{' '}
                                <em className="italic text-[#E8721A]">{pain.titleEmphasis}</em>
                            </h2>
                            <p className="text-base text-[#6B4FAD]/65 font-light leading-relaxed">
                                {pain.lead}
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column - Pain Points */}
                    <div className="lg:col-span-7">
                        <div className="space-y-3">
                            {pain.items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                                    className="group flex items-start gap-4 p-5 rounded-2xl border border-[#1A112E]/5 bg-[#FCFAFF]/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(232,114,26,0.15)] hover:border-[#E8721A]/30 hover:bg-[#FCFAFF]/50 transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1A112E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8721A]/10 border border-[#E8721A]/20 flex items-center justify-center mt-0.5 group-hover:bg-[#E8721A]/20 group-hover:border-[#E8721A]/40 group-hover:shadow-[0_0_12px_rgba(232,114,26,0.5)] transition-all duration-300 relative z-10">
                                        <AlertTriangle size={14} className="text-[#E8721A]" />
                                    </div>
                                    <p className="text-sm text-[#1A112E]/70 leading-relaxed group-hover:text-[#1A112E] transition-colors duration-300 relative z-10">
                                        {item}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
