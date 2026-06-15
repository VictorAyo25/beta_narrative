import type { ReactNode } from 'react';

interface SceneProps {
    id: string;
    children: ReactNode;
    /** Subtle alternating lilac tint for rhythm between scenes. */
    tint?: boolean;
    /** Omit horizontal padding so content (e.g. the results rail) can bleed wide. */
    flush?: boolean;
    className?: string;
}

/** A full-viewport "scene" with a gentle snap point. */
export default function Scene({ id, children, tint = false, flush = false, className = '' }: SceneProps) {
    return (
        <section
            id={id}
            className={`relative flex min-h-screen snap-start flex-col justify-center py-28 ${
                flush ? '' : 'px-5 sm:px-8 lg:px-12'
            } ${tint ? 'bg-[#E9DFF8]' : 'bg-[#E1D3F2]'} ${className}`}
        >
            {children}
        </section>
    );
}
