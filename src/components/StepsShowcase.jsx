import { useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
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

// One step's copy, with no card behind it: just a soft rectangular line round the text and a
// white glowing dot travelling along it (each step starts its dot at a different point).
function StepText({ step, index }) {
  const next = steps[index + 1];
  return (
    <div className="relative h-full flex flex-col rounded-3xl p-6 md:p-8">
      <div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none">
        <span className="absolute inset-0 rounded-3xl border border-brand-dark/[0.07] blur-[2px]" />
        <span className="absolute inset-0 rounded-3xl border border-brand-dark/[0.06]" />
        <span className="card-dot" style={{ animationDelay: `${-index * 3}s` }} />
      </div>

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-2 bg-brand-yellow text-brand-dark rounded-full pl-1 pr-3 py-1 text-xs font-bold uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-brand-dark text-brand-yellow flex items-center justify-center font-heading text-[11px]">{pad(index + 1)}</span>
          Step
        </span>
        <span className="font-mono text-xs text-brand-text-muted/70 tabular-nums">{pad(index + 1)} / {pad(steps.length)}</span>
      </div>

      <h3 className="relative font-heading font-bold leading-tight text-brand-dark m-0 text-2xl md:text-3xl mt-6">
        {step.title}
      </h3>
      <p className="relative text-brand-text-muted leading-relaxed m-0 mt-4 max-w-[500px] text-[0.95rem] md:text-base">
        {step.desc}
      </p>

      <ul className="relative list-none m-0 p-0 mt-6 mb-6 flex flex-col gap-3">
        {step.deliverables.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm font-semibold text-brand-dark">
            <span className="w-5 h-5 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shrink-0">
              <Check size={12} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="relative flex items-center gap-3 border-t border-brand-border mt-auto pt-5 text-sm">
        {next ? (
          <>
            <span className="text-brand-text-muted">Next</span>
            <ArrowRight size={14} className="text-brand-yellow" />
            <span className="font-semibold text-brand-dark">{next.title}</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-brand-dark">Your agent is live</span>
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
                  <VisualStage className="h-[240px] md:h-full md:min-h-[320px]">
                    <div className="w-full flex items-center justify-center md:scale-[1.2]">
                      <Visual />
                    </div>
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
  );
}
