'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export default function ResultsSection() {
    const { content } = useContent();

    const results = content?.results || {
        sectionLabel: 'The Results',
        title: 'What strategic visibility',
        titleEmphasis: 'actually',
        titleEmphasisEnd: 'looks like.',
        results: [
            { stat: '5× Reach', description: 'A senior leader grew their LinkedIn reach 5× within 90 days — attracting inbound from decision-makers and industry peers.' },
            { stat: '+20% Engagement', description: 'Ghost-written articles and op-eds drove a 20% LinkedIn engagement lift — turning followers into conversations that convert.' },
            { stat: 'BusinessDay', description: 'Clients featured in national publications, positioning them as credible voices in their industries — not just practitioners.' },
            { stat: 'TV Features', description: 'Visibility strategy has placed executives in broadcast conversations — widening reach far beyond LinkedIn.' },
        ],
    };

    return (
        <section id="results" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-[#EAE4F2] overflow-hidden">
            {/* Background accent */}
            <div className="absolute bottom-0 left-[20%] w-[500px] h-[300px] rounded-full bg-[#D9CFF2]/8 blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl mb-16"
                >
                    <SectionLabel>{results.sectionLabel}</SectionLabel>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#1A112E] mt-5">
                        {results.title}{' '}
                        <em className="italic text-[#E8721A]">{results.titleEmphasis}</em>
                        {results.titleEmphasisEnd && ` ${results.titleEmphasisEnd}`}
                    </h2>
                </motion.div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {results.results.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative p-7 rounded-2xl border border-[#1A112E]/5 bg-[#F5F2FA]/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(232,114,26,0.15)] hover:border-[#E8721A]/30 hover:bg-[#F5F2FA]/50 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1A112E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            
                            <div className="flex items-start justify-between mb-5 relative z-10">
                                <div className="w-10 h-10 rounded-xl border border-[#E8721A]/20 bg-[#E8721A]/10 flex items-center justify-center group-hover:bg-[#E8721A]/20 group-hover:border-[#E8721A]/40 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(232,114,26,0.5)]">
                                    <TrendingUp size={16} className="text-[#E8721A]" />
                                </div>
                                <ArrowUpRight size={16} className="text-[#4A2D8F]/40 group-hover:text-[#E8721A] transition-colors duration-300 mt-1" />
                            </div>
                            <div className="font-sans text-2xl sm:text-3xl font-bold text-[#E8721A] mb-3">
                                {result.stat}
                            </div>
                            <p className="text-sm text-[#59497A]/55 font-light leading-relaxed">
                                {result.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
