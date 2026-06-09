interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
    return (
        <div className={`inline-flex items-center gap-3 ${className}`}>
            <span className="block w-2 h-2 bg-[#E8721A]" />
            <span className="kicker text-[#16121F]">{children}</span>
        </div>
    );
}
