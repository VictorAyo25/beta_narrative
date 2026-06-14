'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the viewport using an IntersectionObserver
 * and returns its id. A symmetric vertical rootMargin keeps the "active" band in
 * the middle of the screen so the rail highlight feels natural while scrolling.
 */
export function useActiveSection(ids: string[]): string {
    const [activeId, setActiveId] = useState<string>(ids[0] ?? '');

    useEffect(() => {
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        // Remember the most recent intersection ratio per section so that, when
        // several sections are partially visible, the one most centred wins.
        const ratios = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
                }

                let bestId = '';
                let bestRatio = 0;
                for (const [id, ratio] of ratios) {
                    if (ratio > bestRatio) {
                        bestRatio = ratio;
                        bestId = id;
                    }
                }

                if (bestId) setActiveId(bestId);
            },
            {
                rootMargin: '-45% 0px -50% 0px',
                threshold: [0, 0.1, 0.25, 0.5, 1],
            }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids]);

    return activeId;
}
