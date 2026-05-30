import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCalBooking } from '../components/CalBookingModal';
import VoiceAgent from '../components/VoiceAgent';
import SEOHead from '../components/SEOHead';
import { buildBreadcrumbSchema } from '../seo/schemas';
import { Copy, Check, Sparkles } from 'lucide-react';

const budgetOptions = ['< ₹50k', '₹50k – ₹2L', '₹2L – ₹5L', '₹5L – ₹15L', '₹15L+'];
const timelineOptions = ['Immediate', 'Within 2–4 Weeks', '1–2 Months', '3+ Months', 'Exploring Options'];
const contactMethods = ['Email', 'WhatsApp', 'Phone Call', 'Google Meet', 'Calendly Booking'];
const projectTypes = [
  'AI Workflow Automation',
  'AI CRM Systems',
  'Voice AI / Calling Agents',
  'AI Chatbots',
  'Custom AI SaaS Products',
  'Lead Generation Systems',
  'AI Dashboards & Admin Panels',
  'Web Development + AI Integration',
  'Internal Business Automation',
  'Something Else'
];

// ── Local Fallback Blueprint Scoping Generator ──
const generateLocalFallbackReport = (data) => {
  const { name, company, projectType, targets, budget, timeline, message } = data;
  const comp = company ? `at **${company}**` : '';
  
  let opportunities = '';
  let questions = [];

  switch(projectType) {
    case 'AI Workflow Automation':
      opportunities = `Integrating AI directly into your business processes will eliminate manual, highly repetitive administrative overhead. By connecting platforms like **${targets || 'your daily software stack'}**, we can build intelligent pipeline triggers that automatically classify and route incoming telemetry, saving up to 10-15 hours per week per employee.`;
      questions = [
        `What specific software tools or APIs (e.g. CRM, sheets, databases) are currently involved in this manual pipeline?`,
        `How is data currently moved between these systems today (e.g. manual copy-paste, scheduled csv exports, basic webhooks)?`,
        `What is the most critical event or trigger that should initiate this automated workflow (e.g. new email, database insert, webhook)?`
      ];
      break;
    case 'AI CRM Systems':
      opportunities = `An intelligent CRM system automatically scores incoming leads, maps their context, and assigns them to the correct representative. Based on your budget of **${budget}**, a custom CRM framework will significantly lower lead drop rates and increase overall conversion speed by up to 70%.`;
      questions = [
        `How are leads currently captured on your platforms, and what is your average lead response time today?`,
        `Are there specific CRM tools (e.g., Salesforce, Hubspot) you want to integrate, or are you looking for a custom GoRan AI Admin Dashboard?`,
        `What key metrics (e.g., lead scoring, deal stage, communication history) are most important for your sales dashboard?`
      ];
      break;
    case 'Voice AI / Calling Agents':
      opportunities = `A custom calling agent built on LiveKit and Gemini Realtime API will allow your business to automate up to 80% of inbound and outbound scoping calls, ensuring 24/7 responsiveness and extremely high customer satisfaction.`;
      questions = [
        `What are the most common scenarios or objections your human calling agents handle today?`,
        `Which calling platforms or telephony services (e.g., Twilio, Vonage) is your business currently using or planning to use?`,
        `How would you like the calling agent to handle follow-up actions like scheduling a call or updating your database?`
      ];
      break;
    case 'AI Chatbots':
      opportunities = `An advanced conversational chatbot will act as your 24/7 digital front office, resolving client questions instantly using your custom knowledge base and routing high-value prospects straight to your team.`;
      questions = [
        `Where is your primary business knowledge stored today (e.g. PDFs, website pages, internal wiki docs, database)?`,
        `What are the 3 most frequent customer inquiries that take up the most time for your support team?`,
        `Should the chatbot just answer questions, or should it trigger actions like creating bookings or generating lead records?`
      ];
      break;
    default:
      opportunities = `Automating your operations will help streamline high-friction points, allowing your team to focus on high-value strategy rather than repetitive data chores. With a timeline of **${timeline}**, we can map out a modular deployment structure that provides fast, low-risk operational wins.`;
      questions = [
        `What is the single biggest bottleneck in this current workflow that drains the most time from your day?`,
        `What specific databases, systems, or tools (${targets || 'APIs'}) would this custom solution need to read and write from?`,
        `How do you measure success for this project (e.g. hours saved, faster delivery times, reduced manual errors)?`
      ];
  }

  return `### **Operational Review for ${name}** ${comp}

Thank you for requesting a custom automation blueprint for your project (**${projectType}**). Here is our Lead Solution Architect's initial operational review of your requirements.

---

### **1. AI Opportunity & Analysis**
${opportunities}

---

### **2. Customized Scoping Questions for our Call**
To help us build your comprehensive technical architecture blueprint, please review these **3 critical discovery questions**:

1. **${questions[0]}**
2. **${questions[1]}**
3. **${questions[2]}**

---

### **3. Strategic Next Steps**
* **Project Scope**: ${projectType}
* **Project Budget**: ${budget}
* **Project Timeline**: ${timeline}
* **Immediate Scoping Action**: Click **"Pick a Time"** below to book a free 30-minute scoping session. We will review your answers to these questions and deliver a complete, production-ready system architecture blueprint.`;
};

