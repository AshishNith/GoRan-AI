import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ChevronDown,
  Database,
  GraduationCap,
  LayoutTemplate,
  MessageCircle,
  Phone,
  ScanSearch,
  SquareKanban,
} from 'lucide-react';
import { useCalBooking } from './CalBookingModal';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Blog', to: '/blog' },
  { label: 'Founders', to: '/founder' },
  { label: 'Contact', to: '/contact' },
];

const serviceLinks = [
  { label: 'AI Audit', to: '/services/ai-audit', icon: ScanSearch, desc: 'Find where AI saves you the most' },
  { label: 'Product Development', to: '/services/product-development', icon: Boxes, desc: 'Custom AI products, built end to end' },
  { label: 'Product Management', to: '/services/product-management', icon: SquareKanban, desc: 'Roadmaps and delivery for AI products' },
  { label: 'AI Training', to: '/services/ai-training', icon: GraduationCap, desc: 'Get your team working with AI' },
  { label: 'Websites Showcase', to: '/services/websites', icon: LayoutTemplate, desc: 'Sites we have designed and shipped' },
];

const agentLinks = [
  { label: 'Calling Agent', to: '/agents/calling-agent', icon: Phone, desc: 'Answers and qualifies leads by phone' },
  { label: 'WhatsApp & Telegram Agent', to: '/agents/whatsapp-telegram-agent', icon: MessageCircle, desc: 'Replies and follows up in chat, 24/7' },
  { label: 'AI Powered CRM', to: '/agents/ai-powered-crm', icon: Database, desc: 'Every lead synced, scored and routed' },
];

const socials = [
  {
    label: 'X',
    href: 'https://x.com/goranai',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" /></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/107898890',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 10.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/goran.dotin/',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
];

// The dark glass look shared with the step and case study cards: spotlight from the top-left and
// a bright edge where the light lands
const DARK_GLASS = { background: 'var(--glass-dark)' };
const SPOTLIGHT = {
  background:
    'radial-gradient(ellipse 45% 50% at 0% 0%, rgba(255,255,255,0.32), transparent 70%), conic-gradient(from 90deg at 0% 0%, transparent 8deg, rgba(255,255,255,0.18) 40deg, transparent 72deg)',
  maskImage: 'radial-gradient(circle at 0% 0%, #000 0%, #000 25%, transparent 90%)',
  WebkitMaskImage: 'radial-gradient(circle at 0% 0%, #000 0%, #000 25%, transparent 90%)',
};
const EDGE = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.06))',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
};

function GlassLayers({ rounded = 'rounded-3xl' }) {
  return (
    <>
      <div aria-hidden className={`absolute inset-0 ${rounded} overflow-hidden pointer-events-none`}>
        <div className="absolute inset-0" style={SPOTLIGHT} />
      </div>
      <span aria-hidden className={`absolute inset-0 ${rounded} p-px pointer-events-none`} style={EDGE} />
    </>
  );
}

function ActiveDot() {
  return <span aria-hidden className="absolute left-1/2 -bottom-0.5 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-yellow shadow-[0_0_8px_rgb(var(--brand-accent-rgb)/0.95)]" />;
}

// One service or agent in the mega menu
function MenuItem({ item, active, onNavigate }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className={`group/item flex items-start gap-3 rounded-2xl p-3 no-underline transition-colors duration-200 ${active ? 'bg-white/[0.08]' : 'hover:bg-white/[0.06]'}`}
    >
      <span className={`flex w-9 h-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${active ? 'bg-brand-yellow border-brand-yellow text-brand-yellow-ink' : 'border-white/10 bg-white/[0.05] text-white group-hover/item:border-brand-yellow/60 group-hover/item:text-brand-yellow'}`}>
        <Icon size={16} strokeWidth={1.9} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-sm font-semibold text-white">
          {item.label}
          <ArrowUpRight size={13} className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-60 group-hover/item:translate-x-0" />
        </span>
        <span className="block text-xs leading-snug text-white/50 mt-0.5">{item.desc}</span>
      </span>
    </Link>
  );
}

