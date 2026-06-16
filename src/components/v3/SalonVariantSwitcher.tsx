'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// The three Results treatments for layout 3. They share the whole Salon page and
// only differ in the Results section.
const VARIANTS = [
    { href: '/v3', label: '3a', name: 'Bento' },
    { href: '/v3b', label: '3b', name: 'Bento + motion' },
    { href: '/v3c', label: '3c', name: 'Slide' },
];

export default function SalonVariantSwitcher() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-[calc(4.75rem_+_env(safe-area-inset-bottom))] left-1/2 z-[70] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-[#2A2342]/92 px-2 py-1.5 shadow-[0_16px_40px_-12px_rgba(42,35,66,0.6)] backdrop-blur-md select-none">
            <span className="hidden pl-2.5 pr-1 text-[10px] uppercase tracking-[0.18em] text-white/45 sm:block">
                Results
            </span>
            {VARIANTS.map((v) => {
                const active = pathname === v.href;
                return (
                    <Link
                        key={v.href}
                        href={v.href}
                        title={v.name}
                        aria-label={`Layout ${v.label} — ${v.name}`}
                        className={`flex h-7 items-center justify-center rounded-full px-3 text-xs font-medium transition-colors duration-200 ${
                            active ? 'bg-[#E8721A] text-white' : 'text-white/65 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {v.label}
                    </Link>
                );
            })}
        </div>
    );
}
