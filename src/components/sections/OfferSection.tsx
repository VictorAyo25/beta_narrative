'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import { Check, Plus } from 'lucide-react';
import { defaultSiteContent } from '@/lib/default-content';
import { trackEvent } from '@/lib/analytics';

export default function OfferSection() {
    const { content } = useContent();

    const offerSection = content?.offer && 'offers' in content.offer
        ? content.offer
        : defaultSiteContent.offer;

    const { sectionLabel, title, titleEmphasis, offers = [] } = offerSection;
    const ease = [0.16, 1, 0.3, 1] as const;

    return (
        <section id="offer" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#F2F0F6] border-t border-[#16121F]/14">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-12 lg:mb-16 max-w-3xl"
                >
                    <SectionLabel>{sectionLabel}</SectionLabel>
                    <h2 className="display text-[clamp(1.9rem,4.2vw,3.3rem)] text-[#16121F] mt-6" style={{ lineHeight: 1.08 }}>
                        {title}{' '}
                        <span className="text-[#E8721A]">{titleEmphasis}</span>
                    </h2>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#16121F]/14">
                    {offers.map((plan, index) => {
                        const isExecutive = plan.packageName.toUpperCase().includes('EXECUTIVE');
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, delay: 0.1 * index, ease }}
                                className="relative flex flex-col justify-between border-r border-b border-[#16121F]/14 bg-white"
                            >
                                {/* Top bar */}
                                <div className={`flex items-center px-7 sm:px-9 py-4 border-b ${isExecutive ? 'bg-[#E8721A] border-[#E8721A]' : 'border-[#16121F]/14'}`}>
                                    <span className={`font-mono text-[11px] uppercase tracking-[0.1em] ${isExecutive ? 'text-white' : 'text-[#6B3FC0]'}`}>
                                        {plan.badge}
                                    </span>
                                </div>

                                <div className="p-7 sm:p-9 lg:p-10 flex-grow">
                                    <h3 className="display text-3xl sm:text-4xl text-[#16121F]">
                                        {plan.packageName}
                                    </h3>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6E6587] mt-2">
                                        {plan.tagline}
                                    </p>

                                    {/* Price */}
                                    <div className="border-y border-[#16121F]/14 py-6 my-7">
                                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                            <span className="display text-4xl sm:text-5xl text-[#16121F]">
                                                {plan.price}
                                            </span>
                                            {plan.priceSecond && (
                                                <>
                                                    <span className="font-mono text-[12px] text-[#6E6587]">/ or</span>
                                                    <span className="display text-2xl text-[#E8721A]">{plan.priceSecond}</span>
                                                </>
                                            )}
                                        </div>
                                        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6E6587] mt-3">
                                            {plan.priceNote}
                                        </p>
                                    </div>

                                    {/* Hook */}
                                    <p className={`font-sans text-[15px] sm:text-base text-[#16121F] leading-relaxed mb-6 pl-4 border-l-2 ${isExecutive ? 'border-[#E8721A]' : 'border-[#6B3FC0]'}`}>
                                        {plan.hook}
                                    </p>

                                    {/* Description */}
                                    <p className="font-sans text-[14px] text-[#6F6783] leading-relaxed mb-8 whitespace-pre-line">
                                        {plan.description}
                                    </p>

                                    {/* Includes */}
                                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E6587] mb-5">What&apos;s Included</p>
                                    <div className="space-y-3">
                                        {plan.includes.filter((item) => item && item.trim() !== '').map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <Check size={15} strokeWidth={2.5} className={`flex-shrink-0 mt-0.5 ${isExecutive ? 'text-[#E8721A]' : 'text-[#6B3FC0]'}`} />
                                                <span className="font-sans text-[14px] text-[#423B52] leading-snug">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="p-7 sm:p-9 lg:p-10 pt-0">
                                    <a
                                        id={`offer-cta-btn-${index}`}
                                        href="#contact"
                                        onClick={() => trackEvent('cta_click', `package:${plan.packageName.toLowerCase().replace(/\s+/g, '_')}`)}
                                        className={`w-full flex items-center justify-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] px-8 py-4 transition-colors duration-300 ${
                                            isExecutive
                                                ? 'bg-[#E8721A] text-white hover:bg-[#16121F] border border-[#E8721A] hover:border-[#16121F]'
                                                : 'bg-transparent text-[#16121F] border border-[#16121F]/24 hover:border-[#E8721A] hover:text-[#E8721A]'
                                        }`}
                                    >
                                        Secure Your Spot
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Add-ons */}
                <div className="border-l border-r border-b border-[#16121F]/14 bg-white p-7 sm:p-9 lg:px-10">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                        <div className="flex-shrink-0">
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E6587] mb-2">Enhancements</p>
                            <h4 className="display text-xl sm:text-2xl text-[#16121F]">Optional Add-Ons</h4>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {['Media advisory', 'Event coverage', 'Professional photography', 'PR amplification', 'Conference visibility support'].map((item, index) => (
                                <div key={index} className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#16121F]/14 hover:border-[#E8721A] transition-colors duration-300 group">
                                    <Plus size={12} className="text-[#6B3FC0] group-hover:text-[#E8721A] transition-colors" />
                                    <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[#423B52]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
