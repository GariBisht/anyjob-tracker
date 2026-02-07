import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white tracking-wide">AnyJob</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-white/90 font-medium">
          <a href="#" className="hover:text-white transition-colors duration-200">Home</a>
          <a href="#add-job" className="hover:text-white transition-colors duration-200">Add Job</a>
          <a href="#list" className="hover:text-white transition-colors duration-200">Jobs</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <button className="text-white/90 px-4 py-2 rounded-md border border-white/20 hover:bg-white/10 transition">
            Sign in
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/20 backdrop-blur-lg">
          <a href="#" className="block px-6 py-3 text-white hover:bg-white/10 transition">Home</a>
          <a href="#add-job" className="block px-6 py-3 text-white hover:bg-white/10 transition">Add Job</a>
          <a href="#list" className="block px-6 py-3 text-white hover:bg-white/10 transition">Jobs</a>
          <button className="w-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 font-semibold transition">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
