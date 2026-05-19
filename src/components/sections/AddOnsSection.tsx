'use client';

import { motion } from 'framer-motion';
import SectionLabel from '../SectionLabel';
import { Plus } from 'lucide-react';

const addOns = [
    'Media advisory',
    'Event coverage',
    'Professional photography',
    'PR amplification',
    'Conference visibility support'
];

export default function AddOnsSection() {
    return (
        <section id="add-ons" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-[#FAF9FF] overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-[0%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8721A]/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#6B4FAD]/5 blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <div className="flex justify-center mb-5">
                        <SectionLabel>Enhancements</SectionLabel>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#0D0B1F]">
                        Optional <em className="italic text-[#E8721A]">Add-Ons</em>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    {addOns.map((addon, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex items-center gap-4 p-5 sm:p-6 rounded-2xl border border-[#0D0B1F]/5 bg-white shadow-sm hover:shadow-[0_8px_30px_rgba(232,114,26,0.06)] hover:border-[#E8721A]/20 transition-all duration-400 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0D0B1F]/5 group-hover:bg-[#E8721A]/10 flex items-center justify-center transition-colors duration-400">
                                <Plus size={18} className="text-[#6B4FAD] group-hover:text-[#E8721A] transition-colors duration-400" />
                            </div>
                            <span className="font-medium text-[#0D0B1F]/80 group-hover:text-[#0D0B1F] transition-colors duration-400 text-sm sm:text-base">
                                {addon}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
