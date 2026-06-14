'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from './frame-shared';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}

/** Calm, once-only scroll reveal used across the narrative pane. */
export default function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
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
