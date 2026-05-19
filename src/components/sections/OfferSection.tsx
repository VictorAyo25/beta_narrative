'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { Check, Crown, ArrowRight, Plus } from 'lucide-react';

export default function OfferSection() {
    const { content } = useContent();

    const offer = content?.offer || {
        sectionLabel: 'The Investment',
        title: 'Three months to own',
        titleEmphasis: 'your narrative.',
        badge: 'Beta Launch Offer',
        packageName: 'Executive Brand Package',
        price: '₦500,000',
        priceNote: '3-month engagement · Beta pricing',
        description: 'Designed for mid-level professionals stepping into leadership and executives ready for strategic, consistent visibility that positions them for consultancy, speaking, and thought leadership.',
        timeline: [
            { month: 'Month 1', title: 'Foundation & Strategy', content: 'Brand voice, tone guidelines, UVP document, target audience mapping, narrative pillars and content structure' },
            { month: 'Month 2', title: 'Content & Visibility', content: 'Articles, LinkedIn posts, branded graphics, executive bio, op-ed placement and media outreach' },
            { month: 'Month 3', title: 'Amplification', content: 'TV feature opportunity, newsletter setup, visibility plan refinement and handover' },
        ],
        includes: [
            '3 professionally crafted articles (BusinessDay-ready)',
            '12 strategic LinkedIn posts shaped around your voice',
            'Branded graphics for your content',
            'Executive bio — compelling, clear, conversion-ready',
            'Brand voice and tone guideline',
            'Monthly strategy sessions',
            'Narrative pillars and content structure strategy',
            'Tracking & Reporting',
            'TV feature opportunity (where applicable)',
            'Newsletter setup possibility',
        ],
    };

    return (
        <section id="offer" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-[#0D0B1F] overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#E8721A]/6 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#6B4FAD]/10 blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl mb-16"
                >
                    <SectionLabel>{offer.sectionLabel}</SectionLabel>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#FAF9FF] mt-5">
                        {offer.title}{' '}
                        <em className="italic text-[#E8721A]">{offer.titleEmphasis}</em>
                    </h2>
                </motion.div>

                {/* Offer Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-3xl border border-[#6B4FAD]/25 bg-gradient-to-br from-[#1C1740] via-[#15112E] to-[#0D0B1F] overflow-hidden"
                >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E8721A] via-[#6B4FAD] to-[#E8721A]" />

                    <div className="p-7 sm:p-10 lg:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                            {/* Left Column */}
                            <div className="lg:col-span-5">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8721A]/10 border border-[#E8721A]/20 mb-6">
                                    <Crown size={13} className="text-[#E8721A]" />
                                    <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#E8721A]">
                                        {offer.badge}
                                    </span>
                                </div>

                                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF9FF] mb-2">
                                    {offer.packageName}
                                </h3>

                                <div className="flex items-baseline gap-1 my-6">
                                    <span className="font-sans text-5xl sm:text-6xl font-bold text-gradient leading-none tracking-tight">
                                        {offer.price}
                                    </span>
                                </div>

                                <p className="text-sm text-[#9B8EC4] tracking-wide mb-6">
                                    {offer.priceNote}
                                </p>

                                <p className="text-sm text-[#AFA9CC]/60 font-light leading-relaxed mb-8">
                                    {offer.description}
                                </p>

                                <a
                                    href="#contact"
                                    className="group relative inline-flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase text-[#FAF9FF] bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full hover:bg-white/10 hover:border-[#E8721A]/50 transition-all duration-400 overflow-hidden shadow-[0_0_20px_rgba(232,114,26,0.1)] hover:shadow-[0_0_40px_rgba(232,114,26,0.3)] hover:scale-[1.02]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#E8721A]/0 via-[#E8721A]/10 to-[#F5A96A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    Secure Your Spot
                                    <ArrowRight size={16} className="text-[#E8721A] group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>

                            {/* Right Column */}
                            <div className="lg:col-span-7">
                                {/* Timeline */}
                                <div className="mb-10">
                                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9B8EC4] mb-5">
                                        Engagement Timeline
                                    </p>
                                    <div className="space-y-0">
                                        {offer.timeline.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-5 py-4 border-b border-[#6B4FAD]/10 last:border-b-0"
                                            >
                                                <div className="flex-shrink-0 w-16 pt-0.5">
                                                    <span className="text-[11px] font-bold tracking-wider text-[#E8721A] uppercase">
                                                        {item.month}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm text-[#FAF9FF] mb-1">
                                                        {item.title}
                                                    </div>
                                                    <p className="text-sm text-[#AFA9CC]/55 font-light leading-relaxed">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* What's Included */}
                                <div>
                                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9B8EC4] mb-5">
                                        What's Included
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {offer.includes.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 group"
                                            >
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8721A]/10 flex items-center justify-center mt-0.5">
                                                    <Check size={10} className="text-[#E8721A]" />
                                                </div>
                                                <span className="text-sm text-[#AFA9CC]/60 font-light leading-snug group-hover:text-[#AFA9CC]/80 transition-colors">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Optional Add-Ons Footer */}
                    <div className="border-t border-[#6B4FAD]/20 bg-white/[0.03] p-7 sm:p-10 lg:px-12 lg:py-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                            <div className="flex-shrink-0">
                                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9B8EC4] mb-1">
                                    Enhancements
                                </p>
                                <h4 className="text-base sm:text-lg font-serif text-[#FAF9FF]">
                                    Optional Add-Ons
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {[
                                    'Media advisory',
                                    'Event coverage',
                                    'Professional photography',
                                    'PR amplification',
                                    'Conference visibility support'
                                ].map((item, index) => (
                                    <div 
                                        key={index} 
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#E8721A]/30 hover:bg-white/10 transition-all duration-300 group cursor-default"
                                    >
                                        <Plus size={12} className="text-[#6B4FAD] group-hover:text-[#E8721A] transition-colors" />
                                        <span className="text-xs sm:text-sm text-[#AFA9CC]/90 group-hover:text-[#FAF9FF] transition-colors">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
