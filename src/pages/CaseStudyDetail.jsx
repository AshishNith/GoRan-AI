import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const caseStudiesData = {
  'ibs-brokers': {
    name: 'IBS Insurance Brokers',
    tag: 'Workflow Automation',
    headline: 'How we saved IBS Brokers 1,280 hours of manual data entry every single month',
    timeline: '28 Days',
    impact: '1,280 Hours Saved / Month',
    services: ['AI Workflow Audit', 'Custom Document Pipeline', 'API Integration'],
    techStack: ['Python', 'FastAPI', 'Airtable', 'Google Cloud Document AI', 'Slack API'],
    challenge: 'IBS Insurance Brokers was facing a severe administrative backlog. With hundreds of new insurance applications arriving daily via email, client coordinators spent half their workdays manually reading incoming files, extracting key policy parameters, and copying them cell-by-cell into internal policy templates. This tedious, slow manual entry delayed customer policy issues by up to 5 business days and introduced human copy-paste errors in 8% of all policy records, leading to costly insurance claim discrepancies.',
    discovery: 'We spent the first week shadowing the IBS client team to map out their document flows. We discovered that while applications were unstructured, they followed consistent semantic rules. The major bottleneck was identifying client data (names, social security numbers, vehicle details) and linking it to correct policy categories. By evaluating their systems, we mapped out a path to automate the ingestion from the shared inbox directly into their database via a central parsing node, eliminating the need for manual screen-switching.',
    solution: 'We engineered a custom AI document pipeline. The system monitors the IBS inbound mail server, instantly catches incoming PDF applications, and forwards them to a cloud-based OCR parsing agent. This agent extracts form data, validates the extracted info against reference files, and writes it directly to the IBS database. We also added an internal review dashboard that flags low-confidence extractions for a quick human double-check, and sends automatic alerts via Slack whenever a policy is ready for issue.',
    businessImpact: 'The impact was immediate. Within 28 days of launch, manual copy-pasting was eliminated for 92% of incoming files. The average policy processing cycle dropped from 5 days to under 30 minutes. Most importantly, the IBS team reclaimed 1,280 hours of manual work every month, allowing coordinators to focus on customer relationship management rather than sorting paperwork.',
    images: [
      { url: '/audit_dashboard.png', caption: 'AI Audit Dashboard identifying manual process overheads' },
      { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop', caption: 'Mapping workflow nodes during initial stakeholder discovery' },
      { url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop', caption: 'IBS Operations team review of automated pipeline rules' },
      { url: '/workflow_graphic.png', caption: 'LLM-orchestrated document routing architecture' },
      { url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop', caption: 'Process layout mockups for internal validation dashboard' }
    ]
  },
  'hospitadent': {
    name: 'Hospitadent Dental Clinic',
    tag: 'Voice AI & Scheduling',
    headline: 'Securing 88+ new patient bookings in month one with 24/7 chat automation',
    timeline: '3 weeks',
    impact: '+88 Patient Bookings / Month',
    services: ['Conversational Agent Development', 'Patient Booking Assistant', 'CRM Integration'],
    techStack: ['React', 'Node.js', 'Vapi Voice AI', 'OpenAI API', 'Dentrix CRM'],
    challenge: 'Hospitadent was losing potential patients who messaged them after-hours. Their front desk staff was overwhelmed during the day, resulting in unanswered phone calls and slow webchat response times. Patients inquiring about appointment availability or pricing options would abandon the chat and book with competitors if they did not receive a reply within 5 minutes. Hospitadent needed a way to provide instant, friendly, and accurate booking assistance 24 hours a day.',
    discovery: 'Our team analyzed webchat transcripts and call logs. We found that 74% of patient questions were repetitive inquiries about insurance coverage, business hours, services, and appointment slots. The remaining 26% required complex medical assessment. This proved that a specialized conversational agent could handle the vast majority of patient interactions, qualifying their needs and booking them directly into the clinic\'s software scheduling calendar.',
    solution: 'We constructed an automated booking assistant integrated directly into the Hospitadent website and CRM. Using vector retrieval (RAG), the bot answers general questions about pricing and insurance with high accuracy. The assistant integrates directly with Hospitadent\'s appointment calendar database (Dentrix), allowing users to view available slots and schedule bookings in real-time. If a patient requires specialized support, the bot captures their phone number and schedules a callback for the clinic staff.',
    businessImpact: 'During the first 30 days of operation, the booking assistant handled 920 inquiries and secured 88+ new patient bookings entirely on autopilot. Patient satisfaction scores increased significantly due to the instant response time. The front-desk team now saves hours of phone time daily, allowing them to provide higher-quality in-person care to patients arriving at the clinics.',
    images: [
      { url: '/booking_dashboard.png', caption: 'Real-time client reservation assistant statistics' },
      { url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop', caption: 'Hospitadent front-desk team enabled by automated booking assistance' },
      { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop', caption: 'Custom patient appointment scheduler interface' },
      { url: '/rag_graphic.png', caption: 'Knowledge retrieval vector pipeline for patient queries' },
      { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop', caption: 'Customer interaction dashboard with automatic sentiment flagging' }
    ]
  },
  'urbanwear': {
    name: 'UrbanWear Co.',
    tag: 'Custom Dashboard & Fulfillment',
    headline: 'Cutting e-commerce fulfillment prep times in half with custom order sorting',
    timeline: '6 weeks',
    impact: '50% Faster Fulfillment Prep',
    services: ['SaaS Dashboard Design', 'Order Processing Engine', 'Database Optimization'],
    techStack: ['React', 'Tailwind CSS', 'PostgreSQL', 'Shopify API', 'Node.js'],
    challenge: 'UrbanWear Co. was experiencing rapid sales growth, but their manual fulfillment system was buckling under the load. Every morning, logistics staff spent hours reading through customer notes and order tags to sort custom apparel by size, print design, and shipping hub. This manual sorting delay meant that orders placed after 10:00 AM could not be shipped same-day, increasing order backlog and causing shipping delays during peak sales events.',
    discovery: 'We mapped the order-to-shipment workflow and determined that the manual lookup phase was the major bottleneck. All order specifications were already present in the Shopify payload, but the warehouse workers lacked a simplified view to sort and tag them automatically. Building a custom interface that reads, parses, and dynamically groups orders in real-time would streamline the entire packing queue.',
    solution: 'We designed a custom fulfillment dashboard. The engine automatically reads the raw Shopify order payload, runs parsing scripts, and assigns color-coded print-hub tags. Workers in the warehouse can view a simplified interface showing which orders match their specific printing machines. The dashboard updates live, enabling workers to print batch tags and pack custom apparel without opening individual order details.',
    businessImpact: 'The custom dashboard cut fulfillment preparation time in half (50% faster prep) in the first week. UrbanWear was able to extend their same-day shipping cut-off time from 10:00 AM to 3:00 PM, increasing customer satisfaction. The company successfully handled a 40% increase in order volume during Black Friday sales without hiring additional temporary warehouse staff.',
    images: [
      { url: '/sorting_dashboard.png', caption: 'Fulfillment queue showing automated tags and hub routing speed' },
      { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop', caption: 'UrbanWear distribution center processing automated shipments' },
      { url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop', caption: 'Order packaging line receiving automatic print tags' },
      { url: '/security_graphic.png', caption: 'Data security and token validation architecture for customer orders' },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop', caption: 'Weekly order processing analytics and cost-reduction chart' }
    ]
  },
  'apex-logistics': {
    name: 'Apex Logistics',
    tag: 'Internal Enablement & Training',
    headline: 'Helping Apex Logistics save 4.5 hours of boring administrative work per week',
    timeline: '4 weeks',
    impact: '4.5 Hours Saved / Week per Employee',
    services: ['AI Enablement Workshops', 'Internal AI Search Portal', 'Prompt Engineering'],
    techStack: ['Claude 3.5 Sonnet', 'OpenSearch Vector DB', 'Node.js', 'React', 'Tailwind CSS'],
    challenge: 'Apex Logistics support agents and operations coordinators were losing valuable time looking up complex carrier rules, safety guidelines, and company policies. Staff spent up to an hour daily searching through outdated PDFs and internal wikis, leading to slow response times for drivers on the road. The company needed a secure way to let employees find accurate policy answers in seconds using conversational search.',
    discovery: 'We conducted workshops and found that staff were manually searching the same 12 policy handbooks over and over. Furthermore, support agents did not know how to write effective prompts to get good answers from general-purpose AI chat tools. We realized that by combining structured prompt training with a custom search tool built on their actual handbooks, we could eliminate manual searching entirely.',
    solution: 'We built a secure internal search portal for Apex Logistics. The portal uses a private vector database containing all policy PDFs and safety manuals. Support agents can type questions in plain English (e.g., "What is the policy for route deviations in heavy snow?") and get instant, referenced answers. We also conducted hands-on training workshops to teach staff prompt engineering and workflow automation techniques.',
    businessImpact: 'The search portal and prompt training enabled Apex Logistics staff to save an average of 4.5 hours per employee per week. Driver support inquiries are resolved instantly on the first call rather than requiring a callback. The operations team has reported a significant reduction in administrative fatigue and higher employee confidence.',
    images: [
      { url: '/training_dashboard.png', caption: 'Apex Internal developer search query performance dashboard' },
      { url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop', caption: 'Logistics coordinators learning to query internal AI systems' },
      { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop', caption: 'Hands-on workshop showcasing custom copilot prompts' },
      { url: '/tuning_graphic.png', caption: 'Fine-tuning loops for logistics routing LLMs' },
      { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop', caption: 'Apex department heads validating administrative time savings' }
    ]
  }
};

export default function CaseStudyDetail() {
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
      {/* Hero Header */}
      <section className="border-b border-brand-border pb-16">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text-muted hover:text-brand-dark transition-colors mb-8 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Home
          </Link>

          <span className="inline-block py-1 px-3 bg-brand-yellow/10 text-[#B45309] font-mono text-xs uppercase tracking-widest font-semibold rounded-md mb-4">
            {caseStudy.tag}
          </span>
          
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
                <Link to="/contact" className="bg-brand-yellow text-brand-dark py-3 px-6 rounded-full no-underline font-semibold text-sm transition-all duration-300 hover:bg-brand-yellow-hover text-center shadow-card hover:translate-y-[-1px] inline-block mt-2">
                  Request Scoping Blueprint
                </Link>
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
