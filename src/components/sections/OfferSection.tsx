'use client';

/**
 * Offer Section Component
 * 
 * Displays the service package, pricing, timeline, and inclusions.
 */

import { motion } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import Divider from '../Divider';

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
        description: 'Designed for mid-level professionals stepping into leadership and executives ready for strategic visibility.',
        timeline: [
            { month: 'Month 1', title: 'Foundation & Strategy', content: 'Brand voice, tone guidelines, UVP document, target audience mapping.' },
            { month: 'Month 2', title: 'Content & Visibility', content: 'Articles, LinkedIn posts, branded graphics, executive bio.' },
            { month: 'Month 3', title: 'Amplification', content: 'TV feature opportunity, newsletter setup, visibility plan refinement.' },
        ],
        includes: [
            '3 professionally crafted articles (BusinessDay-ready)',
            '12 strategic LinkedIn posts shaped around your voice',
            'Branded graphics for your content',
            'Executive bio — compelling, clear, conversion-ready',
            'Brand voice and tone guideline',
            'Unique Value Proposition document',
            'Narrative pillars and content structure strategy',
            'Target audience mapping and visibility plan',
            'TV feature opportunity (where applicable)',
            'Newsletter setup possibility',
        ],
    };

    return (
        <section id="offer" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#0D0B1F]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionLabel>{offer.sectionLabel}</SectionLabel>
                    <Divider />
                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#FAF9FF] max-w-2xl mb-4">
                        {offer.title}{' '}
                        <em className="italic text-[#E8721A]">{offer.titleEmphasis}</em>
                    </h2>
                </motion.div>

                {/* Offer Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 border border-[#534AB7]/40 rounded-lg p-6 sm:p-10 bg-[#534AB7]/5"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
                        {/* Left Column - Package Details */}
                        <div>
                            <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#A34A08] bg-[#FDE8D4] px-3 py-1.5 rounded-sm mb-4">
                                {offer.badge}
                            </span>
                            <h3 className="font-serif text-2xl font-normal text-[#FAF9FF] mb-1">
                                {offer.packageName}
                            </h3>
                            <div className="font-serif text-5xl font-semibold text-[#E8721A] leading-none my-4">
                                {offer.price}
                            </div>
                            <p className="text-sm text-[#8A86B8] tracking-wide mb-6">
                                {offer.priceNote}
                            </p>
                            <p className="text-sm text-[#AFA9EC]/60 font-light leading-relaxed mb-8">
                                {offer.description}
                            </p>

                            {/* Timeline */}
                            <div className="space-y-0">
                                {offer.timeline.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-4 py-4 border-b border-[#534AB7]/20 last:border-b-0"
                                    >
                                        <span className="font-serif text-sm font-semibold text-[#E8721A] min-w-[70px] pt-0.5 tracking-wide">
                                            {item.month}
                                        </span>
                                        <div>
                                            <div className="font-medium text-sm text-[#FAF9FF] mb-1">
                                                {item.title}
                                            </div>
                                            <p className="text-sm text-[#FAF9FF]/70 font-light leading-relaxed">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - What's Included */}
                        <div>
                            <p className="text-xs font-medium tracking-[0.1em] uppercase text-[#8A86B8] mb-6">
                                What's included
                            </p>
                            <ul className="space-y-4">
                                {offer.includes.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-3 text-sm text-[#FAF9FF]/75 leading-relaxed"
                                    >
                                        <span className="text-[#E8721A] text-xs mt-1.5 flex-shrink-0">✦</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
