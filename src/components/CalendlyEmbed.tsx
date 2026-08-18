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

    // embed_domain needs the live hostname, and Calendly only posts booking
    // events back to the parent when embed_domain/embed_type are present.
    // This component only mounts client-side, after the form is submitted.
    let embedUrl: string | null = null;
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams({
            embed_domain: window.location.hostname,
            embed_type: 'Inline',
            background_color: 'f6f2fc',
            text_color: '2a2342',
            primary_color: 'e8721a',
            hide_landing_page_details: '1',
            hide_gdpr_banner: '1',
        });

        if (prefillName) params.append('name', prefillName);
        if (prefillEmail) params.append('email', prefillEmail);

        embedUrl = `${url.split('?')[0]}?${params.toString()}`;
    }

    return (
        <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
            {(isLoading || !embedUrl) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F1EBFB] border border-[#2A2342]/12 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-2 border-[#E8721A]/20 border-t-[#E8721A] animate-spin mb-4" />
                    <p className="font-sans text-[13px] text-[#6E6587]">
                        Loading calendar…
                    </p>
                </div>
            )}

            {embedUrl && (
                <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    onLoad={() => setIsLoading(false)}
                    className={`transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    title="Schedule a consultation call"
                />
            )}
        </div>
    );
}
