import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCalBooking } from '../components/CalBookingModal';
import SEOHead from '../components/SEOHead';
import { buildCaseStudySchema, buildBreadcrumbSchema } from '../seo/schemas';

export const caseStudiesData = {
  'maruti-techno-rubber': {
    name: 'Maruti Techno Rubber Pvt. Ltd.',
    tag: 'AI Sales Automation',
    headline: 'How GoRan AI reduced industrial lead response time from 9 hours to under 3 minutes',
    timeline: '35 Days',
    impact: '73% Faster Lead Conversion',
    services: ['AI Workflow Audit', 'AI CRM Setup', 'Lead Qualification System', 'WhatsApp Automation'],
    techStack: ['React.js', 'Node.js', 'MongoDB', 'OpenAI API', 'WhatsApp Cloud API', 'Firebase'],
    challenge: 'Maruti Techno Rubber generated leads through their website, exhibitions, WhatsApp, and distributor referrals, but the entire sales workflow was fragmented. Sales staff manually tracked inquiries in spreadsheets, delayed follow-ups caused hot leads to go cold, and no centralized CRM existed. The company had no visibility into lead status, quotation timelines, or customer engagement.',
    discovery: 'After auditing their operations, we identified that the biggest issue wasn’t lead generation — it was lead handling speed. Every inquiry required manual classification before reaching the correct sales person. Follow-ups depended entirely on memory and internal communication. Their team also lacked analytics to understand which products or sectors generated the highest-value clients.',
    solution: 'We implemented a centralized AI-powered CRM system integrated with the company website, WhatsApp, and email channels. Incoming leads are automatically categorized by industry, urgency, and product requirement using AI classification models. The system assigns leads to the right sales representative instantly, generates follow-up reminders automatically, and tracks every conversation in one dashboard. AI-generated quotation drafts and smart analytics were also integrated.',
    businessImpact: 'Average response time dropped from 9 hours to under 3 minutes. Sales teams stopped missing follow-ups entirely, and management gained real-time visibility into pipeline performance. Within 60 days, qualified lead conversion increased by 73%, and the company reported significantly improved distributor communication and customer retention.',
    images: [
      { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900', caption: 'CRM workflow optimization and lead routing dashboard' },
      { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900', caption: 'AI sales automation planning and CRM training session' },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900', caption: 'Lead handling speed metrics and pipeline analytics' },
      { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900', caption: 'Automated WhatsApp communication setup double-check' },
      { url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900', caption: 'Lead qualification pipeline visual chart' }
    ]
  },
  'anaaj-ai': {
    name: 'Anaaj AI',
    tag: 'AI Agriculture Platform',
    headline: 'How GoRan AI built an AI-powered agriculture assistant used by farmers across rural India',
    timeline: '62 Days',
    impact: '12,000+ Farmer Queries Automated',
    services: ['AI Product Development', 'Mobile App Engineering', 'AI Assistant Training', 'Dashboard Development'],
    techStack: ['React Native', 'Firebase', 'Gemini API', 'Node.js', 'MongoDB', 'Express.js'],
    challenge: 'Farmers in rural regions struggled to access accurate agricultural guidance quickly. Most relied on local assumptions, delayed expert consultation, or scattered YouTube videos for crop decisions. Existing agriculture apps were overly complex, lacked regional accessibility, and failed to provide actionable real-time recommendations.',
    discovery: 'During field research and product analysis, we discovered that farmers primarily needed fast answers to practical questions: crop disease identification, fertilizer usage, irrigation timing, mandi price insights, and government scheme guidance. The challenge was creating a system simple enough for non-technical users while still delivering intelligent recommendations.',
    solution: 'We developed Anaaj AI — a multilingual AI-powered agriculture assistant accessible through a lightweight mobile app. Farmers can upload crop images, ask questions in local languages, and receive AI-generated recommendations instantly. An admin dashboard was created for crop monitoring, user analytics, notification systems, and AI performance tracking. We also integrated OTP authentication, AI knowledge workflows, and scalable backend infrastructure.',
    businessImpact: 'Within the first launch phase, the platform automated over 12,000 farmer queries and significantly reduced dependency on manual support teams. Farmers reported faster decision-making around crop diseases and fertilizer planning, while administrators gained detailed analytics on regional agricultural trends and user behavior.',
    images: [
      { url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900', caption: 'Agricultural field data analysis dashboard' },
      { url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900', caption: 'Farmers checking multilingual crop assistant' },
      { url: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=900', caption: 'AI crop disease classification interface testing' },
      { url: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=900', caption: 'Admin monitoring panel for rural farmer inquiries' },
      { url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900', caption: 'Mandi pricing and scheme analytics dashboard' }
    ]
  },
  'voice-agent-platform': {
    name: 'NexaCall Solutions',
    tag: 'AI Voice Automation',
    headline: 'How GoRan AI automated 84% of inbound support calls using real-time AI voice agents',
    timeline: '48 Days',
    impact: '84% Call Automation Rate',
    services: ['Voice AI Architecture', 'Realtime Agent Deployment', 'Telephony Integration', 'AI Workflow Engineering'],
    techStack: ['LiveKit', 'Gemini Realtime API', 'Node.js', 'WebRTC', 'Twilio', 'Redis'],
    challenge: 'NexaCall Solutions handled thousands of repetitive inbound support calls daily related to appointment confirmations, account queries, and basic troubleshooting. Human agents were overloaded with repetitive tasks, resulting in long wait times and rising operational costs. Existing IVR systems frustrated users due to rigid menu flows and poor conversational experience.',
    discovery: 'We analyzed over 8,000 recorded support conversations and discovered that most customer interactions followed predictable patterns that could be handled conversationally by AI. However, the system needed low-latency speech processing, contextual memory, interruption handling, and real-time response generation to feel natural during live phone conversations.',
    solution: 'GoRan AI engineered a realtime voice agent platform powered by LiveKit and Gemini Realtime APIs. The AI agents could answer calls, understand natural speech, access business knowledge bases, schedule appointments, escalate complex issues, and transfer calls to humans when necessary. We also built a monitoring dashboard with live transcripts, analytics, and conversation review tools for supervisors.',
    businessImpact: 'The platform automated 84% of inbound support calls within the first deployment cycle. Average customer wait time dropped by 67%, and human support teams were freed to focus on high-priority issues. NexaCall estimated annual savings exceeding $240k in operational staffing costs while improving customer satisfaction scores significantly.',
    images: [
      { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900', caption: 'AI voice agent realtime scheduling dashboard' },
      { url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=900', caption: 'Voice call automation performance charts' },
      { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900', caption: 'LiveKit and Gemini Realtime API telephony integration' },
      { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900', caption: 'Live conversational transcript supervisor dashboard' },
      { url: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=900', caption: 'Customer support agent call routing center' }
    ]
  },
  'educonsult-ai': {
    name: 'EduConsult Global',
    tag: 'AI Lead Management',
    headline: 'How GoRan AI increased student consultation bookings by 3.2x using AI-driven lead automation',
    timeline: '31 Days',
    impact: '3.2x Lead Booking Increase',
    services: ['AI CRM Implementation', 'Funnel Automation', 'Lead Scoring System', 'Email Workflow Automation'],
    techStack: ['Next.js', 'FastAPI', 'PostgreSQL', 'OpenAI API', 'Calendly API', 'SendGrid'],
    challenge: 'EduConsult Global received hundreds of student inquiries daily for college admissions and overseas education consulting. Their counselors manually filtered leads, scheduled calls individually, and struggled to prioritize high-intent students. Follow-up delays caused a major drop-off in conversions, especially during admission seasons.',
    discovery: 'We found that most leads never received personalized engagement quickly enough. Counselors spent more time organizing spreadsheets and scheduling meetings than actually consulting students. There was also no predictive system to identify which students were most likely to convert into paying clients.',
    solution: 'We designed an AI-powered lead management ecosystem that automatically scores incoming student inquiries based on intent, academic background, and urgency. AI-generated personalized emails and WhatsApp messages nurture students automatically while integrating directly with Calendly for instant booking. The CRM dashboard provides real-time counselor allocation, conversion analytics, and pipeline forecasting.',
    businessImpact: 'Consultation bookings increased by 3.2x within the first two months. Counselors reduced administrative workload dramatically and focused entirely on high-value consultations. Automated nurturing improved response consistency, reduced lead drop-offs, and helped EduConsult scale operations during peak admission periods without increasing staffing costs.',
    images: [
      { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900', caption: 'Student consultation funnel status dashboard' },
      { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900', caption: 'AI lead scoring system settings panel' },
      { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900', caption: 'Automated email and Calendly booking workflow' },
      { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900', caption: 'Nurturing conversation review and counselor assignment' },
      { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900', caption: 'Admission cycle lead conversion dashboard' }
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
