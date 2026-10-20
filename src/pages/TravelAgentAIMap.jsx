import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Download, ArrowRight, Check, Copy, Maximize2, Mail, Moon, Clock, UserX } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import WhatsappIcon from '../components/ui/WhatsappIcon';
import { useCalBooking } from '../components/CalBookingModal';
import { buildBreadcrumbSchema } from '../seo/schemas';

const PDF_URL = '/travel-agent-ai-map.pdf';
const MAP_IMAGE = '/travel-agent-ai-map.png';
const WHATSAPP_AUDIT_URL = 'https://wa.me/919934225353?text=AUDIT%20-%20I%20read%20the%20Travel%20Agent%20AI%20Map%20and%20want%20the%20free%20Booking%20Leak%20Audit.';
const AUDIT_EMAIL = 'ashish@goran.in';

const GREEN = '#16A34A';

const lines = [
  {
    no: 1,
    name: 'Instagram',
    color: '#E5383B',
    tagline: 'Where travellers dream. Turn scrolling into enquiries.',
    stops: [
      { name: 'Destination reels', sub: 'Inspire & attract', desc: '15–30 sec reels, one destination, one hook in the first 2 seconds: a price, a view, or a myth busted. Post 4–5 a week.', ai: 'Script a month of reels in one sitting and schedule them all.' },
      { name: 'Itinerary posts', sub: 'Show real experiences', desc: 'Carousels of real trips, day by day, with what was included and roughly what it cost. Real customer photos beat stock every time.', ai: 'Turn every confirmed itinerary into a ready carousel draft.' },
      { name: 'Story CTAs', sub: 'Polls, questions, swipe up', desc: 'Polls like “Kashmir or Kerala this winter?” Every vote or reply is someone raising their hand.', ai: 'Auto-DM everyone who votes or replies with a matching package.' },
      { name: 'Comment-to-DM', sub: 'Turn engagement into enquiries', desc: 'Ask viewers to comment a keyword (“KASHMIR”). They get the package in their DMs instantly, with a WhatsApp link.', ai: 'Keyword-triggered DMs, 24/7. Exactly how this guide reached you.' },
    ],
  },
  {
    no: 2,
    name: 'Google',
    color: '#DB2E78',
    tagline: 'Where travellers search. Be the agency they find and trust.',
    stops: [
      { name: 'Maps profile', sub: 'Get found locally', desc: 'A fully filled Google Business Profile: right categories, 20+ real photos, WhatsApp and call buttons, a fresh post every week.', ai: 'Auto-reply to every review and question within minutes.' },
      { name: 'Review requests', sub: 'Build trust & credibility', desc: 'Ask on the last day of the trip while they’re still happy, not a month later. Make it a single tap.', ai: 'Review link goes out on WhatsApp automatically on the trip end date.' },
      { name: 'Package pages', sub: 'Show offers & itineraries', desc: 'One page per package: price-from, inclusions, dates, photos and a big WhatsApp button. No “call for price” dead ends.', ai: 'Every form fill lands in the CRM and triggers an instant call.' },
      { name: 'Google Ads', sub: 'Target high intent', desc: 'Bid on searches like “Kashmir tour package from Delhi”, not just “travel”. Send each click to the matching package page.', ai: 'Every ad lead gets an AI call within 5 minutes, day or night.' },
    ],
  },
  {
    no: 3,
    name: 'WhatsApp',
    color: '#2F7BE5',
    tagline: 'Where India actually talks. Make it your storefront.',
    stops: [
      { name: 'Sales profile', sub: 'Business details', desc: 'Business account with hours, address, website, catalogue link and a greeting message that asks one useful question.', ai: 'Run it on the WhatsApp Business API so a bot can reply instantly.' },
      { name: 'Trip catalogue', sub: 'Destinations & prices', desc: 'Every package in your WhatsApp catalogue with a price-from, so people browse before they ask.', ai: 'The bot shares the right catalogue item based on what the customer asks.' },
      { name: 'Daily status', sub: 'Deals & updates', desc: 'Last-minute seats, group departures, happy-customer photos. Your status is a free daily ad to everyone who saved your number.', ai: 'Plan a full week of status posts in one go.' },
      { name: 'Broadcast lists', sub: 'Re-engage audience', desc: 'Segment by interest: honeymoon, family, pilgrimage, international. Only message people who opted in, using approved templates.', ai: 'Seasonal offers go to the right segment automatically.' },
      { name: 'Follow-up nudges', sub: 'Recover cold leads', desc: 'When someone goes quiet after a quote, a planned sequence follows up for you (scripts below).', ai: 'Nudges stop the moment the customer replies or pays.' },
    ],
  },
  {
    no: 4,
    name: 'AI calling agents',
    color: '#F07C19',
    tagline: 'The line most agencies are missing. Every call answered, 24/7.',
    stops: [
      { name: 'Inbound agent', sub: 'Pick up + qualify', desc: 'Every call answered 24/7 in Hindi, English or a regional language, many calls at once. No busy tone, no “call after 10 AM”.', ai: 'Human-sounding voice agent trained on your packages and FAQs.' },
      { name: 'Speed-to-lead', sub: 'Within 5 minutes', desc: 'Every form, ad lead or website enquiry gets a call within 5 minutes, before they finish messaging other agents.', ai: 'The agent dials automatically the moment a lead lands.' },
      { name: 'Needs capture', sub: 'Budget, dates, group size', desc: 'Destination, dates, travellers, budget, departure city, hotel category, occasion. Asked naturally, written down every single time.', ai: 'Answers go straight into the CRM with a short call summary.' },
      { name: 'Callback agent', sub: 'Missed calls → follow up', desc: 'Missed a call? It gets called back automatically within minutes, not whenever someone remembers.', ai: 'A missed-call trigger starts the callback with full context.' },
      { name: 'Payment agent', sub: 'Confirm & collect', desc: 'A reminder call before the advance or balance is due, with the payment link sent on WhatsApp during the call.', ai: 'Polite reminders until paid, then an instant confirmation.' },
    ],
  },
  {
    no: 5,
    name: 'Cold outreach',
    color: '#1E9E55',
    tagline: 'Bookings you go and get. Start with people who already know you.',
    stops: [
      { name: 'Targeted lists', sub: 'Past travellers / niche', desc: 'Start with your own past customers: the cheapest bookings you’ll ever get. Then niches like corporate offsites, schools, wedding and pilgrimage groups.', ai: 'Build and clean lists automatically, tagged by niche.' },
      { name: 'Warmed inboxes', sub: 'Personalised DM', desc: 'Warmed-up email domains and personalised LinkedIn or Instagram DMs that mention something real about them. No blasts.', ai: 'Personalise the first line for every lead, at scale.' },
      { name: '3-step sequence', sub: 'Value → Offer → CTA', desc: 'Message 1: a free trip idea. Message 2: a specific group offer. Message 3: “15-min call this week?” Then stop.', ai: 'The sequence runs itself; replies land straight in your inbox.' },
    ],
  },
  {
    no: 6,
    name: 'Meta ads',
    color: '#7444DF',
    tagline: 'Paid reach that lands straight in WhatsApp.',
    stops: [
      { name: 'Click-to-chat ads', sub: 'Instant WhatsApp', desc: 'The ad opens a WhatsApp chat instead of a form. The bot replies in seconds with the package and a few qualifying questions.', ai: 'The bot qualifies the chat and books a call slot.' },
      { name: 'Retarget viewers', sub: 'Past engagers', desc: 'Show offers to people who watched half your reels or visited a package page but never enquired.', ai: 'Audiences refresh themselves as new people engage.' },
      { name: 'Lead form ads', sub: 'Travel interest form', desc: 'Keep it short: name, phone, destination, travel month. Every extra question costs you leads.', ai: 'The AI calls each lead within 5 minutes of submitting.' },
      { name: 'Book-a-call ads', sub: 'Schedule consultation', desc: 'For high-ticket trips (international, honeymoons, big groups), let people pick a call slot directly.', ai: 'Reminders before the call so they actually show up.' },
    ],
  },
];

