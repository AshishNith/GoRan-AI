import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useCalBooking } from './CalBookingModal';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Founder', to: '/founder' },
  { label: 'Our Process', to: '/process' },
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
          <div className="absolute top-0 right-0 w-[280px] h-full bg-white border-l border-brand-border shadow-xl flex flex-col">
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
