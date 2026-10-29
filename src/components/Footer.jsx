import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useCalBooking } from './CalBookingModal';
import WhatsappIcon from './ui/WhatsappIcon';
import ScrollTopPill from './ui/footer';

const WHATSAPP = 'https://wa.me/919934225353?text=Hi%20GoRan%20AI,%20I\'d%20like%20to%20discuss%20an%20AI%20automation%20project%20for%20my%20business.';

const socialLinks = [
  { label: 'Email', href: 'mailto:goran.dotin@gmail.com' },
  { label: 'WhatsApp', href: WHATSAPP },
  { label: 'X', href: 'https://x.com/goranai' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/107898890' },
  { label: 'Instagram', href: 'https://www.instagram.com/goran.dotin/' },
  { label: 'Facebook', href: 'https://facebook.com/goranai' },
  { label: 'YouTube', href: 'https://youtube.com/@goranai' },
];

const socialIcons = {
  Email: <Mail size={20} strokeWidth={1.5} />,
  WhatsApp: <WhatsappIcon size={20} />,
  X: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" /></svg>,
  LinkedIn: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  Instagram: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Facebook: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  YouTube: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>,
};

const sections = [
  {
    name: 'Pages',
    items: [
      { name: 'About', href: '/about' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Blog', href: '/blog' },
      { name: 'Founders', href: '/founder' },
      { name: 'Our Process', href: '/process' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    name: 'Services',
    items: [
      { name: 'AI Audit', href: '/services/ai-audit' },
      { name: 'Product Development', href: '/services/product-development' },
      { name: 'Product Management', href: '/services/product-management' },
      { name: 'AI Training', href: '/services/ai-training' },
      { name: 'Websites Showcase', href: '/services/websites' },
    ],
  },
  {
    name: 'AI Agents',
    items: [
      { name: 'AI Calling Agent', href: '/agents/calling-agent' },
      { name: 'WhatsApp Agent', href: '/agents/whatsapp-telegram-agent' },
      { name: 'AI-Powered CRM', href: '/agents/ai-powered-crm' },
    ],
  },
];

// Dotted box with a little lift on hover, as in the reference footer
const socialBox = 'hover:-translate-y-1 border border-dotted border-brand-dark/30 rounded-xl p-2.5 text-brand-dark transition-all duration-200 hover:border-brand-dark hover:bg-brand-yellow/15';

export default function Footer() {
  const { openCalBooking } = useCalBooking();

  return (
    <footer className="mx-auto w-full border-t border-dotted border-brand-dark/25 bg-white px-2 text-brand-dark">
      {/* Logo and intro */}
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex">
        <Link to="/" className="flex shrink-0 items-center justify-center no-underline">
          <img src="/Logo.png" alt="GoRan AI — India's Leading AI Automation Agency" className="h-14 w-auto block" />
        </Link>
        <p className="m-0 bg-transparent text-center text-xs leading-5 text-brand-text-muted md:text-left">
          GoRan AI is India&rsquo;s leading AI automation agency. We build custom AI calling agents, voice agents, WhatsApp
          bots, AI-powered CRMs and autonomous business workflows, from startups to global enterprises. Every project is
          scoped with you first, built around your tools, and supported after launch, so the agent keeps working long
          after it goes live.
        </p>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-dotted border-brand-dark/25" />
        <div className="grid grid-cols-2 gap-8 py-10 leading-6 md:flex md:justify-between md:gap-6">
          {sections.map((section) => (
            <div key={section.name}>
              <h4 className="m-0 mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-text-muted/70">{section.name}</h4>
              <ul className="m-0 flex list-none flex-col space-y-2 p-0">
                {section.items.map((item) => (
                  <li key={item.name} className="flow-root">
                    <Link to={item.href} className="text-sm text-brand-text-muted no-underline transition-colors hover:text-brand-dark md:text-xs">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h4 className="m-0 mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-text-muted/70">Get in touch</h4>
            <p className="m-0 mb-4 max-w-[240px] text-sm leading-relaxed text-brand-text-muted md:text-xs">
              We reply within 24 hours. Book a scoping session to get your roadmap started.
            </p>
            <button
              type="button"
              onClick={openCalBooking}
              className="inline-flex items-center gap-2 rounded-btn border-none bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-brand-yellow-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-yellow-hover cursor-pointer md:text-xs"
            >
              Start a project
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="border-b border-dotted border-brand-dark/25" />
      </div>

      {/* Social links and back to top */}
      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              aria-label={s.label}
              href={s.href}
              target={s.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={socialBox}
            >
              {socialIcons[s.label]}
            </a>
          ))}
        </div>
        <div className="w-full">
          <ScrollTopPill />
        </div>
      </div>

      {/* Legal */}
      <div className="mx-auto mb-10 mt-10 flex flex-col items-center justify-between gap-2 text-center text-xs md:max-w-7xl">
        <div className="flex flex-row flex-wrap items-center justify-center gap-1 text-brand-text-muted">
          <span>&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span className="font-semibold text-brand-dark">GoRan AI Agency.</span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex items-center gap-3 text-brand-text-muted">
          <Link to="/privacy" className="no-underline transition-colors hover:text-brand-dark">Privacy</Link>
          <span aria-hidden="true">-</span>
          <Link to="/terms" className="no-underline transition-colors hover:text-brand-dark">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
