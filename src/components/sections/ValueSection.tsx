'use client';

/**
 * Value Section Component
 * 
 * Showcases why to choose Beta Narrative with credentials.
 */

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import Divider from '../Divider';

export default function ValueSection() {
    const { content } = useContent();

    const value = content?.value || {
        sectionLabel: 'Why Beta Narrative',
        title: 'Strategic visibility,',
        titleEmphasis: 'not just content.',
        body: 'With a foundation in public relations and strategic communication, Beta Narrative positions leaders for the opportunities their calibre deserves.',
        credentials: [
            { number: '4+', label: 'Years crafting executive narratives for multinational leaders' },
            { number: '5×', label: 'LinkedIn reach growth in 90 days for a senior leader' },
            { number: '20%', label: 'LinkedIn engagement lift from op-eds and ghost-written content' },
        ],
    };

    return (
        <section id="why" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0D0B1F]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionLabel>{value.sectionLabel}</SectionLabel>
                    <Divider />
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FAF9FF] max-w-2xl mb-6">
                        {value.title}{' '}
                        <em className="italic text-[#E8721A]">{value.titleEmphasis}</em>
                    </h2>
                    <p className="text-base text-[#AFA9EC]/72 font-light max-w-2xl mb-12 leading-relaxed">
                        {value.body}
                    </p>
                </motion.div>

                {/* Credentials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {value.credentials.map((cred, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            whileHover={{ borderColor: '#E8721A' }}
                            className="border border-[#534AB7]/35 border-t-2 border-t-[#534AB7] rounded p-6 sm:p-8 bg-[#534AB7]/5 transition-colors duration-200"
                        >
                            <div className="font-serif text-4xl sm:text-5xl font-semibold text-[#E8721A] leading-none mb-3">
                                {cred.number}
                            </div>
                            <p className="text-sm text-[#AFA9EC]/65 font-light leading-relaxed">
                                {cred.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
