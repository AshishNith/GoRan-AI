import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  CircleX,
  ClipboardList,
  Clock,
  Inbox,
  ListChecks,
  PhoneCall,
  PhoneOutgoing,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  Zap
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useCalBooking } from '../components/CalBookingModal';
import QualificationLiveDemo from '../components/QualificationLiveDemo';

// Paste the Loom embed link here (https://www.loom.com/embed/<id>) once the walkthrough is recorded.
// While empty, the video block stays hidden.
const LOOM_EMBED_URL = '';

// ── Sample lead used across every mock on the page ──
const SAMPLE_LEAD = {
  name: 'Rahul Sharma',
  phone: '+91 98XXX XXX21',
  interest: '3 BHK apartment',
  source: 'Instagram lead ad',
};

// ── Funnel stages. `width` is the top edge of each slice (% of the funnel column) ──
const FUNNEL_STAGES = [
  {
    icon: ClipboardList,
    short: 'Form filled',
    title: 'The customer fills the form on your ad',
    desc: 'Nothing changes about how you run ads. Your customer taps the ad, fills the lead form and submits. That one submission starts the whole funnel.',
    points: [
      'Works with lead forms on Instagram, Facebook and Google ads, or the form on your website',
      'The customer only shares the basics, so the form stays short',
      'No app, no extra step and no waiting for a callback',
    ],
    width: 100,
    fill: '#FEF6DC',
  },
  {
    icon: Inbox,
    short: 'Details received',
    title: 'The agent gets the details instantly',
    desc: "The moment the form is submitted, the lead's details are passed to the calling agent. Nobody on your team has to download a sheet or copy a number.",
    points: [
      'The agent already knows who it is calling and what they asked about',
      'The lead is saved to your CRM or sheet at the same time',
      'It works the same at 2 pm on a Tuesday and at 11 pm on a Sunday',
    ],
    width: 86,
    fill: '#FCEBB0',
  },
  {
    icon: PhoneOutgoing,
    short: 'Agent calls',
    title: 'The agent calls the customer',
    desc: 'The agent rings the lead while the enquiry is still fresh and opens the conversation in a natural voice.',
    points: [
      'Calls while the customer still remembers your ad',
      'Greets them by name and mentions what they asked about',
      'Speaks naturally in English or Hindi',
    ],
    width: 72,
    fill: '#FADF85',
  },
  {
    icon: ListChecks,
    short: 'Details collected',
    title: 'The agent collects the details',
    desc: 'On the call it asks the questions your sales team would ask and records every answer against the lead.',
    points: [
      'You decide the questions: requirement, budget, location, timeline',
      'One question at a time, like a normal conversation',
      'Every answer is saved to the lead as it is said',
    ],
    width: 58,
    fill: '#F6C744',
  },
  {
    icon: BadgeCheck,
    short: 'Qualified',
    title: 'The agent qualifies the customer',
    desc: 'When the call ends, the answers are checked against your rules and the lead gets a clear label.',
    points: [
      'Qualified leads go to your sales team with a call summary',
      'Not-ready leads are tagged for follow-up, not dropped',
      'Leads that are not a fit never reach your team',
    ],
    width: 44,
    fill: '#171717',
    dark: true,
  },
];
const FUNNEL_END_WIDTH = 34;
// Desktop slice height and gap in px. The panel pointer uses them to line up with the active slice.
const FUNNEL_ROW = 92;
const FUNNEL_GAP = 6;

// ── Call script. `hold` = ms before the next line appears, `capture` = lead field filled by that line ──
const CALL_SCRIPT = [
  { speaker: 'system', text: `Dialing ${SAMPLE_LEAD.phone}...`, hold: 1600 },
  { speaker: 'system', text: 'Call answered', hold: 1000 },
  { speaker: 'ai', text: `Hi Rahul, I'm the assistant from Your Brand. You just enquired about a ${SAMPLE_LEAD.interest} on our Instagram ad. Is this a good time for a few quick questions?`, hold: 3400 },
  { speaker: 'customer', text: 'Yes, go ahead.', hold: 1500 },
  { speaker: 'ai', text: 'Great. Which area are you looking in?', hold: 1900 },
  { speaker: 'customer', text: 'Whitefield, or anywhere close to it.', hold: 1900, capture: 'location' },
  { speaker: 'ai', text: 'And what budget do you have in mind?', hold: 1900 },
  { speaker: 'customer', text: 'Around 1.2 crore.', hold: 1700, capture: 'budget' },
  { speaker: 'ai', text: 'How soon are you planning to buy?', hold: 1800 },
  { speaker: 'customer', text: 'Within the next two months.', hold: 1900, capture: 'timeline' },
  { speaker: 'ai', text: 'Perfect. Our property advisor will call you today with matching options. Thanks, Rahul!', hold: 2600 },
  { speaker: 'system', text: 'Call ended • Lead qualified', hold: 0 },
];

