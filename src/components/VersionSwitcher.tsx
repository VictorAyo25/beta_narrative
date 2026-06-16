'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const options = [
    { href: '/', label: '1', name: 'Editorial Grid' },
    { href: '/v2', label: '2', name: 'Atelier' },
    { href: '/v3', label: '3', name: 'Salon' },
    { href: '/v4', label: '4', name: 'Frame' },
    { href: '/v5', label: '5', name: 'Spotlight' },
];

export default function VersionSwitcher() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-[calc(1.25rem_+_env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[70] flex items-center gap-1 bg-[#2A2342]/92 backdrop-blur-md px-2 py-1.5 rounded-full shadow-[0_16px_40px_-12px_rgba(42,35,66,0.6)] border border-white/10 select-none">
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-white/45 pl-2.5 pr-1">
                Layout
            </span>
            {options.map((o) => {
                const active =
                    o.href === '/' ? pathname === '/' : pathname === o.href || pathname.startsWith(`${o.href}`);
                return (
                    <Link
                        key={o.href}
                        href={o.href}
                        title={o.name}
                        aria-label={`Layout ${o.label}`}
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors duration-200 ${
                            active
                                ? 'bg-[#E8721A] text-white'
                                : 'text-white/65 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {o.label}
                    </Link>
                );
            })}
        </div>
    );
}
