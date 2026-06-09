'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { ArrowUpRight } from 'lucide-react';

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

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section id="results" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#F1ECF9] border-t border-[#2A2342]/10">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-12 lg:mb-16 max-w-3xl"
                >
                    <SectionLabel>{results.sectionLabel}</SectionLabel>
                    <h2 className="display text-[clamp(1.6rem,3.2vw,2.6rem)] text-[#2A2342] mt-6" style={{ lineHeight: 1.12 }}>
                        {results.title}{' '}
                        <span className="text-[#E8721A]">{results.titleEmphasis}</span>
                        {results.titleEmphasisEnd && ` ${results.titleEmphasisEnd}`}
                    </h2>
                </motion.div>

                {/* Matrix */}
                <div className="grid sm:grid-cols-2 border-t border-l border-[#2A2342]/10">
                    {results.results.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.06 * index, ease }}
                            className="group border-r border-b border-[#2A2342]/10 p-8 sm:p-10"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="display text-[clamp(1.6rem,2.6vw,2.3rem)] text-[#2A2342] leading-none">
                                    {result.stat}
                                </div>
                                <ArrowUpRight size={18} className="text-[#6B3FC0]/40 mt-1 flex-shrink-0" />
                            </div>
                            <p className="font-sans text-[14px] sm:text-[15px] text-[#6E6587] leading-relaxed whitespace-pre-line max-w-md">
                                {result.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
