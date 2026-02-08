import { useState } from "react";

import AnyJobLogo from "./AnyJobLogo";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-6 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* Header Row */}
          <div className="flex items-center justify-between px-6 py-4">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <AnyJobLogo size={42} />
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-8 text-white/80 font-medium"
              aria-label="Main navigation"
            >
              <a href="#" className="hover:text-white transition">Home</a>
              <a href="#add-job" className="hover:text-white transition">Add Job</a>
              <a href="#list" className="hover:text-white transition">Jobs</a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex gap-3">
              <button className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition">
                Sign in
              </button>
              <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10">
              <a className="block px-6 py-3 text-white/80 hover:bg-white/10 transition">
                Home
              </a>
              <a className="block px-6 py-3 text-white/80 hover:bg-white/10 transition">
                Add Job
              </a>
              <a className="block px-6 py-3 text-white/80 hover:bg-white/10 transition">
                Jobs
              </a>
              <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-b-2xl">
                Get Started
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

