'use client';

/**
 * Pain Section Component
 * 
 * Highlights the problem/ pain points the target audience faces.
 */

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import Divider from '../Divider';

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
        <section id="problem" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#13103A] border-t border-b border-[#534AB7]/25">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <SectionLabel>{pain.sectionLabel}</SectionLabel>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FAF9FF] mt-4 mb-6">
                            {pain.title}{' '}
                            <em className="italic text-[#E8721A]">{pain.titleEmphasis}</em>
                        </h2>
                        <p className="text-base text-[#AFA9EC]/70 font-light leading-relaxed">
                            {pain.lead.split('visible').map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && <em className="text-[#F5A96A]">visible</em>}
                                </span>
                            ))}
                        </p>
                    </motion.div>

                    {/* Right Column - Pain Points List */}
                    <motion.ul
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        {pain.items.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                                className="flex items-start gap-4 p-4 border border-[#534AB7]/20 rounded bg-[#534AB7]/5 text-sm text-[#FAF9FF]/72 leading-relaxed"
                            >
                                <span className="text-[#E8721A] flex-shrink-0">—</span>
                                {item}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
}
