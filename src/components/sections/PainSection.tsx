'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';

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

    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section id="problem" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#F1ECF9] border-t border-[#2A2342]/10">
            <div className="max-w-[1400px] mx-auto">
                {/* Split header */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, ease }}
                        className="lg:col-span-7"
                    >
                        <SectionLabel>{pain.sectionLabel}</SectionLabel>
                        <h2 className="display text-[clamp(1.6rem,3.2vw,2.6rem)] text-[#2A2342] mt-6" style={{ lineHeight: 1.12 }}>
                            {pain.title}{' '}
                            <span className="text-[#E8721A]">{pain.titleEmphasis}</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        className="lg:col-span-5"
                    >
                        <p className="font-sans text-[15px] sm:text-base text-[#6F6783] leading-relaxed whitespace-pre-line">
                            {pain.lead}
                        </p>
                    </motion.div>
                </div>

                {/* Matrix */}
                <div className="grid sm:grid-cols-2 border-t border-l border-[#2A2342]/10">
                    {pain.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.06 * index, ease }}
                            className="border-r border-b border-[#2A2342]/10 p-8 sm:p-10"
                        >
                            <p className="font-sans text-[16px] sm:text-[17px] text-[#4A4163] leading-relaxed whitespace-pre-line">
                                {item}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
