/**
 * Section Label Component
 * 
 * Reusable section label with orange accent.
 */

interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
    return (
        <span className={`text-xs font-medium tracking-[0.2em] uppercase text-[#E8721A] ${className}`}>
            {children}
        </span>
    );
}
