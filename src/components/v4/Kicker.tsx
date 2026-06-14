interface KickerProps {
    children: string;
    className?: string;
}

/** Calm mono kicker with a short leading rule — orients each narrative beat. */
export default function Kicker({ children, className = '' }: KickerProps) {
    return (
        <span
            className={`inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6E6588] ${className}`}
        >
            <span aria-hidden className="block h-px w-8 bg-[#6B3FC0]/50" />
            {children}
        </span>
    );
}
