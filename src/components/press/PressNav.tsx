'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { EASE } from '@/lib/motion';

const links = [
    { href: '#problem', label: 'The Problem' },
    { href: '#why', label: 'Why Us' },
    { href: '#results', label: 'Results' },
    { href: '#offer', label: 'Investment' },
];

export default function PressNav() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-[60] border-b transition-colors duration-300 ${
                scrolled ? 'border-[#2A2342]/12 bg-[#E1D3F2]/92 backdrop-blur-md' : 'border-transparent'
            }`}
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
            <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-4 sm:px-10 sm:py-5">
                <a href="#top" className="font-newsreader text-[21px] tracking-tight text-[#2A2342]">
                    Beta <span className="italic">Narrative</span>
                </a>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="link-underline font-sans text-[13.5px] text-[#4A4163] hover:text-[#2A2342] transition-colors duration-200"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <a
                        href="#contact"
                        className="hidden sm:inline-flex items-center rounded-full bg-[#E8721A] px-5 py-2.5 font-sans text-[13.5px] font-medium text-white hover:bg-[#C05A0E] transition-colors duration-200"
                    >
                        Apply Now
                    </a>
                    <button
                        type="button"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center text-[#2A2342]"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="md:hidden overflow-hidden border-t border-[#2A2342]/10 bg-[#E1D3F2]"
                    >
                        <nav className="flex flex-col px-5 py-2 sm:px-10">
                            {links.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="font-newsreader border-b border-[#2A2342]/8 py-4 text-[20px] text-[#2A2342] last:border-0"
                                >
                                    {l.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setOpen(false)}
                                className="my-4 inline-flex items-center justify-center rounded-full bg-[#E8721A] px-5 py-3.5 font-sans text-[14px] font-medium text-white"
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
