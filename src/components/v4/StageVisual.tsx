'use client';

import { useContent } from '@/context/ContentContext';
import AnimatedCounter from '@/components/AnimatedCounter';
import { resolveCredentials } from '@/lib/credentials';
import PortraitFrame from './PortraitFrame';
import type { FrameSectionId } from './frame-shared';

interface StageVisualProps {
    section: FrameSectionId;
    /**
     * `sticky` = the large desktop stage (priority portrait, bigger type).
     * `inline` = the smaller mobile visual rendered above each section's copy.
     */
    variant: 'sticky' | 'inline';
}

/** Small mono-style index label used to orient each stage beat. */
function StageKicker({ children }: { children: string }) {
    return (
        <span className="inline-block border-b-2 border-[#E8721A]/55 pb-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B3FC0]">
            {children}
        </span>
    );
}

/**
 * Renders the single focal visual for a given story beat. The same component
 * backs the cross-fading desktop stage and the inline mobile visuals, so the
 * art direction stays identical across breakpoints.
 */
export default function StageVisual({ section, variant }: StageVisualProps) {
    const { content } = useContent();
    const { pain, value, results, offer } = content;

    const isSticky = variant === 'sticky';
    const portraitSizes = isSticky
        ? '(max-width: 1023px) 0px, 40vw'
        : '(max-width: 1023px) 88vw, 40vw';

    const portrait = value.profileImage || '/images/Favour.JPG';

    // Big editorial numbers scale down for the inline (mobile) variant.
    const bigNum = isSticky
        ? 'text-[clamp(3.4rem,5vw,5rem)]'
        : 'text-[clamp(2.6rem,16vw,3.4rem)]';

    switch (section) {
        /* ----------------------------------------------------- HERO --- */
        case 'hero':
            return (
                <PortraitFrame
                    src={portrait}
                    name={value.profileName}
                    role={value.profileRole}
                    linkedin={value.profileLinkedin}
                    sizes={portraitSizes}
                    priority
                    className="mx-auto max-w-[420px] lg:max-w-[460px]"
                />
            );

        /* -------------------------------------------------- PROBLEM --- */
        // An art-directed pull-statement, not a list — "the cost of invisibility".
        case 'problem':
            return (
                <div className="relative w-full max-w-[460px] rounded-[2rem] border border-[#2A2342]/12 bg-[#F6F2FC] p-9 sm:p-11 shadow-[0_40px_90px_-50px_rgba(42,35,66,0.5)]">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#C4A8E8]/30 to-transparent blur-2xl"
                    />
                    <StageKicker>The cost of invisibility</StageKicker>
                    <p className="mt-7 font-fraunces text-[clamp(1.7rem,2.6vw,2.5rem)] font-light leading-[1.14] tracking-[-0.01em] text-[#2A2342]">
                        The room already knows your name.{' '}
                        <span className="italic text-[#E8721A]">The internet doesn&apos;t.</span>
                    </p>
                    <p className="mt-6 max-w-[34ch] font-sans text-[14.5px] leading-relaxed text-[#6E6588]">
                        {pain.lead}
                    </p>
                </div>
            );

        /* ------------------------------------------------------ WHY --- */
        // Credentials as big stacked numbers (AnimatedCounter) beneath a small portrait cue.
        case 'why': {
            const creds = resolveCredentials(value.credentials).slice(0, 3);
            return (
                <div className="relative w-full max-w-[460px] rounded-[2rem] border border-[#2A2342]/12 bg-[#F6F2FC] p-8 sm:p-10 shadow-[0_40px_90px_-50px_rgba(42,35,66,0.5)]">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#C4A8E8]/30 to-[#E8721A]/10 blur-2xl"
                    />
                    <StageKicker>Track record</StageKicker>
                    <div className="mt-7 divide-y divide-[#2A2342]/10">
                        {creds.map((c) => (
                            <div key={c.label} className="flex items-baseline gap-5 py-4 first:pt-0 last:pb-0">
                                <AnimatedCounter
                                    value={c.number}
                                    className={`shrink-0 font-display ${
                                        isSticky ? 'text-[clamp(2.2rem,3vw,3rem)]' : 'text-[2.2rem]'
                                    } leading-none text-[#6B3FC0]`}
                                />
                                <p className="font-sans text-[13.5px] leading-snug text-[#4A4163]">
                                    {c.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        /* -------------------------------------------------- RESULTS --- */
        // The biggest result featured large, with smaller supporting stats.
        case 'results': {
            const list = results.results ?? [];
            const [featured, ...rest] = list;
            const supporting = rest.slice(0, 2);
            return (
                <div className="relative w-full max-w-[460px] rounded-[2rem] border border-[#2A2342]/12 bg-[#F6F2FC] p-9 sm:p-11 shadow-[0_40px_90px_-50px_rgba(42,35,66,0.5)]">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#E8721A]/12 to-[#C4A8E8]/25 blur-2xl"
                    />
                    <StageKicker>Proof</StageKicker>
                    {featured && (
                        <div className="mt-6">
                            <AnimatedCounter
                                value={featured.stat}
                                className={`block font-display ${bigNum} leading-[0.95] tracking-[-0.02em] text-[#2A2342]`}
                            />
                            <p className="mt-4 max-w-[36ch] font-sans text-[14px] leading-relaxed text-[#6E6588]">
                                {featured.description}
                            </p>
                        </div>
                    )}
                    {supporting.length > 0 && (
                        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#2A2342]/10 pt-7">
                            {supporting.map((r) => (
                                <div key={r.stat}>
                                    <span className="block font-display text-[1.45rem] leading-none text-[#6B3FC0]">
                                        {r.stat}
                                    </span>
                                    <p className="mt-2 font-sans text-[12px] leading-snug text-[#6E6588]">
                                        {r.description.length > 70
                                            ? `${r.description.slice(0, 70).trimEnd()}…`
                                            : r.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        /* ---------------------------------------------------- OFFER --- */
        // A compact preview of the two ways to work together.
        case 'offer': {
            const offers = (offer.offers ?? []).slice(0, 2);
            return (
                <div className="relative w-full max-w-[460px] rounded-[2rem] border border-[#2A2342]/12 bg-[#F6F2FC] p-8 sm:p-10 shadow-[0_40px_90px_-50px_rgba(42,35,66,0.5)]">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#C4A8E8]/30 to-[#E8721A]/12 blur-2xl"
                    />
                    <StageKicker>Two ways to work together</StageKicker>
                    <p className="mt-6 font-fraunces text-[clamp(1.5rem,2.2vw,2.1rem)] font-light leading-[1.16] text-[#2A2342]">
                        Three months to own{' '}
                        <span className="italic text-[#6B3FC0]">your narrative.</span>
                    </p>
                    <div className="mt-7 space-y-3">
                        {offers.map((o) => {
                            const highlighted = o.packageName.toLowerCase().includes('executive');
                            return (
                                <div
                                    key={o.packageName}
                                    className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3.5 ${
                                        highlighted
                                            ? 'border-[#E8721A]/35 bg-[#E8721A]/[0.06]'
                                            : 'border-[#2A2342]/10 bg-[#EFE9F8]/60'
                                    }`}
                                >
                                    <div>
                                        <span className="block font-display text-[14px] capitalize text-[#2A2342]">
                                            {o.packageName.toLowerCase()}
                                        </span>
                                        <span className="block font-sans text-[11.5px] text-[#6E6588]">
                                            {o.tagline}
                                        </span>
                                    </div>
                                    <span
                                        className={`shrink-0 font-display text-[15px] ${
                                            highlighted ? 'text-[#E8721A]' : 'text-[#6B3FC0]'
                                        }`}
                                    >
                                        {o.price}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        default:
            return null;
    }
}
