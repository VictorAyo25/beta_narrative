'use client';

import Image from 'next/image';
import LinkedInIcon from './LinkedInIcon';

interface PortraitFrameProps {
    src: string;
    name?: string;
    role?: string;
    linkedin?: string;
    /** Hint next/image about render width (desktop stage vs. mobile inline). */
    sizes: string;
    priority?: boolean;
    className?: string;
}

/**
 * The signature framed portrait: a soft rounded card with a gentle lilac glow
 * and an optional name/role caption that links to LinkedIn. Reused by the hero
 * and "why" stages on both desktop and mobile.
 */
export default function PortraitFrame({
    src,
    name,
    role,
    linkedin,
    sizes,
    priority = false,
    className = '',
}: PortraitFrameProps) {
    return (
        <div className={`relative w-full ${className}`}>
            {/* Soft gradient glow bleeding out behind the frame */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-5 -z-10 rounded-[2.75rem] bg-gradient-to-b from-[#C4A8E8]/45 via-[#8B5CF6]/15 to-[#E8721A]/12 blur-2xl"
            />

            <figure className="relative overflow-hidden rounded-[2rem] border border-[#2A2342]/12 bg-[#F1EBFB] shadow-[0_44px_90px_-46px_rgba(42,35,66,0.6)]">
                <div className="relative aspect-[4/5] w-full">
                    <Image
                        src={src}
                        alt={name || 'Favour Egbogun'}
                        fill
                        priority={priority}
                        sizes={sizes}
                        className="object-cover"
                        style={{ objectPosition: 'center 20%' }}
                    />
                    <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#2A2342]/45 to-transparent"
                    />
                </div>

                {name && (
                    <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        {linkedin ? (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/cap inline-flex items-center gap-3"
                            >
                                <span>
                                    <span className="block font-display text-[18px] sm:text-[20px] leading-tight text-white">
                                        {name}
                                    </span>
                                    {role && (
                                        <span className="block font-sans text-[12.5px] text-white/80">
                                            {role}
                                        </span>
                                    )}
                                </span>
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm transition-colors duration-200 group-hover/cap:bg-[#E8721A]">
                                    <LinkedInIcon size={14} />
                                </span>
                            </a>
                        ) : (
                            <>
                                <span className="block font-display text-[18px] sm:text-[20px] leading-tight text-white">
                                    {name}
                                </span>
                                {role && (
                                    <span className="block font-sans text-[12.5px] text-white/80">{role}</span>
                                )}
                            </>
                        )}
                    </figcaption>
                )}
            </figure>
        </div>
    );
}
