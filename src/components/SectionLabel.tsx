interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="w-6 h-[1px] bg-gradient-to-r from-[#E8721A] to-[#6B4FAD]" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase bg-gradient-to-r from-[#E8721A] to-[#B8A4E8] bg-clip-text text-transparent">
                {children}
            </span>
        </div>
    );
}
