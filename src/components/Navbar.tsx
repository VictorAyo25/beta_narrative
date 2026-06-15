'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '#problem', label: 'Problem' },
    { href: '#why', label: 'Why Us' },
    { href: '#results', label: 'Results' },
    { href: '#offer', label: 'Offer' },
    { href: '#contact', label: 'Apply' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll-spy: highlight the nav link for the section currently in view.
    useEffect(() => {
        const ids = navLinks.map((l) => l.href.slice(1));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            setIsOpen(false);
            setTimeout(() => {
                const headerOffset = 76;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }, 150);
        } else {
            setIsOpen(false);
            window.location.href = `/${href}`;
        }
    }, []);

    const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.location.href = '/';
            }
        }
    }, []);

    return (
        <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-[calc(0.75rem_+_env(safe-area-inset-top))] sm:pt-[calc(1rem_+_env(safe-area-inset-top))]">
            <div className="mx-auto max-w-[1240px]">
                <div
                    className={`flex items-center justify-between rounded-full border px-3 py-2 pl-5 transition-all duration-300 sm:px-4 sm:py-2.5 sm:pl-6 ${
                        scrolled
                            ? 'border-[#2A2342]/12 bg-[#F1EBFB]/85 shadow-[0_16px_40px_-24px_rgba(42,35,66,0.5)] backdrop-blur-md'
                            : 'border-[#2A2342]/[0.07] bg-[#F1EBFB]/55 backdrop-blur-sm'
                    }`}
                >
                    {/* Logo */}
                    <a href="#" onClick={scrollToTop} className="group flex-shrink-0 cursor-pointer">
                        <span className="font-display text-[18px] font-medium tracking-[-0.01em] text-[#2A2342]">
                            Beta <span className="text-[#6B3FC0]">Narrative</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-7 md:flex">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => {
                                const isActive = active === link.href.slice(1);
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className={`link-underline font-sans text-[14px] transition-colors duration-300 ${isActive ? 'text-[#E8721A]' : 'text-[#4A4163] hover:text-[#2A2342]'}`}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </div>
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="rounded-full bg-[#E8721A] px-5 py-2.5 font-sans text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-[#C05A0E]"
                        >
                            Claim Your Spot
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#2A2342] transition-colors hover:text-[#E8721A] md:hidden"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <X size={22} strokeWidth={1.75} />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Menu size={22} strokeWidth={1.75} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="md:hidden"
                        >
                            <div className="mt-2 space-y-1 rounded-[1.4rem] border border-[#2A2342]/12 bg-[#F1EBFB]/95 p-4 shadow-[0_24px_60px_-24px_rgba(42,35,66,0.5)] backdrop-blur-md">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="block rounded-xl px-4 py-3 font-sans text-[15px] text-[#4A4163] transition-all duration-200 hover:bg-[#E6DBF6] hover:text-[#E8721A]"
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                                <div className="pt-2">
                                    <a
                                        href="#contact"
                                        onClick={(e) => scrollToSection(e, '#contact')}
                                        className="block rounded-full bg-[#E8721A] px-6 py-3.5 text-center font-sans text-[14px] font-semibold text-white"
                                    >
                                        Claim Your Spot
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
