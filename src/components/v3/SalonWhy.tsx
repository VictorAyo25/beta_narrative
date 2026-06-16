'use client';

import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import LinkedInIcon from './LinkedInIcon';

export default function SalonWhy() {
    const { content } = useContent();
    const { value } = content;
    const portrait = value.profileImage || '/images/Favour.JPG';
    const paragraphs = value.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

    return (
        <section id="why" className="relative px-5 sm:px-8 py-24 sm:py-32">
            <div className="mx-auto max-w-[1100px]">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-16">
                    {/* Framed portrait, linked to LinkedIn */}
                    <Reveal>
                        <a
                            href={value.profileLinkedin || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${value.profileName || 'Favour Egbogun'} on LinkedIn`}
                            className="group relative block"
                        >
                            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-b from-[#C4A8E8]/35 to-transparent blur-2xl" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-[#2A2342]/10 bg-[#F1EBFB] shadow-[0_36px_80px_-44px_rgba(42,35,66,0.5)]">
                                <div className="relative aspect-[4/5] w-full">
                                    <Image
                                        src={portrait}
                                        alt={value.profileName || 'Favour Egbogun'}
                                        fill
                                        sizes="(max-width: 1024px) 90vw, 460px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        style={{ objectPosition: 'center 18%' }}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#2A2342]/45 to-transparent" />
                                </div>
                                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                                    <div>
                                        {value.profileName && (
                                            <p className="font-fraunces text-[20px] leading-tight text-white">{value.profileName}</p>
                                        )}
                                        {value.profileRole && (
                                            <p className="font-sans text-[12.5px] text-white/80">{value.profileRole}</p>
                                        )}
                                    </div>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-[#E8721A]">
                                        <LinkedInIcon size={16} />
                                    </span>
                                </div>
                            </div>
                        </a>
                    </Reveal>

                    {/* Copy */}
                    <div>
                        <Reveal>
                            <Eyebrow>{value.sectionLabel}</Eyebrow>
                        </Reveal>
                        <Reveal delay={0.05}>
                            <h2 className="font-fraunces mt-6 text-[2rem] sm:text-[2.7rem] font-light leading-[1.1] tracking-[-0.015em] text-[#2A2342]">
                                {value.title}{' '}
                                <span className="italic text-[#E8721A]">{value.titleEmphasis}</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <div className="mt-6 space-y-4">
                                {paragraphs.map((p, i) => (
                                    <p key={i} className="font-sans text-[15.5px] sm:text-[16px] leading-relaxed text-[#4A4163]">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