// ── Gemini API Scoping Report Generator ──
const generateGeminiScopingReport = async (data) => {
  const activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey || activeKey === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error("Gemini API key is not configured.");
  }

  const systemInstruction = `
You are the Lead Solutions Architect and AI Automations Engineer at GoRan AI, a premium AI agency.
Your task is to analyze a new client's project request and draft a premium, customized initial operations scoping blueprint.
This response will be displayed on our success screen and sent to their inbox.

Respond using a structured, high-end professional outline:
### **Operational Review for [Client Name]** [at Company]

### **1. AI Opportunity & Analysis**
Write a concise, expert operational assessment of their workflow description. Point out 1-2 manual bottlenecks and how AI can optimize them, referencing their chosen Project Type, Budget, and Timeline. Make it highly professional and custom-tailored (do not use generic fluff).

### **2. Customized Scoping Questions for our Call**
Formulate exactly 3 highly relevant, technically precise, and deep scoping questions based on their target integrations and project description. These questions should help us design their custom architecture. Ensure they are specific and direct.

### **3. Strategic Next Steps**
Provide a concise bulleted wrap-up confirming their parameters and inviting them to lock in a scoping call.

Tone: Lead Architect, extremely expert, concise, friendly, and highly tailored. Avoid excessive preambles. Keep formatting in clear Markdown, using bolding (**text**) for important metrics or concepts. Limit the total output to under 300 words. Do not mention that you are a language model or Google product. You are GoRan AI's Solutions Architect.
`;

  const promptText = `
Analyze the following client submission details:
- Client Name: ${data.name}
- Company: ${data.company || 'Not Specified'}
- Project Type: ${data.projectType}
- Target Integrations / APIs: ${data.targets || 'None specified'}
- Budget Range: ${data.budget}
- Expected Timeline: ${data.timeline}
- Project Description: ${data.message || 'No description provided.'}
`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: promptText }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      }
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  const reply = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) {
    throw new Error("Empty response received from Gemini.");
  }
  return reply;
};

// ── n8n Webhook Dispatcher & Responder ──
const triggerN8nWebhook = async (data) => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.includes('your-n8n-instance.com')) {
    console.info(
      "GoRan AI Webhook: n8n Webhook URL is not set. Add VITE_N8N_WEBHOOK_URL to your .env file to enable n8n workflow triggers."
    );
    return null;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("GoRan AI Webhook: Successfully triggered n8n workflow!", responseData);
    return responseData; // Returns { success: true, aiReport: "..." }
  } catch (err) {
    console.error("GoRan AI Webhook: Error calling n8n webhook:", err);
    return null;
  }
};

