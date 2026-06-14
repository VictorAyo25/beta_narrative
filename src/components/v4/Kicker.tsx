interface KickerProps {
    children: string;
    className?: string;
}

/** Frame eyebrow — a tracked mono label seated on a short orange underline. */
export default function Kicker({ children, className = '' }: KickerProps) {
    return (
        <span
            className={`inline-block border-b-2 border-[#E8721A]/60 pb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B3FC0] ${className}`}
        >
            {children}
        </span>
    );
}
