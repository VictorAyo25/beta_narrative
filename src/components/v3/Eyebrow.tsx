interface EyebrowProps {
    children: string;
    className?: string;
}

/**
 * Salon eyebrow — a small Fraunces italic line. The serif voice keeps the
 * section openings editorial and unmistakably hand-set rather than templated.
 */
export default function Eyebrow({ children, className = '' }: EyebrowProps) {
    return (
        <span className={`font-fraunces text-[19px] italic leading-none text-[#8B5CF6] ${className}`}>
            {children}
        </span>
    );
}
