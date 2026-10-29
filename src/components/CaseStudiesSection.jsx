import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ApertureCarousel from './ui/aperture-carousel';
import { caseStudiesData } from '../pages/CaseStudyDetail';

// The headline result, a short brief and the client's real site for each story shown on Home.
// Name, tag and timeline come from the case study data so they stay in one place.
const CASES = [
  {
    id: 'anaaj-ai',
    metric: '12,000+',
    label: 'farmer queries resolved',
    desc: 'Rural farmers couldn\'t get prompt crop advice. We built a multilingual assistant that answers queries, spots crop disease from photos and automates the CRM.',
    image: '/case-studies/anaaj-ai.jpg',
  },
  {
    id: 'herbsera',
    metric: '92%',
    label: 'customer support automated',
    desc: 'Fragmented touchpoints slowed HerbsEra down. We unified the CRM, automated WhatsApp and added an AI voice agent that calls customers back.',
    image: '/case-studies/herbsera.jpg',
  },
  {
    id: 'hadoti-farms',
    metric: '3.5x',
    label: 'monthly order growth',
    desc: 'Hadoti Farms needed stock tracking and delivery automation. We shipped a headless store with live inventory and WhatsApp dispatch updates.',
    image: '/case-studies/hadoti-farms.jpg',
  },
  {
    id: 'greenwrench',
    metric: '88%',
    label: 'faster lead response',
    desc: 'Lead overload was stalling GreenWrench. We built a booking portal and an AI router that assigns every request to a technician in under 2 minutes.',
    image: '/case-studies/greenwrench.jpg',
  },
  {
    id: 'aroboticservices',
    metric: '65%',
    label: 'diagnostic bookings automated',
    desc: 'A Robotics Services needed dynamic scheduling. We built a premium portal with a diagnostic intake flow that books service visits with no manual work.',
    image: '/case-studies/arobotics.jpg',
  },
];

// Only this many case studies get a slide of their own. The rest sit behind a blurred "Show more"
const FULL = 3;

// Each line rises out of its own mask, staggered by `delay` seconds (the carousel's .ap-line style)
function Line({ delay = 0, children }) {
  return (
    <span className="ap-line">
      <span style={{ animationDelay: `${delay}s` }}>{children}</span>
    </span>
  );
}

function CaseSlide({ item }) {
  const data = caseStudiesData[item.id];
  return (
    <div className="max-w-[560px] text-left text-white">
      <Line>
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-2 text-sm font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shadow-[0_0_8px_rgb(var(--brand-accent-rgb)/0.9)]" />
            {data.name}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">{data.tag}</span>
        </span>
      </Line>
      <Line delay={0.06}>
        <span className="block pb-1 font-heading font-bold leading-none mt-4 text-[clamp(3.25rem,6.5cqw,6rem)] bg-gradient-to-r from-white to-[#AEBBF5] bg-clip-text text-transparent">
          {item.metric}
        </span>
      </Line>
      <Line delay={0.12}>
        <span className="block mt-3 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-white/80">{item.label}</span>
      </Line>
      <Line delay={0.18}>
        <span className="block mt-4 max-w-[460px] text-sm md:text-[0.95rem] leading-relaxed text-white/75">{item.desc}</span>
      </Line>
      <div data-ap-ui className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both" style={{ animationDelay: '0.35s' }}>
        <Link
          to={`/case-studies/${item.id}`}
          className="inline-flex items-center gap-2 rounded-btn bg-brand-yellow hover:bg-brand-yellow-hover text-brand-yellow-ink font-semibold text-sm py-2.5 px-5 transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          Read the case study <ArrowRight size={15} />
        </Link>
        <span className="hidden md:inline text-xs text-white/60">Live in {data.timeline.toLowerCase()}</span>
      </div>
    </div>
  );
}

function MoreSlide({ hidden }) {
  return (
    <div className="max-w-[560px] text-left text-white">
      <Line>
        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">{hidden} more case studies</span>
      </Line>
      <Line delay={0.06}>
        <span className="block pb-1 font-heading font-bold leading-[1.05] mt-4 text-4xl md:text-6xl text-balance">
          There is more where <span className="text-[#AEBBF5]">that came from</span>
        </span>
      </Line>
      <div data-ap-ui className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-both" style={{ animationDelay: '0.3s' }}>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 rounded-btn bg-brand-yellow hover:bg-brand-yellow-hover text-brand-yellow-ink font-semibold text-base py-3.5 px-8 shadow-[0_18px_40px_-12px_rgb(var(--brand-accent-rgb)/0.7)] transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          Show more <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

const slides = [
  ...CASES.slice(0, FULL).map((item) => {
    const data = caseStudiesData[item.id];
    return {
      image: item.image,
      alt: `${data.name} website`,
      label: `${data.name} · live site`,
      title: `${data.name}: ${item.metric} ${item.label}`,
      content: <CaseSlide item={item} />,
    };
  }),
  {
    image: CASES[FULL].image,
    alt: '',
    blur: true,
    label: 'More case studies',
    title: 'More case studies',
    content: <MoreSlide hidden={CASES.length - FULL} />,
  },
];

// Our past work: a carousel of case studies, the story on the left and the client's site in a browser
// window on the right (stacked on phones). Each next site opens through a circular iris from wherever
// you click; swipe or use the arrow keys too.
export default function CaseStudiesSection() {
  return (
    <section className="bg-white border-t border-brand-border py-20 md:py-28" id="case-studies">
      <div className="w-full max-w-275 mx-auto px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-text-muted">Our past work</span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.1] mt-3 mb-0 text-balance">
          Real stories. Real <span className="text-brand-yellow">business growth</span>
        </h2>
        <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-[520px] mx-auto mt-4 mb-0">
          Custom AI tools that solve actual operational headaches. Here is what we have delivered.
        </p>
      </div>

      <div className="w-full max-w-[1640px] mx-auto px-3 md:px-6 mt-12 md:mt-16">
        <div className="overflow-hidden rounded-3xl border border-brand-border/70 shadow-[0_30px_80px_-30px_rgba(31,39,65,0.45)] [--cs-h:576px] md:[--cs-h:780px] lg:[--cs-h:clamp(560px,78vh,660px)]">
          <ApertureCarousel
            slides={slides}
            height="var(--cs-h)"
            autoplay={7500}
            framed
            style={{ '--ap-accent': '#AEBBF5' }}
            ariaLabel="Case studies"
          />
        </div>
      </div>
    </section>
  );
}
