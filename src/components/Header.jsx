import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useCalBooking } from './CalBookingModal';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Blog', to: '/blog' },
  { label: 'Founder', to: '/founder' },
  { label: 'Contact', to: '/contact' },
];

const serviceLinks = [
  { label: 'AI Audit', to: '/services/ai-audit' },
  { label: 'Product Development', to: '/services/product-development' },
  { label: 'Product Management', to: '/services/product-management' },
  { label: 'AI Training', to: '/services/ai-training' },
];

const agentLinks = [
  { label: 'Calling Agent', to: '/agents/calling-agent' },
  { label: 'WhatsApp & Telegram Agent', to: '/agents/whatsapp-telegram-agent' },
  { label: 'AI Powered CRM', to: '/agents/ai-powered-crm' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { openCalBooking } = useCalBooking();

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

  const isServicesActive = serviceLinks.some((s) => location.pathname.startsWith(s.to)) || agentLinks.some((a) => location.pathname.startsWith(a.to));

  const navbarClasses = 'relative w-full max-w-[1200px] rounded-[20px] grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 md:px-6 transition-all duration-300 bg-transparent';

  return (
    <header className="fixed top-2 left-0 right-0 flex justify-center z-50 px-4">
      <nav className={navbarClasses}>
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/" className="flex items-center gap-2 no-underline rounded-full  px-3 py-1.5 transition-all duration-300 hover:border-brand-border">
            <img
              src="/Logo.png"
              alt="GoRan AI Logo"
              className="h-15 rounded-2xl w-auto block"
            />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center rounded-full bg-white border border-brand-border/80 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`no-underline font-medium text-sm py-2.5 px-4 rounded-full transition-all duration-300 ${
                    active
                      ? 'text-brand-dark bg-black/6'
                      : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/4'
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
                className={`inline-flex items-center gap-1 no-underline font-medium text-sm py-2.5 px-4 rounded-full transition-all duration-300 cursor-pointer border-none ${
                  isServicesActive
                    ? 'text-brand-dark bg-black/6'
                    : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/4'
                }`}
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-brand-border shadow-[0_18px_40px_rgba(15,23,42,0.12)] py-3 overflow-hidden z-50 animate-fadeIn">
                  <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-brand-text-muted/60 px-4 mb-1.5">Core Services</span>
                  {serviceLinks.map((s) => {
                    const active = location.pathname === s.to;
                    return (
                      <Link
                        key={s.to}
                        to={s.to}
                        onClick={() => setServicesOpen(false)}
                        className={`block no-underline text-xs py-2 px-4 transition-colors duration-150 ${
                          active
                            ? 'text-brand-dark bg-brand-yellow/10 font-semibold'
                            : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                        }`}
                      >
                        {s.label}
                      </Link>
                    );
                  })}
                  <div className="h-px bg-brand-border/60 my-2" />
                  <span className="block text-[9px] font-mono font-bold uppercase tracking-wider text-brand-text-muted/60 px-4 mb-1.5">Agent Solutions</span>
                  {agentLinks.map((a) => {
                    const active = location.pathname === a.to;
                    return (
                      <Link
                        key={a.to}
                        to={a.to}
                        onClick={() => setServicesOpen(false)}
                        className={`block no-underline text-xs py-2 px-4 transition-colors duration-150 ${
                          active
                            ? 'text-brand-dark bg-brand-yellow/10 font-semibold'
                            : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                        }`}
                      >
                        {a.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Get Started button right */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={openCalBooking}
            className="hidden md:inline-flex items-center gap-1.5 bg-brand-dark text-white font-semibold text-sm py-2.5 px-5 rounded-full shadow-[0_10px_22px_rgba(15,23,42,0.18)] transition-all duration-300 hover:bg-brand-dark-hover group border-none cursor-pointer"
          >
            Book a Call
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
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-transparent border-none cursor-pointer text-brand-text-muted hover:text-brand-dark hover:bg-black/6 transition-all duration-200"
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
          <div className="absolute top-0 right-0 w-70 max-w-[calc(100vw-1rem)] h-full bg-white border-l border-brand-border shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-brand-border">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center no-underline bg-brand-dark px-3 py-1.5 rounded-lg"
              >
                <img
                  src="/Logo.png"
                  alt="GoRan AI Logo"
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
                    <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-brand-text-muted/50 py-1.5 px-3">Core Services</span>
                    {serviceLinks.map((s) => {
                      const active = location.pathname === s.to;
                      return (
                        <Link
                          key={s.to}
                          to={s.to}
                          onClick={() => setMobileOpen(false)}
                          className={`block no-underline text-xs py-2 px-3 rounded-lg transition-colors duration-150 ${
                            active
                              ? 'text-brand-dark bg-brand-yellow/10 font-semibold'
                              : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                          }`}
                        >
                          {s.label}
                        </Link>
                      );
                    })}
                    <div className="h-px bg-brand-border/40 my-1.5" />
                    <span className="block text-[8px] font-mono font-bold uppercase tracking-wider text-brand-text-muted/50 py-1.5 px-3">Agent Solutions</span>
                    {agentLinks.map((a) => {
                      const active = location.pathname === a.to;
                      return (
                        <Link
                          key={a.to}
                          to={a.to}
                          onClick={() => setMobileOpen(false)}
                          className={`block no-underline text-xs py-2 px-3 rounded-lg transition-colors duration-150 ${
                            active
                              ? 'text-brand-dark bg-brand-yellow/10 font-semibold'
                              : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/3'
                          }`}
                        >
                          {a.label}
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
                  { label: 'X', href: 'https://x.com/goranai' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/107898890' },
                  { label: 'Instagram', href: 'https://www.instagram.com/goran.dotin/' },
                ].map((s) => {
                  const icons = {
                    X: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" /></svg>,
                    LinkedIn: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 10.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
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
