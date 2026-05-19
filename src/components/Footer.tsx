/**
 * Footer Component
 * 
 * Simple footer with branding and copyright.
 */

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-[#534AB7]/15 bg-[#0D0B1F]">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm text-[#8A86B8] tracking-wide">
                    <span className="text-[#E8721A]">Beta Narrative</span> · Executive Brand Strategy · © {currentYear} All rights reserved.
                </p>
            </div>
        </footer>
    );
}
