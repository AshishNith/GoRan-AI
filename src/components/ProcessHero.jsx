import {
  Bot,
  CalendarCheck,
  Check,
  Clock,
  Database,
  Mail,
  MessageCircle,
  Phone,
  Webhook,
  Workflow,
} from 'lucide-react';
import { ImageStreamHero } from '@/components/ui/image-stream-hero';

// Intro to the process section: the heading sits in a corridor of small product-style
// cards rushing toward the viewer. Each card is an inline SVG drawn on a 180 x 250 canvas (the
// corridor's 18:25 card ratio), so it scales cleanly at any depth.

const YELLOW = '#F6C744';
const INK = '#171717';
const MUTED = '#737373';
const LINE = '#E5E5E5';
const SOFT = '#F5F5F5';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const HEADING = { fontFamily: 'var(--font-heading)' };

const TONES = {
  light: { bg: '#FFFFFF', border: LINE, text: INK, muted: MUTED, line: LINE, soft: SOFT },
  dark: { bg: INK, border: INK, text: '#FFFFFF', muted: 'rgba(255,255,255,0.5)', line: 'rgba(255,255,255,0.1)', soft: 'rgba(255,255,255,0.08)' },
  yellow: { bg: YELLOW, border: YELLOW, text: INK, muted: 'rgba(23,23,23,0.6)', line: 'rgba(23,23,23,0.12)', soft: 'rgba(23,23,23,0.08)' },
};

const PILLS = {
  live: ['#ECFDF5', '#047857'],
  yellow: [YELLOW, INK],
  dark: [INK, '#FFFFFF'],
  soft: [SOFT, MUTED],
};

function Card({ t, children }) {
  return (
    <svg viewBox="0 0 180 250" className="block h-full w-full">
      <rect x="0.5" y="0.5" width="179" height="249" rx="14" fill={t.bg} stroke={t.border} />
      {children}
    </svg>
  );
}