const lineColor = Object.fromEntries(lines.map((l) => [l.no, l.color]));

const leaks = [
  { no: '01', color: lineColor[1], icon: Moon, title: 'After-hours silence', text: 'Travellers plan trips at night and on weekends, exactly when your team is offline. The enquiry sits unread till morning.' },
  { no: '02', color: lineColor[4], icon: Clock, title: 'Slow first reply', text: 'By the time someone calls back, the traveller has messaged three other agents. The first useful reply usually wins.' },
  { no: '03', color: lineColor[6], icon: UserX, title: 'No follow-up', text: 'Quote sent, customer goes quiet, nobody chases. Most “lost” leads were never lost. They were just left alone.' },
];

const zones = [
  { label: 'Zone 1 · Reach', strong: '6 lines', text: 'bring enquiries in: Instagram, Google, WhatsApp, AI calling agents, cold outreach and Meta ads.' },
  { label: 'Zone 2 · Capture', strong: '2 junctions', text: 'catch every call, chat and form, so nothing sits in a personal phone or a forgotten inbox.' },
  { label: 'Zone 3 · Close', strong: '1 close zone', text: 'where AI qualifies, quotes and collects the advance. Your team steps in only for hot leads.' },
];

const buildFirst = [
  { color: lineColor[4], q: 'Lots of phone enquiries?', a: 'Start with Line 4. Missed calls are the most expensive leak you have.' },
  { color: lineColor[1], q: 'Strong on Instagram?', a: 'Line 1 comment-to-DM plus Line 3 WhatsApp turns views into chats.' },
  { color: lineColor[5], q: 'Have a list of past travellers?', a: 'Line 5 first. Repeat customers are the cheapest bookings there are.' },
  { color: lineColor[6], q: 'Already running ads?', a: 'Line 6 click-to-chat, plus a 5-minute AI call on every lead.' },
];

