'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Shared building blocks for the v1 "Bento Canvas" layout.
 *
 * Everything is a tile on a soft lilac canvas: rounded panels in a handful of
 * tones (pale lilac surface, deep violet, orange, aubergine) arranged on a
 * 12-column grid that collapses to a single, tidy stack on mobile. Reveal
 * triggers on `amount` (a fraction of the tile being visible) rather than a
 * pixel margin, so nothing gets stranded invisible on small screens.
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Tile tones. `base` carries the shared shape, border-radius and lift. */
export const tile = {
    base: 'group relative overflow-hidden rounded-[1.6rem] border transition-[transform,box-shadow] duration-500 ease-out',
    surface:
        'bg-[#F1EBFB] border-[#2A2342]/10 shadow-[0_26px_60px_-46px_rgba(42,35,66,0.65)]',
    paper: 'bg-[#E9DFF8] border-[#2A2342]/10 shadow-[0_26px_60px_-48px_rgba(42,35,66,0.55)]',
    violet: 'bg-[#6B3FC0] border-[#6B3FC0] text-white shadow-[0_28px_64px_-40px_rgba(107,63,192,0.75)]',
    orange: 'bg-[#E8721A] border-[#E8721A] text-white shadow-[0_28px_64px_-40px_rgba(232,114,26,0.7)]',
    dark: 'bg-[#2A2342] border-[#2A2342] text-white shadow-[0_28px_64px_-42px_rgba(42,35,66,0.85)]',
    /**
     * Gentle hover feedback for interactive / linked tiles. Deepens the shadow
     * rather than translating: framer-motion leaves an inline `transform` on
     * animated tiles that would override a Tailwind translate, so a transform
     * lift only works on some tiles — a shadow change works on all of them.
     */
    lift: 'hover:shadow-[0_40px_78px_-32px_rgba(42,35,66,0.6)]',
} as const;

/** Tracked mono label with a short orange blade — the section eyebrow. */
export function Kicker({
    children,
    tone = 'violet',
}: {
    children: ReactNode;
    tone?: 'violet' | 'light';
}) {
    return (
        <span className="inline-flex items-center gap-2.5">
            <span aria-hidden className="block h-3 w-[3px] rounded-full bg-[#E8721A]" />
            <span
                className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                    tone === 'light' ? 'text-white/75' : 'text-[#6B3FC0]'
                }`}
            >
                {children}
            </span>
        </span>
    );
}

/** Once-only scroll reveal. Triggers on visible fraction (mobile-safe). */
export function Reveal({
    children,
    delay = 0,
    className = '',
    y = 22,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
    y?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * A reveal that also drives the tile grid: same trigger, but staggers its
 * direct children. Use around a set of bento tiles.
 */
export function RevealGrid({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/** A single tile within a RevealGrid — animates as part of the stagger. */
export function TileReveal({
    children,
    className = '',
    style,
}: {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}
