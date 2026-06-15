'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
    { href: '#problem', label: 'The Problem' },
    { href: '#why', label: 'Why Us' },
    { href: '#results', label: 'Results' },
    { href: '#offer', label: 'Investment' },
];

export default function SalonNav() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll while the mobile menu is open.
    useEffect(() => {
        if (open) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [open]);

    return (
        <header className="fixed top-0 inset-x-0 z-[60] flex justify-center px-4 pt-4 sm:pt-5">
            <motion.nav
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full max-w-3xl rounded-full border border-[#2A2342]/12 bg-[#F1EBFB]/80 backdrop-blur-xl transition-shadow duration-300 ${
                    scrolled
                        ? 'shadow-[0_18px_50px_-22px_rgba(42,35,66,0.45)]'
                        : 'shadow-[0_10px_34px_-22px_rgba(42,35,66,0.4)]'
                }`}
            >
                <div className="flex items-center justify-between gap-4 pl-5 pr-2.5 py-2.5 sm:pl-7 sm:pr-3 sm:py-3">
                    <a
                        href="#top"
                        className="font-fraunces text-[18px] sm:text-[20px] font-semibold tracking-tight text-[#2A2342] whitespace-nowrap"
                    >
                        Beta <span className="italic">Narrative</span>
                    </a>

                    <div className="hidden md:flex items-center gap-7">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="font-sans text-[13.5px] text-[#4A4163] hover:text-[#2A2342] transition-colors duration-200"
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                        <a
                            href="#contact"
                            className="hidden sm:inline-flex items-center rounded-full bg-[#E8721A] px-5 py-2.5 font-sans text-[13.5px] font-medium text-white shadow-[0_8px_22px_-10px_rgba(232,114,26,0.8)] hover:bg-[#C05A0E] transition-colors duration-200"
                        >
                            Apply Now
                        </a>
                        <button
                            type="button"
                            aria-label="Open menu"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[#2A2342] hover:bg-[#2A2342]/5 transition-colors"
                        >
                            {open ? <X size={19} /> : <Menu size={19} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden absolute top-[76px] inset-x-4 rounded-3xl border border-[#2A2342]/12 bg-[#F1EBFB]/95 backdrop-blur-xl shadow-[0_24px_60px_-24px_rgba(42,35,66,0.5)] p-3"
                    >
                        <nav className="flex flex-col">
                            {links.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="font-fraunces text-[19px] text-[#2A2342] px-4 py-3 rounded-2xl hover:bg-[#2A2342]/5 transition-colors"
                                >
                                    {l.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setOpen(false)}
                                className="mt-1.5 inline-flex items-center justify-center rounded-full bg-[#E8721A] px-5 py-3.5 font-sans text-[14px] font-medium text-white hover:bg-[#C05A0E] transition-colors"
                            >
                                Apply Now
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