function ServicesMenu({ pathname, onNavigate, onBook, onEnter, onLeave }) {
  return (
    <motion.div
      id="services-menu"
      role="region"
      aria-label="Services"
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute left-1/2 top-full mt-3 w-[min(860px,calc(100vw-2rem))] -translate-x-1/2 origin-top"
    >
      <div className="relative rounded-3xl text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]" style={DARK_GLASS}>
        <GlassLayers />
        <div className="relative grid grid-cols-[1fr_1fr_220px] gap-2 p-3">
          <div>
            <span className="block px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Core services</span>
            {serviceLinks.map((item) => (
              <MenuItem key={item.to} item={item} active={pathname === item.to} onNavigate={onNavigate} />
            ))}
          </div>
          <div>
            <span className="block px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">AI agents</span>
            {agentLinks.map((item) => (
              <MenuItem key={item.to} item={item} active={pathname === item.to} onNavigate={onNavigate} />
            ))}
          </div>
          {/* Call to action tile */}
          <div className="relative flex flex-col justify-between rounded-2xl bg-brand-yellow p-5 text-brand-yellow-ink overflow-hidden">
            <div aria-hidden className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/40 blur-2xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-yellow-ink/70">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow-ink" /> Not sure where to start?
              </span>
              <p className="m-0 mt-3 font-heading text-xl font-bold leading-tight">Tell us your workflow. We will map the agent.</p>
            </div>
            <button
              type="button"
              onClick={onBook}
              className="relative mt-6 inline-flex items-center justify-between gap-2 rounded-btn bg-brand-dark px-4 py-2.5 text-sm font-semibold text-white border-none cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
            >
              Book a Call <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Animated menu icon: two lines that fold into a cross
function MenuIcon({ open }) {
  return (
    <span aria-hidden className="relative block w-5 h-5">
      <span className={`absolute left-0.5 right-0.5 h-0.5 rounded-full bg-current transition-all duration-300 ${open ? 'top-[9px] rotate-45' : 'top-[6px]'}`} />
      <span className={`absolute left-0.5 right-0.5 h-0.5 rounded-full bg-current transition-all duration-300 ${open ? 'top-[9px] -rotate-45' : 'top-[12px]'}`} />
    </span>
  );
}

function MobileMenu({ pathname, isActive, isServicesActive, onClose, onBook }) {
  const [servicesOpen, setServicesOpen] = useState(isServicesActive);
  const stagger = (i) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] md:hidden text-white overflow-y-auto"
      style={DARK_GLASS}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={SPOTLIGHT} />
      <nav className="relative flex min-h-full flex-col px-6 pt-28 pb-8" aria-label="Mobile">
        <ul className="list-none m-0 p-0 flex flex-col gap-1">
          {navLinks.map((link, i) => {
            const active = isActive(link.to);
            return (
              <motion.li key={link.to} {...stagger(i)}>
                <Link
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center gap-3 py-2 no-underline font-heading text-3xl font-bold ${active ? 'text-brand-yellow' : 'text-white'}`}
                >
                  {link.label}
                  {active && <span className="w-2 h-2 rounded-full bg-brand-yellow shadow-[0_0_10px_rgb(var(--brand-accent-rgb)/0.95)]" />}
                </Link>
              </motion.li>
            );
          })}
          <motion.li {...stagger(navLinks.length)}>
            <button
              type="button"
              onClick={() => setServicesOpen((open) => !open)}
              aria-expanded={servicesOpen}
              className={`flex w-full items-center justify-between py-2 bg-transparent border-none cursor-pointer text-left font-heading text-3xl font-bold ${isServicesActive ? 'text-brand-yellow' : 'text-white'}`}
            >
              Services
              <ChevronDown size={24} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {servicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  {[['Core services', serviceLinks], ['AI agents', agentLinks]].map(([title, items]) => (
                    <div key={title} className="pt-3">
                      <span className="block pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{title}</span>
                      {items.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.to;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className={`flex items-center gap-3 rounded-xl px-2 py-2.5 no-underline text-sm font-medium ${active ? 'bg-white/[0.08] text-brand-yellow' : 'text-white/80'}`}
                          >
                            <span className={`flex w-8 h-8 shrink-0 items-center justify-center rounded-lg border ${active ? 'bg-brand-yellow border-brand-yellow text-brand-yellow-ink' : 'border-white/10 bg-white/[0.05]'}`}>
                              <Icon size={15} strokeWidth={1.9} />
                            </span>
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        </ul>

        <motion.div {...stagger(navLinks.length + 1)} className="mt-auto pt-10">
          <button
            type="button"
            onClick={onBook}
            className="flex w-full items-center justify-center gap-2 rounded-btn bg-brand-yellow py-3.5 text-sm font-semibold text-brand-yellow-ink border-none cursor-pointer"
          >
            Book a Call <ArrowRight size={15} />
          </button>
          <div className="mt-5 flex items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex w-10 h-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.div>
  );
}

export default function Header() {
  const location = useLocation();
  const { openCalBooking } = useCalBooking();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef(null);
  const closeTimer = useRef(0);

  // Close everything on navigation
  const [path, setPath] = useState(location.pathname);
  if (path !== location.pathname) {
    setPath(location.pathname);
    setMobileOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Tighten once the page moves; hide while scrolling down, come back on the way up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 80) setHidden(false);
      else if (Math.abs(y - last) > 6) setHidden(y > last);
      if (y > last && y > 80) setServicesOpen(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape and outside clicks close the services menu
  useEffect(() => {
    if (!servicesOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setServicesOpen(false); };
    const onDown = (e) => { if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [servicesOpen]);

  const isActive = (path) => location.pathname.startsWith(path);
  const isServicesActive = [...serviceLinks, ...agentLinks].some((s) => location.pathname.startsWith(s.to));

  // Hover opens the menu; a short grace period lets the pointer travel from button to panel
  const openServices = () => { window.clearTimeout(closeTimer.current); setServicesOpen(true); };
  const closeServicesSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };

  const book = () => {
    setServicesOpen(false);
    setMobileOpen(false);
    openCalBooking();
  };

  const linkClass = (active) => `relative z-10 block no-underline text-sm font-medium px-4 py-2 rounded-btn transition-colors duration-200 ${active ? 'text-brand-dark' : 'text-brand-text-muted hover:text-brand-dark'}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 ${mobileOpen ? 'z-[70]' : 'z-50'} flex justify-center px-3 md:px-4 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${hidden && !mobileOpen ? '-translate-y-[130%]' : 'translate-y-0'}`}
    >
      <div
        className={`relative z-50 flex w-full items-center justify-between gap-3 rounded-bar border transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          mobileOpen
            ? 'max-w-[1200px] border-white/10 bg-white/[0.04] pl-2 pr-2 py-2'
            : `${scrolled ? 'max-w-[1080px] py-1.5 shadow-[0_12px_40px_-12px_rgba(31,39,65,0.25)]' : 'max-w-[1200px] py-2 shadow-[0_6px_24px_-10px_rgba(31,39,65,0.12)]'} border-brand-border/80 bg-white/80 backdrop-blur-xl backdrop-saturate-150 pl-2 pr-2`
        }`}
      >
        {/* Logo */}
        <Link to="/" aria-label="GoRan AI home" className="flex shrink-0 items-center rounded-btn pl-2 no-underline">
          <img src="/Logo.png" alt="GoRan AI" className={`block w-auto rounded-xl transition-all duration-500 ${scrolled ? 'h-9' : 'h-10'}`} />
        </Link>

        {/* Desktop links, with a pill that slides to whichever link is under the pointer */}
        <nav aria-label="Main" className="hidden md:block" onMouseLeave={() => setHovered(null)}>
          <ul className="list-none m-0 p-0 flex items-center">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <li key={link.to} className="relative" onMouseEnter={() => setHovered(link.to)}>
                  {hovered === link.to && (
                    <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-btn bg-brand-dark/[0.05]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <Link to={link.to} aria-current={active ? 'page' : undefined} className={linkClass(active)}>
                    {link.label}
                    {active && <ActiveDot />}
                  </Link>
                </li>
              );
            })}
            {/* Not positioned, so the panel below centres on the whole bar rather than this item */}
            <li
              ref={servicesRef}
              onMouseEnter={() => { setHovered('services'); openServices(); }}
              onMouseLeave={closeServicesSoon}
            >
              <span className="relative block">
                {hovered === 'services' && (
                  <motion.span layoutId="nav-hover" className="absolute inset-0 rounded-btn bg-brand-dark/[0.05]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <button
                  type="button"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  className={`${linkClass(isServicesActive || servicesOpen)} inline-flex items-center gap-1 bg-transparent border-none cursor-pointer`}
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                  {isServicesActive && <ActiveDot />}
                </button>
              </span>
              <AnimatePresence>
                {servicesOpen && (
                  <ServicesMenu
                    pathname={location.pathname}
                    onNavigate={() => setServicesOpen(false)}
                    onBook={book}
                    onEnter={openServices}
                    onLeave={closeServicesSoon}
                  />
                )}
              </AnimatePresence>
            </li>
          </ul>
        </nav>

        {/* Call to action and mobile menu button */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={book}
            className="group hidden md:inline-flex items-center gap-2.5 rounded-btn bg-brand-dark py-2.5 pl-4 pr-2.5 text-sm font-semibold text-white border-none cursor-pointer shadow-[0_10px_22px_-8px_rgba(31,39,65,0.45)] transition-all duration-300 hover:bg-brand-dark-hover"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            Book a Call
            <span className="flex w-7 h-7 items-center justify-center rounded-[calc(var(--radius-btn)*0.75)] bg-brand-yellow text-brand-yellow-ink transition-transform duration-300 group-hover:rotate-[-45deg]">
              <ArrowRight size={14} strokeWidth={2.4} />
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`md:hidden flex w-11 h-11 items-center justify-center rounded-btn border-none cursor-pointer transition-colors duration-300 ${mobileOpen ? 'bg-brand-yellow text-brand-yellow-ink' : 'bg-brand-dark text-white'}`}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Portalled out of the header: its slide transform would otherwise clip a fixed overlay to the bar */}
      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <MobileMenu
              pathname={location.pathname}
              isActive={isActive}
              isServicesActive={isServicesActive}
              onClose={() => setMobileOpen(false)}
              onBook={book}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  );
}
