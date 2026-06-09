interface DividerProps {
    className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
    return (
        <div className={`flex items-center gap-2 my-6 ${className}`}>
            <span className="block w-10 h-[2px] bg-[#E8721A]" />
            <span className="block w-2 h-[2px] bg-[#16121F]/30" />
        </div>
    );
}
