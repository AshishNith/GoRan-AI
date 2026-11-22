import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCalBooking } from '../components/CalBookingModal';
import { ArrowLeft, ArrowRight, ExternalLink, Lock } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { buildCaseStudySchema, buildBreadcrumbSchema } from '../seo/schemas';
import { websiteForCaseStudy } from '../data/websites';

export const caseStudiesData = {
  'anaaj-ai': {
    name: 'Anaaj AI',
    tag: 'AI Agriculture Platform',
    headline: 'A farming assistant that has answered 12,000+ farmer questions in their own language',
    summary: 'Farmers were waiting days for crop advice. We built a multilingual assistant that answers questions, spots crop disease from a photo, and keeps every farmer in one CRM.',
    timeline: '45 Days',
    impact: '12,000+ Farmer Queries Automated',
    services: ['AI Product Development', 'Multilingual LLM Training', 'Mobile App Development', 'Centralized CRM & Workflow Automation'],
    techStack: ['React Native', 'Firebase', 'Gemini 1.5 Pro', 'Node.js', 'Express.js', 'MongoDB'],
    challenge: 'Rural farmers across India struggled with delayed crop disease diagnosis, lack of a reliable crop planner, and delayed access to real-time mandi price insights. Existing agri-tech products were too complicated, lacked local language options, and had slow manual response loops, leading to agricultural yields dropping.',
    discovery: 'An operations audit revealed that farmers primarily needed instant crop disease diagnostics, local language voice queries, and real-time mandi prices. Additionally, the admin team needed a unified database CRM to oversee farmer concerns, send automated alerts, and monitor regional agricultural disease outbreaks at scale.',
    solution: 'GoRan AI designed, developed, and deployed the Anaaj AI mobile application integrated with a localized Gemini LLM chatbot that answers questions in regional dialects. We built an AI crop disease scanning module that processes image uploads in under 10 seconds. Finally, we engineered a complete backend CRM portal that centralizes grower profiles, schedules seasonal farming alerts, and maps region-wide pest alerts automatically.',
    businessImpact: 'Anaaj AI successfully automated over 12,000 grower crop inquiries, reducing dependency on manual advisors by 85%. Crop scan accuracy reached 94% with sub-10 second diagnostic response times. The centralized CRM automated agricultural outreach and seasonal planner alerts for all active farmers.'
  },
  'herbsera': {
    name: 'HerbsEra',
    tag: 'E-Commerce AI Architecture',
    headline: 'How HerbsEra automated 92% of its customer support with WhatsApp and voice agents',
    summary: 'Orders, questions and abandoned carts were scattered across tools. We brought them into one CRM, automated WhatsApp, and added a voice agent that calls customers back.',
    timeline: '40 Days',
    impact: '92% Customer Support Automated',
    services: ['E-Commerce Web Architecture', 'CRM & Centralized Data Hub', 'WhatsApp Chat Automation', 'AI Outbound Voice Calling'],
    techStack: ['Next.js', 'PostgreSQL', 'LiveKit', 'Gemini Realtime API', 'WhatsApp Cloud API', 'Node.js'],
    challenge: 'Fast-growing e-commerce brand HerbsEra faced fragmented client interactions. Customer queries, order dispatch records, and recovery of abandoned carts were scattered across various platforms. Manual support calling agents were overwhelmed, leading to high abandonment rates and lost customer loyalty.',
    discovery: 'An in-depth conversion funnel audit indicated that 78% of incoming customer queries were highly repetitive: order tracking, return queries, and product consultations. By establishing a centralized CRM database and deploying automated chat and voice agents, the customer loop could run 24/7 on autopilot.',
    solution: 'GoRan AI built a centralized data CRM warehouse integrated with HerbsEra\'s Next.js web storefront. We engineered an automated WhatsApp customer service agent that routes order details and handles refunds instantly. To handle calling, we built and deployed an AI voice caller powered by Gemini Realtime API and LiveKit that dials cart-abandoners, qualifies leads, and resolves customer support concerns conversationally in natural language.',
    businessImpact: '92% of standard customer inquiries are now resolved automatically. Standard support call handling times dropped to zero, saving over 40 hours of manual effort per week. Cart recovery automation via WhatsApp and voice agents yielded a 22% conversion increase in under 30 days.'
  },
  'hadoti-farms': {
    name: 'Hadoti Farms',
    tag: 'E-Commerce & Logistics Automation',
    headline: 'How Hadoti Farms grew monthly orders 3.5x with live stock and WhatsApp updates',
    summary: 'Stock lived in spreadsheets, so produce was oversold and deliveries ran late. We built a store that tracks stock live and sends every delivery update on WhatsApp.',
    timeline: '30 Days',
    impact: '3.5x Monthly Order Volume',
    services: ['Headless E-Commerce Development', 'Automated Logistics Integration', 'WhatsApp Dispatch Automation', 'CRM Centralization'],
    techStack: ['React.js', 'Node.js', 'MongoDB', 'WhatsApp Cloud API', 'Vercel', 'Tailwind CSS'],
    challenge: 'Hadoti Farms aimed to deliver fresh farm produce directly to consumers. However, their inventory was highly time-sensitive. Relying on manual spreadsheet entries for stock levels led to overselling, inventory mismatch, and delayed delivery updates, which caused customer friction.',
    discovery: 'To scale D2C fresh produce delivery, Hadoti Farms required real-time stock-to-order synchronization. The ordering process had to trigger automated dispatch alerts to the sorting warehouse instantly, and customers needed transparent, step-by-step notifications regarding harvesting and shipping.',
    solution: 'We developed and deployed a headless, lightning-fast e-commerce application hosted on Vercel. We built a custom inventory synchronization system that tracks fresh stock levels in real time and automatically pushes order tickets to the warehouse dispatch hub. Furthermore, we integrated a WhatsApp Cloud API notification engine that sends automated status updates (harvested, packaged, shipped, out for delivery) with live tracking links.',
    businessImpact: 'Hadoti Farms boosted monthly order volume by 3.5x within 60 days. Manual order tracking errors fell to zero. Automated WhatsApp updates reduced order inquiry support load by 94%, allowing the company to scale operations smoothly across multiple cities.'
  },
  'codewave': {
    name: 'Codewave',
    tag: 'Premium Web Platform',
    headline: 'A faster, sharper website that lifted engagement 200% for Codewave',
    summary: 'The old site was slow, dated and invisible on Google. We rebuilt it from scratch with smooth motion, sub-second load times and a structure search engines can read.',
    timeline: '20 Days',
    impact: '200% Web Engagement Increase',
    services: ['UX/UI Interactive Design', 'High-Performance Frontend', 'GSAP Layout Animations', 'SEO & Core Web Vitals Optimization'],
    techStack: ['React.js', 'Vite', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
    challenge: 'Codewave, a boutique IT consulting firm, had an outdated, static web presence that didn\'t showcase their technical capabilities. Bounce rates were high, page load speeds were lagging, and a lack of proper SEO structure resulted in zero organic client leads.',
    discovery: 'An audit of website behavior revealed that visitors lost interest within 5 seconds due to boring layouts. The site required a premium aesthetic featuring fluid scrolling, layout transitions, and high-performance micro-interactions, combined with a clean HTML structure to pass Google\'s crawler requirements.',
    solution: 'We designed and coded a custom React.js web platform from scratch. We built fluid page transitions, horizontal scroll blocks, and interactive element cards powered by GSAP and Framer Motion. We fully optimized all assets for sub-second speeds and implemented a semantic HTML/schema framework for high-rank SEO indexation.',
    businessImpact: 'Codewave experienced a 200% increase in average session duration and a 45% reduction in bounce rate. Google PageSpeed scores hit 99/100, and organic search impressions grew by 150% in 45 days, generating a reliable flow of inbound corporate leads.'
  },
  'greenwrench': {
    name: 'GreenWrench',
    tag: 'AI Lead Management & Routing',
    headline: 'How GreenWrench cut lead response time from 4 hours to under 2 minutes',
    summary: 'Repair requests were being matched to technicians by hand. We built a booking portal and a router that assigns each job to the nearest available technician.',
    timeline: '28 Days',
    impact: '88% Faster Lead Response Time',
    services: ['Service Web Portal', 'AI Lead Routing Engine', 'CRM Setup & Mapping', 'Field Technician Dispatch System'],
    techStack: ['React.js', 'PostgreSQL', 'Google Maps API', 'Node.js', 'Express.js', 'Firebase'],
    challenge: 'GreenWrench was flooded with repair and maintenance leads from multiple cities. Their manual dispatch system struggled to match incoming tickets with field technicians by location and workload. This mismatch led to long response delays, scheduling conflicts, and lost deals.',
    discovery: 'We audited their scheduling records and realized that manual lead assignment was their primary bottleneck. By designing a web portal with a logic-driven routing database, leads could be mapped instantly to technicians based on GPS coordinates, schedule availability, and area of expertise.',
    solution: 'We built a responsive booking portal for GreenWrench and built a custom backend service router. The router parses client requests, maps technician geographic coordinates, and automatically assigns work orders to the closest available engineer. The technician receives an automated notification on WhatsApp containing complete task requirements.',
    businessImpact: 'Lead response times dropped from 4 hours to under 2 minutes. Dispatch team administrative workload was slashed by 90%, and technician utilization rates rose by 34%, eliminating missed repair opportunities.'
  },
  'aroboticservices': {
    name: 'A Robotics Services',
    tag: 'Robotics Web & Automation',
    headline: 'A booking portal that now handles 65% of diagnostic bookings for A Robotics Services',
    summary: 'Booking a robot repair took long email chains. We built a site with a guided fault check that logs the issue and schedules the service visit by itself.',
    timeline: '35 Days',
    impact: '65% Diagnostic Bookings Automated',
    services: ['High-End Portal Design', 'Automated Diagnostic Flow', 'Client Onboarding System', 'CRM Pipeline Integration'],
    techStack: ['React.js', 'Vite', 'Node.js', 'MongoDB', 'SendGrid API', 'Framer Motion'],
    challenge: 'A Robotics Services provides complex diagnostic and repairs for industrial robots. Their digital presence was outdated, and client onboarding was slow. Arranging diagnostic trials, scheduling on-site repair visits, and logging issues required long email chains and manual entries.',
    discovery: 'The client intake process was highly structured: robot brand, model type, error code, and severity. By automating this intake sequence through an interactive web portal, the system could pre-diagnose issues and propose appropriate appointment slots directly from technician calendar APIs.',
    solution: 'GoRan AI built a premium, modern robotics service platform with rich 3D-feeling graphics. We engineered an intelligent onboarding and diagnostics portal that guides users through a technical symptom check. The system logs these issues into their central database CRM, generates a diagnostic report, and schedules service visits automatically.',
    businessImpact: '65% of all diagnostics bookings are now processed with zero manual administration. Booking error rates were reduced to zero, and diagnostic onboarding time fell from 3 days to under 5 minutes. The website now serves as a high-conversion automated business hub.'
  }
};

export default function CaseStudyDetail() {
  const { openCalBooking } = useCalBooking();
  const { caseStudyId } = useParams();
  const caseStudy = caseStudiesData[caseStudyId];
  const site = websiteForCaseStudy(caseStudyId);
  const ids = Object.keys(caseStudiesData);
  const nextId = ids[(ids.indexOf(caseStudyId) + 1) % ids.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [caseStudyId]);

  if (!caseStudy) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-white">
        <div className="text-5xl font-heading font-bold text-brand-dark mb-2">404</div>
        <h2 className="text-2xl font-heading font-bold text-brand-dark">Case Study Not Found</h2>
        <p className="text-brand-text-muted max-w-sm">The case study page you're looking for doesn't exist or may have moved.</p>
        <Link to="/case-studies" className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-yellow-ink px-6 py-3 rounded-btn font-semibold transition-all no-underline">
          See all case studies
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full bg-white pt-32 pb-24 font-body">
      <SEOHead
        title={`${caseStudy.headline} | Case Study`}
        description={caseStudy.summary}
        canonicalPath={`/case-studies/${caseStudyId}`}
        schema={[
          buildCaseStudySchema(caseStudy, caseStudyId),
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Case Studies', url: '/case-studies' },
            { name: caseStudy.name },
          ]),
        ]}
      />
      {/* Hero Header */}
      <section className="border-b border-brand-border pb-16">
        <div className="w-full max-w-[1200px] mx-auto px-6">
                    <Link to="/case-studies" className="inline-flex items-center gap-1.5 no-underline text-brand-text-muted text-sm font-medium mb-6 transition-colors hover:text-brand-dark">
            <ArrowLeft size={14} /> All case studies
          </Link>
          <span className="block mb-4 text-xs font-semibold uppercase tracking-widest text-brand-yellow">{caseStudy.tag}</span>
          <h1 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl md:text-5xl max-w-[900px] leading-tight mb-8">
            {caseStudy.headline}
          </h1>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-brand-border">
            <div>
              <span className="block text-xs uppercase text-brand-text-muted tracking-wider font-semibold">Client</span>
              <span className="text-base font-semibold text-brand-dark mt-1 block">{caseStudy.name}</span>
            </div>
            <div>
              <span className="block text-xs uppercase text-brand-text-muted tracking-wider font-semibold">Timeline</span>
              <span className="text-base font-semibold text-brand-dark mt-1 block">{caseStudy.timeline}</span>
            </div>
            <div>
              <span className="block text-xs uppercase text-brand-text-muted tracking-wider font-semibold">Result</span>
              <span className="text-base font-semibold text-brand-yellow bg-brand-yellow/5 px-2.5 py-0.5 rounded border border-brand-yellow/20 inline-block mt-1">{caseStudy.impact}</span>
            </div>
            <div>
              <span className="block text-xs uppercase text-brand-text-muted tracking-wider font-semibold">What we delivered</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {caseStudy.services.map((service, idx) => (
                  <span key={idx} className="text-xs bg-white border border-brand-border px-2 py-0.5 rounded text-brand-text-main font-medium">{service}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Details */}
      <section className="py-16">
        <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-4">The challenge</h2>
              <p className="text-brand-text-main text-sm sm:text-base leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-4">What we found</h2>
              <p className="text-brand-text-main text-sm sm:text-base leading-relaxed">{caseStudy.discovery}</p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-4">What we built</h2>
              <p className="text-brand-text-main text-sm sm:text-base leading-relaxed">{caseStudy.solution}</p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-4">The results</h2>
              <p className="text-brand-text-main text-sm sm:text-base leading-relaxed">{caseStudy.businessImpact}</p>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 flex flex-col gap-8 lg:sticky lg:top-32 h-fit">
            <div className="bg-[#FEFEFE] border border-brand-border p-6 rounded-xl">
              <h3 className="text-xs uppercase text-brand-text-muted tracking-wider font-semibold mb-4">Built with</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.techStack.map((tech, idx) => (
                  <span key={idx} className="bg-white border border-brand-border px-3 py-1 rounded-md text-xs font-semibold text-brand-text-muted">{tech}</span>
                ))}
              </div>
            </div>

            <div className="text-white p-6 rounded-xl relative overflow-hidden" style={{ background: 'var(--glass-dark)' }}>
              <div aria-hidden className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-brand-yellow opacity-30 blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-lg font-heading font-bold text-white leading-tight">Want a result like this?</h3>
                <p className="text-sm text-white/70 leading-relaxed">Tell us where your team loses the most time. We will show you what can be automated and what it would save.</p>
                <button type="button" onClick={openCalBooking} className="bg-brand-yellow text-brand-yellow-ink py-3 px-6 rounded-btn font-semibold text-sm transition-all duration-300 hover:bg-brand-yellow-hover text-center hover:translate-y-[-1px] mt-2 border-none cursor-pointer">
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The client's live site, in a browser frame */}
      {site && (
        <section className="py-12 border-t border-brand-border">
          <div className="w-full max-w-[1200px] mx-auto px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark m-0">See it live</h2>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow no-underline hover:text-brand-yellow-hover transition-colors"
              >
                Visit {caseStudy.name} <ExternalLink size={14} />
              </a>
            </div>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${caseStudy.name} website`}
              className="group block overflow-hidden rounded-xl border border-brand-border bg-brand-tint no-underline transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="flex items-center gap-3 border-b border-brand-border bg-brand-bg-light px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-border" />
                </span>
                <span className="flex min-w-0 items-center gap-1.5 rounded-md border border-brand-border bg-white px-3 py-1 text-xs text-brand-text-muted">
                  <Lock size={10} className="shrink-0 text-emerald-500" />
                  <span className="truncate">{site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                </span>
              </div>
              <img
                src={site.image}
                alt={`${caseStudy.name} website home page`}
                loading="lazy"
                className="block w-full transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </a>
          </div>
        </section>
      )}

      {/* On to the next one */}
      <section className="pt-12 border-t border-brand-border">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <Link to={`/case-studies/${nextId}`} className="group flex flex-wrap items-center justify-between gap-4 no-underline">
            <span>
              <span className="block text-xs font-semibold uppercase tracking-widest text-brand-text-muted mb-2">Next case study</span>
              <span className="block font-heading font-bold text-brand-dark text-2xl md:text-3xl leading-tight transition-colors group-hover:text-brand-yellow">
                {caseStudiesData[nextId].name}: {caseStudiesData[nextId].impact}
              </span>
            </span>
            <span className="flex w-12 h-12 shrink-0 items-center justify-center rounded-btn bg-brand-yellow text-brand-yellow-ink transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={20} />
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
