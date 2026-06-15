'use client';

import ContactSection from '@/components/sections/ContactSection';
import AtelierSidebar from './AtelierSidebar';
import AtelierSections from './AtelierSections';
import AtelierFooter from './AtelierFooter';

/**
 * Atelier (/v2) layout shell: a fixed editorial rail on the left and a single
 * left-aligned scrolling column on the right. The rail is position:fixed, so the
 * content is offset by the rail width on lg+ screens. On mobile the rail becomes
 * a top bar and the content runs full width.
 */
export default function AtelierShell() {
    return (
        <div className="min-h-screen bg-[#E1D3F2]">
            <AtelierSidebar />

            <div className="lg:ml-[340px]">
                {/* Editorial content column — capped width, comfortable padding. */}
                <main className="mx-auto w-full max-w-[800px] px-5 sm:px-8 lg:px-14">
                    <AtelierSections />
                </main>

                {/* Shared contact section renders its own full-bleed <section id="contact">. */}
                <ContactSection />

                <div className="mx-auto w-full max-w-[800px] px-5 sm:px-8 lg:px-14">
                    <AtelierFooter />
                </div>
            </div>
        </div>
    );
}
