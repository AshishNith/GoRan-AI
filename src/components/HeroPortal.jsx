import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlyphPortal from './ui/glyph-portal';
import { Button05 } from './ui/arrow-dots-button';

const HEADING_FACE = '"Outfit", "Arial Black", Arial, sans-serif';
const FALLBACK_FACE = '"Arial Black", Arial, sans-serif';
const WORD = 'AUTOPILOT';
const INK = '#111111';


const NOISE =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%%25\' height=\'100%%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

// Same size as the original headline: clamp(3rem, 17vw, 4.5rem) on phones, clamp(4.5rem, 11.5vw, 9rem) from md
function heroWordSize(width) {
  const clamp = (min, value, max) => Math.min(max, Math.max(min, value));
  return width >= 768 ? clamp(72, width * 0.115, 144) : clamp(48, width * 0.17, 72);
}

// The original hero card: video, noise, soft orbs and dot grid. It sits under the word and fades
// out just after the lettering turns white, so the hero ends on plain white.
function HeroBackdrop() {
  return (
    <div
      className="absolute left-[2.5vw] right-[2.5vw] top-20 md:top-24 -bottom-10 rounded-[28px] border border-brand-border overflow-hidden bg-gradient-to-b from-white via-white to-brand-bg-light"
      style={{ opacity: 'calc(1 - var(--hero-fade, 0))' }}
    >
      <video className="absolute inset-0 w-full h-full object-cover pointer-events-none" autoPlay loop muted playsInline>
        <source src="/Herobg_video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: NOISE, backgroundRepeat: 'repeat', backgroundSize: '256px 256px' }} />
      <div className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] rounded-full bg-brand-yellow/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-purple-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #111 0.5px, transparent 0.5px)', backgroundSize: '40px 40px', opacity: 0.04 }} />
    </div>
  );
}

// What the lettering is made of: black at rest, fading to white as the camera flies in, so the
// screen ends up white and the page carries straight on into the next section
function InkField() {
  return (
    <div className="absolute inset-0" style={{ background: INK }}>
      <div className="absolute inset-0 bg-white" style={{ opacity: 'var(--hero-white, 0)' }} />
    </div>
  );
}

const smoothstep = (from, to, value) => {
  const t = Math.min(1, Math.max(0, (value - from) / (to - from)));
  return t * t * (3 - 2 * t);
};

// The rest of the original opening frame: RUN ON above the word, the line and CTAs below it
function HeroFront({ onBook }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 text-center font-heading font-bold uppercase leading-none select-none text-[clamp(3rem,17vw,4.5rem)] md:text-[clamp(4.5rem,11.5vw,9rem)] bottom-[calc(100%-var(--gp-word-top,35%)+0.1em)]"
        style={{ color: INK }}
      >
        RUN ON
      </div>
      <div className="absolute inset-x-6 flex flex-col items-center top-[calc(var(--gp-word-bottom,60%)+40px)]">
        <p className="m-0 text-center text-brand-text-muted text-lg md:text-xl max-w-[600px] leading-relaxed">
          AI agents that run your business while you sleep
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Button05 label="Book a Call" onClick={onBook} className="min-w-[160px] sm:min-w-0" />
          <Button05 label="See Our Work" to="/case-studies" variant="light" className="min-w-[160px] sm:min-w-0" />
        </div>
      </div>
    </>
  );
}

// Hero: the original card and headline. The hero holds for one screen of scroll while the section
// passed as `after` (the client logos) scrolls up behind it. The camera flies into AUTOPILOT as the
// lettering turns white, the video card fades, then the hero clears to reveal what was behind.
export default function HeroPortal({ onBook, after }) {
  const [face, setFace] = useState(null);
  const wrapRef = useRef(null);

  // Called every scroll frame by the portal; drives the fades without React state: lettering to
  // white, then the video card, then the whole hero clears to show the section behind it
  const onProgress = useCallback((progress) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.setProperty('--hero-white', String(smoothstep(0.05, 0.35, progress)));
    wrap.style.setProperty('--hero-fade', String(smoothstep(0.15, 0.5, progress)));
    wrap.style.setProperty('--hero-clear', String(smoothstep(0.4, 0.8, progress)));
  }, []);

  // The portal measures the letter shapes on mount, so wait for the heading font first
  useEffect(() => {
    let settled = false;
    const finish = (value) => {
      if (!settled) {
        settled = true;
        setFace(value);
      }
    };
    const timeout = window.setTimeout(() => finish(FALLBACK_FACE), 1600);
    document.fonts
      .load(`700 100px "Outfit"`, WORD)
      .then((faces) => finish(faces.length ? HEADING_FACE : FALLBACK_FACE), () => finish(FALLBACK_FACE));
    return () => {
      settled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  // The portal changes height once it measures; re-measure the scroll-driven sections below it
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let timer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={wrapRef} id="hero" className="hero-portal relative bg-white">
      <h1 className="sr-only">GoRan AI — India's Leading AI Agency for Calling Agents, Voice Agents, WhatsApp Agents & Business Automation</h1>
      {face ? (
        <GlyphPortal
          word={WORD}
          fontFamily={face}
          fontWeight={700}
          wordSize={heroWordSize}
          centerY={0.58}
          interactive={false}
          scrollLength={1}
          enterLabel="Continue"
          onProgress={onProgress}
          backdrop={<HeroBackdrop />}
          background={<InkField />}
          front={<HeroFront onBook={onBook} />}
          style={{ '--gp-paper': '#FFFFFF', '--gp-ink': INK, '--gp-field': INK, '--gp-foreground': INK, fontFamily: 'var(--font-body)' }}
        >
          <span className="sr-only">AI agents that run your business while you sleep</span>
        </GlyphPortal>
      ) : (
        <div className="relative h-svh" aria-hidden="true">
          <HeroBackdrop />
        </div>
      )}
      {after && <div className="hero-after relative z-0">{after}</div>}
    </div>
  );
}
