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
        <section id="problem" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-white border-t border-[#16121F]/14">
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
                        <h2 className="display text-[clamp(1.9rem,4.2vw,3.3rem)] text-[#16121F] mt-6" style={{ lineHeight: 1.08 }}>
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
                <div className="grid sm:grid-cols-2 border-t border-l border-[#16121F]/14">
                    {pain.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.06 * index, ease }}
                            className="group relative border-r border-b border-[#16121F]/14 p-7 sm:p-9 hover:bg-[#F2F0F6] transition-colors duration-300"
                        >
                            <span className="absolute left-0 top-0 h-full w-[3px] bg-[#E8721A] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                            <div className="mb-6">
                                <span className="block w-2 h-2 bg-[#16121F]/20 group-hover:bg-[#E8721A] transition-colors duration-300" />
                            </div>
                            <p className="font-sans text-[16px] sm:text-[17px] text-[#16121F] leading-relaxed whitespace-pre-line">
                                {item}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
