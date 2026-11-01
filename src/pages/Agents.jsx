import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  UserCog,
  MessageCircle,
  PhoneCall,
  ShoppingCart,
  Boxes,
  NotebookPen,
  UserRound,
  Moon,
  Check,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import WhatsappIcon from '../components/ui/WhatsappIcon';
import DemoRecordings from '../components/DemoRecordings';
import { useCalBooking } from '../components/CalBookingModal';
import { buildBreadcrumbSchema } from '../seo/schemas';

const WHATSAPP_URL =
  'https://wa.me/919934225353?text=AGENTS%20-%20I%20want%20the%205%20AI%20helpers%20for%20my%20brand.';
const GREEN = '#16A34A';
const LIGHT_GREEN = '#4ADE80';
const NIGHT = '#0B1120';

// The six steps from the reel, in plain words.
const steps = [
  {
    n: 1,
    icon: UserCog,
    name: 'The Manager',
    does: 'Reads every message, order and alert, and hands it to the right helper.',
    means: 'Nothing gets missed. Nothing gets done twice.',
  },
  {
    n: 2,
    icon: MessageCircle,
    name: 'WhatsApp Helper',
    does: 'Answers customer questions in seconds, day or night.',
    means: 'Price, size, "where is my order": all handled while you sleep.',
  },
  {
    n: 3,
    icon: PhoneCall,
    name: 'Calling Helper',
    does: 'Phones every cash-on-delivery customer to confirm before you ship.',
    means: 'Fewer fake orders. Fewer parcels coming back to you.',
  },
  {
    n: 4,
    icon: ShoppingCart,
    name: 'Cart Helper',
    does: 'Gently reminds people who added to cart but did not pay.',
    means: 'Lost sales come back on their own.',
  },
  {
    n: 5,
    icon: Boxes,
    name: 'Stock Helper',
    does: 'Watches your stock and warns you before a bestseller runs out.',
    means: 'No more "sorry, out of stock" surprises.',
  },
  {
    n: 6,
    icon: NotebookPen,
    name: 'One Shared Notebook',
    does: 'Every helper reads and writes the same customer history.',
    means: 'No customer is ever asked the same question twice.',
  },
];

// The jobs the Manager hands out in the animated picture. Index points at the helper card.
const jobs = [
  { helper: 1, incoming: 'New message: "What is the price?"', result: 'Replied in 3 seconds' },
  { helper: 2, incoming: 'New cash-on-delivery order', result: 'Called and confirmed' },
  { helper: 3, incoming: 'Someone left items in their cart', result: 'Reminded. Order placed.' },
  { helper: 4, incoming: 'Only 9 left of your bestseller', result: 'You have been warned' },
];

const helpers = [
  { icon: MessageCircle, name: 'WhatsApp', job: 'Replies' },
  { icon: PhoneCall, name: 'Calling', job: 'Confirms orders' },
  { icon: ShoppingCart, name: 'Cart', job: 'Brings buyers back' },
  { icon: Boxes, name: 'Stock', job: 'Watches stock' },
];

// The looping 2 AM chat in the hero.
const chat = [
  { from: 'customer', text: 'Hi, what is the price of the blue kurta?' },
  { from: 'typing' },
  { from: 'agent', text: '₹1,299 with free delivery. It reaches you by Thursday. Shall I place the order?' },
  { from: 'customer', text: 'Yes please' },
  { from: 'typing' },
  { from: 'agent', text: 'Done. Order #4821 is confirmed. You will get the tracking link here.' },
];

// A day with the helpers, simplified.
const timeline = [
  { time: '2:03 AM', who: 'WhatsApp Helper', event: 'A customer asks the price. Answered in 3 seconds. You are asleep.' },
  { time: '9:10 AM', who: 'Calling Helper', event: 'Three cash-on-delivery orders came in overnight. All three customers called and confirmed before pickup.' },
  { time: '1:30 PM', who: 'Cart Helper', event: 'A customer leaves a ₹2,400 cart. A friendly reminder goes out. Order placed at 2:05 PM.' },
  { time: '4:00 PM', who: 'Stock Helper', event: 'Your bestseller is down to 9 pieces. You get one message, before anyone is told "out of stock".' },
  { time: '6:45 PM', who: 'The Manager', event: 'An upset customer. A real person takes over, with the whole story already in front of them.' },
];

