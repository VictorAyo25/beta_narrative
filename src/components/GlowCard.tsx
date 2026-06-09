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
            className={`group relative p-7 bg-white border border-[#16121F]/[0.14] hover:border-[#E8721A] transition-colors duration-300 ${className}`}
            {...props}
        >
            {/* corner tick that appears on hover */}
            <span className="pointer-events-none absolute top-0 right-0 w-0 h-0 border-t-[14px] border-l-[14px] border-t-[#E8721A] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
