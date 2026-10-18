import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { Bot, Database, Mail, MessageCircle, Phone, Sheet, Webhook } from 'lucide-react';

// Motion graphics for the three process steps. They are drawn for the dark glass look of the step
// cards: soft white linework, one yellow accent, and glows. Everything loops on its own.

const YELLOW = '#F6C744';
const FAINT = 'rgba(255,255,255,0.2)';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

// Fades and draws an element from `from` to `to` between `start` and `start + dur` seconds of a
// `loop`-second cycle, holds it, then eases back so the next cycle starts clean.
function beat(loop, start, dur, props, ease = 'easeInOut') {
  const t0 = start / loop;
  const t1 = (start + dur) / loop;
  const initial = {};
  const animateTo = {};
  Object.entries(props).forEach(([key, [from, to]]) => {
    initial[key] = from;
    animateTo[key] = [from, from, to, to, from];
  });
  return { initial, animate: animateTo, transition: { duration: loop, times: [0, t0, t1, 0.92, 1], repeat: Infinity, ease } };
}

// Dark glass canvas the graphics sit on: faint grid, a spotlight from the top-right, bright edge
export function VisualStage({ className = '', children }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden flex items-center justify-center ${className}`}
      style={{ background: 'linear-gradient(225deg, #1c1f1f 0%, #0d0f0f 55%, #0b0c0c 100%)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 50% at 100% 0%, rgba(255,255,255,0.4), transparent 70%), conic-gradient(from 180deg at 100% 0%, transparent 8deg, rgba(255,255,255,0.24) 40deg, transparent 72deg)',
          maskImage: 'radial-gradient(circle at 100% 0%, #000 0%, #000 25%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at 100% 0%, #000 0%, #000 25%, transparent 90%)',
        }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none p-px"
        style={{
          background: 'linear-gradient(225deg, rgba(255,255,255,0.75), rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.06))',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-6">{children}</div>
    </div>
  );
}

// --- Step 1: the blueprint draws itself, the spec gets ticked off, then it is signed off ---
const SPEC_LOOP = 9;
const SPEC_NODES = [
  { x: 24, name: 'Lead form', sub: 'Ads · Website', label: 'INPUT', start: 0.5, agent: false },
  { x: 124, name: 'AI agent', sub: 'Qualifies', label: 'AGENT', start: 1.7, agent: true },
  { x: 224, name: 'CRM', sub: 'Synced', label: 'OUTPUT', start: 2.9, agent: false },
];
const SPEC_CHIPS = ['Goal', 'Data', 'Tools', 'Success'];

export function SpecVisual() {
  const marks = [
    'M12 24 V12 H24',
    'M296 12 H308 V24',
    'M308 196 V208 H296',
    'M24 208 H12 V196',
  ];
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full max-w-[420px]" role="img" aria-label="A blueprint of the agent being drawn, checked and approved">
      <defs>
        <filter id="spec-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {marks.map((d) => (
        <path key={d} d={d} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      ))}

      <motion.text x="24" y="38" fontSize="9" fontFamily={MONO} fill="rgba(255,255,255,0.55)" {...beat(SPEC_LOOP, 0.1, 0.4, { opacity: [0, 1] })}>
        agent-spec.md
      </motion.text>

      {/* Approved stamp */}
      <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...beat(SPEC_LOOP, 6.4, 0.5, { opacity: [0, 1], scale: [0.7, 1] }, 'backOut')}>
        <rect x="226" y="24" width="70" height="20" rx="10" fill={YELLOW} />
        <path d="M236 34 l3 3 l6 -6" fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="266" y="37.5" textAnchor="middle" fontSize="8.5" fontWeight="800" letterSpacing="0.6" fill="#171717">APPROVED</text>
      </motion.g>

      {/* Connectors */}
      {[96, 196].map((x, idx) => (
        <motion.path
          key={x}
          d={`M${x} 100 H${x + 28}`}
          fill="none"
          stroke={YELLOW}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          {...beat(SPEC_LOOP, 1.3 + idx * 1.2, 0.5, { opacity: [0, 1] })}
        />
      ))}
      {[124, 224].map((x, idx) => (
        <motion.path
          key={x}
          d={`M${x - 5} 95 L${x} 100 L${x - 5} 105`}
          fill="none"
          stroke={YELLOW}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...beat(SPEC_LOOP, 1.5 + idx * 1.2, 0.4, { opacity: [0, 1] })}
        />
      ))}

      {SPEC_NODES.map((node) => (
        <g key={node.name}>
          <motion.text x={node.x + 36} y="68" textAnchor="middle" fontSize="7.5" fontWeight="700" letterSpacing="1.2" fill="rgba(255,255,255,0.4)" {...beat(SPEC_LOOP, node.start, 0.4, { opacity: [0, 1] })}>
            {node.label}
          </motion.text>
          <motion.rect
            x={node.x}
            y="76"
            width="72"
            height="48"
            rx="10"
            fill={node.agent ? YELLOW : '#fff'}
            stroke={node.agent ? YELLOW : 'rgba(255,255,255,0.4)'}
            strokeWidth="1.2"
            filter={node.agent ? 'url(#spec-glow)' : undefined}
            {...beat(SPEC_LOOP, node.start, 0.8, { pathLength: [0, 1], fillOpacity: [0, node.agent ? 0.14 : 0.04] })}
          />
          <motion.g {...beat(SPEC_LOOP, node.start + 0.5, 0.4, { opacity: [0, 1] })}>
            <text x={node.x + 36} y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill={node.agent ? YELLOW : '#fff'}>{node.name}</text>
            <text x={node.x + 36} y="111" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.5)">{node.sub}</text>
          </motion.g>
        </g>
      ))}

      {/* Dimension line */}
      <motion.g {...beat(SPEC_LOOP, 3.9, 0.7, { opacity: [0, 1] })}>
        <path d="M24 148 H112 M208 148 H296 M24 143 V153 M296 143 V153" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        <text x="160" y="151" textAnchor="middle" fontSize="8" fontFamily={MONO} letterSpacing="1.5" fill="rgba(255,255,255,0.5)">BLUEPRINT</text>
      </motion.g>

      {/* The spec checklist, ticked in turn */}
      {SPEC_CHIPS.map((chip, idx) => {
        const x = 24 + idx * 70;
        const at = 4.6 + idx * 0.45;
        return (
          <g key={chip}>
            <rect x={x} y="170" width="62" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.22)" />
            <text x={x + 27} y="184" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="rgba(255,255,255,0.8)">{chip}</text>
            <motion.g style={{ transformBox: 'fill-box', transformOrigin: 'center' }} {...beat(SPEC_LOOP, at, 0.3, { opacity: [0, 1], scale: [0.4, 1] }, 'backOut')}>
              <circle cx={x + 10} cy="181" r="5" fill={YELLOW} />
              <path d={`M${x + 7.5} 181 l1.8 1.8 l3.2 -3.4`} fill="none" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}

// --- Step 2: the agent at the hub, data packets flying between it and the tools ---
const HUB = { x: 160, y: 120 };
const TOOLS = [
  { label: 'CRM', icon: Database, x: 268, y: 120 },
  { label: 'WhatsApp', icon: MessageCircle, x: 214, y: 46 },
  { label: 'Sheets', icon: Sheet, x: 106, y: 46 },
  { label: 'Gmail', icon: Mail, x: 52, y: 120 },
  { label: 'Calls', icon: Phone, x: 106, y: 194 },
  { label: 'APIs', icon: Webhook, x: 214, y: 194 },
];
const CONNECT_LOOP = 9;

// Keyframes for a packet that flies `from` -> `to` between `start` and `start + dur`, then vanishes
function flight(start, dur, from, to, ease = 'easeInOut') {
  const t0 = start / CONNECT_LOOP;
  const t1 = (start + dur) / CONNECT_LOOP;
  const eps = 0.0001;
  return {
    initial: { cx: from.x, cy: from.y, opacity: 0 },
    animate: {
      cx: [from.x, from.x, to.x, to.x],
      cy: [from.y, from.y, to.y, to.y],
      opacity: [0, 1, 1, 0],
    },
    transition: { duration: CONNECT_LOOP, times: [0, t0 + eps, t1, Math.min(1, t1 + 0.02)], repeat: Infinity, ease },
  };
}

export function ConnectVisual() {
  return (
    <svg viewBox="0 0 320 240" className="w-full h-full max-w-[420px]" role="img" aria-label="The AI agent connected to the CRM, WhatsApp, Sheets, Gmail, phone calls and APIs">
      <defs>
        <radialGradient id="hub-fill" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFE08A" />
          <stop offset="100%" stopColor={YELLOW} />
        </radialGradient>
        <filter id="conn-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Orbit rings */}
      <circle cx={HUB.x} cy={HUB.y} r="46" fill="none" stroke="rgba(255,255,255,0.08)" />
      <motion.circle
        cx={HUB.x}
        cy={HUB.y}
        r="78"
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeDasharray="2 7"
        strokeLinecap="round"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Wires */}
      {TOOLS.map((tool) => (
        <line key={tool.label} x1={HUB.x} y1={HUB.y} x2={tool.x} y2={tool.y} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      ))}

      {/* Packets: in from each tool, then the agent's answer back out */}
      {TOOLS.map((tool, idx) => {
        const start = idx * 1.0;
        return (
          <g key={`packets-${tool.label}`}>
            <motion.circle r="3" fill="#fff" filter="url(#conn-glow)" {...flight(start, 1.0, tool, HUB)} />
            <motion.circle r="3" fill={YELLOW} filter="url(#conn-glow)" {...flight(start + 1.7, 1.0, HUB, tool)} />
          </g>
        );
      })}

      {/* Tool nodes, flashing as data leaves and arrives */}
      {TOOLS.map((tool, idx) => {
        const Icon = tool.icon;
        const start = idx * 1.0;
        const t = (at) => at / CONNECT_LOOP;
        return (
          <g key={tool.label}>
            <motion.rect
              x={tool.x - 18}
              y={tool.y - 18}
              width="36"
              height="36"
              rx="11"
              fill="rgba(255,255,255,0.05)"
              strokeWidth="1.2"
              initial={{ stroke: FAINT }}
              animate={{ stroke: [FAINT, FAINT, YELLOW, FAINT, FAINT, YELLOW, FAINT, FAINT] }}
              transition={{
                duration: CONNECT_LOOP,
                times: [0, t(start), t(start + 0.25), t(start + 0.7), t(start + 2.7), t(start + 2.95), t(start + 3.4), 1],
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <Icon x={tool.x - 8} y={tool.y - 8} width="16" height="16" color="#fff" strokeWidth={1.75} />
            <text x={tool.x} y={tool.y + 31} textAnchor="middle" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.5)">{tool.label}</text>
          </g>
        );
      })}

      {/* The agent */}
      {[0, 1.2].map((delay) => (
        <motion.circle
          key={delay}
          cx={HUB.x}
          cy={HUB.y}
          r={28}
          fill="none"
          stroke={YELLOW}
          strokeWidth="1.2"
          initial={{ opacity: 0 }}
          animate={{ r: [28, 52], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay }}
        />
      ))}
      <circle cx={HUB.x} cy={HUB.y} r="28" fill="url(#hub-fill)" filter="url(#conn-glow)" />
      <Bot x={HUB.x - 13} y={HUB.y - 13} width="26" height="26" color="#171717" strokeWidth={1.75} />
    </svg>
  );
}

// --- Step 3: the live agent's dashboard, updating on its own ---
const BAR_LOOPS = [
  [34, 52, 3.1], [44, 60, 2.6], [40, 56, 3.4], [58, 72, 2.9], [52, 66, 3.7], [64, 80, 2.7],
  [60, 76, 3.3], [72, 88, 3.0], [68, 84, 3.6], [80, 92, 2.8], [76, 90, 3.2], [88, 100, 2.5],
];
const EVENTS = [
  'Lead qualified · Hot',
  'Synced to CRM',
  'Follow-up sent on WhatsApp',
  'Site visit booked',
  'Call answered in 8s',
  'Lead qualified · Warm',
];

function LiveCount() {
  const value = useMotionValue(1284);
  const display = useTransform(value, (v) => Math.round(v).toLocaleString('en-IN'));
  useEffect(() => {
    const id = setInterval(() => {
      animate(value, value.get() + 1 + Math.floor(Math.random() * 3), { duration: 0.9, ease: 'easeOut' });
    }, 2200);
    return () => clearInterval(id);
  }, [value]);
  return <motion.span>{display}</motion.span>;
}

export function DeployVisual() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 2200);
    return () => clearInterval(id);
  }, []);
  // Newest event on top; keys are absolute so each new one animates in and the oldest slides out
  const feed = [2, 1, 0].map((offset) => ({ key: tick + offset, text: EVENTS[(tick + offset) % EVENTS.length] }));

  return (
    <div className="w-full max-w-[340px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-4 text-left shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-bold text-white">
          <span className="w-6 h-6 rounded-lg bg-brand-yellow text-brand-dark flex items-center justify-center">
            <Bot size={14} strokeWidth={2.2} />
          </span>
          Lead Qualifier Agent
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>

      <div className="flex items-end justify-between mt-4">
        <div>
          <div className="font-heading text-3xl font-bold leading-none text-white tabular-nums"><LiveCount /></div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/50 mt-1.5">Leads handled</div>
        </div>
        <div className="text-right">
          <div className="font-heading text-xl font-bold leading-none text-brand-yellow">42s</div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/50 mt-1.5">Avg. reply</div>
        </div>
      </div>

      <div className="flex items-end gap-[3px] h-14 mt-4 border-b border-white/10 pb-px">
        {BAR_LOOPS.map(([low, high, duration], idx) => (
          <motion.span
            key={idx}
            className={`flex-1 h-full rounded-t-[3px] origin-bottom ${idx === BAR_LOOPS.length - 1 ? 'bg-brand-yellow shadow-[0_0_12px_rgba(246,199,68,0.6)]' : 'bg-white/15'}`}
            initial={{ scaleY: low / 100 }}
            animate={{ scaleY: [low / 100, high / 100, low / 100] }}
            transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.12 }}
          />
        ))}
      </div>

      <ul className="relative list-none m-0 p-0 mt-3 h-[78px] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {feed.map((item, idx) => (
            <motion.li
              key={item.key}
              layout
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: [1, 0.65, 0.35][idx], y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-2 h-[26px] text-[11px] text-white"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400/15 text-emerald-300 flex items-center justify-center shrink-0">
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.5l2.5 2.5 4.5-5" /></svg>
              </span>
              <span className="truncate">{item.text}</span>
              <span className="ml-auto text-white/35 text-[10px] shrink-0">{idx === 0 ? 'now' : `${idx * 2}s ago`}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
