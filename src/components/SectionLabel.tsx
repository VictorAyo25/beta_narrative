interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <span className="w-6 h-[1px] bg-gradient-to-r from-[#E8721A] to-[#534AB7]" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase bg-gradient-to-r from-[#E8721A] to-[#AFA9EC] bg-clip-text text-transparent">
                {children}
            </span>
        </div>
    );
}
