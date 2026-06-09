'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlowCardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function GlowCard({
    children,
    className = '',
    delay = 0,
    ...props
}: GlowCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative p-7 bg-[#F6F2FC] border border-[#2A2342]/[0.12] hover:border-[#6B3FC0]/40 transition-colors duration-300 ${className}`}
            {...props}
        >
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
