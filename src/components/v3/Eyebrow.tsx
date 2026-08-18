interface EyebrowProps {
    children: string;
    className?: string;
}

/** Salon eyebrow — a short Fraunces italic line above each section head. */
export default function Eyebrow({ children, className = '' }: EyebrowProps) {
    return (
        <span className={`font-fraunces text-[19px] italic leading-none text-[#8B5CF6] ${className}`}>
            {children}
        </span>
    );
}
