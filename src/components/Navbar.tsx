'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
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
    const { scrollYProgress } = useScroll();

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
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'py-3.5 bg-[#F2F0F6]/90 backdrop-blur-md border-b border-[#16121F]/14'
                : 'py-5 bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={scrollToTop}
                        className="flex-shrink-0 group cursor-pointer flex items-center gap-2.5"
                    >
                        <span className="block w-2.5 h-2.5 bg-[#E8721A] group-hover:rotate-45 transition-transform duration-300" />
                        <span className="font-display text-[15px] font-bold tracking-[-0.01em] uppercase text-[#16121F]">
                            Beta<span className="text-[#6B3FC0]"> Narrative</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-7">
                            {navLinks.map((link) => {
                                const isActive = active === link.href.slice(1);
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        className={`link-underline font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-300 ${isActive ? 'text-[#E8721A]' : 'text-[#423B52] hover:text-[#16121F]'}`}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </div>
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="font-mono text-[11px] uppercase tracking-[0.1em] text-white bg-[#E8721A] hover:bg-[#16121F] px-5 py-3 transition-colors duration-300"
                        >
                            Claim Your Spot
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center text-[#16121F] hover:text-[#E8721A] transition-colors"
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
            </div>

            {/* Scroll progress bar */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E8721A] origin-left"
            />

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="mobile-menu mx-4 mt-3 p-5 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-3 px-3 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[#423B52] hover:text-[#E8721A] hover:bg-[#16121F]/[0.03] transition-all duration-200"
                                >
                                    <span className="block w-1.5 h-1.5 bg-[#E8721A]" />
                                    {link.label}
                                </motion.a>
                            ))}
                            <div className="pt-3">
                                <a
                                    href="#contact"
                                    onClick={(e) => scrollToSection(e, '#contact')}
                                    className="block text-center font-mono text-[11px] uppercase tracking-[0.1em] text-white bg-[#E8721A] px-6 py-3.5"
                                >
                                    Claim Your Spot
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
