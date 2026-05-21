interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
    return (
        <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-gradient-to-r from-[#8B5CF6]/10 to-[#E8721A]/10 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#E8721A] animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#6B3FC0] to-[#E8721A] bg-clip-text text-transparent mt-[1px]">
                {children}
            </span>
        </div>
    );
}
