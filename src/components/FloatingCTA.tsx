'use client';

import { motion, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FloatingCTA() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        return scrollY.on('change', (latest) => {
            // Show the floating CTA after scrolling past the Hero section (~500px)
            setIsVisible(latest > 500);
        });
    }, [scrollY]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
            <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase text-[#1A112E] bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#1A112E]/10 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_rgba(232,114,26,0.25)] hover:border-[#E8721A]/50 transition-all duration-400 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#E8721A]/0 via-[#E8721A]/10 to-[#F5A96A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <span className="hidden sm:inline">Secure Your Spot</span>
                <span className="sm:hidden">Apply Now</span>
                <ArrowRight size={16} className="text-[#E8721A] group-hover:translate-x-1 transition-transform duration-300" />
            </a>
        </motion.div>
    );
}
