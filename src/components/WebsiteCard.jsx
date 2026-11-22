import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { websiteKinds } from '../data/websites';

// One website from src/data/websites.js: its screenshot, what it is, and ways to open it.
// Clicking the screenshot calls onPreview(site) to open the live site in a preview window.
export default function WebsiteCard({ site, onPreview }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-brand-border bg-[#FEFEFE] transition-[border-color,box-shadow] duration-300 hover:border-brand-yellow/50 hover:shadow-card-hover"
    >
      <button
        type="button"
        onClick={() => onPreview(site)}
        aria-label={`Preview ${site.name}`}
        className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden border-0 border-b border-solid border-brand-border bg-brand-tint p-0"
      >
        <img
          src={site.image}
          alt={`${site.name} website`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          <span className={`h-1.5 w-1.5 rounded-full ${site.kind === 'client' ? 'bg-emerald-400' : 'bg-[#AEBBF5]'}`} />
          {websiteKinds[site.kind]}
        </span>
        <span className="absolute inset-0 flex items-center justify-center bg-brand-dark/0 opacity-0 transition-all duration-300 group-hover:bg-brand-dark/35 group-hover:opacity-100 group-focus-visible:bg-brand-dark/35 group-focus-visible:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-btn bg-white px-4 py-2 text-sm font-semibold text-brand-dark shadow-lg">
            Preview <ArrowRight size={14} />
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="shrink-0 rounded-md bg-brand-tint px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-text-muted">
            {site.category}
          </span>
          <span className="truncate text-xs font-semibold text-brand-yellow">{site.highlight}</span>
        </div>

        <h3 className="mb-2 font-heading text-xl font-bold leading-tight text-brand-dark">{site.name}</h3>
        <p className="mb-5 text-sm leading-relaxed text-brand-text-muted">{site.desc}</p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {site.tech.map((t) => (
            <span key={t} className="rounded-md border border-brand-border bg-white px-2 py-0.5 text-[11px] font-medium text-brand-text-muted">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-brand-border pt-4">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark no-underline transition-colors hover:text-brand-yellow"
          >
            Visit site <ExternalLink size={13} />
          </a>
          {site.extra && (
            <a
              href={site.extra.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow no-underline transition-colors hover:text-brand-yellow-hover"
            >
              {site.extra.label} <ArrowUpRight size={14} />
            </a>
          )}
          {site.caseStudy && (
            <Link
              to={`/case-studies/${site.caseStudy}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow no-underline transition-colors hover:text-brand-yellow-hover"
            >
              Case study <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
