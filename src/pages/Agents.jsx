import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';
import {
  ArrowRight,
  BrainCircuit,
  MessageCircle,
  PhoneCall,
  ShoppingCart,
  Boxes,
  Database,
  UserRound,
  Moon,
  Zap,
  ShieldCheck,
  Clock3,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import WhatsappIcon from '../components/ui/WhatsappIcon';
import DemoRecordings from '../components/DemoRecordings';
import { useCalBooking } from '../components/CalBookingModal';
import { buildBreadcrumbSchema } from '../seo/schemas';

const WHATSAPP_URL =
  'https://wa.me/919934225353?text=AGENTS%20-%20I%20want%20the%205%20AI%20agents%20blueprint%20for%20my%20D2C%20brand.';
const GREEN = '#16A34A';
const NIGHT = '#0B1120';

// The six steps from the reel, in the order the sidekick says them.
const steps = [
  {
    n: 1,
    icon: BrainCircuit,
    name: 'Orchestrator',
    tag: 'The brain',
    line: 'Decides which agent does which job.',
    text: 'Every message, call, order and alert lands here first. It reads the intent, picks the right agent, and makes sure two agents never trip over the same customer.',
    tools: ['n8n', 'Claude / Gemini', 'Shopify webhooks'],
  },
  {
    n: 2,
    icon: MessageCircle,
    name: 'WhatsApp Agent',
    tag: 'Replies in seconds',
    line: 'Answers in seconds, even at 2 AM.',
    text: '"Price kya hai?", "Size M hai?", "Order kahan hai?" Answered from your catalogue and your shipping tracker. No canned menu. It talks like your best support person.',
    tools: ['WhatsApp Business API', 'Catalogue', 'Shiprocket / Delhivery'],
  },
  {
    n: 3,
    icon: PhoneCall,
    name: 'Calling Agent',
    tag: 'COD confirmation',
    line: 'Every COD order confirmed before it ships.',
    text: 'Calls the customer within minutes of a cash-on-delivery order, confirms the address and the intent, and flags the fakes. Your RTO bill is the first thing that drops.',
    tools: ['Voice AI', 'Hindi + English', 'Shopify order hook'],
  },
  {
    n: 4,
    icon: ShoppingCart,
    name: 'Cart Agent',
    tag: 'Recovers checkouts',
    line: 'Brings back the customers who stopped mid-checkout.',
    text: 'A WhatsApp nudge 30 minutes after the drop, a second one with the exact product they left, and a small push if your margin allows. Then it stops. Nobody gets spammed.',
    tools: ['Abandoned checkout events', 'WhatsApp templates', 'Discount rules'],
  },
  {
    n: 5,
    icon: Boxes,
    name: 'Ops Agent',
    tag: 'Watches stock',
    line: 'Keeps an eye on inventory so nothing quietly goes out of stock.',
    text: 'Reads sales velocity per SKU, warns you before a bestseller runs out, and tells the WhatsApp agent what to stop promising. One Slack or WhatsApp message a day to you.',
    tools: ['Inventory sync', 'Daily digest', 'Low-stock alerts'],
  },
  {
    n: 6,
    icon: Database,
    name: 'Shared Memory',
    tag: 'One customer story',
    line: 'Every agent knows every customer\'s full story.',
    text: 'The call the customer had on Monday, the cart they left on Tuesday, the complaint on Wednesday. One record. So no agent ever asks "aapka order number?" twice.',
    tools: ['Customer record', 'Order history', 'Conversation log'],
  },
];

// A night and a day, as the agents actually run it.
const timeline = [
  { time: '2:03 AM', who: 'WhatsApp Agent', event: 'Customer asks "price kya hai?" Reply in 4 seconds, with the product link. You are asleep.' },
  { time: '9:10 AM', who: 'Calling Agent', event: 'Three COD orders overnight. All three called and confirmed before the pickup.' },
  { time: '1:30 PM', who: 'Cart Agent', event: 'A customer leaves a ₹2,400 cart. Nudged on WhatsApp. Order placed at 2:05 PM.' },
  { time: '4:00 PM', who: 'Ops Agent', event: 'Bestseller down to 9 units. You get one message. WhatsApp agent stops promising next-day delivery on it.' },
  { time: '6:45 PM', who: 'Orchestrator', event: 'An angry customer. Handed to a human with the full story attached. No "please explain again".' },
];

const proofs = [
  { icon: Clock3, stat: '< 10 sec', label: 'WhatsApp reply time, 24x7' },
  { icon: ShieldCheck, stat: '100%', label: 'COD orders called before dispatch' },
  { icon: Zap, stat: '1 human', label: 'Steps in only when it matters' },
];

function trackEvent(action) {
  ReactGA.event({ category: 'Agents Blueprint', action });
}

export default function Agents() {
  const { openCalBooking } = useCalBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white font-body text-brand-text-main">
      <SEOHead
        title="5 AI Agents + 1 Brain: The D2C Blueprint"
        description="The exact system from the reel: an orchestrator, a WhatsApp agent, a COD calling agent, a cart recovery agent, an ops agent and a shared memory. So you can sleep while the orders get handled."
        canonicalPath="/agents"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'AI Agents Blueprint' },
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-14 sm:pb-20">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
            <Moon size={13} /> The blueprint from the reel
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-4 max-w-3xl">
            You built a brand.
            <br />
            <span className="text-white/50">Not a call centre.</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed mt-5 max-w-xl">
            It is 2 AM and you are still replying to "price kya hai?". Here is the system that replies for you:
            five AI agents, one brain on top, and a shared memory so every customer is handled like a regular.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#blueprint"
              className="inline-flex items-center gap-2 text-white font-semibold text-sm py-3 px-6 rounded-full no-underline"
              style={{ backgroundColor: GREEN }}
            >
              See the 6 steps
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
              Build this for my brand
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-10 sm:mt-14">
            {proofs.map(({ icon: Icon, stat, label }) => (
              <div key={label} className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0" style={{ color: '#4ADE80' }}>
                  <Icon size={16} />
                </span>
                <div>
                  <div className="font-heading font-bold text-xl leading-none">{stat}</div>
                  <div className="text-xs text-white/60 mt-1">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The question every founder asks */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">The usual fix</span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
              "So what, I hire five people?"
            </h2>
            <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3">
              Five salaries. Five sets of shift timings. Five people who each know a different piece of the customer's story, and none of them is awake at 2 AM.
            </p>
          </div>
          <div className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: '#ECFDF3' }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>The fix that scales</span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-dark leading-tight mt-2">
              No. Build five AI agents. And one brain on top.
            </h3>
            <p className="text-brand-text-main text-sm sm:text-base leading-relaxed mt-3">
              Each agent owns one job. The orchestrator hands out the work. The shared memory means they all know the same customer. The whole thing runs for less than one hire.
            </p>
          </div>
        </div>
      </section>

      {/* System diagram */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14">
        <div className="rounded-3xl border border-brand-border p-5 sm:p-8 bg-brand-bg-light">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-2xl bg-brand-dark text-white px-5 py-3 flex items-center gap-2.5 text-sm font-semibold">
              <BrainCircuit size={18} style={{ color: '#4ADE80' }} />
              Orchestrator
              <span className="text-white/50 font-normal hidden sm:inline">· decides who does what</span>
            </div>
            <div className="w-px h-5 bg-brand-border" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
              {steps.slice(1, 5).map(({ icon: Icon, name, tag }) => (
                <div key={name} className="rounded-2xl bg-white border border-brand-border p-3.5 text-center">
                  <span className="w-9 h-9 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#ECFDF3', color: GREEN }}>
                    <Icon size={16} />
                  </span>
                  <div className="text-sm font-bold text-brand-dark mt-2 leading-tight">{name}</div>
                  <div className="text-[11px] text-brand-text-muted mt-0.5">{tag}</div>
                </div>
              ))}
            </div>
            <div className="w-px h-5 bg-brand-border" />
            <div className="w-full rounded-2xl border border-dashed border-brand-dark/30 px-5 py-3 flex items-center justify-center gap-2.5 text-sm font-semibold text-brand-dark">
              <Database size={17} style={{ color: GREEN }} />
              Shared memory
              <span className="text-brand-text-muted font-normal hidden sm:inline">· every agent reads and writes the same customer story</span>
            </div>
            <div className="w-px h-5 bg-brand-border" />
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-text-muted">
              <UserRound size={15} />
              A human steps in only when it matters, with the full story.
            </div>
          </div>
        </div>
      </section>

      {/* The six steps */}
      <section id="blueprint" className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 scroll-mt-20">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">The blueprint</span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
          Six steps. Same order as the reel.
        </h2>
        <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
          This is how we build it for a D2C brand. Nothing here is theory. Each piece is something we have shipped.
        </p>

        <ol className="list-none p-0 m-0 mt-8 space-y-4">
          {steps.map(({ n, icon: Icon, name, tag, line, text, tools }) => (
            <li key={n} className="rounded-3xl border border-brand-border p-5 sm:p-7 grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6">
              <div className="flex sm:flex-col items-center sm:items-start gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">Step {n}</span>
                <span className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#ECFDF3', color: GREEN }}>
                  <Icon size={20} />
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-dark leading-tight m-0">{name}</h3>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-tint text-brand-text-main">{tag}</span>
                </div>
                <p className="text-brand-dark font-semibold text-sm sm:text-base mt-2">{line}</p>
                <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-1.5">{text}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tools.map((t) => (
                    <span key={t} className="text-[11px] font-medium px-2 py-1 rounded-md border border-brand-border text-brand-text-muted">{t}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* A day with the agents */}
      <section className="text-white" style={{ backgroundColor: NIGHT }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">What a day looks like</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold leading-tight mt-2">
            "Will I actually sleep tonight?"
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
            Yes. Here is one day, start to finish, as the agents run it.
          </p>
          <ol className="list-none p-0 m-0 mt-8 relative">
            <div className="absolute left-[4.6rem] sm:left-[5.4rem] top-2 bottom-2 w-px bg-white/15" aria-hidden="true" />
            {timeline.map(({ time, who, event }) => (
              <li key={time} className="grid grid-cols-[4.2rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 sm:gap-6 py-3.5">
                <span className="font-heading font-bold text-sm sm:text-base text-white/90 pt-0.5 text-right pr-2">{time}</span>
                <div className="pl-3">
                  <div className="text-xs font-semibold" style={{ color: '#4ADE80' }}>{who}</div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed mt-0.5">{event}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-white/90 text-base sm:text-lg font-semibold">
            Haan. So jao. Orders hum sambhaal lenge.
          </p>
        </div>
      </section>

      {/* Hear the calling agent */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-text-muted">Step 3, live</span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-dark leading-tight mt-2">
          Hear the calling agent on a real call
        </h2>
        <p className="text-brand-text-muted text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
          These are recordings from our calling agent. This is the voice that confirms your COD orders before they ship.
        </p>
        <div className="mt-6">
          <DemoRecordings />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm">
          <Link to="/lead-agent" className="font-semibold text-brand-dark inline-flex items-center gap-1">
            Try the lead agent live <ArrowRight size={14} />
          </Link>
          <Link to="/agents/whatsapp-telegram-agent" className="font-semibold text-brand-dark inline-flex items-center gap-1">
            The WhatsApp agent <ArrowRight size={14} />
          </Link>
          <Link to="/scale" className="font-semibold text-brand-dark inline-flex items-center gap-1">
            D2C automation audit <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl bg-brand-dark text-white p-8 sm:p-12 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight">Want this running on your store?</h2>
          <p className="text-white/70 mt-3 max-w-md mx-auto text-sm sm:text-base">
            We build it around your catalogue, your shipping partner and your WhatsApp number. Message "AGENTS" and we will send you the full breakdown for your brand.
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
            GoRan AI · AI agents for Indian D2C brands · <Link to="/" className="text-white/60">goran.in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
