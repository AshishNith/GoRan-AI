import { useEffect } from 'react';
import { ExternalLink, Lock, X } from 'lucide-react';

// A live site opened inside a browser-style window, used by the Websites Showcase and Case Studies.
// `site` is { name, url } or null when closed.
export default function SitePreviewModal({ site, onClose }) {
  useEffect(() => {
    if (!site) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [site, onClose]);

  if (!site) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-8 bg-brand-dark/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name} live preview`}
      onClick={onClose}
      data-lenis-prevent
    >
      <div
        className="w-full h-full max-w-6xl max-h-[88vh] rounded-2xl overflow-hidden flex flex-col border border-white/10 shadow-2xl"
        style={{ background: 'var(--glass-dark)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser bar */}
        <div className="px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 border-b border-white/10 select-none">
          <div className="hidden sm:flex items-center gap-1.5 shrink-0" aria-hidden>
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>

          <div className="flex min-w-0 flex-1 sm:flex-none sm:w-full sm:max-w-lg items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1.5 px-4 text-xs text-white/60">
            <Lock size={11} className="shrink-0 text-emerald-400" />
            <span className="truncate">{site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-btn bg-brand-yellow hover:bg-brand-yellow-hover px-3 py-1.5 text-xs font-semibold text-brand-yellow-ink no-underline transition-colors"
            >
              <ExternalLink size={12} />
              <span className="hidden sm:inline">Open site</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="inline-flex items-center gap-1.5 rounded-btn border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white cursor-pointer transition-colors"
            >
              <X size={12} />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        <iframe
          src={site.url}
          title={`${site.name} live preview`}
          className="w-full flex-1 border-none bg-white"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
