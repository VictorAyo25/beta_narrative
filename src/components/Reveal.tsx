'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { EASE } from '@/lib/motion';

interface RevealProps {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}

/** Once-only scroll reveal. */
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
