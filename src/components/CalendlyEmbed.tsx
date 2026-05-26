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
    url = 'https://calendly.com/favour-egbogun/30min',
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
    params.append('background_color', 'faf7ff'); // matching form card background #FAF7FF
    params.append('text_color', '1a0e35');       // matching main text #1A0E35
    params.append('primary_color', 'e8721a');    // matching orange theme #E8721A
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
        <div className={`relative w-full overflow-hidden rounded-2xl ${className}`} style={{ height }}>
            {/* Premium Loading Skeleton */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF7FF] border border-[#8B5CF6]/15 rounded-2xl animate-pulse">
                    <div className="w-12 h-12 rounded-full border-2 border-[#E8721A]/20 border-t-[#E8721A] animate-spin mb-4" />
                    <p className="text-xs font-semibold text-[#1A0E35]/60 tracking-wider uppercase">
                        Loading Calendar...
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