const junctions = [
  { name: 'Enquiry Central', sub: 'All enquiries in one place', points: ['Every DM, comment, call, form, WhatsApp chat and ad lead lands in one CRM.', 'Each lead is tagged with the line it came from, so you know which line actually pays.', 'No more leads living in someone’s personal phone.'] },
  { name: 'Inbox Junction', sub: 'Sort · Qualify · Assign', points: ['AI scores each lead hot, warm or cold from budget, dates and intent.', 'Hot leads go to a person with the full conversation summary attached.', 'Warm and cold leads stay in automated nurture until they’re ready.'] },
];

const closeSteps = [
  { label: 'Step 1', name: 'Qualify', text: 'Budget, dates, group size, departure city, hotel category, occasion. AI asks on chat or call and logs it.' },
  { label: 'Step 2', name: 'Book', text: 'Auto-quote with a day-wise itinerary, a payment link for the advance, reminders until paid.' },
  { label: 'Step 3', name: 'Close', text: 'Vouchers, tickets, final itinerary PDF and pre-trip checklist, all sent automatically.' },
  { label: 'Destination', name: 'Bank', text: 'Advance collected, booking counted. At trip end: a review request and a referral ask.', destination: true },
];

const mindTheGap = [
  { title: 'CRM sync on every enquiry', text: 'If it isn’t in the CRM, it doesn’t exist.' },
  { title: 'Auto-quote + reminders', text: 'A quote in minutes, not tomorrow afternoon.' },
  { title: 'Ghosted-lead recovery', text: 'A planned sequence for everyone who goes quiet.' },
  { title: 'Itinerary + pay link, 1 click', text: 'Remove every step between “yes” and paying.' },
];

const essentials = ['Live availability', 'Dynamic pricing', 'Multi-destination packages', 'Customer support, 24/7', 'Repeat bookings & referrals'];

const touchpoints = ['Destination galleries', 'Itinerary PDFs', 'Travel insurance', 'Visa assistance', 'Group tours', 'Flight & hotel bookings', 'Custom packages', 'Loyalty programs', 'Post-trip feedback', 'Multilingual support'];

const withoutMap = ['DM seen at 10:40 AM next day.', 'Call back at noon. No answer.', 'WhatsApp sent. Blue ticks, silence.', 'She booked last night with the agency that replied in 3 minutes.'];

const withMap = [
  { time: '11:02 PM', color: lineColor[1], text: <>A traveller comments <strong>“KASHMIR”</strong> on your reel.</> },
  { time: '11:02 PM', color: lineColor[1], text: 'Instant DM: the Kashmir package, price-from and a WhatsApp link.' },
  { time: '11:03 PM', color: lineColor[3], text: 'On WhatsApp the bot asks four things: dates, travellers, budget, departure city.' },
  { time: '11:05 PM', color: lineColor[4], text: 'She asks to talk. The AI agent calls her in Hinglish, answers hotel and sightseeing questions, notes everything.' },
  { time: '11:12 PM', color: '#171717', text: <>Two options and a day-wise itinerary land on WhatsApp. Lead marked <strong>HOT</strong> in the CRM.</> },
  { time: '9:30 AM', color: '#171717', text: 'Your agent opens the CRM, sees the full summary and sends a personal voice note.' },
  { time: 'Day 2', color: lineColor[3], text: 'No reply yet? A friendly nudge with photos from a family who did the same trip.' },
  { time: 'Day 3', color: GREEN, text: <>She pays the advance through the UPI link. Vouchers sent automatically. <strong style={{ color: GREEN }}>Booked.</strong></> },
];

const uplift = [
  { value: 20, color: lineColor[4], title: '+20 · After-hours & missed calls', text: 'Answered by the AI agent instead of waiting for morning.' },
  { value: 15, color: lineColor[3], title: '+15 · Ghosted leads', text: 'Won back by a follow-up sequence instead of being forgotten.' },
  { value: 15, color: lineColor[6], title: '+15 · Speed & instant quotes', text: 'A 5-minute response and same-night quote lift conversion.' },
];

const whatsappScript = `Hi {Name}! Thanks for asking about {Destination}. I'm the travel assistant at {Agency}.

To send you the right package, 4 quick questions:
1. Travel dates or month?
2. How many people (adults / kids)?
3. Rough budget per person?
4. Starting from which city?

Reply here, or tap below for a quick call in Hindi or English.`;

const callFlow = [
  { step: 'Open', text: '“Namaste {Name} ji, main {Agency} se bol rahi hoon. Aapne abhi {Destination} trip ke liye enquiry ki thi. 2 minute baat kar sakte hain?”' },
  { step: 'Qualify', text: 'Dates → kitne log (adults, kids) → budget per person → departure city → hotel category → occasion (honeymoon, family, elderly parents).' },
  { step: 'Answer', text: 'Only from your package sheet and FAQs. Never invents prices or availability.' },
  { step: 'Next step', text: '“Main abhi WhatsApp pe aapko 2 options bhej rahi hoon. Kal subah hamare travel expert call karenge, 10 baje theek rahega?”' },
  { step: 'Hand-off', text: 'Anyone who asks for a person, or a hot lead, goes to a human with the full call summary.' },
];

