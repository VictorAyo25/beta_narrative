'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
    value: string;
    className?: string;
}

/**
 * Counts a numeric value up from zero the first time it scrolls into view.
 *
 * State-driven (via framer's `animate`) rather than a manual spring writing to
 * `textContent` — the previous spring approach could leave a stat stranded at
 * "0+" on mobile if its in-view callback raced hydration. `animate` always
 * lands exactly on the target, and `amount: 'some'` fires as soon as any part
 * of the element is visible (including when it's already on screen at mount).
 */
export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const reduceMotion = useReducedMotion();

    // Split "4+" / "5×" / "20%" / "1.5k" into number + surrounding text.
    const match = value.match(/[\d.]+/);
    const hasNumber = match !== null;
    const target = hasNumber ? parseFloat(match[0]) : 0;
    const prefix = value.slice(0, match?.index ?? 0);
    const suffix = value.slice((match?.index ?? 0) + (match?.[0].length ?? 0));
    const decimals = hasNumber && match[0].includes('.') ? 1 : 0;

    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!hasNumber || !inView) return;
        if (reduceMotion) {
            setDisplay(target);
            return;
        }
        const controls = animate(0, target, {
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(v),
        });
        return () => controls.stop();
    }, [inView, hasNumber, target, reduceMotion]);

    // Non-numeric values (e.g. "BusinessDay") render as-is with no count-up.
    if (!hasNumber) {
        return <span className={className}>{value}</span>;
    }

    return (
        <span ref={ref} className={className}>
            {prefix}
            {display.toFixed(decimals)}
            {suffix}
        </span>
    );
}
