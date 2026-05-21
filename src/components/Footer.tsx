import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 px-5 sm:px-8 lg:px-10 border-t border-[#D9CFF2]/15 bg-[#FAF7F2]">
            {/* Top accent line */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#4A2D8F]/30 to-transparent" />

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="font-serif text-lg tracking-wide">
                        <span className="text-[#1A112E]">Beta</span>
                        <span className="text-[#E8721A]"> </span>
                        <span className="text-[#4A2D8F]">Narrative</span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <a href="#problem" className="text-xs text-[#59497A] hover:text-[#E8721A] transition-colors duration-300">The Problem</a>
                        <a href="#why" className="text-xs text-[#59497A] hover:text-[#E8721A] transition-colors duration-300">Why Us</a>
                        <a href="#results" className="text-xs text-[#59497A] hover:text-[#E8721A] transition-colors duration-300">Results</a>
                        <a href="#contact" className="text-xs text-[#59497A] hover:text-[#E8721A] transition-colors duration-300">Apply</a>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-[#59497A]/50 tracking-wide">
                        © {currentYear} Beta Narrative
                    </p>
                </div>
            </div>
        </footer>
    );
}
