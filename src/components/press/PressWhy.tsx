'use client';

import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import { resolveCredentials } from '@/lib/credentials';
import Reveal from '../Reveal';
import Kicker from './Kicker';
import LinkedInIcon from '../v3/LinkedInIcon';

export default function PressWhy() {
    const { content } = useContent();
    const { value } = content;
    const paragraphs = value.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    const credentials = resolveCredentials(value.credentials).slice(0, 3);
    // profileName / profileRole / profileImage are optional in the content schema.
    const name = value.profileName || 'Favour Egbogun';

    return (
        <section id="why" className="relative px-5 sm:px-10 py-28 sm:py-40">
            <div className="mx-auto max-w-[1180px]">
                <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-16">
                    <div className="lg:col-span-7">
                        <Reveal>
                            <Kicker>{value.sectionLabel}</Kicker>
                            <h2 className="font-newsreader mt-6 max-w-[16ch] text-[2rem] sm:text-[2.7rem] leading-[1.08] tracking-[-0.02em] text-[#2A2342]">
                                {value.title} {value.titleEmphasis}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <div className="mt-7 space-y-5">
                                {paragraphs.map((p, i) => (
                                    <p key={i} className="max-w-[62ch] font-sans text-[16px] leading-relaxed text-[#4A4163]">
                                        {p}
                                    </p>
                                ))}
                            </div>

                            <dl className="mt-12 grid grid-cols-1 border-t border-[#2A2342]/12 sm:grid-cols-3">
                                {credentials.map((c) => (
                                    <div
                                        key={c.label}
                                        className="border-b border-[#2A2342]/12 py-5 sm:border-b-0 sm:border-r sm:border-[#2A2342]/12 sm:py-6 sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
                                    >
                                        <dt className="font-newsreader text-[2rem] leading-none text-[#6B3FC0]">{c.number}</dt>
                                        <dd className="mt-2 max-w-[26ch] font-sans text-[12.5px] leading-snug text-[#6E6588]">{c.label}</dd>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-5">
                        <Reveal delay={0.12}>
                            <figure className="mx-auto w-full max-w-[400px] lg:ml-auto lg:mr-0">
                                <a
                                    href={value.profileLinkedin || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${name} on LinkedIn`}
                                    className="group relative block overflow-hidden rounded-[14px] border border-[#2A2342]/12"
                                >
                                    <div className="relative aspect-[4/5] w-full">
                                        <Image
                                            src={value.profileImage || '/images/Favour.JPG'}
                                            alt={name}
                                            fill
                                            sizes="(max-width: 1024px) 90vw, 400px"
                                            className="object-cover"
                                            style={{ objectPosition: 'center 18%' }}
                                        />
                                    </div>
                                </a>
                                <figcaption className="mt-4 flex items-start justify-between gap-4 border-t border-[#2A2342]/12 pt-4">
                                    <div>
                                        <p className="font-newsreader text-[19px] leading-tight text-[#2A2342]">{name}</p>
                                        {value.profileRole && (
                                            <p className="mt-0.5 font-sans text-[12.5px] text-[#6E6588]">{value.profileRole}</p>
                                        )}
                                    </div>
                                    <a
                                        href={value.profileLinkedin || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn profile"
                                        className="mt-1 text-[#6E6588] hover:text-[#E8721A] transition-colors"
                                    >
                                        <LinkedInIcon size={17} />
                                    </a>
                                </figcaption>
                            </figure>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
