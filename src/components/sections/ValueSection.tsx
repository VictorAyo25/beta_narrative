'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import SectionLabel from '../SectionLabel';
import AnimatedCounter from '../AnimatedCounter';

const LinkedInIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function ValueSection() {
    const { content } = useContent();

    const value = content?.value || {
        sectionLabel: 'Why Beta Narrative',
        title: 'Strategic visibility,',
        titleEmphasis: 'not just content.',
        body: "Founded by Favour Egbogun, Beta Narrative translates executive experience into undeniable digital authority. Drawing from a deep foundation in strategic communications, we work with leaders at every stage, from rising professionals stepping into their power, to seasoned executives ready for the world to catch up.\n\nWe take your expertise, refined, real, and underrepresented online, and build a narrative so sharp, so unmistakably you, that the right people cannot scroll past.\n\nYour audience, your pillars, your voice, your legacy. We just make sure the world finally hears it.",
        credentials: [
            { number: '4+', label: 'Years crafting executive narratives for multinational leaders' },
            { number: '5×', label: 'LinkedIn reach growth in 90 days for a senior leader' },
            { number: '20%', label: 'LinkedIn engagement lift from op-eds and ghost-written content' },
        ],
    };

    const ease = [0.16, 1, 0.3, 1] as const;
    const hasCredentials = value.credentials && value.credentials.length > 0;

    return (
        <section id="why" className="relative py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#E1D3F2] border-t border-[#2A2342]/14">
            <div className="max-w-[1400px] mx-auto">
                <div className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-start ${hasCredentials ? 'mb-16 lg:mb-20' : ''}`}>
                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, ease }}
                        className="lg:col-span-7 order-2 lg:order-1"
                    >
                        <SectionLabel>{value.sectionLabel}</SectionLabel>
                        <h2 className="display text-[clamp(1.6rem,3.2vw,2.6rem)] text-[#2A2342] mt-6 mb-8" style={{ lineHeight: 1.12 }}>
                            {value.title}{' '}
                            <span className="text-[#E8721A]">{value.titleEmphasis}</span>
                        </h2>
                        <div className="font-sans text-[15px] sm:text-base text-[#4A4163] leading-relaxed max-w-2xl">
                            {(() => {
                                const parts = value.body.split(/(\n{2,})/);
                                const paragraphs: { text: string; gapEm: number }[] = [];
                                for (let i = 0; i < parts.length; i++) {
                                    if (/^\n+$/.test(parts[i])) continue;
                                    const blankLines = parts[i + 1] ? (parts[i + 1].match(/\n/g) || []).length - 1 : 0;
                                    const gapEm = Math.min(Math.max(blankLines, 1) * 1.2, 4);
                                    paragraphs.push({ text: parts[i], gapEm });
                                }
                                return paragraphs.map(({ text, gapEm }, idx) => (
                                    <p key={idx} style={{ marginBottom: idx < paragraphs.length - 1 ? `${gapEm}em` : 0 }}>
                                        {text}
                                    </p>
                                ));
                            })()}
                        </div>
                    </motion.div>

                    {/* Portrait plate */}
                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.8, delay: 0.15, ease }}
                        className="lg:col-span-5 order-1 lg:order-2"
                    >
                        <div className="relative border border-[#2A2342]/12 bg-[#F1EBFB]">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={value.profileImage || "/images/Favour.JPG"}
                                    alt={`${value.profileName || "Favour Egbogun"} — Executive Brand Strategist`}
                                    fill
                                    className="object-cover object-[center_18%]"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                            </div>
                            <a
                                href={value.profileLinkedin || "https://www.linkedin.com/in/favour-egbogun-3b748b166/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${value.profileName || "Favour Egbogun"} on LinkedIn`}
                                className="group flex items-stretch justify-between border-t border-[#2A2342]/12 hover:bg-[#E6DBF6] transition-colors duration-300"
                            >
                                <div className="px-4 py-3.5">
                                    <p className="font-sans text-[14px] font-medium text-[#2A2342] group-hover:text-[#E8721A] transition-colors duration-300">{value.profileName || "Favour Egbogun"}</p>
                                    <p className="font-sans text-[12px] text-[#6E6587] mt-0.5">{value.profileRole || "Communications Strategist"}</p>
                                </div>
                                <span className="flex items-center justify-center w-14 border-l border-[#2A2342]/12 text-[#6B3FC0] group-hover:bg-[#E8721A] group-hover:text-white transition-colors duration-300">
                                    <LinkedInIcon size={16} />
                                </span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Credentials matrix */}
                {hasCredentials && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-[#2A2342]/10">
                        {value.credentials.map((cred, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.08 * index, ease }}
                                className="border-r border-b border-[#2A2342]/10 p-7 sm:p-9 bg-[#F1EBFB]"
                            >
                                <div className="display text-4xl sm:text-5xl text-[#E8721A] leading-none mb-4">
                                    <AnimatedCounter value={cred.number} />
                                </div>
                                <p className="font-sans text-[13px] text-[#6E6587] leading-relaxed">
                                    {cred.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
