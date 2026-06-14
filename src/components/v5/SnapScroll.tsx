'use client';

import { useEffect } from 'react';

/**
 * Applies a gentle vertical scroll-snap to the document while the Spotlight
 * layout is mounted (and cleans it up on unmount, so it never leaks to other
 * routes). `proximity` keeps it from trapping the scroll.
 */
export default function SnapScroll() {
    useEffect(() => {
        const el = document.documentElement;
        const prev = el.style.scrollSnapType;
        el.style.scrollSnapType = 'y proximity';
        return () => {
            el.style.scrollSnapType = prev;
        };
    }, []);
    return null;
}
