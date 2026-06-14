'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/** Shared cinematic easing for the Spotlight layout. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** The ordered scenes that drive both the page and the right-edge dot-nav. */
export const SCENES = [
    { id: 'top', label: 'Intro' },
    { id: 'problem', label: 'Problem' },
    { id: 'why', label: 'Why' },
    { id: 'results', label: 'Results' },
    { id: 'offer', label: 'Offer' },
    { id: 'contact', label: 'Apply' },
] as const;

export type SceneId = (typeof SCENES)[number]['id'];

interface RevealProps {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}

/** Gentle, once-only scroll reveal used across the Spotlight scenes. */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Smoothly scroll a scene into view, accounting for the slim fixed top bar.
 * Shared by the dot-nav, brand mark and in-scene anchors so behaviour is
 * consistent regardless of the browser's native scroll-snap.
 */
export function scrollToScene(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top, behavior: 'smooth' });
}
