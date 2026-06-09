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
        <section id="results" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-white border-t border-[#16121F]/14">
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
                    <h2 className="display text-[clamp(1.9rem,4.2vw,3.3rem)] text-[#16121F] mt-6" style={{ lineHeight: 1.08 }}>
                        {results.title}{' '}
                        <span className="text-[#E8721A]">{results.titleEmphasis}</span>
                        {results.titleEmphasisEnd && ` ${results.titleEmphasisEnd}`}
                    </h2>
                </motion.div>

                {/* Matrix */}
                <div className="grid sm:grid-cols-2 border-t border-l border-[#16121F]/14">
                    {results.results.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.06 * index, ease }}
                            className="group relative border-r border-b border-[#16121F]/14 p-7 sm:p-10 hover:bg-[#F2F0F6] transition-colors duration-300"
                        >
                            <span className="absolute left-0 top-0 h-full w-[3px] bg-[#E8721A] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            <div className="flex items-start justify-end mb-7">
                                <ArrowUpRight size={20} className="text-[#16121F]/25 group-hover:text-[#E8721A] transition-colors duration-300" />
                            </div>
                            <div className="display text-[clamp(1.8rem,3vw,2.6rem)] text-[#16121F] leading-none mb-5">
                                {result.stat}
                            </div>
                            <p className="font-sans text-[14px] sm:text-[15px] text-[#6F6783] leading-relaxed whitespace-pre-line max-w-md">
                                {result.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
