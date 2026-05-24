import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useCalBooking } from './CalBookingModal';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Founder', to: '/founder' },
  { label: 'Our Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
];

const serviceLinks = [
  { label: 'AI Audit', to: '/services/ai-audit' },
  { label: 'Product Development', to: '/services/product-development' },
  { label: 'Product Management', to: '/services/product-management' },
  { label: 'AI Training', to: '/services/ai-training' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { openCalBooking } = useCalBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isServicesActive = serviceLinks.some((s) => location.pathname.startsWith(s.to));

  const navbarClasses = `relative w-full max-w-[1100px] rounded-full flex items-center py-2 px-3 pl-6 transition-all duration-300 ${
    scrolled
      ? 'bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-brand-border/50'
      : 'bg-white/70 backdrop-blur-md border border-white/50 shadow-nav'
  }`;

  return (
    <header className="fixed top-4 left-0 right-0 w-full flex justify-center z-50 px-4">
      <nav className={navbarClasses}>
        <Link to="/" className="flex items-center no-underline bg-brand-dark px-3.5 py-1.5 rounded-lg transition-all duration-300 hover:bg-brand-dark-hover shrink-0">
          <img
            src="/Logo.png"
            alt="Synapse Logo"
            className="h-4.5 w-auto block"
          />
        </Link>

        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`no-underline font-medium text-sm py-2 px-3.5 rounded-full transition-all duration-300 ${
                  active
                    ? 'text-brand-dark bg-black/5'
                    : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`inline-flex items-center gap-1 no-underline font-medium text-sm py-2 px-3.5 rounded-full transition-all duration-300 cursor-pointer border-none ${
                isServicesActive
                  ? 'text-brand-dark bg-black/5'
                  : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
              }`}
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl border border-brand-border shadow-lg py-2 overflow-hidden">
                {serviceLinks.map((s) => {
                  const active = location.pathname === s.to;
                  return (
                    <Link
                      key={s.to}
                      to={s.to}
                      onClick={() => setServicesOpen(false)}
                      className={`block no-underline text-sm py-2.5 px-4 transition-colors duration-150 ${
                        active
                          ? 'text-brand-dark bg-brand-yellow/10 font-semibold'
                          : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                      }`}
                    >
                      {s.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Get Started button right */}
        <button
          onClick={openCalBooking}
          className="hidden md:inline-flex items-center gap-1.5 bg-brand-dark text-white font-medium text-sm py-2 px-4 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-brand-dark-hover group ml-auto border-none cursor-pointer"
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
        </button>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-transparent border-none cursor-pointer text-brand-text-muted hover:text-brand-dark hover:bg-black/5 transition-all duration-200"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 w-70 h-full bg-white border-l border-brand-border shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-brand-border">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center no-underline bg-brand-dark px-3 py-1.5 rounded-lg"
              >
                <img
                  src="/Logo.png"
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
                  </div>
                );
              })}

              {/* Mobile Services Accordion */}
              <div className="mb-1">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`flex items-center justify-between w-full no-underline font-medium text-sm py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer border-none text-left ${
                    isServicesActive
                      ? 'text-brand-dark bg-brand-yellow/10'
                      : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                  }`}
                >
                  Services
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-brand-border pl-3">
                    {serviceLinks.map((s) => {
                      const active = location.pathname === s.to;
                      return (
                        <Link
                          key={s.to}
                          to={s.to}
                          onClick={() => setMobileOpen(false)}
                          className={`block no-underline text-sm py-2.5 px-3 rounded-lg transition-colors duration-150 ${
                            active
                              ? 'text-brand-dark bg-brand-yellow/10 font-semibold'
                              : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                          }`}
                        >
                          {s.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="border-t border-brand-border px-4 py-4">
              {/* Social links */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {[
                  { label: 'X', href: 'https://x.com/synapseai' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/company/synapseai' },
                  { label: 'GitHub', href: 'https://github.com/synapseai' },
                  { label: 'Instagram', href: 'https://instagram.com/synapseai' },
                ].map((s) => {
                  const icons = {
                    X: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" /></svg>,
                    LinkedIn: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                    GitHub: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
                    Instagram: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                  };
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl border border-brand-border flex items-center justify-center text-brand-text-muted hover:text-brand-dark hover:bg-black/3 hover:border-brand-text-muted/40 transition-all"
                      title={s.label}
                    >
                      {icons[s.label]}
                    </a>
                  );
                })}
              </div>
              <button
                onClick={() => { openCalBooking(); setMobileOpen(false); }}
                className="flex items-center justify-center gap-2 bg-brand-dark text-white font-semibold text-sm py-3 px-4 rounded-full transition-all duration-300 hover:bg-brand-dark-hover w-full border-none cursor-pointer"
              >
                Get Started
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
