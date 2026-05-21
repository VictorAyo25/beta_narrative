'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { Check, Crown, Plus } from 'lucide-react';

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
        <section id="offer" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-10 bg-[#EEE8F8] overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#E8721A]/6 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[#C4A8E8]/30 blur-[100px] pointer-events-none" />

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
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#1A0E35] mt-5">
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
                    className="relative rounded-3xl border border-[#8B5CF6]/25 bg-gradient-to-br from-[#FFFFFF] via-[#E4DAEF] to-[#EEE8F8] overflow-hidden"
                >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E8721A] via-[#4A2D8F] to-[#E8721A]" />

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

                                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A0E35] mb-2">
                                    {offer.packageName}
                                </h3>

                                <div className="flex items-baseline gap-1 my-6">
                                    <span className="font-sans text-5xl sm:text-6xl font-bold text-gradient leading-none tracking-tight">
                                        {offer.price}
                                    </span>
                                </div>

                                <p className="text-sm text-[#3D2A6E] tracking-wide mb-6">
                                    {offer.priceNote}
                                </p>

                                <p className="text-sm text-[#3D2A6E]/85 font-normal leading-relaxed mb-8">
                                    {offer.description}
                                </p>

                                <a
                                    href="#contact"
                                    className="group relative inline-flex items-center justify-center text-sm font-semibold tracking-[0.12em] uppercase text-white bg-[#E8721A] px-8 py-4 rounded-full hover:bg-[#C05A0E] hover:shadow-[0_0_40px_rgba(232,114,26,0.5)] hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_24px_rgba(232,114,26,0.35)]"
                                >
                                    Secure Your Spot
                                </a>
                            </div>

                            {/* Right Column */}
                            <div className="lg:col-span-7">
                                {/* Timeline */}
                                <div className="mb-10">
                                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#3D2A6E] mb-5">
                                        Engagement Timeline
                                    </p>
                                    <div className="space-y-0">
                                        {offer.timeline.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-5 py-4 border-b border-[#8B5CF6]/20 last:border-b-0"
                                            >
                                                <div className="flex-shrink-0 w-16 pt-0.5">
                                                    <span className="text-[11px] font-bold tracking-wider text-[#E8721A] uppercase">
                                                        {item.month}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm text-[#1A0E35] mb-1">
                                                        {item.title}
                                                    </div>
                                                    <p className="text-sm text-[#3D2A6E]/85 font-normal leading-relaxed">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* What's Included */}
                                <div>
                                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#3D2A6E] mb-5">
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
                                                <span className="text-sm text-[#3D2A6E]/85 font-normal leading-snug group-hover:text-[#3D2A6E]/80 transition-colors">
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
                    <div className="border-t border-[#8B5CF6]/25 bg-[#130E20]/[0.03] p-7 sm:p-10 lg:px-12 lg:py-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#130E20]/[0.02] to-transparent pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                            <div className="flex-shrink-0">
                                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#3D2A6E] mb-1">
                                    Enhancements
                                </p>
                                <h4 className="text-base sm:text-lg font-serif text-[#1A0E35]">
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
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B3FC0]/5 border border-[#6B3FC0]/15 hover:border-[#E8721A]/30 hover:bg-[#130E20]/10 transition-all duration-300 group cursor-default"
                                    >
                                        <Plus size={12} className="text-[#6B3FC0] group-hover:text-[#E8721A] transition-colors" />
                                        <span className="text-xs sm:text-sm text-[#3D2A6E]/90 group-hover:text-[#1A0E35] transition-colors">{item}</span>
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
