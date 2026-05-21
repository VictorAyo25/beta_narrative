interface SectionLabelProps {
    children: React.ReactNode;
    className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
    return (
        <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E8721A]/20 bg-[#E8721A]/5 ${className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8721A] animate-pulse shadow-[0_0_8px_rgba(232,114,26,0.5)]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#E8721A] to-[#B8A4E8] bg-clip-text text-transparent mt-[1px]">
                {children}
            </span>
        </div>
    );
}
