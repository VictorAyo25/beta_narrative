interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

/** Stacked "tab" eyebrow — label seated on a short orange rule. */
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
    return (
        <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-[#6B3FC0]">
                {children}
            </span>
            <span aria-hidden className="block h-[2px] w-8 bg-[#E8721A]" />
        </span>
    );
}