const CAPTURE_FIELDS = [
  { key: 'location', label: 'Location', value: 'Whitefield', question: 'Which area are you looking in?' },
  { key: 'budget', label: 'Budget', value: '₹1.2 Cr', question: 'What budget do you have in mind?' },
  { key: 'timeline', label: 'Timeline', value: 'Within 2 months', question: 'How soon are you planning to buy?' },
];

const OUTCOMES = [
  {
    icon: CalendarCheck,
    tone: 'bg-emerald-50 text-emerald-600',
    title: 'Qualified',
    desc: 'Sent to your sales team straight away with the answers and a short call summary, so the first human call starts warm.',
  },
  {
    icon: Clock,
    tone: 'bg-amber-50 text-amber-500',
    title: 'Not ready yet',
    desc: 'Interested but not buying now. Tagged for follow-up so the lead is not lost and nobody chases it too early.',
  },
  {
    icon: CircleX,
    tone: 'bg-red-50 text-red-500',
    title: 'Not a fit',
    desc: 'Wrong budget, wrong location or a wrong number. Filtered out before it costs your team any time.',
  },
];

const StepLabel = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark bg-brand-yellow px-2.5 py-1 rounded-full">
    {children}
  </span>
);

// ── Mock shown in the funnel panel for each step. Children animate in one after another ──
const visualList = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const visualItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

