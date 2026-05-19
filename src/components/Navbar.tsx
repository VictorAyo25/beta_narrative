'use client';

/**
 * Navigation Bar Component
 * 
 * Responsive navigation with mobile menu support.
 */

import { useState } from 'react';
import Link from 'next/link';
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

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0B1F]/95 backdrop-blur-sm border-b border-[#534AB7]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <span className="font-serif text-xl md:text-2xl text-[#E8721A] tracking-wide">
                            Beta Narrative
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-[#FAF9FF]/70 hover:text-[#E8721A] transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="text-xs font-medium tracking-widest uppercase text-[#FAF9FF] bg-[#E8721A] px-5 py-2.5 rounded-sm hover:bg-[#F5A96A] transition-colors duration-200"
                        >
                            Claim Your Spot
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-[#FAF9FF] hover:text-[#E8721A] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-[#0D0B1F] border-b border-[#534AB7]/30"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-sm text-[#FAF9FF]/70 hover:text-[#E8721A] py-2 transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="block text-center text-xs font-medium tracking-widest uppercase text-[#FAF9FF] bg-[#E8721A] px-5 py-3 rounded-sm hover:bg-[#F5A96A] transition-colors"
                            >
                                Claim Your Spot
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
