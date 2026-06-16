'use client';

import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { resolveCredentials } from '@/lib/credentials';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import LinkedInIcon from './LinkedInIcon';

// Where each credential chip floats relative to the portrait frame. Offsets stay
// small on mobile (chips hug the frame edges, never leaving the viewport) and
// open up on large screens. Same arrangement at every size.
const CHIP_POSITION = [
    '-left-2 top-6 text-left sm:-left-4 lg:-left-7 lg:top-9',
    '-right-2 top-[32%] text-right sm:-right-4 lg:-right-9 lg:top-1/3',
    '-left-2 top-[58%] text-left sm:-left-4 lg:-left-7 lg:top-[57%]',
];

export default function SalonWhy() {
    const { content } = useContent();
    const { value } = content;
    const portrait = value.profileImage || '/images/Favour.JPG';
    const paragraphs = value.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    const chips = resolveCredentials(value.credentials).slice(0, 3);

    return (
        <section id="why" className="relative px-5 sm:px-8 py-24 sm:py-32">
            <div className="mx-auto max-w-[1100px]">
                <div className="grid grid-cols-1 items-center gap-y-16 gap-x-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-x-20">
                    {/* Portrait (LinkedIn link) with credential chips floating around it */}
                    <Reveal>
                        <div className="relative mx-auto w-full max-w-[420px]">
                            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-b from-[#C4A8E8]/35 to-transparent blur-2xl" />

                            <a
                                href={value.profileLinkedin || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${value.profileName || 'Favour Egbogun'} on LinkedIn`}
                                className="group relative block overflow-hidden rounded-[2rem] border border-[#2A2342]/10 bg-[#F1EBFB] shadow-[0_36px_80px_-44px_rgba(42,35,66,0.5)]"
                            >
                                <div className="relative aspect-[4/5] w-full">
                                    <Image
                                        src={portrait}
                                        alt={value.profileName || 'Favour Egbogun'}
                                        fill
                                        sizes="(max-width: 1024px) 90vw, 420px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        style={{ objectPosition: 'center 18%' }}
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#2A2342]/45 to-transparent" />
                                </div>
                                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                                    <div>
                                        {value.profileName && (
                                            <p className="font-fraunces text-[19px] leading-tight text-white">{value.profileName}</p>
                                        )}
                                        {value.profileRole && (
                                            <p className="font-sans text-[12px] text-white/80">{value.profileRole}</p>
                                        )}
                                    </div>
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-[#E8721A]">
                                        <LinkedInIcon size={16} />
                                    </span>
                                </div>
                            </a>

                            {/* Floating credential chips */}
                            {chips.map((c, i) => (
                                <div
                                    key={c.label}
                                    className={`absolute w-[118px] rounded-2xl border border-[#2A2342]/10 bg-[#F1EBFB]/90 px-3 py-2.5 shadow-[0_18px_44px_-24px_rgba(42,35,66,0.55)] backdrop-blur-md sm:w-[140px] sm:px-3.5 sm:py-3 ${CHIP_POSITION[i]}`}
                                >
                                    <p className="font-fraunces text-[20px] leading-none text-[#6B3FC0] sm:text-[24px]">{c.number}</p>
                                    <p className="mt-1 font-sans text-[10px] leading-snug text-[#6E6588] sm:text-[11px]">{c.label}</p>
                                </div>
                            ))}
                        </div>
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