const followUps = [
  { day: 'Day 0 · +2 hrs', text: '“Did the itinerary open properly? Happy to change hotels or add a day.”' },
  { day: 'Day 1', text: 'Social proof: 3 photos or a short video from a family who did the same trip last month.' },
  { day: 'Day 3', text: 'Helpful nudge: best time to visit, what’s included, and “Want me to hold these dates for you?”' },
  { day: 'Day 7', text: 'The break-up message: “Should I close this enquiry, or keep your dates open?” Usually gets the most replies.' },
  { day: 'Day 30', text: 'Re-engage with a fresh package for the same destination or the next season.' },
];

const rollout = [
  { week: 'Week 1', color: lineColor[3], title: 'Plumbing', text: 'One inbox: WhatsApp Business API + CRM. Every source tagged. Trip catalogue live.' },
  { week: 'Week 2', color: lineColor[4], title: 'Never miss a call', text: 'AI inbound agent, missed-call callbacks and 5-minute speed-to-lead on every form.' },
  { week: 'Week 3', color: '#171717', title: 'Close faster', text: 'Auto-quote templates, itinerary PDFs, payment links and the follow-up sequence.' },
  { week: 'Week 4', color: lineColor[1], title: 'Turn up reach', text: 'Comment-to-DM, click-to-WhatsApp ads, review requests, past-customer outreach.' },
];

const auditQuestions = [
  'Is every enquiry answered within 5 minutes, even at 11 PM?',
  'Are missed calls called back automatically?',
  'Do DMs, calls, forms and WhatsApp chats all land in one place?',
  'Do you know which channel brought each booking?',
  'Do you capture budget, dates and group size in the first conversation?',
  'Can you send a quote and itinerary within 15 minutes?',
  'Does every quote get at least 4 follow-ups?',
  'Can customers pay the advance in one tap?',
  'Do you ask every traveller for a Google review at trip end?',
  'Do you message past travellers before every season?',
];

const auditBands = [
  { min: 8, label: '8–10 · Tight', text: 'Your system works. Add reach lines and scale.', bg: '#ECFDF3', fg: GREEN },
  { min: 5, label: '5–7 · Leaking', text: 'You’re losing bookings every week, mostly at night.', bg: '#FFF8E6', fg: '#B7791F' },
  { min: 0, label: '0–4 · Wide open', text: 'The map will pay for itself fastest here.', bg: '#FEF2F2', fg: '#DC2626' },
];

const doneForYou = [
  'AI calling agent: 24/7, multilingual, human-sounding, 30+ calls at once',
  'WhatsApp bot, catalogue and follow-up sequences',
  'One CRM where every enquiry lands, source-tagged',
  'Auto-quotes, itinerary PDFs and payment links',
  'Weekly report: enquiries, bookings and revenue by line',
  'Hindi, English and regional languages',
];

function trackEvent(action) {
  ReactGA.event({ category: 'Travel Agent AI Map', action });
}

function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">{eyebrow}</span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight mt-2">{title}</h2>
      {intro && <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">{intro}</p>}
    </div>
  );
}

function MetroHero() {
  const xs = [30, 90, 150, 210, 270, 330];
  const colors = lines.map((l) => l.color);
  return (
    <svg viewBox="0 0 360 230" className="w-full max-w-md mx-auto" aria-hidden="true">
      {xs.map((x, i) => {
        const endX = 165 + i * 6;
        return (
          <g key={x}>
            <path d={`M${x} 10 V60 C${x} 120 ${endX} 110 ${endX} 160 V205`} fill="none" stroke={colors[i]} strokeWidth="5" strokeLinecap="round" />
            <circle cx={x} cy="22" r="5.5" fill="#fff" stroke={colors[i]} strokeWidth="3" />
            <circle cx={x} cy="50" r="5.5" fill="#fff" stroke={colors[i]} strokeWidth="3" />
          </g>
        );
      })}
      <rect x="148" y="150" width="64" height="16" rx="8" fill="#fff" stroke="#171717" strokeWidth="2.5" />
      <rect x="148" y="176" width="64" height="16" rx="8" fill="#fff" stroke="#171717" strokeWidth="2.5" />
      <rect x="112" y="200" width="136" height="28" rx="14" fill="#ECFDF3" stroke={GREEN} strokeWidth="2.5" />
      <text x="180" y="219" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREEN} fontFamily="Outfit, sans-serif">+50 bookings/mo</text>
    </svg>
  );
}

function ScriptCopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent('copy_whatsapp_script');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dark bg-white border border-brand-border rounded-lg px-3 py-1.5 cursor-pointer hover:border-brand-text-muted transition-colors"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied' : 'Copy script'}
    </button>
  );
}

