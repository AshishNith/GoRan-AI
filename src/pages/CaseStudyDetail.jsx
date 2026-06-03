import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCalBooking } from '../components/CalBookingModal';
import SEOHead from '../components/SEOHead';
import { buildCaseStudySchema, buildBreadcrumbSchema } from '../seo/schemas';

export const caseStudiesData = {
  'anaaj-ai': {
    name: 'Anaaj AI',
    tag: 'AI Agriculture Platform',
    headline: 'How GoRan AI Engineered Rural India\'s Leading Multilingual AI Agriculture Suite & Centralized CRM',
    timeline: '45 Days',
    impact: '12,000+ Farmer Queries Automated',
    services: ['AI Product Development', 'Multilingual LLM Training', 'Mobile App Development', 'Centralized CRM & Workflow Automation'],
    techStack: ['React Native', 'Firebase', 'Gemini 1.5 Pro', 'Node.js', 'Express.js', 'MongoDB'],
    challenge: 'Rural farmers across India struggled with delayed crop disease diagnosis, lack of a reliable crop planner, and delayed access to real-time mandi price insights. Existing agri-tech products were too complicated, lacked local language options, and had slow manual response loops, leading to agricultural yields dropping.',
    discovery: 'An operations audit revealed that farmers primarily needed instant crop disease diagnostics, local language voice queries, and real-time mandi prices. Additionally, the admin team needed a unified database CRM to oversee farmer concerns, send automated alerts, and monitor regional agricultural disease outbreaks at scale.',
    solution: 'GoRan AI designed, developed, and deployed the Anaaj AI mobile application integrated with a localized Gemini LLM chatbot that answers questions in regional dialects. We built an AI crop disease scanning module that processes image uploads in under 10 seconds. Finally, we engineered a complete backend CRM portal that centralizes grower profiles, schedules seasonal farming alerts, and maps region-wide pest alerts automatically.',
    businessImpact: 'Anaaj AI successfully automated over 12,000 grower crop inquiries, reducing dependency on manual advisors by 85%. Crop scan accuracy reached 94% with sub-10 second diagnostic response times. The centralized CRM automated agricultural outreach and seasonal planner alerts for all active farmers.',
    images: [
      { url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900', caption: 'Centralized crop health diagnostics and agricultural monitoring portal' },
      { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900', caption: 'Farmers validating the multilingual AI agricultural assistant in the field' },
      { url: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=900', caption: 'Real-time AI crop disease identification classifier testing interface' },
      { url: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=900', caption: 'Enterprise CRM dashboard tracking grower interactions and regional trends' }
    ]
  },
  'herbsera': {
    name: 'HerbsEra',
    tag: 'E-Commerce AI Architecture',
    headline: 'Deploying a Unified E-Commerce Tech Architecture, Centralized CRM, and Real-Time Voice Agents for HerbsEra',
    timeline: '40 Days',
    impact: '92% Customer Support Automated',
    services: ['E-Commerce Web Architecture', 'CRM & Centralized Data Hub', 'WhatsApp Chat Automation', 'AI Outbound Voice Calling'],
    techStack: ['Next.js', 'PostgreSQL', 'LiveKit', 'Gemini Realtime API', 'WhatsApp Cloud API', 'Node.js'],
    challenge: 'Fast-growing e-commerce brand HerbsEra faced fragmented client interactions. Customer queries, order dispatch records, and recovery of abandoned carts were scattered across various platforms. Manual support calling agents were overwhelmed, leading to high abandonment rates and lost customer loyalty.',
    discovery: 'An in-depth conversion funnel audit indicated that 78% of incoming customer queries were highly repetitive: order tracking, return queries, and product consultations. By establishing a centralized CRM database and deploying automated chat and voice agents, the customer loop could run 24/7 on autopilot.',
    solution: 'GoRan AI built a centralized data CRM warehouse integrated with HerbsEra\'s Next.js web storefront. We engineered an automated WhatsApp customer service agent that routes order details and handles refunds instantly. To handle calling, we built and deployed an AI voice caller powered by Gemini Realtime API and LiveKit that dials cart-abandoners, qualifies leads, and resolves customer support concerns conversationally in natural language.',
    businessImpact: '92% of standard customer inquiries are now resolved automatically. Standard support call handling times dropped to zero, saving over 40 hours of manual effort per week. Cart recovery automation via WhatsApp and voice agents yielded a 22% conversion increase in under 30 days.',
    images: [
      { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900', caption: 'Centralized e-commerce CRM dashboard mapping client tickets' },
      { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900', caption: 'Real-time e-commerce client ordering and cart recovery metrics' },
      { url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900', caption: 'LiveKit voice agent latency and conversation tracking logs' }
    ]
  },
  'hadoti-farms': {
    name: 'Hadoti Farms',
    tag: 'E-Commerce & Logistics Automation',
    headline: 'Automating fresh produce logistics and scaling headless storefront systems for Hadoti Farms',
    timeline: '30 Days',
    impact: '3.5x Monthly Order Volume',
    services: ['Headless E-Commerce Development', 'Automated Logistics Integration', 'WhatsApp Dispatch Automation', 'CRM Centralization'],
    techStack: ['React.js', 'Node.js', 'MongoDB', 'WhatsApp Cloud API', 'Vercel', 'Tailwind CSS'],
    challenge: 'Hadoti Farms aimed to deliver fresh farm produce directly to consumers. However, their inventory was highly time-sensitive. Relying on manual spreadsheet entries for stock levels led to overselling, inventory mismatch, and delayed delivery updates, which caused customer friction.',
    discovery: 'To scale D2C fresh produce delivery, Hadoti Farms required real-time stock-to-order synchronization. The ordering process had to trigger automated dispatch alerts to the sorting warehouse instantly, and customers needed transparent, step-by-step notifications regarding harvesting and shipping.',
    solution: 'We developed and deployed a headless, lightning-fast e-commerce application hosted on Vercel. We built a custom inventory synchronization system that tracks fresh stock levels in real time and automatically pushes order tickets to the warehouse dispatch hub. Furthermore, we integrated a WhatsApp Cloud API notification engine that sends automated status updates (harvested, packaged, shipped, out for delivery) with live tracking links.',
    businessImpact: 'Hadoti Farms boosted monthly order volume by 3.5x within 60 days. Manual order tracking errors fell to zero. Automated WhatsApp updates reduced order inquiry support load by 94%, allowing the company to scale operations smoothly across multiple cities.',
    images: [
      { url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=900', caption: 'Fresh farm produce sorting and automated routing queue' },
      { url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900', caption: 'Warehouse dispatch tracker and live inventory monitor' },
      { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900', caption: 'D2C delivery mapping and client notifications center' }
    ]
  },
  'codewave': {
    name: 'Codewave',
    tag: 'Premium Web Platform',
    headline: 'Re-engineering a high-fidelity interactive digital presence and SEO architecture for Codewave',
    timeline: '20 Days',
    impact: '200% Web Engagement Increase',
    services: ['UX/UI Interactive Design', 'High-Performance Frontend', 'GSAP Layout Animations', 'SEO & Core Web Vitals Optimization'],
    techStack: ['React.js', 'Vite', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
    challenge: 'Codewave, a boutique IT consulting firm, had an outdated, static web presence that didn\'t showcase their technical capabilities. Bounce rates were high, page load speeds were lagging, and a lack of proper SEO structure resulted in zero organic client leads.',
    discovery: 'An audit of website behavior revealed that visitors lost interest within 5 seconds due to boring layouts. The site required a premium aesthetic featuring fluid scrolling, layout transitions, and high-performance micro-interactions, combined with a clean HTML structure to pass Google\'s crawler requirements.',
    solution: 'We designed and coded a custom React.js web platform from scratch. We built fluid page transitions, horizontal scroll blocks, and interactive element cards powered by GSAP and Framer Motion. We fully optimized all assets for sub-second speeds and implemented a semantic HTML/schema framework for high-rank SEO indexation.',
    businessImpact: 'Codewave experienced a 200% increase in average session duration and a 45% reduction in bounce rate. Google PageSpeed scores hit 99/100, and organic search impressions grew by 150% in 45 days, generating a reliable flow of inbound corporate leads.',
    images: [
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900', caption: 'Interactive user interface showcase and grid layout' },
      { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900', caption: 'Code optimization benchmarks and asset compression metrics' },
      { url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900', caption: 'Responsive design layout showing interactive hover nodes' }
    ]
  },
  'greenwrench': {
    name: 'GreenWrench',
    tag: 'AI Lead Management & Routing',
    headline: 'Developing a field service portal and automated AI lead router to optimize GreenWrench operations',
    timeline: '28 Days',
    impact: '88% Faster Lead Response Time',
    services: ['Service Web Portal', 'AI Lead Routing Engine', 'CRM Setup & Mapping', 'Field Technician Dispatch System'],
    techStack: ['React.js', 'PostgreSQL', 'Google Maps API', 'Node.js', 'Express.js', 'Firebase'],
    challenge: 'GreenWrench was flooded with repair and maintenance leads from multiple cities. Their manual dispatch system struggled to match incoming tickets with field technicians by location and workload. This mismatch led to long response delays, scheduling conflicts, and lost deals.',
    discovery: 'We audited their scheduling records and realized that manual lead assignment was their primary bottleneck. By designing a web portal with a logic-driven routing database, leads could be mapped instantly to technicians based on GPS coordinates, schedule availability, and area of expertise.',
    solution: 'We built a responsive booking portal for GreenWrench and built a custom backend service router. The router parses client requests, maps technician geographic coordinates, and automatically assigns work orders to the closest available engineer. The technician receives an automated notification on WhatsApp containing complete task requirements.',
    businessImpact: 'Lead response times dropped from 4 hours to under 2 minutes. Dispatch team administrative workload was slashed by 90%, and technician utilization rates rose by 34%, eliminating missed repair opportunities.',
    images: [
      { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900', caption: 'Technician real-time dispatch dashboard and job scheduler' },
      { url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900', caption: 'Automated geographical lead routing mapping and status' },
      { url: 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=900', caption: 'Customer service request intake and tracking interface' }
    ]
  },
  'aroboticservices': {
    name: 'A Robotics Services',
    tag: 'Robotics Web & Automation',
    headline: 'Engineering a premium digital hub and intelligent service-booking ecosystem for A Robotics Services',
    timeline: '35 Days',
    impact: '65% Diagnostic Bookings Automated',
    services: ['High-End Portal Design', 'Automated Diagnostic Flow', 'Client Onboarding System', 'CRM Pipeline Integration'],
    techStack: ['React.js', 'Vite', 'Node.js', 'MongoDB', 'SendGrid API', 'Framer Motion'],
    challenge: 'A Robotics Services provides complex diagnostic and repairs for industrial robots. Their digital presence was outdated, and client onboarding was slow. Arranging diagnostic trials, scheduling on-site repair visits, and logging issues required long email chains and manual entries.',
    discovery: 'The client intake process was highly structured: robot brand, model type, error code, and severity. By automating this intake sequence through an interactive web portal, the system could pre-diagnose issues and propose appropriate appointment slots directly from technician calendar APIs.',
    solution: 'GoRan AI built a premium, modern robotics service platform with rich 3D-feeling graphics. We engineered an intelligent onboarding and diagnostics portal that guides users through a technical symptom check. The system logs these issues into their central database CRM, generates a diagnostic report, and schedules service visits automatically.',
    businessImpact: '65% of all diagnostics bookings are now processed with zero manual administration. Booking error rates were reduced to zero, and diagnostic onboarding time fell from 3 days to under 5 minutes. The website now serves as a high-conversion automated business hub.',
    images: [
      { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900', caption: 'Interactive diagnostics dashboard and service scheduling flow' },
      { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900', caption: 'Robotics field maintenance tracking and service logs' },
      { url: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=900', caption: 'Customer service portal showing automated diagnosis outputs' }
    ]
  }
};

export default function CaseStudyDetail() {
  const { openCalBooking } = useCalBooking();
  const { caseStudyId } = useParams();
  const caseStudy = caseStudiesData[caseStudyId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [caseStudyId]);

  if (!caseStudy) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-white">
        <div className="text-5xl font-heading font-bold text-brand-dark mb-2">404</div>
        <h2 className="text-2xl font-heading font-bold text-brand-dark">Case Study Not Found</h2>
        <p className="text-brand-text-muted max-w-sm">The case study page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark px-6 py-3 rounded-full font-semibold transition-all shadow-card">
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full bg-white pt-32 pb-24 font-body">
      <SEOHead
        title={`${caseStudy.headline} | Case Study`}
        description={`${caseStudy.challenge.substring(0, 155)}...`}
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
          
          <h1 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl md:text-5xl max-w-[900px] leading-tight mb-8">
            {caseStudy.headline}
          </h1>

          {/* Project Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-brand-border">
            <div>
              <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider font-bold">Client Partner</span>
              <span className="text-base font-semibold text-brand-dark mt-1 block">{caseStudy.name}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider font-bold">Timeline</span>
              <span className="text-base font-semibold text-brand-dark mt-1 block">{caseStudy.timeline}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider font-bold">Business Impact</span>
              <span className="text-base font-semibold text-brand-yellow bg-brand-yellow/5 px-2.5 py-0.5 rounded border border-brand-yellow/20 inline-block mt-1">{caseStudy.impact}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider font-bold">Services Delivered</span>
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
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-4">The Challenge (The Headache)</h2>
              <p className="text-brand-text-main text-sm sm:text-base leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-4">Audit & Bottleneck Identification</h2>
              <p className="text-brand-text-main text-sm sm:text-base leading-relaxed">{caseStudy.discovery}</p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-4">The Engineered Solution</h2>
              <p className="text-brand-text-main text-sm sm:text-base leading-relaxed">{caseStudy.solution}</p>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-4">Measurable Business Impact</h2>
              <p className="text-brand-text-main text-sm sm:text-base leading-relaxed">{caseStudy.businessImpact}</p>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 flex flex-col gap-8 lg:sticky lg:top-32 h-fit">
            <div className="bg-white border border-brand-border p-6 rounded-2xl">
              <h3 className="text-sm uppercase font-mono text-brand-dark tracking-wider font-bold mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.techStack.map((tech, idx) => (
                  <span key={idx} className="bg-white border border-brand-border px-3 py-1 rounded-md text-xs font-semibold text-brand-text-muted shadow-card">{tech}</span>
                ))}
              </div>
            </div>

            <div className="bg-brand-dark text-white p-6 rounded-2xl relative overflow-hidden">
              <div className="cta-grid-bg opacity-10"></div>
              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-lg font-heading font-bold text-white leading-tight">Ready to see similar results in your operations?</h3>
                <p className="text-sm text-white/70 leading-relaxed">Let’s run a custom audit on your operations and identify high-yield workflow automations.</p>
                <button onClick={openCalBooking} className="bg-brand-yellow text-brand-dark py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-brand-yellow-hover text-center shadow-card hover:translate-y-[-1px] mt-2 border-none cursor-pointer">
                  Request Scoping Blueprint
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 border-t border-brand-border">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark mb-8">Project Gallery & Screenshots</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudy.images.map((img, idx) => (
              <div key={idx} className="flex flex-col gap-3 group">
                <div className="w-full h-[240px] sm:h-[320px] rounded-2xl overflow-hidden bg-brand-bg-light border border-brand-border shadow-card relative">
                  <img 
                    src={img.url} 
                    alt={img.caption} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs font-medium text-brand-text-muted font-mono leading-normal pl-1">
                  Fig {idx + 1}. {img.caption}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
