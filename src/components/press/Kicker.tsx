interface KickerProps {
    children: string;
    className?: string;
}

/** Small mono label seated on a short orange rule. */
export default function Kicker({ children, className = '' }: KickerProps) {
    return (
        <span className={`inline-flex items-center gap-3 ${className}`}>
            <span aria-hidden className="block h-px w-7 bg-[#E8721A]" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#6B3FC0]">
                {children}
            </span>
        </span>
    );
}
