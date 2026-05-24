import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Founder', to: '/founder' },
  { label: 'Sandbox', to: '/', hash: '#sandbox' },
  { label: 'Our Process', to: '/process', hash: null },
  { label: 'Services', to: '/', hash: '#services' },
  { label: 'Trust', to: '/', hash: '#trust' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, path, hash) => {
    if (hash) {
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate(path + hash);
      }
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navbarClasses = `w-full max-w-[1100px] rounded-full flex items-center justify-between py-2 px-3 pl-6 transition-all duration-300 ${
    scrolled
      ? 'bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-brand-border/50'
      : 'bg-white/70 backdrop-blur-md border border-white/50 shadow-nav'
  }`;

  return (
    <header className="fixed top-4 left-0 right-0 w-full flex justify-center z-50 px-4">
      <nav className={navbarClasses}>
        <Link to="/" className="flex items-center no-underline bg-brand-dark px-3.5 py-1.5 rounded-lg transition-all duration-300 hover:bg-brand-dark-hover shrink-0">
          <img
            src="https://www.goran.in/Assets/LOGO.png"
            alt="Synapse Logo"
            className="h-4.5 w-auto block"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-0.5 list-none">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <li key={link.label}>
                {link.hash ? (
                  <a
                    href={link.hash}
                    onClick={(e) => handleNavClick(e, link.to, link.hash)}
                    className={`no-underline font-medium text-sm py-2 px-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                      active
                        ? 'text-brand-dark bg-black/5'
                        : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                    }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    className={`no-underline font-medium text-sm py-2 px-3.5 rounded-full transition-all duration-300 ${
                      active
                        ? 'text-brand-dark bg-black/5'
                        : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden sm:inline-flex no-underline text-brand-text-muted font-medium text-sm transition-all duration-300 hover:text-brand-dark px-2"
          >
            Contact
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 no-underline bg-brand-dark text-white font-medium text-sm py-2 px-4 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-brand-dark-hover group"
          >
            Get Started
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-0.75"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-transparent border-none cursor-pointer text-brand-text-muted hover:text-brand-dark hover:bg-black/5 transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 w-[280px] h-full bg-white border-l border-brand-border shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-brand-border">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center no-underline bg-brand-dark px-3 py-1.5 rounded-lg"
              >
                <img
                  src="https://www.goran.in/Assets/LOGO.png"
                  alt="Synapse Logo"
                  className="h-4.5 w-auto block"
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-transparent border-none cursor-pointer text-brand-text-muted hover:text-brand-dark hover:bg-black/5 transition-all duration-200"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-3">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <div key={link.label} className="mb-1">
                    {link.hash ? (
                      <a
                        href={link.hash}
                        onClick={(e) => {
                          handleNavClick(e, link.to, link.hash);
                          setMobileOpen(false);
                        }}
                        className={`flex items-center no-underline font-medium text-sm py-3 px-4 rounded-xl transition-all duration-200 ${
                          active
                            ? 'text-brand-dark bg-brand-yellow/10'
                            : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                        }`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center no-underline font-medium text-sm py-3 px-4 rounded-xl transition-all duration-200 ${
                          active
                            ? 'text-brand-dark bg-brand-yellow/10'
                            : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-brand-border px-4 py-4">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 no-underline bg-brand-dark text-white font-semibold text-sm py-3 px-4 rounded-full transition-all duration-300 hover:bg-brand-dark-hover w-full"
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
