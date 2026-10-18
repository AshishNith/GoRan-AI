import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { BlueprintIllustration, ConnectIllustration, LaunchIllustration } from './ProcessIllustrations';

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n).padStart(2, '0');

const steps = [
  {
    tag: 'Blueprint',
    title: 'Scope & Architecture',
    desc: 'We turn your goals into a clear agent spec. Every integration, data source and success metric is written down before we build.',
    deliverables: ['Agent spec', 'Data map', 'Success metrics'],
    art: BlueprintIllustration,
  },
  {
    tag: 'Integration',
    title: 'Connect & Integrate',
    desc: 'We connect custom LLMs and RAG engines to the tools you already run: CRMs, databases, messaging and APIs.',
    deliverables: ['CRM & APIs', 'LLM + RAG', 'Secure access'],
    art: ConnectIllustration,
  },
  {
    tag: 'Go live',
    title: 'Deploy & Support',
    desc: 'You test it in a sandbox and we iterate on your feedback. Then it goes live with monitoring, alerts and ongoing tuning.',
    deliverables: ['Sandbox testing', 'Monitoring', 'Ongoing tuning'],
    art: LaunchIllustration,
  },
];

// Desktop: the cards climb like steps. Each sits RISE px higher than the one before it, and the path
// runs through a node NODE_GAP px above each card's top edge.
const RISE = 64;
const NODE_GAP = 36;
const LAST = steps.length - 1;
const cardOffset = (index) => (LAST - index) * RISE;
const nodeY = (index) => cardOffset(index) + NODE_GAP;
const nodeX = (index) => ((index + 0.5) / steps.length) * 1000;
const PATH_HEIGHT = cardOffset(0) + NODE_GAP * 2;

// A stepped line: flat into each node, then an S-bend up to the next
function stepPath() {
  const points = steps.map((_, idx) => [nodeX(idx), nodeY(idx)]);
  let d = `M0 ${points[0][1]} L${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const mid = (x0 + x1) / 2;
    d += ` C${mid} ${y0} ${mid} ${y1} ${x1} ${y1}`;
  }
  return `${d} L1000 ${points[LAST][1]}`;
}
const STEP_PATH = stepPath();

function Path({ className = '' }) {
  return (
    <svg viewBox={`0 0 1000 ${PATH_HEIGHT}`} preserveAspectRatio="none" className={`absolute inset-x-0 top-0 w-full overflow-visible ${className}`} style={{ height: PATH_HEIGHT }} aria-hidden="true">
      <path d={STEP_PATH} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function StepCard({ step, index }) {
  const Art = step.art;
  return (
    <article data-card className="flex h-full flex-col rounded-3xl border border-white/[0.07] bg-[#262626] p-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold text-brand-yellow">{pad(index + 1)}</span>
        <span className="h-px w-6 bg-white/15" />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">{step.tag}</span>
      </div>
      <h3 className="m-0 mt-4 font-heading text-xl md:text-2xl font-bold text-white">{step.title}</h3>
      <p className="m-0 mt-3 text-sm md:text-[0.95rem] leading-relaxed text-white/55">{step.desc}</p>

      <div
        className="relative mt-6 h-[170px] md:h-[180px] rounded-2xl bg-[#202020] overflow-hidden flex items-center justify-center p-3"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      >
        <Art />
      </div>
    </article>
  );
}

// Process section: a dark panel where the three steps climb from blueprint to a live agent. Scrolling
// draws the stepped path up through them and each node lights up as the line reaches it.
export default function StepsShowcase() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fill = root.querySelector('[data-path-fill]');
    const nodes = Array.from(root.querySelectorAll('[data-node]'));
    const cards = Array.from(root.querySelectorAll('[data-card]'));

    const draw = (progress) => {
      fill.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
      nodes.forEach((node, idx) => { node.dataset.active = String(progress * 1000 >= nodeX(idx) - 20); });
    };

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const state = { p: 0 };
      draw(0);
      gsap.to(state, {
        p: 1,
        ease: 'none',
        onUpdate: () => draw(state.p),
        scrollTrigger: { trigger: root.querySelector('[data-steps]'), start: 'top 80%', end: 'top 30%', scrub: 0.5 },
      });
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: root.querySelector('[data-steps]'), start: 'top 75%', once: true },
      });
    });

    // Phones and reduced motion: the path is drawn in full and every node is lit
    mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => draw(1));

    return () => mm.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={rootRef} className="relative overflow-hidden rounded-[32px] bg-[#1c1c1c] text-white px-6 py-14 md:px-12 md:py-20">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div aria-hidden className="absolute -top-40 right-[-10%] w-[520px] h-[520px] rounded-full bg-brand-yellow/[0.06] blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto">
          {/* Heading on the left, the pitch and the full roadmap link on the right */}
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-8 md:gap-16 md:items-end">
            <div>
              <h2 className="m-0 font-heading font-bold text-4xl md:text-6xl leading-[1.05] tracking-tight text-balance">
                From blueprint to a <span className="text-brand-yellow">live agent</span>
              </h2>
            </div>
            <div className="md:pb-2">
              <p className="m-0 text-base md:text-lg leading-relaxed text-white/55">
                Three steps, one team. We handle the complexity, keep it secure, and stay with you after launch.
              </p>
              <Link
                to="/process"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white no-underline group"
              >
                See the full 6-step roadmap
                <span className="flex w-7 h-7 items-center justify-center rounded-full bg-brand-yellow text-brand-dark transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>

          {/* The steps climb to the right, joined by a stepped path through a node above each card */}
          <div data-steps className="relative mt-14 md:mt-16">
            <div className="hidden md:block" aria-hidden="true">
              <Path className="text-white/15" />
              <div data-path-fill className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 0)' }}>
                <Path className="text-brand-yellow/80" />
              </div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:items-start">
              {steps.map((step, idx) => (
                <div key={step.title} className="relative md:pt-[var(--step-top)]" style={{ '--step-top': `${cardOffset(idx) + NODE_GAP * 2}px` }}>
                  <span
                    data-node
                    data-active="true"
                    aria-hidden="true"
                    className="group/node absolute left-1/2 hidden md:flex w-10 h-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#1c1c1c] transition-colors duration-500 data-[active=true]:border-brand-yellow/40"
                    style={{ top: nodeY(idx) }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40 transition-all duration-500 group-data-[active=true]/node:bg-brand-yellow group-data-[active=true]/node:shadow-[0_0_14px_rgba(246,199,68,0.95)]" />
                  </span>
                  <StepCard step={step} index={idx} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
