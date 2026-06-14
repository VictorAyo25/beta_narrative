'use client';

import { useEffect, useState } from 'react';
import { SCENES, scrollToScene } from './primitives';

/** Fixed right-edge dot navigation (desktop) with scroll-spy + click-to-scroll. */
export default function SceneDotNav() {
    const [active, setActive] = useState<string>('top');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
        );
        SCENES.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <nav
            aria-label="Section navigation"
            className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex"
        >
            {SCENES.map((s) => {
                const isActive = active === s.id;
                return (
                    <button
                        key={s.id}
                        onClick={() => scrollToScene(s.id)}
                        className="group flex items-center gap-2.5"
                        aria-label={s.label}
                        aria-current={isActive ? 'true' : undefined}
                    >
                        <span
                            className={`font-sans text-[11px] tracking-wide transition-opacity duration-200 ${
                                isActive
                                    ? 'text-[#2A2342] opacity-100'
                                    : 'text-[#6E6588] opacity-0 group-hover:opacity-100'
                            }`}
                        >
                            {s.label}
                        </span>
                        <span
                            className={`block rounded-full transition-all duration-300 ${
                                isActive
                                    ? 'h-2.5 w-2.5 bg-[#E8721A]'
                                    : 'h-1.5 w-1.5 bg-[#2A2342]/25 group-hover:bg-[#6B3FC0]'
                            }`}
                        />
                    </button>
                );
            })}
        </nav>
    );
}
