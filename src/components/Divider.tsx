interface DividerProps {
    className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
    return (
        <div className={`w-12 h-[2px] bg-gradient-to-r from-[#E8721A] to-[#4A2D8F] rounded-full my-5 ${className}`} />
    );
}
