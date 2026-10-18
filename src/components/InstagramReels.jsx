import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { instagramReels } from '../data/instagramReels';

// Bright edge where the light from the top-left lands, shared with the other dark glass cards
const EDGE = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.08) 32%, rgba(255,255,255,0.05))',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
};

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Instagram's embed is a fixed layout: header, then the video centred in a wider white area, then the
// like row and caption. These are measured from the embed drawn at EMBED_W x EMBED_H, and let us cut
// the iframe down to just the video and scale it up to fill the frame.
const EMBED_W = 354;
const EMBED_H = 640;
const VIDEO_X = 52;
const VIDEO_Y = 55;
const VIDEO_W = 250;
const VIDEO_H = 445;

function ReelVideo({ reel, index }) {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const fit = () => frame.style.setProperty('--reel-scale', String(frame.clientWidth / VIDEO_W));
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="relative overflow-hidden rounded-[30px] bg-black" style={{ aspectRatio: `${VIDEO_W} / ${VIDEO_H}` }}>
      <iframe
        src={`https://www.instagram.com/reel/${reel.reelId}/embed`}
        className="absolute left-0 top-0 max-w-none border-0"
        style={{ width: EMBED_W, height: EMBED_H, transformOrigin: '0 0', transform: `scale(var(--reel-scale, 1)) translate(-${VIDEO_X}px, -${VIDEO_Y}px)` }}
        loading="lazy"
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title={`GoRan AI Instagram reel ${index + 1}`}
      />
    </div>
  );
}

// One reel in a phone frame. The row is straight; the middle one sits higher and each lifts on hover.
// The reel plays right here, so the frame leaves the embed fully clickable.
function ReelPhone({ reel, index, total }) {
  const middle = index === Math.floor(total / 2);

  return (
    <div className={`group relative shrink-0 w-[80vw] max-w-[360px] snap-center md:w-auto md:max-w-none transition-transform duration-500 ease-out md:hover:-translate-y-2 ${middle ? 'md:-translate-y-8 md:hover:-translate-y-10' : 'md:translate-y-4'}`}>
      <div aria-hidden className="absolute -inset-4 rounded-[52px] bg-brand-yellow/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-yellow/10" />
      <div className="relative rounded-[40px] bg-[#0d0f0f] p-3 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)]">
        <span aria-hidden className="absolute inset-0 rounded-[40px] p-px pointer-events-none" style={EDGE} />
        <ReelVideo reel={reel} index={index} />
      </div>
    </div>
  );
}

export default function InstagramReels() {
  return (
    <section className="py-12 md:py-16 bg-white" id="instagram">
      <div className="w-full max-w-[95vw] mx-auto">
        <div className="relative overflow-hidden rounded-[32px] bg-[#1c1c1c] text-white px-6 py-14 md:px-12 md:py-20">
          {/* Dot grid, a spotlight from the top-left and a warm glow, like the process panel */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 40% 45% at 0% 0%, rgba(255,255,255,0.12), transparent 70%), conic-gradient(from 90deg at 0% 0%, transparent 8deg, rgba(255,255,255,0.08) 40deg, transparent 72deg)',
              maskImage: 'radial-gradient(circle at 0% 0%, #000 0%, #000 25%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(circle at 0% 0%, #000 0%, #000 25%, transparent 90%)',
            }}
          />
          <div aria-hidden className="absolute bottom-[-180px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-yellow/[0.07] blur-[120px] pointer-events-none" />

          <div className="relative max-w-[1200px] mx-auto">
            {/* Heading on the left, the pitch and the follow link on the right */}
            <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-8 md:gap-16 md:items-end">
              <h2 className="m-0 font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-balance">
                GoRan AI <span className="text-brand-yellow">in action</span>
              </h2>
              <div className="md:pb-2">
                <p className="m-0 text-base md:text-lg leading-relaxed text-white/55">
                  See how we build, test and deploy autonomous AI calling agents and workflows. Play our latest reels right here.
                </p>
                <a
                  href="https://www.instagram.com/goran.dotin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/follow mt-5 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 pl-4 pr-2 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <InstagramIcon />
                  Follow @goran.dotin
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow text-brand-dark transition-transform duration-300 group-hover/follow:rotate-45">
                    <ArrowUpRight size={14} strokeWidth={2.4} />
                  </span>
                </a>
              </div>
            </div>

            {/* Reels: a straight row on desktop, a swipeable row on phones */}
            <div className="mt-14 md:mt-20 -mx-6 px-6 md:mx-0 md:px-0 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-12 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:items-start [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {instagramReels.map((reel, index) => (
                <ReelPhone key={reel.id} reel={reel} index={index} total={instagramReels.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
