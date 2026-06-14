interface EyebrowProps {
    children: string;
    className?: string;
}

/**
 * Small, elegant section eyebrow — soft lilac pill with a violet dot.
 * Deliberately not all-caps to keep the Salon voice calm and premium.
 */
export default function Eyebrow({ children, className = '' }: EyebrowProps) {
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border border-[#2A2342]/12 bg-[#F1ECF9] px-4 py-1.5 font-sans text-[12.5px] font-medium tracking-wide text-[#6E6588] ${className}`}
        >
            <span className="block w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            {children}
        </span>
    );
}
