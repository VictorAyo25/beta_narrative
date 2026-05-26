'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { Check, Plus } from 'lucide-react';
import { defaultSiteContent } from '@/lib/default-content';

export default function OfferSection() {
    const { content } = useContent();

    const offerSection = content?.offer && 'offers' in content.offer
        ? content.offer
        : defaultSiteContent.offer;

    const { sectionLabel, title, titleEmphasis, offers = [] } = offerSection;

    return (
        <section id="offer" className="relative pt-16 sm:pt-20 pb-16 sm:pb-20 px-5 sm:px-8 lg:px-10 bg-[#EEE8F8] overflow-hidden">
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
                    <SectionLabel>{sectionLabel}</SectionLabel>
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] text-[#1A0E35] mt-5">
                        {title}{' '}
                        <em className="italic text-[#E8721A]">{titleEmphasis}</em>
                    </h2>
                </motion.div>

                {/* Offer Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                    {offers.map((plan, index) => {
                        const isExecutive = plan.packageName.toUpperCase().includes('EXECUTIVE');
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.7, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                                    isExecutive
                                        ? 'border-[#E8721A]/40 bg-gradient-to-br from-[#FFFFFF] via-[#EAE1F5] to-[#E4DAEF] shadow-[0_12px_40px_rgba(232,114,26,0.15)] hover:shadow-[0_20px_50px_rgba(232,114,26,0.25)] hover:scale-[1.01]'
                                        : 'border-[#8B5CF6]/20 bg-gradient-to-br from-[#FFFFFF] via-[#FAF8FD] to-[#EEE8F8] shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(139,92,246,0.12)] hover:scale-[1.01]'
                                }`}
                            >
                                {/* Top accent line for Executive */}
                                {isExecutive && (
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E8721A] via-[#8B5CF6] to-[#E8721A]" />
                                )}

                                <div className="p-6 sm:p-8 lg:p-10 flex-grow">
                                    {/* Header Info */}
                                    <div className="flex justify-between items-start gap-4 mb-6">
                                        <div>
                                            <span className={`inline-block text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full ${
                                                isExecutive 
                                                    ? 'bg-[#E8721A]/10 text-[#E8721A] border border-[#E8721A]/20' 
                                                    : 'bg-[#6B3FC0]/10 text-[#6B3FC0] border border-[#6B3FC0]/20'
                                            }`}>
                                                {plan.badge}
                                            </span>
                                            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A0E35] mt-4">
                                                {plan.packageName}
                                            </h3>
                                            <p className="text-xs text-[#3D2A6E]/80 mt-1 font-medium italic">
                                                {plan.tagline}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price Card */}
                                    <div className="border-y border-[#8B5CF6]/15 py-5 my-6">
                                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                            <span className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient leading-none tracking-tight">
                                                {plan.price}
                                            </span>
                                            {plan.priceSecond && (
                                                <>
                                                    <span className="text-sm font-medium text-[#3D2A6E]/60">or</span>
                                                    <span className="font-sans text-xl sm:text-2xl font-bold text-[#E8721A] leading-none tracking-tight">
                                                        {plan.priceSecond}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-xs text-[#3D2A6E]/85 tracking-wide mt-2 font-medium">
                                            {plan.priceNote}
                                        </p>
                                    </div>

                                    {/* Quote / Hook */}
                                    <div className={`p-4 rounded-xl mb-6 border ${
                                        isExecutive 
                                            ? 'bg-[#E8721A]/5 border-[#E8721A]/15' 
                                            : 'bg-[#6B3FC0]/5 border-[#6B3FC0]/10'
                                    }`}>
                                        <p className="text-xs sm:text-sm font-medium text-[#1A0E35] leading-relaxed italic">
                                            {plan.hook}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-xs sm:text-sm text-[#3D2A6E]/90 font-normal leading-relaxed mb-8">
                                        {plan.description}
                                    </p>

                                    {/* What's Included */}
                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D2A6E] mb-4">
                                            What's Included
                                        </p>
                                        <div className="space-y-3.5">
                                            {plan.includes.filter((item) => item && item.trim() !== '').map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 group"
                                                >
                                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                                        isExecutive ? 'bg-[#E8721A]/10' : 'bg-[#6B3FC0]/10'
                                                    }`}>
                                                        <Check size={10} className={isExecutive ? 'text-[#E8721A]' : 'text-[#6B3FC0]'} />
                                                    </div>
                                                    <span className="text-xs sm:text-sm text-[#3D2A6E]/85 font-normal leading-snug group-hover:text-[#3D2A6E] transition-colors">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Action */}
                                <div className="p-6 sm:p-8 lg:p-10 pt-0">
                                    <a
                                        id={`offer-cta-btn-${index}`}
                                        href="#contact"
                                        className={`w-full group relative inline-flex items-center justify-center text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase px-8 py-4 rounded-full transition-all duration-300 ${
                                            isExecutive
                                                ? 'text-white bg-[#E8721A] hover:bg-[#C05A0E] hover:shadow-[0_0_40px_rgba(232,114,26,0.45)] hover:scale-[1.02] shadow-[0_4px_24px_rgba(232,114,26,0.3)]'
                                                : 'text-[#6B3FC0] bg-[#6B3FC0]/10 hover:bg-[#6B3FC0]/20 hover:scale-[1.01] border border-[#6B3FC0]/20 hover:border-[#6B3FC0]/45'
                                        }`}
                                    >
                                        Secure Your Spot
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Optional Add-Ons Footer */}
                <div className="mt-12 rounded-3xl border border-[#8B5CF6]/20 bg-[#130E20]/[0.02] p-6 sm:p-8 lg:px-10 lg:py-7 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#130E20]/[0.01] to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                        <div className="flex-shrink-0">
                            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#3D2A6E] mb-1">
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
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B3FC0]/5 border border-[#6B3FC0]/15 hover:border-[#E8721A]/30 hover:bg-[#130E20]/5 transition-all duration-300 group cursor-default"
                                >
                                    <Plus size={12} className="text-[#6B3FC0] group-hover:text-[#E8721A] transition-colors" />
                                    <span className="text-xs sm:text-sm text-[#3D2A6E]/90 group-hover:text-[#1A0E35] transition-colors">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
