interface DividerProps {
    className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
    return (
        <div className={`w-12 h-px bg-[#E8721A]/60 my-6 ${className}`} />
    );
}
