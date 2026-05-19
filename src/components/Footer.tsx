import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 px-5 sm:px-8 lg:px-10 border-t border-[#6B4FAD]/15 bg-[#0D0B1F]">
            {/* Top accent line */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#6B4FAD]/30 to-transparent" />

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="font-serif text-lg tracking-wide">
                        <span className="text-[#FAF9FF]">Beta</span>
                        <span className="text-[#E8721A]"> </span>
                        <span className="text-[#B8A4E8]">Narrative</span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <a href="#problem" className="text-xs text-[#9B8EC4] hover:text-[#E8721A] transition-colors duration-300">The Problem</a>
                        <a href="#why" className="text-xs text-[#9B8EC4] hover:text-[#E8721A] transition-colors duration-300">Why Us</a>
                        <a href="#results" className="text-xs text-[#9B8EC4] hover:text-[#E8721A] transition-colors duration-300">Results</a>
                        <a href="#contact" className="text-xs text-[#9B8EC4] hover:text-[#E8721A] transition-colors duration-300">Apply</a>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs text-[#9B8EC4]/50 tracking-wide">
                        © {currentYear} Beta Narrative
                    </p>
                </div>
            </div>
        </footer>
    );
}
