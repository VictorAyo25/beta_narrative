/**
 * Home Page
 * 
 * Main landing page for Beta Narrative.
 * Composes all sections together.
 */

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PainSection from '@/components/sections/PainSection';
import ValueSection from '@/components/sections/ValueSection';
import ResultsSection from '@/components/sections/ResultsSection';
import OfferSection from '@/components/sections/OfferSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PainSection />
        <ValueSection />
        <ResultsSection />
        <OfferSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
