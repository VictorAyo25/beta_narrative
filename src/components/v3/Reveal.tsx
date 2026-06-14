'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}

/** Tasteful, once-only scroll reveal used across the Salon layout. */
export default function Reveal({ children, delay = 0, y = 22, className }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay, ease: EASE }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
