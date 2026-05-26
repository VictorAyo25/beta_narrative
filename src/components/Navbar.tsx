'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '#problem', label: 'The Problem' },
    { href: '#why', label: 'Why Us' },
    { href: '#results', label: 'Results' },
    { href: '#offer', label: 'Offer' },
    { href: '#contact', label: 'Apply' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section with offset for fixed header
    const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            // Close menu first, then scroll after a brief delay
            setIsOpen(false);

            setTimeout(() => {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 150);
        } else {
            setIsOpen(false);
            window.location.href = `/${href}`;
        }
    }, []);

    // Scroll to top for logo
    const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
            if (window.location.pathname === '/') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                window.location.href = '/';
            }
        }
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#EEE8F8] border-b border-[#8B5CF6]/10 ${scrolled
                ? 'py-3 shadow-[0_2px_20px_rgba(107,63,192,0.08)]'
                : 'py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={scrollToTop}
                        className="flex-shrink-0 group cursor-pointer"
                    >
                        <span className="font-serif text-xl md:text-2xl tracking-wide">
                            <span className="text-[#1A0E35] group-hover:text-[#E8721A] transition-colors duration-300">Beta</span>
                            <span className="text-[#E8721A]"> </span>
                            <span className="text-[#6B3FC0] group-hover:text-[#1A0E35] transition-colors duration-300">Narrative</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="link-underline px-4 py-2 text-[13px] font-medium tracking-wide text-[#1A0E35] hover:text-[#E8721A] transition-colors duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="ml-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-white bg-[#E8721A] px-6 py-2.5 rounded-full hover:bg-[#C05A0E] hover:shadow-[0_0_30px_rgba(232,114,26,0.4)] transition-all duration-300 hover:scale-[1.02]"
                        >
                            Claim Your Spot
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center text-[#1A0E35] hover:text-[#E8721A] transition-colors"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={22} strokeWidth={1.5} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={22} strokeWidth={1.5} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

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
                        <div className="mobile-menu mx-4 mt-3 rounded-2xl p-6 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="block px-4 py-3 text-sm font-medium text-[#1A0E35] hover:text-[#E8721A] hover:bg-[#C4A8E8]/25 rounded-xl transition-all duration-200"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <div className="pt-3">
                                <a
                                    href="#contact"
                                    onClick={(e) => scrollToSection(e, '#contact')}
                                    className="block text-center text-[11px] font-semibold tracking-[0.15em] uppercase text-white bg-gradient-to-r from-[#E8721A] to-[#F5A96A] px-6 py-3.5 rounded-full"
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
