'use client';

/**
 * Results Section Component
 * 
 * Showcases client results and success stories.
 */

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import Divider from '../Divider';

export default function ResultsSection() {
    const { content } = useContent();

    const results = content?.results || {
        sectionLabel: 'The Results',
        title: 'What strategic visibility',
        titleEmphasis: 'actually',
        titleEmphasisEnd: 'looks like.',
        results: [
            { stat: '5× Reach', description: 'A senior leader grew their LinkedIn reach 5× within 90 days.' },
            { stat: '+20% Engagement', description: 'Ghost-written articles drove a 20% LinkedIn engagement lift.' },
            { stat: 'BusinessDay', description: 'Clients featured in national publications.' },
            { stat: 'TV Features', description: 'Visibility strategy placed executives in broadcast conversations.' },
        ],
    };

    return (
        <section id="results" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#13103A] border-t border-b border-[#534AB7]/25">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionLabel>{results.sectionLabel}</SectionLabel>
                    <Divider />
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FAF9FF] max-w-2xl mb-4">
                        {results.title}{' '}
                        <em className="italic text-[#E8721A]">{results.titleEmphasis}</em>
                        {results.titleEmphasisEnd && ` ${results.titleEmphasisEnd}`}
                    </h2>
                </motion.div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-12">
                    {results.results.map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            whileHover={{ borderLeftColor: '#E8721A' }}
                            className="border-l-3 border-l-[#534AB7] p-6 bg-[#534AB7]/5 rounded-r transition-colors duration-200"
                        >
                            <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#AFA9EC] leading-none mb-3">
                                {result.stat}
                            </div>
                            <p className="text-sm text-[#FAF9FF]/60 font-light leading-relaxed">
                                {result.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
