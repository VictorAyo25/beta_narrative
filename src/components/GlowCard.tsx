'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    [key: string]: any;
}

export default function GlowCard({
    children,
    className = '',
    delay = 0,
    ...props
}: GlowCardProps) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            className={`group relative p-7 rounded-2xl border border-[#130E20]/5 bg-[#EEE8F8]/30 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(232,114,26,0.12)] hover:border-[#E8721A]/35 hover:bg-[#EEE8F8]/55 transition-all duration-500 overflow-hidden ${className}`}
            {...props}
        >
            {/* Spotlight Overlay */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                style={{
                    background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(232, 114, 26, 0.08), transparent 80%)`,
                }}
            />
            
            {/* Inner Content to overlay above the spotlight */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </motion.div>
    );
}
