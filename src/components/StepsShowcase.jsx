import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

// --- ANIMATION GRAPHIC 1: SCOPE & ARCHITECTURE ---
function ScopeGraphic() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-h-[300px]">
      <defs>
        {/* Glow Filters */}
        <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid Background Pattern */}
      <g opacity="0.12">
        <line x1="0" y1="40" x2="400" y2="40" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="160" x2="400" y2="160" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="240" x2="400" y2="240" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />

        <line x1="50" y1="0" x2="50" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="100" y1="0" x2="100" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="150" y1="0" x2="150" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="0" x2="200" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="250" y1="0" x2="250" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="300" y1="0" x2="300" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="350" y1="0" x2="350" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      {/* Connecting Flow Paths */}
      <path d="M 90 140 H 200" stroke="#E5E7EB" strokeWidth="3" strokeDasharray="6 6" />
      <path d="M 200 140 C 240 140, 240 80, 310 80" stroke="#E5E7EB" strokeWidth="3" strokeDasharray="6 6" />
      <path d="M 200 140 C 240 140, 240 200, 310 200" stroke="#E5E7EB" strokeWidth="3" strokeDasharray="6 6" />

      {/* Animating Flow Packets */}
      <motion.circle
        r="4.5"
        fill="#F6C744"
        filter="url(#glow-yellow)"
        animate={{ cx: [90, 200] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        cy="140"
      />
      <motion.path
        d="M 200 140 C 240 140, 240 80, 310 80"
        fill="none"
        stroke="#A855F7"
        strokeWidth="3.5"
        filter="url(#glow-purple)"
        strokeDasharray="20 120"
        animate={{ strokeDashoffset: [140, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <motion.path
        d="M 200 140 C 240 140, 240 200, 310 200"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="3.5"
        filter="url(#glow-blue)"
        strokeDasharray="20 120"
        animate={{ strokeDashoffset: [140, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.8 }}
      />

      {/* Node 1: Trigger Node */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="20" y="105" width="70" height="70" rx="14" fill="#171717" stroke="#333333" strokeWidth="1.5" />
        <circle cx="55" cy="132" r="16" fill="rgba(246, 199, 68, 0.1)" />
        <text x="55" y="137" textAnchor="middle" fontSize="15">📬</text>
        <text x="55" y="163" textAnchor="middle" fontSize="8" fill="#737373" fontFamily="Inter" fontWeight="bold">TRIGGER</text>
      </motion.g>

      {/* Node 2: AI Parser Node */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [2, -2, 2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <rect x="165" y="105" width="70" height="70" rx="14" fill="#171717" stroke="#F6C744" strokeWidth="2" filter="url(#glow-yellow)" />
        <circle cx="200" cy="132" r="16" fill="rgba(246, 199, 68, 0.15)" />
        <text x="200" y="138" textAnchor="middle" fontSize="16">🧠</text>
        <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#F6C744" fontFamily="Inter" fontWeight="bold">AI ENGINE</text>
      </motion.g>

      {/* Node 3: Target Output 1 */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="310" y="45" width="70" height="70" rx="14" fill="#171717" stroke="#333333" strokeWidth="1.5" />
        <circle cx="345" cy="72" r="16" fill="rgba(168, 85, 247, 0.1)" />
        <text x="345" y="77" textAnchor="middle" fontSize="15">📈</text>
        <text x="345" y="103" textAnchor="middle" fontSize="8" fill="#737373" fontFamily="Inter" fontWeight="bold">SHEETS</text>
      </motion.g>

      {/* Node 4: Target Output 2 */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [1.5, -1.5, 1.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <rect x="310" y="165" width="70" height="70" rx="14" fill="#171717" stroke="#333333" strokeWidth="1.5" />
        <circle cx="345" cy="192" r="16" fill="rgba(59, 130, 246, 0.1)" />
        <text x="345" y="197" textAnchor="middle" fontSize="15">💬</text>
        <text x="345" y="223" textAnchor="middle" fontSize="8" fill="#737373" fontFamily="Inter" fontWeight="bold">SLACK</text>
      </motion.g>
    </svg>
  );
}

// --- ANIMATION GRAPHIC 2: CONNECT & INTEGRATE ---
function ConnectGraphic() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-h-[300px]">
      <defs>
        <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid Background Pattern */}
      <g opacity="0.12">
        <line x1="0" y1="40" x2="400" y2="40" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="160" x2="400" y2="160" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="240" x2="400" y2="240" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />

        <line x1="50" y1="0" x2="50" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="100" y1="0" x2="100" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="150" y1="0" x2="150" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="0" x2="200" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="250" y1="0" x2="250" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="300" y1="0" x2="300" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="350" y1="0" x2="350" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      {/* Orbital Circles */}
      <circle cx="200" cy="140" r="105" fill="none" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.4" />
      <circle cx="200" cy="140" r="60" fill="none" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.3" />

      {/* Connecting spokes */}
      <line x1="200" y1="140" x2="105" y2="70" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5 5" />
      <line x1="200" y1="140" x2="295" y2="70" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5 5" />
      <line x1="200" y1="140" x2="105" y2="210" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5 5" />
      <line x1="200" y1="140" x2="295" y2="210" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5 5" />

      {/* Animating Data Packets */}
      <motion.circle r="4" fill="#4ADE80" filter="url(#glow-green)" animate={{ cx: [105, 200], cy: [70, 140] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }} />
      <motion.circle r="4" fill="#3B82F6" filter="url(#glow-green)" animate={{ cx: [200, 295], cy: [140, 70] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.5 }} />
      <motion.circle r="4" fill="#F6C744" filter="url(#glow-green)" animate={{ cx: [105, 200], cy: [210, 140] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }} />
      <motion.circle r="4" fill="#A855F7" filter="url(#glow-green)" animate={{ cx: [200, 295], cy: [140, 210] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.3 }} />

      {/* Outer Integration Node 1 (Top Left) */}
      <motion.g animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <circle cx="105" cy="70" r="24" fill="#171717" stroke="#333333" strokeWidth="1.5" />
        <text x="105" y="75" textAnchor="middle" fontSize="14">⚡</text>
      </motion.g>

      {/* Outer Integration Node 2 (Top Right) */}
      <motion.g animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}>
        <circle cx="295" cy="70" r="24" fill="#171717" stroke="#333333" strokeWidth="1.5" />
        <text x="295" y="75" textAnchor="middle" fontSize="14">📂</text>
      </motion.g>

      {/* Outer Integration Node 3 (Bottom Left) */}
      <motion.g animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}>
        <circle cx="105" cy="210" r="24" fill="#171717" stroke="#333333" strokeWidth="1.5" />
        <text x="105" y="215" textAnchor="middle" fontSize="14">📧</text>
      </motion.g>

      {/* Outer Integration Node 4 (Bottom Right) */}
      <motion.g animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}>
        <circle cx="295" cy="210" r="24" fill="#171717" stroke="#333333" strokeWidth="1.5" />
        <text x="295" y="215" textAnchor="middle" fontSize="14">🛡️</text>
      </motion.g>

      {/* Center Core Node */}
      <g>
        <circle cx="200" cy="140" r="32" fill="#171717" stroke="#4ADE80" strokeWidth="2.5" filter="url(#glow-green)" />
        <motion.circle
          cx="200"
          cy="140"
          r="26"
          fill="none"
          stroke="#4ADE80"
          strokeWidth="1"
          strokeDasharray="6 3"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          style={{ transformOrigin: '200px 140px' }}
        />
        <text x="200" y="146" textAnchor="middle" fontSize="18">⚙️</text>
      </g>
    </svg>
  );
}

// --- ANIMATION GRAPHIC 3: DEPLOY & SUPPORT ---
function DeployGraphic() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-h-[300px]">
      <defs>
        <filter id="glow-blue-solid" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Grid Background Pattern */}
      <g opacity="0.12">
        <line x1="0" y1="40" x2="400" y2="40" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="80" x2="400" y2="80" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="160" x2="400" y2="160" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="240" x2="400" y2="240" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />

        <line x1="50" y1="0" x2="50" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="100" y1="0" x2="100" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="150" y1="0" x2="150" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="0" x2="200" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="250" y1="0" x2="250" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="300" y1="0" x2="300" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="350" y1="0" x2="350" y2="280" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
      </g>

      {/* Console Frame */}
      <rect x="25" y="20" width="350" height="240" rx="16" fill="#171717" stroke="#333333" strokeWidth="1.5" />
      <line x1="25" y1="52" x2="375" y2="52" stroke="#333333" strokeWidth="1.5" />

      {/* Console LED buttons */}
      <circle cx="45" cy="36" r="4" fill="#FF5F56" />
      <circle cx="57" cy="36" r="4" fill="#FFBD2E" />
      <circle cx="69" cy="36" r="4" fill="#27C93F" />
      <text x="350" y="40" textAnchor="end" fontSize="9" fontFamily="monospace" fill="#737373" fontWeight="bold">sandbox: active</text>

      {/* Loading Wavy Wires (Metrics Graph) */}
      <motion.path
        d="M 45 220 Q 80 180, 115 220 T 185 220 T 255 220 T 325 220"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2"
        opacity="0.4"
        animate={{
          d: [
            "M 45 220 Q 80 180, 115 220 T 185 220 T 255 220 T 325 220",
            "M 45 220 Q 80 240, 115 200 T 185 230 T 255 210 T 325 220",
            "M 45 220 Q 80 180, 115 220 T 185 220 T 255 220 T 325 220"
          ]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      <motion.path
        d="M 45 220 Q 80 220, 115 180 T 185 210 T 255 230 T 325 200"
        fill="none"
        stroke="#F6C744"
        strokeWidth="2"
        opacity="0.3"
        animate={{
          d: [
            "M 45 220 Q 80 220, 115 180 T 185 210 T 255 230 T 325 200",
            "M 45 220 Q 80 190, 115 230 T 185 190 T 255 200 T 325 220",
            "M 45 220 Q 80 220, 115 180 T 185 210 T 255 230 T 325 200"
          ]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Central Circular Gauge */}
      <g>
        {/* Underlay tracking circle */}
        <circle cx="200" cy="140" r="52" fill="none" stroke="#333333" strokeWidth="6" />
        
        {/* Loading ring */}
        <motion.circle
          cx="200"
          cy="140"
          r="52"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="6"
          strokeDasharray="326"
          strokeLinecap="round"
          filter="url(#glow-blue-solid)"
          animate={{ strokeDashoffset: [326, 65] }} // loads to 80%
          transition={{ duration: 2.5, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Pulsating Center Guard Loop icon */}
        <motion.circle
          cx="200"
          cy="140"
          r="30"
          fill="#171717"
          stroke="#333333"
          strokeWidth="1"
          animate={{ scale: [0.96, 1.04, 0.96] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <text x="200" y="146" textAnchor="middle" fontSize="18">🔒</text>
      </g>

      {/* Floating Status Check badge */}
      <motion.g
        x="245"
        y="65"
        initial={{ y: 0 }}
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="250" y="65" width="100" height="28" rx="8" fill="#171717" stroke="#27C93F" strokeWidth="1" />
        <circle cx="262" cy="79" r="3.5" fill="#27C93F" />
        <text x="274" y="82" fill="#27C93F" fontSize="8" fontFamily="monospace" fontWeight="bold">SECURE LOOPS</text>
      </motion.g>

      {/* Floating Deployment Alert */}
      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [3, -3, 3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <rect x="50" y="75" width="85" height="28" rx="8" fill="#171717" stroke="#F6C744" strokeWidth="1" />
        <text x="60" y="92" fill="#F6C744" fontSize="8" fontFamily="monospace" fontWeight="bold">⚡ DEPLOYED</text>
      </motion.g>
    </svg>
  );
}

// --- CORE STEPS COMPONENT ---
const steps = [
  {
    number: 1,
    title: "Scope & Architecture",
    desc: "We convert your operational goals into formal agent specifications, scoping data requirements, vector storage, and safety loops.",
    graphic: ScopeGraphic
  },
  {
    number: 2,
    title: "Connect & Integrate",
    desc: "We securely integrate custom LLMs and RAG engines with your database and internal SaaS stack under strict permission bounds.",
    graphic: ConnectGraphic
  },
  {
    number: 3,
    title: "Deploy & Support",
    desc: "We publish sandbox applications for internal testing, and then deploy live to your users with zero per-user licensing fees.",
    graphic: DeployGraphic
  }
];

function Item({ index, graphic: Graphic, title, desc, onInView }) {
  const ref = useRef(null);
  // Trigger when 40% of the element is visible in the viewport
  const isInView = useInView(ref, { amount: 0.4 });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div ref={ref} className="min-h-[55vh] flex flex-col justify-center py-12 first:pt-0 last:pb-0">
      {/* Mobile-only header block (shown below md breakpoint) */}
      <div className="md:hidden flex flex-col gap-3 mb-6">
        <span className="text-brand-yellow font-bold text-xs uppercase tracking-wider">Step {index + 1}</span>
        <h3 className="text-2xl font-heading font-bold text-brand-dark">{title}</h3>
        <p className="text-brand-text-muted text-[0.95rem] leading-relaxed">{desc}</p>
      </div>

      {/* Motion graphic card container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-brand-bg-light p-6 md:p-8 rounded-2xl border border-brand-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group flex items-center justify-center min-h-[260px] md:min-h-[300px]"
      >
        <Graphic />
      </motion.div>
    </div>
  );
}

export default function StepsShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative flex flex-col md:flex-row gap-16 items-start">
      {/* Left Column (Sticky on Desktop) */}
      <div className="w-full md:w-[45%] md:sticky md:top-32 self-start flex flex-col gap-8">
        <div className="text-left flex flex-col gap-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark flex flex-col gap-3 items-start leading-[1.15]">
            <span>How we deliver</span>
            <span className="text-brand-yellow">business automation</span>
          </h2>
          <p className="text-brand-text-muted text-base max-w-[480px] leading-relaxed">
            From initial design blueprint to robust agent execution, we handle the complexity securely.
          </p>
        </div>

        {/* Vertical Progress Tracker List */}
        <div className="flex gap-6 relative min-h-[220px]">
          {/* Vertical progress track line */}
          <div className="w-[3px] bg-brand-border/30 rounded-full relative my-1">
            <motion.div
              className="absolute top-0 left-0 w-full bg-brand-yellow rounded-full"
              animate={{
                height: `${((activeStep + 1) / 3) * 100}%`
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>

          {/* Steps texts buttons */}
          <div className="flex flex-col justify-between py-1 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-start gap-1 transition-all duration-300 ${
                  activeStep === idx ? 'opacity-100' : 'opacity-40 hover:opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300 ${
                    activeStep === idx 
                      ? 'bg-brand-yellow border-brand-yellow text-brand-dark shadow-md scale-105' 
                      : 'border-brand-border text-brand-text-muted bg-white'
                  }`}>
                    {step.number}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-brand-dark">
                    {step.title}
                  </h4>
                </div>

                {/* Smooth expand/collapse description using Framer Motion */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeStep === idx ? "auto" : 0,
                    opacity: activeStep === idx ? 1 : 0
                  }}
                  className="overflow-hidden"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="text-brand-text-muted text-[0.92rem] leading-relaxed mt-1.5 pl-10 max-w-[420px]">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (Scrollable on Desktop) */}
      <div className="w-full md:w-[50%] flex flex-col gap-12 md:gap-16">
        {steps.map((step, index) => (
          <Item
            key={index}
            index={index}
            graphic={step.graphic}
            title={step.title}
            desc={step.desc}
            onInView={setActiveStep}
          />
        ))}
      </div>
    </div>
  );
}