function FunnelVisual({ index }) {
  // Step 1: the ad lead form
  if (index === 0) {
    return (
      <motion.div variants={visualList} initial="hidden" animate="show" className="w-full max-w-[340px] mx-auto bg-white border border-brand-border rounded-2xl shadow-card-hover overflow-hidden">
        <motion.div variants={visualItem} className="flex items-center gap-3 px-4 py-3 border-b border-brand-border">
          <div className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center font-heading font-black text-brand-dark text-xs">Y</div>
          <div>
            <div className="text-sm font-bold text-brand-dark font-heading">Your Brand</div>
            <div className="text-[10px] text-brand-text-muted font-mono">Sponsored</div>
          </div>
        </motion.div>
        <div className="p-4 space-y-3">
          {[
            ['Full name', SAMPLE_LEAD.name],
            ['Phone number', SAMPLE_LEAD.phone],
            ['Interested in', SAMPLE_LEAD.interest],
          ].map(([label, value]) => (
            <motion.div key={label} variants={visualItem}>
              <div className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wide mb-1">{label}</div>
              <div className="w-full bg-brand-bg-light border border-brand-border rounded-xl py-2 px-3 text-sm text-brand-dark">{value}</div>
            </motion.div>
          ))}
          <motion.div variants={visualItem} className="w-full bg-brand-dark text-white font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2">
            Submit <ArrowRight size={14} />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Step 2: the lead landing with the agent
  if (index === 1) {
    return (
      <motion.div variants={visualList} initial="hidden" animate="show" className="w-full max-w-[340px] mx-auto bg-brand-dark rounded-2xl p-5 shadow-card-hover font-mono text-xs leading-relaxed">
        <motion.div variants={visualItem} className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <span className="flex items-center gap-2 text-brand-yellow font-bold uppercase tracking-wider text-[11px]">
            <Zap size={14} /> New lead received
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" /> Live
          </span>
        </motion.div>
        <dl className="m-0 space-y-2">
          {[
            ['name', SAMPLE_LEAD.name],
            ['phone', SAMPLE_LEAD.phone],
            ['interest', SAMPLE_LEAD.interest],
            ['source', SAMPLE_LEAD.source],
          ].map(([key, value]) => (
            <motion.div key={key} variants={visualItem} className="flex gap-3">
              <dt className="text-gray-500 w-16 shrink-0">{key}</dt>
              <dd className="m-0 text-white">{value}</dd>
            </motion.div>
          ))}
        </dl>
        <div className="border-t border-white/10 mt-3 pt-3 space-y-2 text-gray-300">
          <motion.div variants={visualItem} className="flex items-center gap-2"><Check size={12} className="text-green-400 shrink-0" /> Saved to CRM</motion.div>
          <motion.div variants={visualItem} className="flex items-center gap-2"><Check size={12} className="text-green-400 shrink-0" /> Passed to calling agent</motion.div>
          <motion.div variants={visualItem} className="flex items-center gap-2 text-brand-yellow font-bold"><PhoneOutgoing size={12} className="shrink-0" /> Call queued</motion.div>
        </div>
      </motion.div>
    );
  }

  // Step 3: the outbound call
  if (index === 2) {
    return (
      <motion.div variants={visualList} initial="hidden" animate="show" className="w-full max-w-[340px] mx-auto bg-brand-bg-light border border-brand-border rounded-2xl p-6 flex flex-col items-center text-center">
        <motion.div variants={visualItem} className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center text-brand-dark relative mb-4">
          <span className="absolute inset-0 rounded-full bg-brand-yellow/40 animate-ping" />
          <PhoneCall size={26} className="relative" />
        </motion.div>
        <motion.div variants={visualItem}>
          <div className="font-bold text-brand-dark text-base font-heading">{SAMPLE_LEAD.name}</div>
          <div className="text-xs text-brand-text-muted font-mono mt-1">{SAMPLE_LEAD.phone}</div>
        </motion.div>
        <motion.div variants={visualItem} className="mt-4 text-[10px] font-bold font-mono uppercase tracking-wider py-1.5 px-3 rounded-full border bg-green-50 border-green-200 text-green-600">
          Call Active
        </motion.div>
        <motion.div variants={visualItem} className="flex items-center justify-center gap-1 mt-5 h-16 w-full">
          {[1, 2, 4, 2, 1, 4, 2, 1, 2].map((wave, idx) => (
            <div
              key={idx}
              className={`voice-wave-bar bg-brand-dark rounded-full anim-wave-active-${wave}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            />
          ))}
        </motion.div>
        <motion.p variants={visualItem} className="text-[11px] text-brand-text-muted leading-relaxed mt-4 mb-0">
          "Hi Rahul, you just enquired about a {SAMPLE_LEAD.interest}..."
        </motion.p>
      </motion.div>
    );
  }

  // Step 4: answers being collected
  if (index === 3) {
    return (
      <motion.div variants={visualList} initial="hidden" animate="show" className="w-full max-w-[340px] mx-auto bg-brand-bg-light border border-brand-border rounded-2xl p-5">
        <motion.div variants={visualItem} className="text-[10px] uppercase font-mono tracking-wider text-brand-text-muted mb-3">
          Collected on the call
        </motion.div>
        <div className="space-y-2.5">
          {CAPTURE_FIELDS.map((field) => (
            <motion.div key={field.key} variants={visualItem} className="bg-white border border-brand-border rounded-xl p-3">
              <div className="text-[11px] text-brand-text-muted leading-snug mb-1.5">"{field.question}"</div>
              <div className="flex items-center justify-between gap-3 bg-brand-yellow/15 border border-brand-yellow rounded-lg px-3 py-1.5 text-xs">
                <span className="text-brand-text-muted">{field.label}</span>
                <span className="font-semibold text-brand-dark flex items-center gap-1.5">
                  {field.value} <Check size={12} className="text-emerald-600 shrink-0" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Step 5: the verdict
  return (
    <motion.div variants={visualList} initial="hidden" animate="show" className="w-full max-w-[340px] mx-auto">
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 18 } },
        }}
        className="bg-brand-dark rounded-2xl p-5 shadow-card-hover"
      >
        <div className="flex items-center gap-2 text-brand-yellow font-heading font-bold text-lg">
          <BadgeCheck size={20} /> Qualified
        </div>
        <p className="text-xs text-white/70 leading-relaxed mt-2 mb-0">
          Budget, location and timeline all match.
        </p>
        <div className="border-t border-white/10 mt-4 pt-3 flex items-center gap-2 text-[11px] text-white font-semibold">
          <ArrowRight size={12} className="text-brand-yellow shrink-0" /> Sent to your sales team with the call summary
        </div>
      </motion.div>
      <motion.div variants={visualItem} className="text-[10px] uppercase font-mono tracking-wider text-brand-text-muted mt-5 mb-2">
        Every lead gets one label
      </motion.div>
      <div className="flex flex-wrap gap-2">
        {OUTCOMES.map((outcome, idx) => (
          <motion.span
            key={outcome.title}
            variants={visualItem}
            className={`text-xs font-semibold py-1.5 px-3 rounded-full border ${
              idx === 0 ? 'bg-brand-yellow border-brand-yellow text-brand-dark' : 'bg-white border-brand-border text-brand-text-muted'
            }`}
          >
            {outcome.title}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Qualification() {
  const { openCalBooking } = useCalBooking();

  // Funnel explorer state
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef([]);
  const activeStageData = FUNNEL_STAGES[activeStage];
  const isLastStage = activeStage === FUNNEL_STAGES.length - 1;

  // Arrow keys move between funnel slices, like a tab list
  const handleStageKey = (e, idx) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (idx + step + FUNNEL_STAGES.length) % FUNNEL_STAGES.length;
    setActiveStage(next);
    stageRefs.current[next]?.focus();
  };

  // Call simulation state
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);
  const transcriptRef = useRef(null);

  const callDone = shown >= CALL_SCRIPT.length;
  const callPlaying = running && !callDone;
  const callStatus = shown === 0 ? (running ? 'calling' : 'idle') : callDone ? 'ended' : shown < 2 ? 'calling' : 'active';
  const captured = new Set(CALL_SCRIPT.slice(0, shown).map((line) => line.capture).filter(Boolean));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!running || shown >= CALL_SCRIPT.length) return;
    const delay = shown === 0 ? 500 : CALL_SCRIPT[shown - 1].hold;
    const timer = setTimeout(() => setShown((count) => count + 1), delay);
    return () => clearTimeout(timer);
  }, [running, shown]);

  // Keep the newest transcript line in view without moving the page itself
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [shown]);

  const toggleCall = () => {
    setShown(0);
    setRunning(!callPlaying);
  };

  return (
    <main className="w-full bg-white relative overflow-hidden min-h-screen">
      <SEOHead
        title="AI Lead Qualification Funnel"
        description="See how the GoRan AI calling agent turns ad form fills into qualified leads: it gets the details, calls the customer, collects the answers and qualifies them."
        canonicalPath="/qualification"
      />

      {/* Separate custom header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="w-full max-w-[1140px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center no-underline">
            <img src="/Logo.png" alt="GoRan AI Logo" className="h-10 w-auto block rounded-xl" />
          </Link>
          <button
            onClick={openCalBooking}
            className="inline-flex items-center gap-1 bg-brand-dark text-white font-semibold text-xs py-2 px-4 rounded-full shadow-sm hover:bg-brand-dark-hover border-none cursor-pointer"
          >
            Book a Call
          </button>
        </div>
      </header>

      {/* Subtle grid background overlay */}
      <div className="grid-bg-overlay" />

      {/* Soft brand glow orbs */}
      <div className="absolute top-[3%] right-[-10%] w-140 h-140 rounded-full bg-brand-yellow/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-120 h-120 rounded-full bg-brand-yellow/5 blur-[100px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-bold text-brand-dark uppercase tracking-wider mb-6 animate-fadeIn">
            <Sparkles size={12} className="text-brand-yellow fill-brand-yellow" /> AI Calling Agent · Lead Qualification
          </div>

          <h1 className="font-heading font-black text-brand-dark text-[2.2rem] sm:text-[3.2rem] md:text-[4.5rem] leading-[1.05] tracking-tight mb-6 animate-fadeIn">
            Your ad leads, called and <span className="text-brand-yellow">qualified</span> on autopilot
          </h1>

          <p className="text-brand-text-muted text-base sm:text-lg md:text-xl max-w-[720px] leading-relaxed mb-10 animate-fadeIn" style={{ animationDelay: '0.15s' }}>
            A customer fills the form on your ad. Our AI calling agent gets their details, calls them, asks the questions your sales team would ask, and tells you who is worth your time.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => document.getElementById('funnel')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-base py-4 px-8 rounded-full shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <span>See the Funnel</span>
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => document.getElementById('try-live')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-brand-bg-light hover:bg-[#F2F2F2] text-brand-dark font-semibold text-base py-4 px-8 rounded-full border border-brand-border transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              Try It Live
            </button>
          </div>

          {LOOM_EMBED_URL && (
            <div className="w-full mt-14 rounded-3xl border border-brand-border bg-white shadow-card-hover overflow-hidden animate-fadeIn">
              <div className="relative w-full aspect-video">
                <iframe
                  src={LOOM_EMBED_URL}
                  title="AI lead qualification funnel walkthrough"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── The funnel: click a slice, the panel beside it changes ── */}
      <section id="funnel" className="relative z-10 py-20 md:py-24 bg-brand-bg-light border-t border-b border-brand-border px-6 scroll-mt-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[700px] mx-auto mb-12">
            <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">The Funnel</span>
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight mt-2 text-balance">
              Five steps from ad click to qualified lead
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base mt-4 leading-relaxed">
              Every form fill goes in at the top. Only the customers who are ready to talk to your team come out at the bottom. Click a step to see what happens there.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-8 lg:gap-12 items-stretch">
            {/* Clickable funnel */}
            <div
              role="tablist"
              aria-label="Funnel steps"
              aria-orientation="vertical"
              className="flex flex-col gap-1.5 w-full max-w-[420px] mx-auto lg:max-w-none"
            >
              {FUNNEL_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isActive = idx === activeStage;
                const nextWidth = FUNNEL_STAGES[idx + 1]?.width ?? FUNNEL_END_WIDTH;
                const inset = ((stage.width - nextWidth) / (2 * stage.width)) * 100;
                return (
                  <div key={stage.short} className="flex justify-center h-16 lg:h-[92px]">
                    <motion.button
                      ref={(el) => { stageRefs.current[idx] = el; }}
                      type="button"
                      role="tab"
                      id={`funnel-tab-${idx}`}
                      aria-selected={isActive}
                      aria-controls="funnel-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveStage(idx)}
                      onKeyDown={(e) => handleStageKey(e, idx)}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.07 : 1,
                        opacity: idx > activeStage ? 0.45 : 1,
                        filter: isActive
                          ? 'drop-shadow(0px 10px 14px rgba(0, 0, 0, 0.22))'
                          : 'drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))',
                      }}
                      whileHover={{ scale: isActive ? 1.07 : 1.03, opacity: 1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                      style={{ width: `${stage.width}%`, zIndex: isActive ? 2 : 1 }}
                      className="relative h-full p-0 bg-transparent border-none cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
                    >
                      <span
                        className={`h-full w-full flex items-center justify-center gap-2.5 px-2 ${stage.dark ? 'text-white' : 'text-brand-dark'}`}
                        style={{
                          backgroundColor: stage.fill,
                          clipPath: `polygon(0 0, 100% 0, ${100 - inset}% 100%, ${inset}% 100%)`,
                        }}
                      >
                        <span className="relative flex items-center justify-center shrink-0">
                          {isActive && (
                            <span className={`absolute w-8 h-8 rounded-full animate-ping ${stage.dark ? 'bg-brand-yellow/30' : 'bg-brand-dark/15'}`} />
                          )}
                          <Icon size={20} className={`relative ${stage.dark ? 'text-brand-yellow' : ''}`} />
                        </span>
                        <span className="font-heading font-bold text-xs sm:text-sm leading-tight">{stage.short}</span>
                      </span>
                    </motion.button>
                  </div>
                );
              })}
            </div>

            {/* Detail panel for the active step */}
            <div
              id="funnel-panel"
              role="tabpanel"
              aria-labelledby={`funnel-tab-${activeStage}`}
              className="relative bg-white border border-brand-border rounded-3xl shadow-card-hover flex flex-col"
              style={{ minHeight: FUNNEL_STAGES.length * FUNNEL_ROW + (FUNNEL_STAGES.length - 1) * FUNNEL_GAP }}
            >
              {/* Pointer that slides to the active slice (desktop only) */}
              <motion.span
                aria-hidden="true"
                initial={false}
                animate={{ top: activeStage * (FUNNEL_ROW + FUNNEL_GAP) + FUNNEL_ROW / 2 - 8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="hidden lg:block absolute -left-[9px] w-4 h-4 rotate-45 bg-white border-l border-b border-brand-border"
              />

              <div className="flex-1 flex items-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-8"
                  >
                    <div>
                      <StepLabel>Step {String(activeStage + 1).padStart(2, '0')}</StepLabel>
                      <h3 className="text-2xl md:text-[1.75rem] font-heading font-bold text-brand-dark leading-tight mt-4 mb-3">
                        {activeStageData.title}
                      </h3>
                      <p className="text-brand-text-muted text-sm leading-relaxed mb-5">{activeStageData.desc}</p>
                      <ul className="list-none p-0 m-0 space-y-2.5">
                        {activeStageData.points.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-sm text-brand-dark leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-brand-yellow/15 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={12} />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <FunnelVisual index={activeStage} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step progress + navigation */}
              <div className="flex items-center justify-between gap-4 border-t border-brand-border px-6 md:px-8 py-4">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {FUNNEL_STAGES.map((stage, idx) => (
                    <span
                      key={stage.short}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeStage ? 'w-7 bg-brand-dark' : idx < activeStage ? 'w-3 bg-brand-yellow' : 'w-3 bg-brand-border'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveStage(activeStage - 1)}
                    disabled={activeStage === 0}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-brand-bg-light text-brand-dark font-semibold text-xs py-2.5 px-4 rounded-full border border-brand-border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  {isLastStage ? (
                    <button
                      type="button"
                      onClick={() => document.getElementById('call-demo')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center gap-1.5 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-xs py-2.5 px-5 rounded-full border-none transition-all cursor-pointer shadow-sm"
                    >
                      <Play size={12} /> Watch a Sample Call
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveStage(activeStage + 1)}
                      className="inline-flex items-center gap-1.5 bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-xs py-2.5 px-5 rounded-full border-none transition-all cursor-pointer shadow-md"
                    >
                      Next Step <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Steps 3–5: the call, the details, the verdict ── */}
      <section id="call-demo" className="relative z-10 py-20 md:py-24 bg-brand-bg-light border-t border-b border-brand-border px-6 scroll-mt-16">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <StepLabel>Steps 03 – 05</StepLabel>
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight mt-4 text-balance">
              The agent calls, collects the details and qualifies
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base mt-4 leading-relaxed">
              Press play to watch a sample call. As the customer answers, the lead card on the right fills in, and the call ends with a clear verdict.
            </p>
          </div>

          <div className="bg-white border border-brand-border rounded-3xl p-5 md:p-8 shadow-card max-w-[1000px] mx-auto">
            {/* Dialer header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border/60 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-dark relative">
                  {callStatus === 'active' && <span className="absolute inset-0 rounded-full bg-brand-yellow/30 animate-ping" />}
                  <PhoneCall size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-dark font-heading">GoRan AI Calling Agent</h3>
                  <p className="text-[10px] text-brand-text-muted font-mono">Sample qualification call</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`text-[10px] font-bold font-mono uppercase tracking-wider py-1.5 px-3 rounded-full border ${
                  callStatus === 'idle' ? 'bg-brand-bg-light border-brand-border text-brand-text-muted' :
                  callStatus === 'calling' ? 'bg-amber-50 border-amber-200 text-[#F5A623] animate-pulse' :
                  callStatus === 'active' ? 'bg-green-50 border-green-200 text-green-600' :
                  'bg-emerald-50 border-emerald-200 text-emerald-600'
                }`}>
                  {callStatus === 'idle' ? 'Idle' :
                   callStatus === 'calling' ? 'Dialing...' :
                   callStatus === 'active' ? 'Call Active' :
                   'Call Completed'}
                </div>
                <button
                  onClick={toggleCall}
                  className={`font-bold py-2.5 px-5 rounded-full text-xs transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                    callPlaying
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-brand-dark text-white hover:bg-brand-dark-hover shadow-md'
                  }`}
                >
                  {callPlaying ? <><Square size={12} /> Stop</> : callDone ? <><RotateCcw size={12} /> Replay Call</> : <><Play size={12} /> Play Sample Call</>}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Transcript */}
              <div
                ref={transcriptRef}
                data-lenis-prevent
                className="md:col-span-3 bg-brand-dark rounded-2xl p-5 h-[380px] overflow-y-auto scrollbar-hide space-y-3 font-mono text-xs leading-relaxed text-gray-300 shadow-inner"
              >
                {shown === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500 text-center">
                    {running ? 'Connecting...' : 'Press "Play Sample Call" to watch the agent qualify a lead'}
                  </div>
                ) : (
                  CALL_SCRIPT.slice(0, shown).map((line, idx) => (
                    <div key={idx} className="animate-fadeIn">
                      {line.speaker === 'system' ? (
                        <div className="text-gray-400 font-semibold">{line.text}</div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2 text-left">
                          <span className={`font-bold uppercase tracking-wider shrink-0 sm:w-20 ${line.speaker === 'ai' ? 'text-brand-yellow' : 'text-blue-400'}`}>
                            {line.speaker === 'ai' ? 'AI Agent' : 'Customer'}
                          </span>
                          <span className="text-white">{line.text}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Lead card filling in live */}
              <div className="md:col-span-2 bg-brand-bg-light border border-brand-border rounded-2xl p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center font-heading font-black text-brand-dark">
                    {SAMPLE_LEAD.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-brand-dark font-heading">{SAMPLE_LEAD.name}</div>
                    <div className="text-[11px] text-brand-text-muted font-mono">{SAMPLE_LEAD.phone}</div>
                  </div>
                </div>

                <div className="text-[10px] uppercase font-mono tracking-wider text-brand-text-muted mb-2">From the ad form</div>
                <div className="space-y-1.5 mb-4">
                  {[
                    ['Interest', SAMPLE_LEAD.interest],
                    ['Source', SAMPLE_LEAD.source],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-3 bg-white border border-brand-border rounded-lg px-3 py-2 text-xs">
                      <span className="text-brand-text-muted">{label}</span>
                      <span className="font-semibold text-brand-dark text-right">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] uppercase font-mono tracking-wider text-brand-text-muted mb-2">Collected on the call</div>
                <div className="space-y-1.5 mb-4">
                  {CAPTURE_FIELDS.map((field) => {
                    const filled = captured.has(field.key);
                    return (
                      <div
                        key={field.key}
                        className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-xs border transition-colors duration-500 ${
                          filled ? 'bg-brand-yellow/15 border-brand-yellow' : 'bg-white border-dashed border-brand-border'
                        }`}
                      >
                        <span className="text-brand-text-muted">{field.label}</span>
                        {filled ? (
                          <span className="font-semibold text-brand-dark flex items-center gap-1.5 animate-fadeIn">
                            {field.value} <Check size={12} className="text-emerald-600 shrink-0" />
                          </span>
                        ) : (
                          <span className="text-brand-text-muted/60 font-mono">waiting</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto">
                  {callDone ? (
                    <div className="bg-brand-dark rounded-xl p-4 animate-fadeIn">
                      <div className="flex items-center gap-2 text-brand-yellow font-heading font-bold text-sm">
                        <BadgeCheck size={16} /> Qualified
                      </div>
                      <p className="text-[11px] text-white/70 leading-relaxed mt-1.5">
                        Budget, location and timeline all match. Sent to your sales team with the call summary.
                      </p>
                    </div>
                  ) : (
                    <div className="border border-dashed border-brand-border rounded-xl p-4 text-center text-[11px] text-brand-text-muted font-mono">
                      Verdict appears when the call ends
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live demo: real phone call + browser call ── */}
      <QualificationLiveDemo />

      {/* ── What comes out of the funnel ── */}
      <section className="relative z-10 py-20 md:py-24 bg-white px-6">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center max-w-[700px] mx-auto mb-14">
            <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">The Output</span>
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight mt-2 text-balance">
              Every lead leaves the call with a clear label
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base mt-4 leading-relaxed">
              Your team stops guessing which numbers to dial first. They open the list and start with the people who are ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OUTCOMES.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <div key={outcome.title} className="bg-white border border-brand-border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${outcome.tone}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2 font-heading">{outcome.title}</h3>
                  <p className="text-brand-text-muted text-sm leading-relaxed">{outcome.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-[1140px] mx-auto bg-brand-dark rounded-3xl px-6 py-14 md:py-20 text-center relative overflow-hidden">
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-140 h-80 rounded-full bg-brand-yellow/15 blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight tracking-tight max-w-[760px] mx-auto text-balance">
              Want this funnel running on <span className="text-brand-yellow">your ads?</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-[560px] mx-auto mt-5 mb-9">
              Book a call and we will map the qualifying questions for your business and show you the agent calling a lead live.
            </p>
            <button
              onClick={openCalBooking}
              className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-base py-4 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/10"
            >
              <span>Book a Call</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Separate custom footer */}
      <footer className="w-full bg-brand-bg-light border-t border-brand-border py-8 px-6 relative z-10">
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text-muted">
          <span>© 2026 GoRan AI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-brand-dark hover:underline no-underline">Privacy Policy</a>
            <a href="/terms" className="hover:text-brand-dark hover:underline no-underline">Terms of Service</a>
            <Link to="/" className="hover:text-brand-dark hover:underline no-underline">Main Website</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
