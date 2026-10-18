import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Bot,
  Check,
  Database,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  Sheet,
  Webhook,
} from 'lucide-react';
import ProcessHero from './ProcessHero';

gsap.registerPlugin(ScrollTrigger);

const YELLOW = '#F6C744';
const INK = '#171717';
const MUTED = '#737373';
const LINE = '#E5E5E5';

const inView = { once: true, margin: '-15% 0px' };

// --- Step 1 visual: the agent spec being signed off, line by line ---
const SPEC_ROWS = [
  ['Goal', 'Qualify every ad lead'],
  ['Data', 'Lead form + CRM'],
  ['Tools', 'WhatsApp, Sheets'],
  ['Success', 'Reply in under 60s'],
];

function SpecVisual() {
  return (
    <div className="w-[88%] max-w-[300px] bg-white border border-brand-border rounded-xl shadow-card-hover overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-brand-border">
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-brand-text-muted">
          <FileText size={12} /> agent-spec.md
        </span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ delay: 0.3 + SPEC_ROWS.length * 0.35, duration: 0.3 }}
          className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full"
        >
          Approved
        </motion.span>
      </div>
      <ul className="list-none m-0 p-0 divide-y divide-brand-border/60">
        {SPEC_ROWS.map(([label, value], idx) => (
          <li key={label} className="flex items-center gap-2.5 px-3.5 py-2.5 text-left">
            <motion.span
              initial={{ backgroundColor: '#FFFFFF', borderColor: LINE }}
              whileInView={{ backgroundColor: YELLOW, borderColor: YELLOW }}
              viewport={inView}
              transition={{ delay: 0.3 + idx * 0.35, duration: 0.25 }}
              className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inView}
                transition={{ delay: 0.35 + idx * 0.35, duration: 0.25 }}
                className="flex"
              >
                <Check size={10} strokeWidth={3} className="text-brand-dark" />
              </motion.span>
            </motion.span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted w-14 shrink-0">{label}</span>
            <span className="text-xs font-medium text-brand-dark truncate">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Step 2 visual: the agent at the centre, wired into the tools you already use ---
const CENTER = { x: 140, y: 104 };
const TOOLS = [
  { label: 'CRM', icon: Database, x: 244, y: 104 },
  { label: 'WhatsApp', icon: MessageCircle, x: 192, y: 32 },
  { label: 'Sheets', icon: Sheet, x: 88, y: 32 },
  { label: 'Gmail', icon: Mail, x: 36, y: 104 },
  { label: 'Calls', icon: Phone, x: 88, y: 176 },
  { label: 'APIs', icon: Webhook, x: 192, y: 176 },
];

function ConnectVisual() {
  return (
    <svg viewBox="0 0 280 214" className="w-full h-full max-w-[340px]" role="img" aria-label="The AI agent connected to CRM, WhatsApp, Sheets, Gmail, phone calls and APIs">
      {TOOLS.map((tool) => (
        <line key={`line-${tool.label}`} x1={CENTER.x} y1={CENTER.y} x2={tool.x} y2={tool.y} stroke={LINE} strokeWidth="1.5" strokeDasharray="3 4" />
      ))}

      {/* Data moving from each tool into the agent */}
      {TOOLS.map((tool, idx) => (
        <motion.circle
          key={`pulse-${tool.label}`}
          r="3"
          fill={YELLOW}
          initial={{ cx: tool.x, cy: tool.y, opacity: 0 }}
          animate={{ cx: [tool.x, CENTER.x], cy: [tool.y, CENTER.y], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, delay: idx * 0.5, ease: 'easeInOut' }}
        />
      ))}

      {TOOLS.map((tool, idx) => {
        const Icon = tool.icon;
        return (
          <motion.g
            key={tool.label}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ delay: 0.1 + idx * 0.08, duration: 0.35 }}
            style={{ transformOrigin: `${tool.x}px ${tool.y}px` }}
          >
            <rect x={tool.x - 17} y={tool.y - 17} width="34" height="34" rx="10" fill="#FFFFFF" stroke={LINE} strokeWidth="1" />
            <Icon x={tool.x - 8} y={tool.y - 8} width="16" height="16" color={INK} strokeWidth={1.75} />
            <text x={tool.x} y={tool.y + 29} textAnchor="middle" fontSize="8" fontWeight="600" fill={MUTED}>{tool.label}</text>
          </motion.g>
        );
      })}

      {/* The agent */}
      <motion.circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="30"
        fill="none"
        stroke={YELLOW}
        strokeWidth="1"
        animate={{ r: [26, 38], opacity: [0.7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
      <circle cx={CENTER.x} cy={CENTER.y} r="26" fill={YELLOW} />
      <Bot x={CENTER.x - 12} y={CENTER.y - 12} width="24" height="24" color={INK} strokeWidth={1.75} />
    </svg>
  );
}

// --- Step 3 visual: the live agent's dashboard ---
const BARS = [32, 44, 38, 56, 50, 64, 58, 72, 68, 80, 76, 92];
const LOG = ['Lead qualified · Hot', 'Synced to CRM', 'Follow-up sent on WhatsApp'];

function DeployVisual() {
  return (
    <div className="w-[88%] max-w-[300px] bg-white border border-brand-border rounded-xl shadow-card-hover p-3.5 text-left">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-brand-dark">Lead Qualifier Agent</span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      <div className="flex items-end gap-[3px] h-14 mt-3 border-b border-brand-border/60 pb-px">
        {BARS.map((height, idx) => (
          <motion.span
            key={idx}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={inView}
            transition={{ delay: 0.2 + idx * 0.05, duration: 0.4, ease: 'easeOut' }}
            className={`flex-1 rounded-t-[3px] origin-bottom ${idx === BARS.length - 1 ? 'bg-brand-yellow' : 'bg-brand-dark/10'}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <ul className="list-none m-0 p-0 mt-2.5 space-y-1.5">
        {LOG.map((line, idx) => (
          <motion.li
            key={line}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ delay: 0.9 + idx * 0.3, duration: 0.3 }}
            className="flex items-center gap-2 text-[11px] text-brand-dark"
          >
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Check size={9} strokeWidth={3} />
            </span>
            {line}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

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

const pad = (n) => String(n).padStart(2, '0');

// The dark text card for one step. Used by the pinned slider and the stacked cards.
function StepText({ step, index, compact = false }) {
  const next = steps[index + 1];
  return (
    <div className={`relative h-full bg-brand-dark text-white rounded-3xl overflow-hidden flex flex-col ${compact ? 'p-6' : 'p-8 xl:p-10'}`}>
      <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-brand-yellow/15 blur-[90px] pointer-events-none" />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-2 bg-brand-yellow text-brand-dark rounded-full pl-1 pr-3 py-1 text-xs font-bold uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-brand-dark text-brand-yellow flex items-center justify-center font-heading text-[11px]">{pad(index + 1)}</span>
          Step
        </span>
        <span className="font-mono text-xs text-white/40 tabular-nums">{pad(index + 1)} / {pad(steps.length)}</span>
      </div>

      <h3 className={`relative font-heading font-bold leading-tight text-white m-0 ${compact ? 'text-2xl mt-6' : 'text-3xl xl:text-[2.6rem] mt-8 xl:mt-10'}`}>
        {step.title}
      </h3>
      <p className={`relative text-white/60 leading-relaxed m-0 mt-4 max-w-[500px] ${compact ? 'text-[0.95rem]' : 'text-base xl:text-lg'}`}>
        {step.desc}
      </p>

      <ul className={`relative list-none m-0 p-0 mt-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5 ${compact ? 'pt-6' : 'pt-8'}`}>
        {step.deliverables.map((item) => (
          <li key={item} className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-2xl px-3.5 py-3 text-sm font-semibold text-white">
            <span className="w-5 h-5 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shrink-0">
              <Check size={12} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="relative flex items-center justify-between gap-4 border-t border-white/10 mt-6 pt-5 text-sm">
        {next ? (
          <>
            <span className="text-white/40">Next</span>
            <span className="flex items-center gap-2 font-semibold text-white">
              {next.title} <ArrowRight size={14} className="text-brand-yellow" />
            </span>
          </>
        ) : (
          <>
            <span className="text-white/40">Result</span>
            <span className="flex items-center gap-2 font-semibold text-brand-yellow">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Your agent is live
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// Light canvas the step graphics sit on
function VisualStage({ className = '', children }) {
  return (
    <div className={`steps-visual-bg relative bg-brand-bg-light border border-brand-border/70 rounded-3xl overflow-hidden flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

function StepsHeading({ className = '' }) {
  return (
    <div className={className}>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text-muted">Our process · 3 steps</span>
      <h3 className="text-2xl xl:text-3xl font-heading font-bold text-brand-dark leading-[1.1] mt-3 mb-0 text-balance">
        From blueprint to a <span className="text-brand-yellow">live agent</span>
      </h3>
    </div>
  );
}

// Phones, short screens and anyone who prefers reduced motion get the steps stacked
function StackedSteps() {
  return (
    <>
      <ProcessHero className="mb-12" />
      <StepsHeading className="mb-6 max-w-[620px] mx-auto" />
      <div className="grid grid-cols-1 gap-6 max-w-[620px] mx-auto">
        {steps.map((step, index) => {
          const Visual = step.visual;
          return (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col gap-2.5"
            >
              <VisualStage className="h-[250px]">
                <Visual />
              </VisualStage>
              <StepText step={step} index={index} compact />
            </motion.article>
          );
        })}
      </div>
    </>
  );
}

// Desktop: the section pins, scrolling slides the dark step cards sideways on the right,
// and the graphic on the left swaps to the step in front.
function PinnedSteps() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const segmentRefs = useRef([]);
  // `runs` counts how often each step has come to the front; it keys the graphic so its build-up replays
  const [{ active, runs }, setStage] = useState(() => ({ active: 0, runs: steps.map(() => 0) }));
  const lastIndex = steps.length - 1;

  useLayoutEffect(() => {
    const pinEl = pinRef.current;
    const track = trackRef.current;
    if (!pinEl || !track) return;

    const ctx = gsap.context(() => {
      // Slide until the last card sits where the first one started
      const distance = () => track.children[lastIndex].offsetLeft - track.children[0].offsetLeft;

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          id: 'steps-horizontal',
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${window.innerHeight * lastIndex}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          // This pin sits above the case-studies and testimonials pins, so it must be measured first
          refreshPriority: 1,
          onUpdate: (self) => {
            const position = self.progress * lastIndex;
            const next = Math.round(position);
            setStage((prev) => (prev.active === next ? prev : {
              active: next,
              runs: prev.runs.map((count, idx) => (idx === next ? count + 1 : count)),
            }));
            // Step 1's bar starts full; each later bar fills as its card slides in
            segmentRefs.current.forEach((bar, idx) => {
              if (bar) bar.style.transform = `scaleX(${Math.min(1, Math.max(0, position - idx + 1))})`;
            });
          },
        },
      });
    }, pinEl);
    // Pins further down may already exist (e.g. after a resize into the pinned layout); re-measure them
    // now that this pin's spacing is in the page
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [lastIndex]);

  return (
    <div ref={pinRef} className="h-screen flex flex-col pt-24 pb-8">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-end mb-8 shrink-0">
        <StepsHeading />
        {/* Progress: one bar per step */}
        <ol className="list-none m-0 p-0 grid grid-cols-3 gap-3" aria-label="Process progress">
          {steps.map((item, idx) => (
            <li key={item.title} aria-current={idx === active ? 'step' : undefined}>
              <div className="h-1 rounded-full bg-brand-border overflow-hidden">
                <div
                  ref={(el) => { segmentRefs.current[idx] = el; }}
                  className="h-full w-full bg-brand-yellow origin-left"
                  style={{ transform: `scaleX(${idx === 0 ? 1 : 0})` }}
                />
              </div>
              <div className={`mt-2.5 text-xs font-semibold transition-colors duration-300 ${idx === active ? 'text-brand-dark' : 'text-brand-text-muted/60'}`}>
                <span className="font-mono mr-1.5">{pad(idx + 1)}</span>{item.title}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        {/* Left: the graphic for the step in front. All three stay mounted and crossfade. */}
        <VisualStage>
          {steps.map((item, idx) => {
            const StepVisual = item.visual;
            const isActive = idx === active;
            return (
              <motion.div
                key={item.title}
                aria-hidden={!isActive}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : idx < active ? -40 : 40, scale: isActive ? 1 : 0.96 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-full flex items-center justify-center scale-[1.3] xl:scale-[1.45]">
                  <StepVisual key={runs[idx]} />
                </div>
              </motion.div>
            );
          })}
        </VisualStage>

        {/* Right: the dark step cards, moved sideways by the scroll */}
        <div className="min-h-0 overflow-hidden rounded-3xl">
          <div ref={trackRef} className="flex gap-6 h-full will-change-transform">
            {steps.map((item, idx) => (
              <article key={item.title} className="w-full h-full shrink-0">
                <StepText step={item} index={idx} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PIN_QUERY = '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

export default function StepsShowcase() {
  const [pinned, setPinned] = useState(() => typeof window !== 'undefined' && window.matchMedia(PIN_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(PIN_QUERY);
    const onChange = () => setPinned(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {pinned ? (
        <>
          <ProcessHero />
          <PinnedSteps />
        </>
      ) : <StackedSteps />}
    </MotionConfig>
  );
}