export default function Contact() {
  const { openCalBooking } = useCalBooking();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'AI Workflow Automation',
    targets: '',
    message: '',
    budget: '₹50k – ₹2L',
    timeline: '1–2 Months',
    contactMethod: 'Email',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiReport, setAiReport] = useState('');
  const [reportCopied, setReportCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectOption = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyReport = () => {
    if (!aiReport) return;
    navigator.clipboard.writeText(aiReport);
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    let report = '';
    try {
      // 1. Try to send to n8n Webhook
      const n8nResult = await triggerN8nWebhook(formData);

      if (n8nResult && n8nResult.aiReport) {
        report = n8nResult.aiReport;
      } else {
        // Fallback: Generate custom scoping report on client-side
        console.log("n8n webhook did not return an AI scoping report. Generating client-side strategy...");
        try {
          report = await generateGeminiScopingReport(formData);
        } catch (err) {
          console.warn("Gemini API direct scoping report failed, using high-quality local fallback engine.", err);
          report = generateLocalFallbackReport(formData);
        }
      }

      setAiReport(report);

      // 2. Mark form as submitted successfully
      setFormSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format scoping report text to match gold/dark theme beautifully
  const formatReportText = (text) => {
    if (!text) return '';

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let content = line;

      // Handle headers (### Header)
      if (line.trim().startsWith('###')) {
        const headerText = line.trim().replace(/^###\s*/, '');
        const boldRegex = /\*\*(.*?)\*\*/g;
        const parts = [];
        let lastIndex = 0;
        let match;
        while ((match = boldRegex.exec(headerText)) !== null) {
          if (match.index > lastIndex) {
            parts.push(headerText.substring(lastIndex, match.index));
          }
          parts.push(<strong key={match.index} className="text-brand-yellow font-bold">{match[1]}</strong>);
          lastIndex = boldRegex.lastIndex;
        }
        if (lastIndex < headerText.length) {
          parts.push(headerText.substring(lastIndex));
        }
        return (
          <h4 key={idx} className="font-heading font-bold text-sm text-brand-yellow mt-4 mb-2 first:mt-0 tracking-wide uppercase">
            {parts.length > 0 ? parts : headerText}
          </h4>
        );
      }

      // Handle bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-semibold text-brand-yellow">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < content.length) {
        parts.push(content.substring(lastIndex));
      }

      const formattedContent = parts.length > 0 ? parts : content;

      // Check if it's a list item
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().substring(2);
        const boldItemRegex = /\*\*(.*?)\*\*/g;
        const itemParts = [];
        let itemLastIndex = 0;
        let itemMatch;
        while ((itemMatch = boldItemRegex.exec(itemText)) !== null) {
          if (itemMatch.index > itemLastIndex) {
            itemParts.push(itemText.substring(itemLastIndex, itemMatch.index));
          }
          itemParts.push(<strong key={itemMatch.index} className="font-semibold text-brand-yellow">{itemMatch[1]}</strong>);
          itemLastIndex = boldItemRegex.lastIndex;
        }
        if (itemLastIndex < itemText.length) {
          itemParts.push(itemText.substring(itemLastIndex));
        }
        return (
          <li key={idx} className="list-disc ml-5 mb-2 text-xs text-white/80 leading-relaxed">
            {itemParts.length > 0 ? itemParts : itemText}
          </li>
        );
      }

      // Horizontal rule
      if (line.trim() === '---') {
        return <div key={idx} className="my-4 h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />;
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="mb-2.5 text-xs text-white/80 leading-relaxed last:mb-0">
          {formattedContent}
        </p>
      );
    });
  };

  const inputClasses = "w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-text-main outline-none focus:border-brand-yellow/60 focus:ring-2 focus:ring-brand-yellow/10 transition-all duration-200 text-sm placeholder:text-brand-text-muted/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]";

  return (
    <main className="w-full min-h-screen bg-white relative overflow-hidden pt-36 pb-24 font-body">
      <SEOHead
        title="Contact GoRan AI | Book Free AI Strategy Call — AI Agency India"
        description="Get in touch with GoRan AI. Book a free AI strategy call, request a custom automation blueprint, or message us on WhatsApp. India's leading AI automation agency."
        canonicalPath="/contact"
        schema={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact' },
        ])}
      />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-8%] w-125 h-125 rounded-full bg-brand-yellow/4 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[-8%] w-150 h-150 rounded-full bg-purple-500/3 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(229, 231, 235, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="w-full max-w-300 mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.05] tracking-tight mb-4">
            Let's build something{' '}
            <span className="text-brand-yellow">autonomous.</span>
          </h1>
          <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-xl">
            Every project starts with understanding operations first — not forcing AI where it doesn't belong. Tell us about the workflows you want to automate. We'll review your operations and build a custom automation blueprint — on your timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_540px] gap-14 lg:gap-20 items-start">

          {/* ── Left: Info + Process + Trust ── */}
          <div className="flex flex-col gap-12">

            {/* Direct contact */}
            <div className="rounded-2xl border border-brand-border bg-brand-bg-light p-6">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-4">
                Direct contact
              </h3>
              <div className="flex flex-col gap-3">
                <a href="mailto:goran.dotin@gmail.com" className="no-underline text-brand-dark font-medium text-sm hover:text-brand-yellow transition-colors flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F6C744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>
                  </span>
                  goran.dotin@gmail.com
                </a>
                <a href="https://wa.me/919934225353?text=Hi%20GoRan%20AI,%20I'd%20like%20to%20discuss%20an%20AI%20automation%20project%20for%20my%20business." target="_blank" rel="noopener noreferrer" className="no-underline text-brand-dark font-medium text-sm hover:text-[#25D366] transition-colors flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0 text-[#25D366]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.905-6.99C16.457 1.875 13.99 .843 11.372.843 5.939.843 1.517 5.263 1.513 10.7c-.001 1.692.443 3.342 1.285 4.792l-1.026 3.748 3.875-.986zm11.367-7.397c-.3-.15-1.771-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-3.04-1.257-4.743-3.69-5.468-4.942-.175-.3-.025-.45.075-.6l.45-.6c.1-.15.15-.25.225-.4.075-.15.038-.3-.013-.45-.05-.15-.475-1.15-.65-1.575-.171-.413-.343-.35-.475-.35-.125-.004-.27-.004-.413-.004-.143 0-.376.054-.572.27-.197.216-.752.735-.752 1.792s.77 2.08.877 2.225c.107.145 1.51 2.305 3.659 3.228.512.22 1.054.382 1.518.528.513.164.98.14 1.35.084.412-.06 1.77-.724 2.02-.975.25-.25.25-.475.25-.525-.001-.05-.1-.15-.4-.3z" /></svg>
                  </span>
                  WhatsApp
                </a>
                <div className="flex items-center gap-3 text-sm text-brand-text-muted">
                  <span className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F6C744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </span>
                  Avg. response: <span className="text-brand-dark font-semibold">within a few hours</span>
                </div>
              </div>
            </div>

            {/* Process steps — Visual Timeline */}
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-brand-text-muted mb-6">
                What happens after you submit
              </h3>
              <div className="flex flex-col gap-0">
                {[
                  { num: '01', title: 'Business & workflow review', desc: 'Our team evaluates your project scope, budget, and timeline to prepare.' },
                  { num: '02', title: '30-minute strategy/scoping call', desc: 'We hop on a quick call to understand your stack, pain points, and automation goals.' },
                  { num: '03', title: 'AI opportunity & automation analysis', desc: 'We identify key bottlenecks and build a prioritised opportunity map.' },
                  { num: '04', title: 'Custom implementation roadmap delivered', desc: 'You receive a detailed blueprint proposal with architecture, timeline, and deliverables.' },
                  { num: '05', title: 'Development kickoff & deployment planning', desc: 'Our engineering team starts building in sprints with structured rollout phases.' },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-5 pb-8 last:pb-0 relative group">
                    {/* Vertical line connector */}
                    {idx < 4 && (
                      <div className="absolute left-3.75 top-9 bottom-0 w-px bg-brand-border group-last:hidden" />
                    )}
                    <span className="font-heading text-sm font-bold text-brand-yellow select-none bg-brand-yellow/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative z-10">
                      {step.num}
                    </span>
                    <div className="pt-1">
                      <h4 className="font-heading font-semibold text-brand-dark text-sm mb-1">{step.title}</h4>
                      <p className="text-sm text-brand-text-muted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl border border-brand-border p-6">
              {[
                { value: '500k+', label: 'Daily executions' },
                { value: '99.9%', label: 'System uptime' },
                { value: '4.9/5', label: 'Client rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-xl font-bold text-brand-dark">{stat.value}</div>
                  <div className="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="border-l-4 border-brand-yellow pl-5">
              <p className="text-sm text-brand-text-muted leading-relaxed italic">
                "GoRan AI automated our lead handling and customer communication workflows completely. What used to take hours every day is now managed automatically in the background."
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center text-white text-[10px] font-bold font-heading">RV</div>
                <div>
                  <div className="text-xs font-semibold text-brand-dark">Rohit Verma</div>
                  <div className="text-[10px] text-brand-text-muted">Managing Partner, Verma Property Consultants</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="w-full">
            {formSubmitted ? (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-heading font-bold text-2xl text-brand-dark mb-3">
                  Blueprint Requested
                </h2>
                <p className="text-brand-text-muted text-sm leading-relaxed max-w-sm mb-8">
                  Thank you, <strong className="text-brand-dark">{formData.name}</strong>. We've registered your request and sent a confirmation to <strong className="text-brand-dark">{formData.email}</strong>. Our team will reach out within a few hours.
                </p>

                <div className="w-full bg-brand-bg-light border border-brand-border rounded-xl p-5 mb-8 text-left flex flex-col gap-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted border-b border-brand-border pb-2">
                    Submission summary
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs">
                    <span className="text-brand-text-muted">Company</span>
                    <span className="text-brand-dark font-semibold text-right truncate">{formData.company || '—'}</span>
                    <span className="text-brand-text-muted">Project Type</span>
                    <span className="text-brand-dark font-semibold text-right truncate">{formData.projectType || '—'}</span>
                    <span className="text-brand-text-muted">Budget</span>
                    <span className="text-brand-dark font-semibold text-right">{formData.budget}</span>
                    <span className="text-brand-text-muted">Timeline</span>
                    <span className="text-brand-dark font-semibold text-right">{formData.timeline}</span>
                    <span className="text-brand-text-muted">Contact via</span>
                    <span className="text-brand-dark font-semibold text-right">{formData.contactMethod}</span>
                  </div>
                </div>

                {/* ── AI Scoping Blueprint Card ── */}
                {aiReport && (
                  <div className="w-full bg-[#0E0E0E] border border-brand-yellow/30 rounded-2xl p-6 md:p-7 text-left my-8 shadow-card-hover relative overflow-hidden animate-fadeIn">
                    {/* Glowing blur background inside card */}
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-yellow/5 blur-[50px] pointer-events-none" />

                    {/* Active Status Badge */}
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-brand-yellow uppercase flex items-center gap-1.5 font-heading">
                          <Sparkles className="w-3.5 h-3.5" />
                          AI Scoping Blueprint
                        </span>
                      </div>
                      
                      {/* Copy Action Button */}
                      <button
                        onClick={handleCopyReport}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 hover:text-brand-yellow uppercase tracking-widest border border-white/10 hover:border-brand-yellow/30 bg-white/5 hover:bg-brand-yellow/10 rounded-lg px-2.5 py-1.5 transition-all duration-200 cursor-pointer active:scale-95"
                      >
                        {reportCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Details</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Scoping Blueprint Content */}
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
                      {formatReportText(aiReport)}
                    </div>

                    {/* direct Cal Booking invitation within the blueprint */}
                    <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        To discuss these strategic opportunities and review your custom architecture blueprint, click the booking button below.
                      </p>
                      <button
                        onClick={openCalBooking}
                        className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-xs py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-yellow/10 border-none cursor-pointer text-center"
                      >
                        Schedule Free Scoping Session
                      </button>
                    </div>
                  </div>
                )}

                <Link
                  to="/"
                  className="w-full bg-brand-dark hover:bg-brand-dark-hover text-white text-center font-semibold text-sm py-3 px-6 rounded-xl no-underline transition-all duration-300 inline-block hover:-translate-y-0.5"
                >
                  Return to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Sarah Jenkins" required className={inputClasses} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Work Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="sarah@company.com" required className={inputClasses} />
                  </div>
                </div>

                {/* Phone + Company row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" className={inputClasses} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Acme Corp" className={inputClasses} />
                  </div>
                </div>

                {/* Contact method */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Preferred contact method</label>
                  <div className="flex gap-2 flex-wrap">
                    {contactMethods.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption('contactMethod', opt)}
                        className={`py-2 px-3.5 border rounded-lg font-medium text-xs text-center cursor-pointer transition-all duration-200 ${formData.contactMethod === opt
                            ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark'
                            : 'bg-white border-brand-border text-brand-text-muted hover:border-brand-text-muted/40'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Type selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Project Type</label>
                  <div className="flex gap-2 flex-wrap">
                    {projectTypes.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption('projectType', opt)}
                        className={`py-2 px-3 border rounded-lg font-medium text-xs text-center cursor-pointer transition-all duration-200 ${formData.projectType === opt
                            ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark'
                            : 'bg-white border-brand-border text-brand-text-muted hover:border-brand-text-muted/40'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Integrations */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Integrations / APIs</label>
                  <input type="text" name="targets" value={formData.targets} onChange={handleInputChange} placeholder="e.g. Salesforce, Slack, Google Sheets, Airtable" className={inputClasses} />
                </div>

                {/* Budget + Timeline chips row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Budget Range</label>
                    <div className="flex gap-2 flex-wrap">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectOption('budget', opt)}
                          className={`py-2 px-3.5 border rounded-lg font-medium text-xs text-center cursor-pointer transition-all duration-200 ${formData.budget === opt
                              ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark'
                              : 'bg-white border-brand-border text-brand-text-muted hover:border-brand-text-muted/40'
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Timeline</label>
                    <div className="flex gap-2 flex-wrap">
                      {timelineOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectOption('timeline', opt)}
                          className={`py-2 px-3.5 border rounded-lg font-medium text-xs text-center cursor-pointer transition-all duration-200 ${formData.timeline === opt
                              ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark'
                              : 'bg-white border-brand-border text-brand-text-muted hover:border-brand-text-muted/40'
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">Project Description</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about the workflows you need to automate, the tools you use, and what success looks like for your team..."
                    rows={4}
                    className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-text-main outline-none focus:border-brand-yellow/60 focus:ring-2 focus:ring-brand-yellow/10 transition-all duration-200 text-sm resize-none placeholder:text-brand-text-muted/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-brand-dark hover:bg-brand-dark-hover text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 border-none cursor-pointer mt-2 text-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-85 cursor-not-allowed' : 'hover:-translate-y-0.5'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      AI Agent Scoping Blueprint...
                    </>
                  ) : (
                    <>
                      <span>Book a Free AI Strategy Call</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-brand-text-muted/50 text-center mt-1">
                  We'll respond within a few hours — no spam, no unnecessary sales calls.
                </p>
              </form>
            )}

            {/* ── Or book a call ── */}
            <div className="mt-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-brand-border flex-1" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted select-none">or book directly</span>
                <div className="h-px bg-brand-border flex-1" />
              </div>
              <div className="rounded-2xl p-8 text-white" style={{ background: '#0E0E0E' }}>
                <div className="flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F6C744" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Skip the form — book a call</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Pick a time that works for you. We'll review your operations and deliver a custom automation blueprint — no commitment required.
                    </p>
                  </div>
                  <button
                    onClick={openCalBooking}
                    className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-sm py-3.5 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-brand-yellow/20 border-none cursor-pointer"
                  >
                    Pick a Time
                  </button>
                  <p className="text-[10px] text-white/40 text-center -mt-3">Free 30-min call · No credit card required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Agent Section */}
      <div className="w-full mt-28">
        <div className="w-full max-w-300 mx-auto px-6 mb-12 flex items-center justify-center">
          <div className="h-px bg-brand-border flex-1" />
          <span className="px-6 text-[10px] font-bold uppercase tracking-widest text-brand-text-muted select-none">
            or speak with us directly
          </span>
          <div className="h-px bg-brand-border flex-1" />
        </div>
        <VoiceAgent />
      </div>
    </main>
  );
}
