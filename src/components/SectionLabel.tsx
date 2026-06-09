interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
    return (
        <div className={`inline-flex items-center gap-2.5 ${className}`}>
            <span className="block w-6 h-px bg-[#E8721A]" />
            <span className="kicker text-[#6B3FC0]">{children}</span>
        </div>
    );
}
