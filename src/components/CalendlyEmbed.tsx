'use client';

import { useState } from 'react';

interface CalendlyEmbedProps {
    url?: string;
    prefillName?: string;
    prefillEmail?: string;
    className?: string;
    height?: string;
}

export default function CalendlyEmbed({
    url = 'https://calendly.com/egbogunfavour/30min',
    prefillName = '',
    prefillEmail = '',
    className = '',
    height = '650px',
}: CalendlyEmbedProps) {
    const [isLoading, setIsLoading] = useState(true);

    if (!url) return null;

    // Clean up URL and build query params
    // Calendly expects URL parameters for colors and prefill details
    const cleanUrl = url.split('?')[0];
    const params = new URLSearchParams();

    // Custom aesthetics to match the site's design palette
    params.append('background_color', 'f6f2fc'); // pale lilac card background
    params.append('text_color', '2a2342');       // matching ink text #2A2342
    params.append('primary_color', 'e8721a');    // matching orange accent #E8721A
    params.append('hide_landing_page_details', '1');
    params.append('hide_gdpr_banner', '1');

    if (prefillName) {
        params.append('name', prefillName);
    }
    if (prefillEmail) {
        params.append('email', prefillEmail);
    }

    const embedUrl = `${cleanUrl}?${params.toString()}`;

    return (
        <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
            {/* Loading Skeleton */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F6F2FC] border border-[#2A2342]/12 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-2 border-[#E8721A]/20 border-t-[#E8721A] animate-spin mb-4" />
                    <p className="font-sans text-[13px] text-[#6E6587]">
                        Loading calendar…
                    </p>
                </div>
            )}

            <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                onLoad={() => setIsLoading(false)}
                className={`transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                title="Schedule a consultation call"
            />
        </div>
    );
}
