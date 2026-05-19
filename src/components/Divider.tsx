/**
 * Divider Component
 * 
 * Decorative divider line.
 */

interface DividerProps {
    className?: string;
}

export default function Divider({ className = '' }: DividerProps) {
    return (
        <div className={`w-9 h-0.5 bg-[#5344B7] my-4 ${className}`} />
    );
}
