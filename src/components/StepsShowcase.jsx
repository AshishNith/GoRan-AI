import { useLayoutEffect, useRef } from 'react';
import { MotionConfig } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ConnectVisual, DeployVisual, SpecVisual, VisualStage } from './StepVisuals';

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, '0');

const steps = [
  {
    title: 'Scope & Architecture',
    desc: 'We turn your goals into a clear agent spec. Every integration, data source and success metric is written down before we build, so there are no surprises later.',
    deliverables: ['Agent spec', 'Data map', 'Success metrics'],
    visual: SpecVisual,
  },
  {
    title: 'Connect & Integrate',
    desc: 'We connect custom LLMs and RAG engines to the tools you already run: CRMs, databases, messaging and APIs. The agent works inside your stack, not beside it.',
    deliverables: ['CRM & APIs', 'LLM + RAG', 'Secure access'],
    visual: ConnectVisual,
  },
  {
    title: 'Deploy & Support',
    desc: 'You test it in a sandbox first and we iterate on your feedback. Then it goes live with monitoring, alerts and ongoing tuning.',
    deliverables: ['Sandbox testing', 'Monitoring', 'Ongoing tuning'],
    visual: DeployVisual,
  },
];

// One step as a dark glass card: a spotlight from the top-left, hairline frame lines that cross the
// card, and a white dot riding them (each card starts its dot at a different point). The title,
// a one-line label and the description sit centred in the middle.
function StepText({ step, index }) {
  return (
    <div
      className="relative h-full min-h-[280px] flex flex-col items-center justify-center text-center rounded-2xl px-10 py-14 md:px-14 text-white"
      style={{ background: 'linear-gradient(135deg, #1c1f1f 0%, #0d0f0f 55%, #0b0c0c 100%)' }}
    >
      <div aria-hidden className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 45% 50% at 0% 0%, rgba(255,255,255,0.5), transparent 70%), conic-gradient(from 90deg at 0% 0%, transparent 8deg, rgba(255,255,255,0.34) 40deg, transparent 72deg)',
            maskImage: 'radial-gradient(circle at 0% 0%, #000 0%, #000 25%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle at 0% 0%, #000 0%, #000 25%, transparent 90%)',
          }}
        />
        <span className="absolute inset-x-0 top-[22px] h-px bg-gradient-to-r from-white/45 via-white/15 to-white/10" />
        <span className="absolute inset-x-0 bottom-[22px] h-px bg-gradient-to-r from-white/15 to-white/10" />
        <span className="absolute inset-y-0 left-[26px] w-px bg-gradient-to-b from-white/45 via-white/15 to-white/10" />
        <span className="absolute inset-y-0 right-[26px] w-px bg-gradient-to-b from-white/15 to-white/10" />
      </div>
      {/* Edge of the card, brightest where the light lands */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none p-px"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.06))',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />
      <span aria-hidden className="card-dot pointer-events-none" style={{ animationDelay: `${-index * 3.3}s` }} />

      <h3 className="relative font-heading font-bold leading-tight m-0 text-3xl md:text-4xl bg-gradient-to-r from-white to-brand-yellow bg-clip-text text-transparent">
        {step.title}
      </h3>
      <p className="relative m-0 mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
        {step.deliverables.join(' · ')}
      </p>
      <p className="relative m-0 mt-5 max-w-[420px] text-sm md:text-[0.95rem] leading-relaxed text-white/55">
        {step.desc}
      </p>
    </div>
  );
}

function StepsHeading({ className = '' }) {
  return (
    <div className={className}>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text-muted">Our process · 3 steps</span>
      <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.1] mt-3 mb-0 text-balance">
        From blueprint to a <span className="text-brand-yellow">live agent</span>
      </h2>
      <p className="text-brand-text-muted text-base leading-relaxed max-w-[460px] mx-auto mt-4 mb-0">
        From the first blueprint to a live agent, we handle the complexity and keep it secure.
      </p>
    </div>
  );
}

// Scroll timeline: a yellow line draws down the middle as you scroll, each step lights up when the
// line reaches it, and its graphic and card slide in. Phones keep the line on the left edge.
export default function StepsShowcase() {
  const rootRef = useRef(null);
  const railRef = useRef(null);
  const fillRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // The line fills from the top to the bottom of the rail as the section scrolls past
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top 55%',
            end: 'bottom 55%',
            scrub: 0.4,
          },
        },
      );

      root.querySelectorAll('[data-step]').forEach((row) => {
        // The step lights up once the line has reached its dot
        ScrollTrigger.create({
          trigger: row,
          start: 'top 55%',
          onEnter: () => { row.dataset.active = 'true'; },
          onLeaveBack: () => { row.dataset.active = 'false'; },
        });

        gsap.from(row.querySelectorAll('[data-reveal]'), {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        });
      });
    });

    // Reduced motion: the line is drawn in full and every step is already lit
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(fillRef.current, { scaleY: 1 });
      root.querySelectorAll('[data-step]').forEach((row) => { row.dataset.active = 'true'; });
    });

    return () => mm.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div ref={rootRef}>
      <StepsHeading className="text-center mb-12 md:mb-16" />

      <div className="relative max-w-[1080px] mx-auto">
        {/* The rail: grey track with the yellow line drawn over it */}
        <div ref={railRef} aria-hidden className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-0.5 bg-brand-border rounded-full">
          <div ref={fillRef} className="absolute inset-0 bg-brand-yellow rounded-full origin-top" style={{ transform: 'scaleY(0)' }} />
        </div>

        <ol className="list-none m-0 p-0 flex flex-col gap-14 md:gap-24">
          {steps.map((step, index) => {
            const Visual = step.visual;
            const flip = index % 2 === 1;
            return (
              <li
                key={step.title}
                data-step
                data-active="false"
                className="group/step relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-x-24 md:items-stretch"
              >
                {/* The dot on the rail */}
                <span
                  aria-hidden
                  className="absolute left-5 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white border-2 border-brand-border text-brand-text-muted flex items-center justify-center font-heading text-sm font-bold transition-all duration-500 group-data-[active=true]/step:bg-brand-yellow group-data-[active=true]/step:border-brand-yellow group-data-[active=true]/step:text-brand-dark group-data-[active=true]/step:scale-110 group-data-[active=true]/step:shadow-[0_0_0_8px_rgba(246,199,68,0.2)]"
                >
                  {pad(index + 1)}
                </span>

                <div data-reveal className={`${flip ? 'md:order-2' : ''} mb-3 md:mb-0`}>
                  <VisualStage className="h-[350px] md:h-full md:min-h-[340px]">
                    <Visual />
                  </VisualStage>
                </div>

                <div data-reveal className={flip ? 'md:order-1' : ''}>
                  <StepText step={step} index={index} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
    </MotionConfig>
  );
}
