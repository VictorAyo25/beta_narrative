'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
    value: string;
    className?: string;
}

export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    
    // Parse the value string to extract the number and surrounding text
    const numericMatch = value.match(/[\d.]+/);
    const hasNumber = numericMatch !== null;
    const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
    const prefix = value.substring(0, numericMatch?.index || 0);
    const suffix = value.substring((numericMatch?.index || 0) + (numericMatch?.[0].length || 0));

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
        mass: 1
    });

    useEffect(() => {
        if (inView && hasNumber) {
            motionValue.set(numericValue);
        }
    }, [inView, motionValue, numericValue, hasNumber]);

    useEffect(() => {
        if (!hasNumber) return;
        return springValue.on('change', (latest) => {
            if (ref.current) {
                const isInteger = Number.isInteger(numericValue) || numericValue === 0;
                const formatted = isInteger ? Math.round(latest) : latest.toFixed(1);
                ref.current.textContent = `${prefix}${formatted}${suffix}`;
            }
        });
    }, [springValue, numericValue, prefix, suffix, hasNumber]);

    // Non-numeric values (e.g. "BusinessDay") render as-is with no count-up.
    if (!hasNumber) {
        return <span className={className}>{value}</span>;
    }

    return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
