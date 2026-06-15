'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { atelierNavItems } from './nav-items';
import { useActiveSection } from './useActiveSection';

const NAV_IDS = atelierNavItems.map((item) => item.id);
const LINKEDIN_FALLBACK = 'https://www.linkedin.com/in/favour-egbogun-3b748b166/';

export default function AtelierSidebar() {
    const { content } = useContent();
    const [menuOpen, setMenuOpen] = useState(false);
    const activeId = useActiveSection(NAV_IDS);

    const year = new Date().getFullYear();
    const linkedin = content.value.profileLinkedin || LINKEDIN_FALLBACK;
    const portrait = content.value.profileImage || '/images/Favour.JPG';
    const positioning = content.hero.eyebrow || 'Executive brand strategy';
    const ctaText = content.hero.ctaText || 'Build my brand →';

    // Smooth-scroll then close the mobile menu. Falls through to the native
    // anchor jump if the target hasn't mounted for any reason.
    const handleNav = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMenuOpen(false);
    };

    const navList = (
        <nav className="flex flex-col gap-1">
            {atelierNavItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleNav(item.id);
                        }}
                        className="group relative flex items-center py-2 pl-4 font-display text-[15px] transition-colors duration-200"
                    >
                        <span
                            aria-hidden
                            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-[#E8721A] transition-all duration-300 ${
                                isActive ? 'h-5 opacity-100' : 'h-0 opacity-0'
                            }`}
                        />
                        <span
                            className={
                                isActive
                                    ? 'text-[#E8721A]'
                                    : 'text-[#6E6588] group-hover:text-[#2A2342]'
                            }
                        >
                            {item.label}
                        </span>
                    </a>
                );
            })}
        </nav>
    );

    const wordmark = (
        <a
            href="#top"
            onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMenuOpen(false);
            }}
            className="font-display text-[20px] tracking-[-0.01em] text-[#2A2342]"
        >
            Beta <span className="text-[#6B3FC0]">Narrative</span>
        </a>
    );

    return (
        <>
            {/* ===== Desktop fixed rail (lg+) ===== */}
            <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-[340px] flex-col justify-between border-r border-[#2A2342]/12 bg-[#D5C4EC] px-10 py-10">
                {/* Top — wordmark + positioning */}
                <div>
                    {wordmark}
                    <p className="mt-3 max-w-[15rem] font-sans text-[13px] leading-relaxed text-[#6E6588]">
                        {positioning}
                    </p>
                </div>

                {/* Middle — vertical nav */}
                <div className="-ml-4">{navList}</div>

                {/* Portrait card — entire block links to LinkedIn */}
                <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-xl border border-[#2A2342]/12 bg-[#F1EBFB] p-3 transition-colors duration-200 hover:border-[#2A2342]/20"
                >
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                        <Image
                            src={portrait}
                            alt={content.value.profileName || 'Favour Egbogun'}
                            fill
                            sizes="56px"
                            className="object-cover"
                            style={{ objectPosition: 'center 20%' }}
                        />
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate font-display text-[14px] text-[#2A2342]">
                            {content.value.profileName || 'Favour Egbogun'}
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 font-sans text-[12px] text-[#6E6588]">
                            <span className="truncate">
                                {content.value.profileRole || 'Communications Strategist'}
                            </span>
                            <ArrowUpRight
                                size={12}
                                className="shrink-0 text-[#6B3FC0] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </span>
                    </span>
                </a>

                {/* Bottom — CTA + copyright */}
                <div>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNav('contact');
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E8721A] px-5 py-3.5 font-sans text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#C05A0E]"
                    >
                        {ctaText}
                    </a>
                    <div className="mt-5 flex items-center justify-between font-sans text-[12px] text-[#8A82A0]">
                        <span>© {year} Beta Narrative</span>
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors duration-200 hover:text-[#6B3FC0]"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
            </aside>

            {/* ===== Mobile top bar (<lg) ===== */}
            <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between border-b border-[#2A2342]/12 bg-[#D5C4EC]/95 px-5 pb-4 pt-[calc(1rem_+_env(safe-area-inset-top))] backdrop-blur-md">
                {wordmark}
                <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A2342]/12 bg-[#F1EBFB] text-[#2A2342]"
                >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* ===== Mobile slide-down menu ===== */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden sticky top-[calc(65px_+_env(safe-area-inset-top))] z-40 border-b border-[#2A2342]/12 bg-[#E9DFF8] px-5 py-6"
                    >
                        <div className="-ml-4">{navList}</div>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNav('contact');
                            }}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#E8721A] px-5 py-3.5 font-sans text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#C05A0E]"
                        >
                            {ctaText}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
