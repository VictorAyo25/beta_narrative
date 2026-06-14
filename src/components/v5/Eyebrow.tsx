interface EyebrowProps {
    children: string;
    className?: string;
}

/**
 * Spotlight eyebrow — a small orange diamond leading a calm sentence-case label.
 * The diamond is a quiet recurring brand mark; sentence case keeps the
 * cinematic scenes from feeling like shouty, templated overlines.
 */
export default function Eyebrow({ children, className = '' }: EyebrowProps) {
    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <span aria-hidden className="block h-1.5 w-1.5 rotate-45 bg-[#E8721A]" />
            <span className="font-sans text-[13px] font-medium tracking-[0.04em] text-[#6B3FC0]">
                {children}
            </span>
        </span>
    );
}
