'use client';

import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingCTA() {
    const { scrollY } = useScroll();
    const [pastHero, setPastHero] = useState(false);
    const [staticVisible, setStaticVisible] = useState(false);

    // Show only after scrolling past the hero
    useEffect(() => {
        return scrollY.on('change', (latest) => {
            setPastHero(latest > 500);
        });
    }, [scrollY]);

    // Hide when the static Offer button is on screen
    useEffect(() => {
        const target = document.getElementById('offer-cta-btn');
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => setStaticVisible(entry.isIntersecting),
            // 80px margin so the float fades before they physically overlap
            { rootMargin: '80px' }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    const isVisible = pastHero && !staticVisible;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 50,
                scale: isVisible ? 1 : 0.9,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
            <a
                href="#contact"
                className="inline-flex items-center justify-center text-sm font-semibold tracking-[0.12em] uppercase text-white bg-[#E8721A] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-[#C05A0E] hover:shadow-[0_0_40px_rgba(232,114,26,0.5)] hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_24px_rgba(232,114,26,0.4)]"
            >
                <span className="hidden sm:inline">Secure Your Spot</span>
                <span className="sm:hidden">Apply Now</span>
            </a>
        </motion.div>
    );
}