function Pill({ x, y, label, kind = 'live', anchor = 'end' }) {
  const [bg, fg] = PILLS[kind];
  const width = label.length * 5 + 12;
  const left = anchor === 'end' ? x - width : x;
  return (
    <g>
      <rect x={left} y={y} width={width} height="13" rx="6.5" fill={bg} />
      <text x={left + width / 2} y={y + 9} textAnchor="middle" fontSize="6.5" fontWeight="700" letterSpacing="0.5" fill={fg}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function Header({ t, icon: Icon, label, pill, pillKind }) {
  return (
    <g>
      <Icon x={14} y={14} width={11} height={11} color={t.muted} strokeWidth={2} />
      <text x="30" y="22.5" fontSize="8" fontFamily={MONO} fill={t.muted}>{label}</text>
      {pill && <Pill x={166} y={13} label={pill} kind={pillKind} />}
      <line x1="0" x2="180" y1="38" y2="38" stroke={t.line} />
    </g>
  );
}

function CheckDot({ cx, cy, fill = YELLOW, color = INK }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="6" fill={fill} />
      <Check x={cx - 3.5} y={cy - 3.5} width={7} height={7} color={color} strokeWidth={3.5} />
    </g>
  );
}

// 1. A WhatsApp lead answered in seconds
function ChatCard() {
  const t = TONES.light;
  return (
    <Card t={t}>
      <Header t={t} icon={MessageCircle} label="whatsapp" pill="Live" pillKind="live" />
      <rect x="14" y="52" width="118" height="34" rx="10" fill={SOFT} />
      <text x="22" y="66" fontSize="9" fill={INK}>Hi! Is the 2BHK</text>
      <text x="22" y="78" fontSize="9" fill={INK}>still available?</text>
      <rect x="48" y="96" width="118" height="34" rx="10" fill={YELLOW} />
      <text x="56" y="110" fontSize="9" fontWeight="600" fill={INK}>Yes! Want a site</text>
      <text x="56" y="122" fontSize="9" fontWeight="600" fill={INK}>visit this Saturday?</text>
      <rect x="14" y="140" width="84" height="22" rx="10" fill={SOFT} />
      <text x="22" y="154.5" fontSize="9" fill={INK}>Sat 11 AM works</text>
      <rect x="86" y="172" width="80" height="22" rx="10" fill={YELLOW} />
      <text x="94" y="186.5" fontSize="9" fontWeight="600" fill={INK}>You're booked</text>
      <line x1="0" x2="180" y1="212" y2="212" stroke={t.line} />
      <CheckDot cx={20} cy={229} fill="#ECFDF5" color="#047857" />
      <text x="32" y="232" fontSize="8" fill={MUTED}>Replied in 8 seconds</text>
    </Card>
  );
}

// 2. The lead score the agent works out
function ScoreCard() {
  const t = TONES.dark;
  const circumference = 2 * Math.PI * 34;
  const rows = [['Budget', '₹40–60L'], ['Timeline', 'This month'], ['Intent', 'Site visit']];
  return (
    <Card t={t}>
      <text x="14" y="25" fontSize="7.5" fontWeight="700" letterSpacing="1.2" fill={t.muted}>LEAD SCORE</text>
      <Pill x={166} y={15} label="Hot" kind="yellow" />
      <circle cx="90" cy="86" r="34" fill="none" stroke={t.soft} strokeWidth="8" />
      <circle
        cx="90"
        cy="86"
        r="34"
        fill="none"
        stroke={YELLOW}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${circumference * 0.92} ${circumference}`}
        transform="rotate(-90 90 86)"
      />
      <text x="90" y="95" textAnchor="middle" fontSize="26" fontWeight="700" fill="#FFFFFF" style={HEADING}>92</text>
      {rows.map(([label, value], idx) => {
        const y = 156 + idx * 28;
        return (
          <g key={label}>
            {idx > 0 && <line x1="14" x2="166" y1={y - 14} y2={y - 14} stroke={t.line} />}
            <CheckDot cx={20} cy={y} />
            <text x="32" y={y + 3} fontSize="8" fill={t.muted}>{label}</text>
            <text x="166" y={y + 3} textAnchor="end" fontSize="8.5" fontWeight="600" fill="#FFFFFF">{value}</text>
          </g>
        );
      })}
    </Card>
  );
}

// 3. Leads landing in the CRM, already tagged
function CrmCard() {
  const t = TONES.light;
  const rows = [
    ['Priya S.', 'Facebook ad', 'Hot', 'yellow'],
    ['Arjun M.', 'Website form', 'Warm', 'soft'],
    ['Neha K.', 'Google ad', 'New', 'dark'],
    ['Rohan D.', 'WhatsApp', 'Hot', 'yellow'],
    ['Kavya R.', 'Referral', 'Warm', 'soft'],
  ];
  return (
    <Card t={t}>
      <Header t={t} icon={Database} label="crm" pill="Synced" pillKind="live" />
      {rows.map(([name, source, status, kind], idx) => {
        const y = 56 + idx * 36;
        return (
          <g key={name}>
            {idx > 0 && <line x1="14" x2="166" y1={y - 4} y2={y - 4} stroke={LINE} />}
            <circle cx="26" cy={y + 14} r="10" fill={SOFT} />
            <text x="26" y={y + 17.5} textAnchor="middle" fontSize="9" fontWeight="700" fill={INK}>{name[0]}</text>
            <text x="42" y={y + 12} fontSize="9" fontWeight="600" fill={INK}>{name}</text>
            <text x="42" y={y + 23} fontSize="7.5" fill={MUTED}>{source}</text>
            <Pill x={166} y={y + 7.5} label={status} kind={kind} />
          </g>
        );
      })}
    </Card>
  );
}

// 4. The voice agent mid-call
const WAVE = [6, 12, 20, 10, 26, 16, 32, 22, 14, 28, 36, 24, 30, 18, 26, 12, 22, 16, 10, 14, 6];

function CallCard() {
  const t = TONES.yellow;
  return (
    <Card t={t}>
      <circle cx="90" cy="62" r="31" fill="none" stroke={INK} strokeOpacity="0.15" />
      <circle cx="90" cy="62" r="22" fill={INK} />
      <Phone x={81} y={53} width={18} height={18} color={YELLOW} strokeWidth={2} />
      <text x="90" y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK} style={HEADING}>AI voice agent</text>
      <text x="90" y="128" textAnchor="middle" fontSize="8" fill={t.muted}>Outbound call · 01:24</text>
      {WAVE.map((height, idx) => (
        <rect key={idx} x={29 + idx * 6} y={160 - height / 2} width="3.5" height={height} rx="1.75" fill={INK} />
      ))}
      <rect x="40" y="198" width="100" height="24" rx="12" fill={INK} />
      <Check x={54} y={205} width={10} height={10} color={YELLOW} strokeWidth={3} />
      <text x="68" y="213" fontSize="8.5" fontWeight="700" fill="#FFFFFF">Visit booked</text>
    </Card>
  );
}

// 5. The automation flow behind it
function FlowCard() {
  const t = TONES.light;
  const nodes = [
    ['Trigger', 'New form lead', Webhook],
    ['AI agent', 'Qualify & score', Bot],
    ['Action', 'Update CRM', Database],
    ['Action', 'Send WhatsApp', MessageCircle],
  ];
  return (
    <Card t={t}>
      <Header t={t} icon={Workflow} label="automation" pill="Active" pillKind="live" />
      {nodes.map(([kind, title, Icon], idx) => {
        const y = 52 + idx * 46;
        const ai = idx === 1;
        return (
          <g key={title}>
            {idx > 0 && <line x1="90" x2="90" y1={y - 14} y2={y} stroke={MUTED} strokeOpacity="0.5" strokeDasharray="2 3" />}
            <rect x="20" y={y} width="140" height="32" rx="9" fill={ai ? YELLOW : '#FFFFFF'} stroke={ai ? YELLOW : LINE} />
            <rect x="27" y={y + 7} width="18" height="18" rx="5" fill={ai ? INK : SOFT} />
            <Icon x={31} y={y + 11} width={10} height={10} color={ai ? YELLOW : INK} strokeWidth={2} />
            <text x="52" y={y + 13.5} fontSize="6.5" fontWeight="700" letterSpacing="0.6" fill={ai ? 'rgba(23,23,23,0.6)' : MUTED}>{kind.toUpperCase()}</text>
            <text x="52" y={y + 24.5} fontSize="8.5" fontWeight="600" fill={INK}>{title}</text>
          </g>
        );
      })}
    </Card>
  );
}

// 6. Reply time after go-live
const BARS = [30, 38, 34, 46, 42, 54, 50, 62, 58, 70, 66, 84];

function StatsCard() {
  const t = TONES.dark;
  return (
    <Card t={t}>
      <text x="14" y="25" fontSize="7.5" fontWeight="700" letterSpacing="1.2" fill={t.muted}>AVG. REPLY TIME</text>
      <text x="12" y="74" fontSize="40" fontWeight="700" fill={YELLOW} style={HEADING}>42s</text>
      <text x="14" y="92" fontSize="8" fill={t.muted}>87% faster than manual</text>
      {BARS.map((height, idx) => (
        <rect
          key={idx}
          x={14 + idx * 13}
          y={196 - height}
          width="9"
          height={height}
          rx="2"
          fill={idx === BARS.length - 1 ? YELLOW : 'rgba(255,255,255,0.12)'}
        />
      ))}
      <line x1="14" x2="166" y1="197" y2="197" stroke={t.line} />
      <text x="14" y="222" fontSize="7.5" fill={t.muted}>Leads handled · last 12 weeks</text>
    </Card>
  );
}

// 7. A visit booked straight into the calendar
function CalendarCard() {
  const t = TONES.light;
  const colWidth = 152 / 7;
  return (
    <Card t={t}>
      <Header t={t} icon={CalendarCheck} label="calendar" pill="Booked" pillKind="yellow" />
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
        <text key={idx} x={14 + colWidth * (idx + 0.5)} y="58" textAnchor="middle" fontSize="7" fontWeight="700" fill={MUTED}>{day}</text>
      ))}
      {Array.from({ length: 28 }, (_, idx) => {
        const date = idx + 1;
        const cx = 14 + colWidth * ((idx % 7) + 0.5);
        const cy = 76 + Math.floor(idx / 7) * 22;
        const booked = date === 20;
        return (
          <g key={date}>
            {booked && <circle cx={cx} cy={cy - 2.5} r="8.5" fill={YELLOW} />}
            <text x={cx} y={cy} textAnchor="middle" fontSize="7.5" fontWeight={booked ? '700' : '400'} fill={booked ? INK : MUTED}>{date}</text>
          </g>
        );
      })}
      <rect x="14" y="174" width="152" height="46" rx="10" fill={INK} />
      <rect x="14" y="174" width="4" height="46" fill={YELLOW} />
      <text x="28" y="193" fontSize="9" fontWeight="700" fill="#FFFFFF">Site visit · Priya S.</text>
      <Clock x={28} y={201} width={8} height={8} color="rgba(255,255,255,0.6)" strokeWidth={2} />
      <text x="40" y="208" fontSize="7.5" fill="rgba(255,255,255,0.6)">Sat 20 · 11:00 AM</text>
    </Card>
  );
}

// 8. The follow-up email that goes out on its own
function EmailCard() {
  const t = TONES.dark;
  return (
    <Card t={t}>
      <Header t={t} icon={Mail} label="follow-up" pill="Sent" pillKind="yellow" />
      <text x="14" y="58" fontSize="7.5" fill={t.muted}>To: priya@gmail.com</text>
      <text x="14" y="76" fontSize="9" fontWeight="700" fill="#FFFFFF">Your site visit is confirmed</text>
      {[152, 138, 146, 96].map((width, idx) => (
        <rect key={idx} x="14" y={90 + idx * 11} width={width} height="4" rx="2" fill={t.soft} />
      ))}
      <rect x="14" y="146" width="88" height="22" rx="11" fill={YELLOW} />
      <text x="58" y="160" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={INK}>Add to calendar</text>
      <line x1="0" x2="180" y1="200" y2="200" stroke={t.line} />
      <circle cx="18" cy="222" r="3" fill="#34D399" />
      <text x="28" y="225" fontSize="8" fill={t.muted}>Opened 2 min ago</text>
    </Card>
  );
}

// 9. The agent running live
const TREND = [0.18, 0.3, 0.26, 0.42, 0.38, 0.55, 0.5, 0.66, 0.72, 0.68, 0.84, 0.95];

function AgentCard() {
  const t = TONES.light;
  const points = TREND.map((v, idx) => [14 + (idx * 152) / (TREND.length - 1), 178 - v * 58]);
  const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const [endX, endY] = points[points.length - 1];
  return (
    <Card t={t}>
      <Header t={t} icon={Bot} label="lead-qualifier" pill="Live" pillKind="live" />
      <text x="14" y="76" fontSize="26" fontWeight="700" fill={INK} style={HEADING}>1,284</text>
      <text x="14" y="90" fontSize="8" fill={MUTED}>leads handled this month</text>
      <polygon points={`14,180 ${line} 166,180`} fill={YELLOW} fillOpacity="0.18" />
      <polyline points={line} fill="none" stroke={YELLOW} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={endX} cy={endY} r="4" fill={INK} stroke={YELLOW} strokeWidth="2" />
      <line x1="14" x2="166" y1="180" y2="180" stroke={LINE} />
      <CheckDot cx={20} cy={202} fill="#ECFDF5" color="#047857" />
      <text x="32" y="205" fontSize="8" fill={INK}>Synced to CRM</text>
      <CheckDot cx={20} cy={224} fill="#ECFDF5" color="#047857" />
      <text x="32" y="227" fontSize="8" fill={INK}>0 missed leads</text>
    </Card>
  );
}

// Alternating light, dark and yellow so neighbouring cards stand apart in the corridor
const STREAM_CARDS = [
  { alt: 'WhatsApp lead answered in seconds', content: <ChatCard /> },
  { alt: 'Lead score of 92', content: <ScoreCard /> },
  { alt: 'Leads synced to the CRM', content: <CrmCard /> },
  { alt: 'AI voice agent on a call', content: <CallCard /> },
  { alt: 'Automation workflow', content: <FlowCard /> },
  { alt: 'Average reply time of 42 seconds', content: <StatsCard /> },
  { alt: 'Site visit booked in the calendar', content: <CalendarCard /> },
  { alt: 'Follow-up email sent', content: <EmailCard /> },
  { alt: 'Lead qualifier agent running live', content: <AgentCard /> },
];

// Rounder corners to match the site's cards
const STREAM_PATH = { cardRadius: 1.4 };

export default function ProcessHero({ className = '' }) {
  return (
    <ImageStreamHero
      images={STREAM_CARDS}
      path={STREAM_PATH}
      className={`steps-visual-bg h-[400px] md:h-[540px] w-full rounded-3xl bg-brand-bg-light border border-brand-border/70 ${className}`}
    >
      {/* Fade the top and bottom so the copy stays readable over the cards */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-2/5 bg-gradient-to-b from-brand-bg-light via-brand-bg-light/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-brand-bg-light via-brand-bg-light/80 to-transparent" />

      {/* Blurred edges on both sides, so the cards seem to slip out of view rather than be cut off */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[22%] backdrop-blur-[6px] bg-gradient-to-r from-brand-bg-light via-brand-bg-light/70 to-transparent"
        style={{ maskImage: 'linear-gradient(to right, #000 30%, transparent)', WebkitMaskImage: 'linear-gradient(to right, #000 30%, transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[22%] backdrop-blur-[6px] bg-gradient-to-l from-brand-bg-light via-brand-bg-light/70 to-transparent"
        style={{ maskImage: 'linear-gradient(to left, #000 30%, transparent)', WebkitMaskImage: 'linear-gradient(to left, #000 30%, transparent)' }}
      />

      <div className="relative z-20 flex h-full flex-col items-center justify-between py-10 md:py-14 text-center">
        <div className="px-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text-muted">What our agents handle</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.1] mt-3 mb-0 text-balance">
            Your business, <span className="text-brand-yellow">on autopilot</span>
          </h2>
        </div>
        <p className="max-w-[440px] text-balance px-6 text-sm md:text-base leading-relaxed text-brand-text-muted m-0">
          Every lead answered, scored, synced and booked around the clock, without your team lifting a finger.
        </p>
      </div>
    </ImageStreamHero>
  );
}