const proofs = [
  { stat: '3 sec', label: 'to answer a customer, any hour' },
  { stat: 'Every', label: 'cash-on-delivery order confirmed by phone' },
  { stat: '1 person', label: 'steps in only when it really matters' },
];

function trackEvent(action) {
  ReactGA.event({ category: 'Agents Blueprint', action });
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

// Phone with a looping WhatsApp chat. A message appears every 1.4 s; the whole thing restarts after a pause.
function PhoneChat() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? chat.length : 0);

  useEffect(() => {
    if (reduce) return undefined;
    let timer;
    const tick = () => {
      setShown((s) => {
        if (s >= chat.length) {
          timer = setTimeout(() => setShown(0), 3200);
          return s;
        }
        timer = setTimeout(tick, s + 1 >= chat.length ? 1400 : 1400);
        return s + 1;
      });
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [reduce]);

  // Hide the typing dots once the next message has arrived.
  const visible = chat.slice(0, shown).filter((m, i) => m.from !== 'typing' || i === shown - 1);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="rounded-[2.2rem] border-[6px] border-[#1E2638] bg-[#0E1A14] shadow-2xl overflow-hidden">
        <div className="bg-[#1F2C34] px-4 py-3 flex items-center gap-3">
          <span className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: GREEN }}>
            <WhatsappIcon size={16} />
          </span>
          <div className="leading-tight">
            <div className="text-white text-sm font-semibold">Your brand</div>
            <div className="text-[11px]" style={{ color: LIGHT_GREEN }}>online · 2:03 AM</div>
          </div>
        </div>
        <div className="px-3 py-4 min-h-[330px] flex flex-col justify-end gap-2.5">
          <AnimatePresence initial={false}>
            {visible.map((m, i) => (
              <motion.div
                key={`${i}-${m.from}`}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                  m.from === 'customer'
                    ? 'self-start bg-[#202C33] text-white rounded-bl-md'
                    : 'self-end bg-[#005C4B] text-white rounded-br-md'
                }`}
              >
                {m.from === 'typing' ? (
                  <span className="inline-flex gap-1 py-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-white/70 block"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </span>
                ) : (
                  m.text
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-3 sm:-right-8 rounded-full bg-white text-brand-dark text-xs font-semibold px-3.5 py-2 shadow-lg flex items-center gap-1.5">
        <Moon size={13} /> You: asleep
      </div>
    </div>
  );
}

// The Manager hands a job to one helper at a time. Plays by itself.
function ManagerPicture() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % jobs.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  const job = jobs[idx];

  return (
    <div className="rounded-3xl border border-brand-border p-5 sm:p-8 bg-brand-bg-light">
      <div className="flex flex-col items-center gap-3">
        {/* Incoming */}
        <div className="h-9 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="rounded-full bg-white border border-brand-border px-4 py-1.5 text-xs sm:text-sm text-brand-text-main shadow-sm"
            >
              {job.incoming}
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div
          className="w-px h-5"
          style={{ backgroundColor: GREEN }}
          animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        />

        {/* Manager */}
        <div className="rounded-2xl bg-brand-dark text-white px-5 py-3 flex items-center gap-2.5 text-sm font-semibold">
          <UserCog size={18} style={{ color: LIGHT_GREEN }} />
          The Manager
          <span className="text-white/50 font-normal hidden sm:inline">· picks the right helper</span>
        </div>
        <div className="w-px h-5 bg-brand-border" />

        {/* Helpers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
          {helpers.map(({ icon: Icon, name, job: what }, i) => {
            const active = i === job.helper - 1;
            return (
              <motion.div
                key={name}
                animate={{
                  scale: active ? 1.04 : 1,
                  borderColor: active ? GREEN : '#E5E7EB',
                  backgroundColor: active ? '#ECFDF3' : '#FFFFFF',
                }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border p-3.5 text-center relative"
              >
                <span
                  className="w-9 h-9 rounded-full mx-auto flex items-center justify-center"
                  style={{ backgroundColor: active ? GREEN : '#ECFDF3', color: active ? '#fff' : GREEN }}
                >
                  <Icon size={16} />
                </span>
                <div className="text-sm font-bold text-brand-dark mt-2 leading-tight">{name} Helper</div>
                <div className="text-[11px] text-brand-text-muted mt-0.5 h-4">
                  <AnimatePresence mode="wait">
                    {active ? (
                      <motion.span
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="inline-flex items-center gap-1 font-semibold"
                        style={{ color: GREEN }}
                      >
                        <Check size={11} /> {job.result}
                      </motion.span>
                    ) : (
                      <motion.span key="job" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {what}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="w-px h-5 bg-brand-border" />

        {/* Notebook */}
        <div className="w-full rounded-2xl border border-dashed border-brand-dark/30 px-5 py-3 flex items-center justify-center gap-2.5 text-sm font-semibold text-brand-dark">
          <NotebookPen size={17} style={{ color: GREEN }} />
          One shared notebook
          <span className="text-brand-text-muted font-normal hidden sm:inline">· every helper knows every customer's story</span>
        </div>
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-text-muted mt-1">
          <UserRound size={15} />
          A real person steps in only when it really matters.
        </div>
      </div>
    </div>
  );
}

export default function Agents() {
  const { openCalBooking } = useCalBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white font-body text-brand-text-main overflow-x-hidden">
      <SEOHead
        title="5 AI Helpers + 1 Manager: Sleep While Orders Get Handled"
        description="The simple system from the reel: five AI helpers for WhatsApp, calls, carts and stock, one manager on top, and one shared notebook. So you can sleep while the orders get handled."
        canonicalPath="/agents"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'AI Helpers for Your Brand' },
        ])}
      />

      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 no-underline shrink-0">
            <img src="/Logo.png" alt="GoRan AI" className="h-7 w-auto" />
          </Link>
          <button
            onClick={() => { trackEvent('book_call_topbar'); openCalBooking(); }}
            className="inline-flex items-center gap-1.5 bg-brand-dark text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-full border-0 cursor-pointer hover:bg-brand-dark-hover transition-colors"
          >
            Book a call
          </button>
        </div>
      </div>

      {/* Hero: the 2 AM scene from the reel */}
      <section className="text-white" style={{ backgroundColor: NIGHT }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-20 grid md:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
              <Moon size={13} /> From the reel
            </span>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-4">
              You built a brand.
              <br />
              <span className="text-white/50">Not a call centre.</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mt-5 max-w-lg">
              It is 2 AM and you are still replying to "what is the price?". Here is the simple system that does it for you:
              five AI helpers, one manager on top. So you can sleep.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#blueprint"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm py-3 px-6 rounded-full no-underline"
                style={{ backgroundColor: GREEN }}
              >
                See how it works
                <ArrowRight size={16} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('hero_whatsapp')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm py-3 px-6 rounded-full no-underline transition-colors"
              >
                <WhatsappIcon size={16} />
                I want this
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
            <PhoneChat />
          </motion.div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-14">
          <div className="grid sm:grid-cols-3 gap-3">
            {proofs.map(({ stat, label }, i) => (
              <motion.div
                key={label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-4"
              >
                <div className="font-heading font-bold text-2xl leading-none" style={{ color: LIGHT_GREEN }}>{stat}</div>
                <div className="text-sm text-white/70 mt-1.5">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The question every founder asks */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <motion.div {...fadeUp} className="rounded-3xl border border-brand-border p-6 sm:p-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">The usual answer</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
              "So I hire five people?"
            </h2>
            <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3">
              Five salaries. Five shift timings. Five people who each know a different part of the customer's story. And none of them awake at 2 AM.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: '#ECFDF3' }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>The better answer</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
              No. Five AI helpers. And one manager on top.
            </h2>
            <p className="text-brand-text-main text-sm sm:text-base leading-relaxed mt-3">
              Each helper does one job. The manager hands out the work. They all share one notebook, so every customer is remembered. It costs less than one hire.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated picture */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <motion.div {...fadeUp}>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">In one picture</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
            Watch the manager hand out the work
          </h2>
          <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3 max-w-2xl mb-6">
            Something happens in your store. The manager sees it and gives it to the right helper. The helper does the job. That is the whole idea.
          </p>
          <ManagerPicture />
        </motion.div>
      </section>

      {/* The six steps */}
      <section id="blueprint" className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 scroll-mt-20">
        <motion.div {...fadeUp}>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">The six steps</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
            Same order as the reel
          </h2>
          <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
            Each helper does one job and does it well. Here is what each one does, and what it means for you.
          </p>
        </motion.div>

        <ol className="list-none p-0 m-0 mt-8 grid sm:grid-cols-2 gap-4">
          {steps.map(({ n, icon: Icon, name, does, means }, i) => (
            <motion.li
              key={n}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 2) * 0.1 }}
              className="rounded-3xl border border-brand-border p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#ECFDF3', color: GREEN }}>
                  <Icon size={20} />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">Step {n}</span>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-brand-dark leading-tight m-0">{name}</h3>
                </div>
              </div>
              <p className="text-brand-dark text-sm sm:text-base leading-relaxed mt-4">{does}</p>
              <p className="text-sm sm:text-base leading-relaxed mt-2 font-semibold" style={{ color: GREEN }}>
                {means}
              </p>
            </motion.li>
          ))}
        </ol>

        <motion.div {...fadeUp} className="mt-4 rounded-3xl bg-brand-tint p-5 sm:p-6 flex items-start gap-3">
          <span className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0 text-brand-dark">
            <UserRound size={20} />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-brand-dark leading-tight m-0">And when a customer is upset?</h3>
            <p className="text-brand-text-main text-sm sm:text-base leading-relaxed mt-1.5">
              A real person steps in. The helpers hand over the whole story, so the customer never has to explain twice.
            </p>
          </div>
        </motion.div>
      </section>

      {/* A day with the helpers */}
      <section className="text-white" style={{ backgroundColor: NIGHT }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <motion.div {...fadeUp}>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">One day, start to finish</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold leading-tight mt-2">
              "Will I actually sleep tonight?"
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
              Yes. Here is one day, as the helpers run it.
            </p>
          </motion.div>
          <ol className="list-none p-0 m-0 mt-8 relative">
            <div className="absolute left-[4.6rem] sm:left-[5.4rem] top-2 bottom-2 w-px bg-white/15" aria-hidden="true" />
            {timeline.map(({ time, who, event }, i) => (
              <motion.li
                key={time}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[4.2rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 sm:gap-6 py-3.5"
              >
                <span className="font-heading font-bold text-sm sm:text-base text-white/90 pt-0.5 text-right pr-2">{time}</span>
                <div className="pl-3 relative">
                  <span className="absolute -left-[0.95rem] sm:-left-[1.05rem] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: LIGHT_GREEN }} aria-hidden="true" />
                  <div className="text-xs font-semibold" style={{ color: LIGHT_GREEN }}>{who}</div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed mt-0.5">{event}</p>
                </div>
              </motion.li>
            ))}
          </ol>
          <motion.p {...fadeUp} className="mt-8 text-white text-lg sm:text-xl font-heading font-bold">
            Yes. Go to sleep. We will handle the orders.
          </motion.p>
        </div>
      </section>

      {/* Hear the calling helper */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <motion.div {...fadeUp}>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">Hear it yourself</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
            The calling helper on a real call
          </h2>
          <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
            Press play. This is the voice that confirms your cash-on-delivery orders before they ship.
          </p>
        </motion.div>
        <div className="mt-6">
          <DemoRecordings />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
          <Link to="/lead-agent" className="font-semibold text-brand-dark inline-flex items-center gap-1">
            Try our lead-finding helper live <ArrowRight size={14} />
          </Link>
          <Link to="/agents/whatsapp-telegram-agent" className="font-semibold text-brand-dark inline-flex items-center gap-1">
            More on the WhatsApp helper <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div {...fadeUp} className="rounded-3xl bg-brand-dark text-white p-8 sm:p-12 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight">Want this for your brand?</h2>
          <p className="text-white/70 mt-3 max-w-md mx-auto text-sm sm:text-base">
            We set it up around your products, your delivery partner and your WhatsApp number. Message us "AGENTS" and we will show you exactly how it would work for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('cta_whatsapp')}
              className="inline-flex items-center gap-2 text-white font-semibold text-sm py-3 px-6 rounded-full no-underline"
              style={{ backgroundColor: GREEN }}
            >
              <WhatsappIcon size={16} />
              WhatsApp "AGENTS"
            </a>
            <button
              onClick={() => { trackEvent('cta_book_call'); openCalBooking(); }}
              className="inline-flex items-center gap-2 bg-white text-brand-dark font-semibold text-sm py-3 px-6 rounded-full border-0 cursor-pointer"
            >
              Book a call
            </button>
          </div>
          <p className="text-xs text-white/40 mt-6">
            GoRan AI · AI helpers for Indian brands · <Link to="/" className="text-white/60">goran.in</Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