function LeakAudit() {
  const [checked, setChecked] = useState(() => auditQuestions.map(() => false));
  const score = checked.filter(Boolean).length;
  const answeredAny = checked.some(Boolean);
  const band = auditBands.find((b) => score >= b.min);

  const toggle = (idx) => setChecked((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  return (
    <div>
      <ul className="divide-y divide-brand-border border-y border-brand-border">
        {auditQuestions.map((q, idx) => (
          <li key={q}>
            <label className="flex items-start gap-3 py-3.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={checked[idx]}
                onChange={() => toggle(idx)}
                className="mt-0.5 w-5 h-5 shrink-0 accent-[#16A34A] cursor-pointer"
              />
              <span className="text-sm sm:text-base text-brand-text-main leading-snug">
                <span className="font-mono text-xs text-brand-text-muted mr-2">{String(idx + 1).padStart(2, '0')}</span>
                {q}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {auditBands.map((b) => {
          const active = answeredAny && b === band;
          return (
            <div
              key={b.label}
              className="rounded-2xl p-4 border-2 transition-all duration-200"
              style={{ backgroundColor: b.bg, borderColor: active ? b.fg : 'transparent', opacity: answeredAny && !active ? 0.55 : 1 }}
            >
              <div className="text-sm font-bold" style={{ color: b.fg }}>{b.label}</div>
              <div className="text-sm text-brand-text-main mt-1 leading-snug">{b.text}</div>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-brand-text-muted mt-4" aria-live="polite">
        Your score: <strong className="text-brand-dark">{score}/10</strong>
        {answeredAny ? '' : ' (tick every “yes”)'}
      </p>
    </div>
  );
}

export default function TravelAgentAIMap() {
  const { openCalBooking } = useCalBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bookAudit = () => {
    trackEvent('book_audit_call');
    openCalBooking();
  };

  return (
    <main className="w-full bg-white font-body text-brand-text-main">
      <SEOHead
        title="Travel Agent AI Map: Add 50 Bookings a Month"
        description="Free field guide for travel agencies and tour operators in India: the full enquiry-to-advance journey mapped like a metro line, with AI moves, scripts, a 30-day rollout and a booking leak audit."
        canonicalPath="/travel-agent-ai-map"
        ogImage="https://goran.in/travel-agent-ai-map.png"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Travel Agent AI Map' },
        ])}
      />

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
            <img src="/Logo.png" alt="GoRan AI" className="h-7 w-auto" />
          </Link>
          <a
            href={PDF_URL}
            download="Travel-Agent-AI-Map-GoRan-AI.pdf"
            onClick={() => trackEvent('download_pdf_topbar')}
            className="inline-flex items-center gap-1.5 bg-brand-dark text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full no-underline hover:bg-brand-dark-hover transition-colors"
          >
            <Download size={14} />
            Download PDF
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">
            Free field guide · For travel agencies & tour operators in India
          </span>
          <h1 className="font-heading font-bold text-brand-dark text-5xl sm:text-6xl leading-[0.95] tracking-tight mt-4">
            Travel Agent<br />AI Map
          </h1>
          <p className="font-heading font-bold text-2xl sm:text-3xl text-brand-dark mt-4">
            Add <span style={{ color: GREEN }}>50 bookings</span> a month.
          </p>
          <p className="text-brand-text-muted text-base leading-relaxed mt-4 max-w-md">
            The full journey from first scroll to paid advance, mapped like a metro line. Every station, what to do there, and what AI can run for you while your team sleeps.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a
              href={PDF_URL}
              download="Travel-Agent-AI-Map-GoRan-AI.pdf"
              onClick={() => trackEvent('download_pdf_hero')}
              className="inline-flex items-center gap-2 text-white font-semibold text-sm py-3 px-6 rounded-full no-underline transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: GREEN }}
            >
              <Download size={16} />
              Download the PDF
            </a>
            <a
              href="#full-map"
              className="inline-flex items-center gap-2 bg-white border border-brand-border text-brand-dark font-semibold text-sm py-3 px-6 rounded-full no-underline hover:border-brand-text-muted transition-colors"
            >
              See the map
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-8 text-sm">
            <div className="font-semibold text-brand-dark">Ashish Ranjan</div>
            <div className="text-brand-text-muted">Founder, GoRan AI</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-6 gap-1 w-full max-w-md mb-2 text-center">
            {lines.map((l) => (
              <span key={l.no} className="text-[9px] sm:text-[10px] font-bold leading-tight" style={{ color: l.color }}>
                {l.name.replace('AI calling agents', 'Calling agents')}
              </span>
            ))}
          </div>
          <MetroHero />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mt-4">6 lines · 30 stops · 1 destination</span>
        </div>
      </section>

      {/* Start here */}
      <section className="border-t border-brand-border bg-brand-bg-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeading
            eyebrow="Start here"
            title="Most travel agents don't lose bookings to cheaper prices."
            intro="They lose them because the enquiry came in at 11 PM, the call went unanswered, and the customer booked with whoever replied first."
          />

          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted mb-4">The three leaks</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {leaks.map((leak) => (
              <div key={leak.no} className="bg-white rounded-2xl p-6 border border-brand-border">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-4xl" style={{ color: leak.color }}>{leak.no}</span>
                  <leak.icon size={20} style={{ color: leak.color }} />
                </div>
                <h4 className="font-heading font-bold text-lg text-brand-dark mt-3">{leak.title}</h4>
                <p className="text-sm text-brand-text-muted leading-relaxed mt-2">{leak.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-brand-dark text-white p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:items-center">
            <span className="font-heading font-bold text-6xl text-brand-yellow leading-none shrink-0">7×</span>
            <div>
              <p className="text-sm sm:text-base leading-relaxed">
                Companies that responded to a lead within an hour were about <strong>7 times more likely to qualify it</strong> than those that waited an hour longer, and over 60 times more likely than those that waited a day.
              </p>
              <p className="text-xs text-white/50 mt-2">
                Harvard Business Review, “The Short Life of Online Sales Leads” (2011), study of 1.25 million leads across 42 companies.
              </p>
            </div>
          </div>

          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted mt-12 mb-4">How to read the map</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {zones.map((z) => (
              <div key={z.label} className="border-t-2 border-brand-dark pt-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark">{z.label}</div>
                <p className="text-sm text-brand-text-main leading-relaxed mt-2">
                  <strong>{z.strong}</strong> {z.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl p-5 border-l-4" style={{ borderColor: GREEN, backgroundColor: '#F0FBF4' }}>
            <p className="text-sm text-brand-text-main leading-relaxed">
              <strong>Build it bottom-up.</strong> Fix capture and close first, then add more reach. Pouring more ad money into a leaky system just buys you more missed calls.
            </p>
          </div>
        </div>
      </section>

      {/* The full map */}
      <section id="full-map" className="border-t border-brand-border scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeading
            eyebrow="The full map"
            title={<>Travel Agent AI Map <span className="block sm:inline text-xl sm:text-2xl md:text-3xl"><span className="hidden sm:inline">· </span>Add <span style={{ color: GREEN }}>50 bookings</span> a month.</span></>}
          />
          <a
            href={MAP_IMAGE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('open_full_map')}
            className="block rounded-2xl border border-brand-border overflow-hidden bg-white relative group"
          >
            <img
              src={MAP_IMAGE}
              alt="Travel Agent AI Map: six lines (Instagram, Google, WhatsApp, AI calling agents, cold outreach, Meta ads) feed Enquiry Central and Inbox Junction, then Qualify, Book and Close, ending at +50 bookings a month."
              className="w-full h-auto"
            />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-dark/85 text-white px-3 py-1.5 rounded-full">
              <Maximize2 size={12} />
              Open full size
            </span>
          </a>
          <p className="text-xs text-brand-text-muted mt-3 text-center">On a phone? Tap the map to open it full size and pinch to zoom.</p>
        </div>
      </section>

      {/* Zone 1 lines */}
      <section className="border-t border-brand-border bg-brand-bg-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeading eyebrow="Zone 1 · Reach" title="Six lines that bring enquiries in" />

          <div className="flex flex-col gap-12">
            {lines.map((line) => (
              <div key={line.no} id={`line-${line.no}`} className="scroll-mt-16">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 pb-3 border-b-[3px]" style={{ borderColor: line.color }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white px-3 py-1 rounded-full" style={{ backgroundColor: line.color }}>
                      Line {line.no}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-brand-dark">{line.name}</h3>
                  </div>
                  <p className="text-sm text-brand-text-muted sm:text-right sm:max-w-xs">{line.tagline}</p>
                </div>
                <ul className="divide-y divide-brand-border bg-white rounded-b-2xl border border-t-0 border-brand-border">
                  {line.stops.map((stop) => (
                    <li key={stop.name} className="grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-6 p-4 sm:p-5">
                      <div className="flex gap-2.5">
                        <span className="mt-1 w-3.5 h-3.5 rounded-full border-[3px] bg-white shrink-0" style={{ borderColor: line.color }} />
                        <div>
                          <div className="font-semibold text-brand-dark">{stop.name}</div>
                          <div className="text-xs font-medium" style={{ color: line.color }}>{stop.sub}</div>
                        </div>
                      </div>
                      <div className="pl-6 sm:pl-0">
                        <p className="text-sm text-brand-text-main leading-relaxed">{stop.desc}</p>
                        <p className="text-sm text-brand-text-muted mt-1.5 leading-relaxed">
                          <span className="text-[10px] font-bold uppercase tracking-wider mr-2" style={{ color: line.color }}>AI move</span>
                          {stop.ai}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-white border border-brand-border p-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted mb-4">Which line should you build first?</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {buildFirst.map((b) => (
                <p key={b.q} className="text-sm leading-relaxed">
                  <strong style={{ color: b.color }}>{b.q}</strong> {b.a}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zones 2 & 3 */}
      <section className="border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeading eyebrow="Zone 2 · Capture" title="Two junctions, zero lost enquiries" />
          <div className="grid sm:grid-cols-2 gap-4">
            {junctions.map((j) => (
              <div key={j.name} className="rounded-2xl bg-brand-bg-light border border-brand-border p-6">
                <h3 className="font-heading font-bold text-xl text-brand-dark">{j.name}</h3>
                <p className="text-sm text-brand-text-muted">{j.sub}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {j.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-text-muted shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <SectionHeading eyebrow="Zone 3 · Close" title="Where enquiries become advances" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {closeSteps.map((s) => (
                <div key={s.name} className="border-t-[3px] pt-4" style={{ borderColor: s.destination ? GREEN : '#171717' }}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: s.destination ? GREEN : '#171717' }}>{s.label}</div>
                  <h3 className="font-heading font-bold text-xl text-brand-dark mt-1">{s.name}</h3>
                  <p className="text-sm text-brand-text-main leading-relaxed mt-2">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-brand-yellow text-brand-dark px-3 py-1 rounded-full">Mind the gap</span>
              <ul className="mt-4 flex flex-col gap-4">
                {mindTheGap.map((m) => (
                  <li key={m.title} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-brand-dark text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <div>
                      <div className="font-semibold text-sm text-brand-dark">{m.title}</div>
                      <div className="text-sm text-brand-text-muted">{m.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-bg-light border border-brand-border p-6">
              <h3 className="font-heading font-bold text-lg text-brand-dark">Travel Agent Essentials</h3>
              <p className="text-sm text-brand-text-muted mt-1">Load these into the bot's knowledge so it answers like your best agent.</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {essentials.map((e) => (
                  <li key={e} className="flex gap-2.5 text-sm items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-text-muted shrink-0" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted mt-12 mb-4">More touchpoints to add along the way</h3>
          <div className="flex flex-wrap gap-2">
            {touchpoints.map((t) => (
              <span key={t} className="text-sm text-brand-text-main border border-brand-border rounded-full px-3.5 py-1.5">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* The map in action */}
      <section className="border-t border-brand-border bg-brand-bg-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeading eyebrow="The map in action" title="One enquiry at 11 PM, two different endings" />
          <div className="grid md:grid-cols-[1fr_2fr] gap-6">
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#FEF2F2' }}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-600">Without the map</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {withoutMap.map((w) => (
                  <li key={w} className="flex gap-2.5 text-sm leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-text-muted shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-brand-border p-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: GREEN }}>With the map</h3>
              <ol className="mt-4 flex flex-col gap-3.5">
                {withMap.map((w, idx) => (
                  <li key={idx} className="grid grid-cols-[72px_1fr] gap-3 text-sm leading-relaxed">
                    <span className="font-semibold text-brand-dark">{w.time}</span>
                    <span className="flex gap-2.5">
                      <span className="mt-1.5 w-3 h-3 rounded-full border-2 bg-white shrink-0" style={{ borderColor: w.color }} />
                      <span>{w.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-brand-dark">Where do +50 bookings a month come from?</h3>
            <p className="text-sm sm:text-base text-brand-text-main leading-relaxed mt-3 max-w-3xl">
              An example agency getting <strong>400 enquiries a month</strong> and converting 7.5% books <strong>30 trips</strong>. Most of the other 370 aren't “not interested”. They hit one of the three leaks.
            </p>
            <div className="mt-6 flex h-12 rounded-xl overflow-hidden text-white text-sm font-semibold">
              <div className="flex items-center justify-center bg-gray-400" style={{ width: `${(30 / 80) * 100}%` }}>30 today</div>
              {uplift.map((u) => (
                <div key={u.title} className="flex items-center justify-center" style={{ width: `${(u.value / 80) * 100}%`, backgroundColor: u.color }}>
                  +{u.value}
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              {uplift.map((u) => (
                <div key={u.title}>
                  <div className="text-sm font-bold" style={{ color: u.color }}>{u.title}</div>
                  <div className="text-sm text-brand-text-main leading-relaxed mt-1">{u.text}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4" style={{ backgroundColor: '#ECFDF3' }}>
              <p className="text-sm sm:text-base text-brand-text-main leading-relaxed">
                <strong>30 → 80 bookings a month</strong> at the same ad spend: a 20% conversion rate instead of 7.5%.
              </p>
              <span className="font-heading font-bold text-3xl sm:text-4xl shrink-0" style={{ color: GREEN }}>+50</span>
            </div>
            <p className="text-xs text-brand-text-muted mt-3">
              Illustrative example. Your numbers depend on enquiry volume, ticket size and how fast your team replies today.
            </p>
          </div>
        </div>
      </section>

      {/* Scripts */}
      <section className="border-t border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeading
            eyebrow="Copy-paste scripts"
            title="Scripts you can use this week"
            intro="Swap the {brackets} for your details. Keep the tone the way you'd actually talk to a customer."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: lineColor[3] }}>1 · WhatsApp first reply (instant)</h3>
                <ScriptCopyButton text={whatsappScript} />
              </div>
              <div className="rounded-2xl p-5 text-sm leading-relaxed whitespace-pre-line" style={{ backgroundColor: '#E8F6EE' }}>
                {whatsappScript}
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: lineColor[4] }}>2 · AI calling agent flow (Hinglish)</h3>
              <dl className="flex flex-col gap-3">
                {callFlow.map((c) => (
                  <div key={c.step} className="grid grid-cols-[80px_1fr] gap-3 text-sm leading-relaxed">
                    <dt className="font-semibold" style={{ color: lineColor[4] }}>{c.step}</dt>
                    <dd>{c.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] mt-12 mb-3" style={{ color: lineColor[6] }}>3 · Follow-up sequence after a quote</h3>
          <dl className="divide-y divide-brand-border border-y border-brand-border">
            {followUps.map((f) => (
              <div key={f.day} className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-3 py-3 text-sm leading-relaxed">
                <dt className="font-semibold text-brand-dark">{f.day}</dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 rounded-2xl bg-brand-bg-light border border-brand-border p-6">
            <h3 className="font-semibold text-brand-dark">Two rules that keep this from feeling spammy:</h3>
            <ul className="mt-3 flex flex-col gap-2">
              <li className="flex gap-2.5 text-sm leading-relaxed"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-text-muted shrink-0" />Every message stops the moment the customer replies, books or says no.</li>
              <li className="flex gap-2.5 text-sm leading-relaxed"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-text-muted shrink-0" />Only send urgency (“4 rooms left”) when it's true. One fake deadline costs you the trust the rest of the system built.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 30-day rollout + audit */}
      <section className="border-t border-brand-border bg-brand-bg-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <SectionHeading
            eyebrow="Your next 30 days"
            title="The 30-day rollout"
            intro="Bottom of the map first. Every week ships something that saves bookings on its own."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rollout.map((r) => (
              <div key={r.week} className="bg-white rounded-b-2xl border border-brand-border border-t-4 p-5" style={{ borderTopColor: r.color }}>
                <div className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: r.color }}>{r.week}</div>
                <h3 className="font-heading font-bold text-lg text-brand-dark mt-1">{r.title}</h3>
                <p className="text-sm text-brand-text-main leading-relaxed mt-2">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <SectionHeading
              title="10-question booking leak audit"
              intro="Tick every “yes”. Be honest, nobody's watching."
            />
            <LeakAudit />
          </div>
        </div>
      </section>

      {/* Done-for-you CTA */}
      <section className="bg-[#12141C] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">Done-for-you</span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl leading-tight mt-3">
            Want this map running<br className="hidden sm:block" /> in your agency in <span className="text-[#4ADE80]">30 days?</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mt-4 max-w-2xl">
            GoRan AI builds the whole system around your packages and your team, so every enquiry gets answered, followed up and closed, even when you're asleep.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-8">
            {doneForYou.map((d) => (
              <li key={d} className="flex gap-2.5 text-sm text-white/85 leading-relaxed">
                <Check size={15} className="mt-0.5 shrink-0 text-[#4ADE80]" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-yellow">Free · 20 minutes</span>
            <h3 className="font-heading font-bold text-2xl mt-2">Booking Leak Audit</h3>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-2 max-w-2xl">
              We walk through your current enquiry journey, show you exactly where leads go cold, and estimate your real “+bookings a month” number. No pressure, no long pitch.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
              <button
                onClick={bookAudit}
                className="inline-flex items-center justify-center gap-2 bg-[#4ADE80] text-[#0B2E17] font-semibold text-sm py-3 px-6 rounded-full border-none cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                Book my free audit
                <ArrowRight size={16} />
              </button>
              <a
                href={WHATSAPP_AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_audit')}
                className="inline-flex items-center justify-center gap-2 border border-[#4ADE80] text-[#4ADE80] font-semibold text-sm py-3 px-6 rounded-full no-underline hover:bg-[#4ADE80]/10 transition-colors"
              >
                <WhatsappIcon size={16} />
                Send “AUDIT” on WhatsApp
              </a>
              <a
                href={`mailto:${AUDIT_EMAIL}?subject=AUDIT%20-%20Travel%20Agent%20AI%20Map`}
                onClick={() => trackEvent('email_audit')}
                className="inline-flex items-center justify-center gap-2 text-white/80 font-semibold text-sm py-3 px-4 no-underline hover:text-white transition-colors"
              >
                <Mail size={15} />
                {AUDIT_EMAIL}
              </a>
            </div>
          </div>

          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-sm">
              <div className="font-semibold">Ashish Ranjan</div>
              <div className="text-white/50">Founder, GoRan AI · Trusted by 35+ businesses across India</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <a
                href={PDF_URL}
                download="Travel-Agent-AI-Map-GoRan-AI.pdf"
                onClick={() => trackEvent('download_pdf_footer')}
                className="inline-flex items-center gap-1.5 text-white/80 no-underline hover:text-white"
              >
                <Download size={14} />
                Download PDF
              </a>
              <Link to="/" className="font-semibold text-white no-underline hover:text-brand-yellow">goran.in</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
