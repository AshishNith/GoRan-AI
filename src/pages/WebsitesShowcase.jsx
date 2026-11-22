import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useCalBooking } from '../components/CalBookingModal';
import SEOHead from '../components/SEOHead';
import SitePreviewModal from '../components/SitePreviewModal';
import WebsiteCard from '../components/WebsiteCard';
import { buildBreadcrumbSchema } from '../seo/schemas';
import { websites, websiteCategories } from '../data/websites';

export default function WebsitesShowcase() {
  const { openCalBooking } = useCalBooking();
  const [activeFilter, setActiveFilter] = useState('All');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = websites.filter((site) => activeFilter === 'All' || site.category === activeFilter);
  const clientCount = websites.filter((site) => site.kind === 'client').length;

  return (
    <main className="relative w-full flex-1 overflow-hidden bg-white pb-24 pt-32 md:pt-36">
      <SEOHead
        title="Websites We Have Built | Web Design Portfolio — GoRan AI"
        description="Websites designed and built by GoRan AI: online stores, company sites, web apps and immersive 3D experiences. Open any of them live."
        canonicalPath="/services/websites"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Websites' },
        ])}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[4%] h-[460px] w-[460px] rounded-full bg-brand-yellow/10 blur-[130px]" />
        <div className="absolute right-[-8%] top-[30%] h-[420px] w-[420px] rounded-full bg-brand-yellow/5 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-10 border-b border-brand-border pb-10">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">Websites</span>
          </div>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h1 className="max-w-3xl font-heading text-4xl font-bold leading-[1.02] tracking-tight text-brand-dark sm:text-6xl md:text-7xl">
              Websites we have <span className="text-brand-yellow">designed and built.</span>
            </h1>
            <p className="max-w-xs shrink-0 border-l-2 border-brand-yellow py-1 pl-4 text-sm leading-relaxed text-brand-text-muted">
              Online stores, company sites, web apps and 3D experiences. Every one is live, so open it and try it yourself.
            </p>
          </div>

          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-6">
            {[
              [websites.length, 'Sites to explore'],
              [clientCount, 'Built for clients'],
              [websiteCategories.length - 1, 'Kinds of site'],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="m-0 font-heading text-3xl font-bold leading-none text-brand-dark md:text-4xl">{value}</dd>
                <dt className="mt-1.5 text-xs font-medium text-brand-text-muted">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1 rounded-xl border border-brand-border bg-brand-bg-light p-1" role="group" aria-label="Filter websites">
            {websiteCategories.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`cursor-pointer rounded-lg border-none px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive ? 'bg-brand-yellow text-brand-yellow-ink shadow-sm' : 'bg-transparent text-brand-text-muted hover:text-brand-dark'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <p className="m-0 text-sm text-brand-text-muted" aria-live="polite">
            Showing {filtered.length} of {websites.length}
          </p>
        </div>

        {/* Grid */}
        <div className="mb-24 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((site) => (
              <WebsiteCard key={site.id} site={site} onPreview={setPreview} />
            ))}
          </AnimatePresence>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-8 text-center text-white md:p-14"
          style={{ background: 'var(--glass-dark)' }}
        >
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-50%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-yellow opacity-25 blur-[120px]" />
          <div className="relative z-10 mx-auto max-w-xl">
            <h2 className="mb-4 font-heading text-3xl font-bold leading-tight md:text-4xl">Want a site like one of these?</h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
              Tell us what your business needs. We will design it, build it, and connect it to the AI agents that follow up with every visitor.
            </p>
            <button
              type="button"
              onClick={openCalBooking}
              className="inline-flex cursor-pointer items-center gap-2 rounded-btn border-none bg-brand-yellow px-7 py-3.5 text-sm font-semibold text-brand-yellow-ink transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-yellow-hover"
            >
              Book a Call <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </div>

      <SitePreviewModal site={preview} onClose={() => setPreview(null)} />
    </main>
  );
}
