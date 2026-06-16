import type { ReactNode } from 'react';
import ContactSection from '@/components/sections/ContactSection';
import SalonNav from './SalonNav';
import SalonHero from './SalonHero';
import SalonProblem from './SalonProblem';
import SalonWhy from './SalonWhy';
import SalonOffer from './SalonOffer';
import SalonFooter from './SalonFooter';
import SalonVariantSwitcher from './SalonVariantSwitcher';

/**
 * The shared "Salon" (layout 3) page. Every variant (3a/3b/3c) renders the same
 * sections and only swaps the Results treatment, supplied via `results`.
 */
export default function SalonShell({ results }: { results: ReactNode }) {
    return (
        <div className="theme-salon min-h-screen bg-[#E1D3F2]">
            <SalonNav />
            <main>
                <SalonHero />
                <SalonProblem />
                <SalonWhy />
                {results}
                <SalonOffer />
                <ContactSection />
            </main>
            <SalonFooter />
            <SalonVariantSwitcher />
        </div>
    );
}
