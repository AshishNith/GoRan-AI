import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  PhoneCall, 
  LayoutDashboard, 
  ShoppingCart, 
  Star, 
  RotateCcw, 
  TrendingUp, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ShieldAlert, 
  ChevronDown, 
  Check, 
  User,
  Copy 
} from 'lucide-react';
import { useCalBooking } from '../components/CalBookingModal';
import SEOHead from '../components/SEOHead';
import ClientMarquee from '../components/ClientMarquee';

// ── Local Fallback Blueprint Scoping Generator (Tailored for D2C) ──
const generateD2CLocalReport = (data) => {
  return `### **D2C Operations Audit for ${data.brandName}**

Thank you, **${data.name}**, for requesting a custom operations audit. Here is our Solutions Architect's initial assessment of your D2C store's operations leaks.

---

### **1. AI Opportunity & Analysis**
By integrating autonomous AI agents into **${data.brandName}**, we can target your two biggest operational leaks: support response latency and Cash on Delivery returns.
* **COD & RTO Reduction**: Setting up an automated AI Calling Agent to confirm orders before dispatch can decrease your COD Return-to-Origin (RTO) rate by up to **60%**, preserving margins and shipping costs.
* **WhatsApp Automation**: Connecting a 24/7 AI WhatsApp Agent will instantly resolve up to **80%** of customer questions regarding order status (via Bluedart/Shiprocket), sizing questions, and returns.
* **Abandoned Checkout Recovery**: Following up automatically on checkout drops and Instagram DM inquiries (from **${data.instaHandle || '@instagram'}**) can capture **15-22%** of lost checkouts.

---

### **2. Technical Scoping Questions for our Call**
To prepare your detailed system architecture blueprint, please review these **3 discovery questions**:
1. Which shipping platform or aggregator (e.g. Shiprocket, Delhivery, nimbuspost) does your warehouse use to dispatch COD packages?
2. What sizing queries or standard return questions take up the most customer support time today?
3. Do you have an official WhatsApp Business API account (e.g. via WATI, Interakt, Aisensy) or should we set up a new custom phone number?

---

### **3. Strategic Next Steps**
* **Project Scope**: D2C AI Operations Autopilot
* **Instagram Handle**: ${data.instaHandle || 'Not Specified'}
* **WhatsApp Contact**: ${data.whatsappNumber}
* **Immediate Scoping Action**: Click **"Pick a Time"** below to book a free 30-minute scoping session. We will review your answers to these questions and deliver a complete, production-ready system architecture blueprint.`;
};

// ── Gemini API Scoping Report Generator (Tailored for D2C) ──
const generateD2CGeminiReport = async (data) => {
  const activeKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey || activeKey === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error("Gemini API key is not configured.");
  }

  const systemInstruction = `
You are the Lead D2C Solutions Architect and AI Automations Engineer at GoRan AI, a premium AI agency.
Your task is to analyze a new client's D2C store request and draft a premium, customized initial D2C operations scoping audit.
This response will be displayed on our success screen and sent to their inbox.

Respond using a structured, high-end professional outline:
### **D2C Operations Audit for [Brand Name]**

### **1. AI Opportunity & Analysis**
Write a concise, expert operational assessment of their store. Mention how a WhatsApp agent and COD voice calling agent will reduce RTO and automate customer support. Reference their Brand Name, Instagram Handle, and WhatsApp number. Make it highly professional and custom-tailored (do not use generic fluff).

### **2. Technical Scoping Questions for our Call**
Formulate exactly 3 highly relevant, technically precise, and deep scoping questions based on Shopify integrations, sizing guidelines, Shiprocket, and WhatsApp configuration.

### **3. Strategic Next Steps**
Provide a concise bulleted wrap-up confirming their parameters.

Tone: Lead Architect, extremely expert, concise, friendly, and highly tailored. Avoid excessive preambles. Keep formatting in clear Markdown, using bolding (**text**) for important metrics or concepts. Limit the total output to under 300 words. Do not mention that you are a language model.
`;

  const promptText = `
Analyze the following client submission details:
- Client Name: ${data.name}
- Brand Name: ${data.brandName}
- Instagram Handle: ${data.instaHandle || 'Not Specified'}
- WhatsApp Number: ${data.whatsappNumber}
- Email: ${data.email}
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

// ── n8n Webhook Dispatcher ──
const triggerN8nWebhook = async (data) => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  if (!webhookUrl || webhookUrl.includes('your-n8n-instance.com')) {
    console.info(
      "GoRan AI Webhook: n8n Webhook URL is not set. Using fallback API generators."
    );
    return null;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.whatsappNumber,
        company: data.brandName,
        projectType: 'D2C AI Operations Autopilot',
        targets: data.instaHandle || 'Not Specified',
        message: 'D2C Operations Autopilot Request from Landing Page',
        budget: '₹50k – ₹2L',
        timeline: 'Immediate',
        contactMethod: 'WhatsApp',
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("GoRan AI Webhook: Error calling n8n webhook:", err);
  }
}
// ── FAQ Accordion Questions ──
const faqs = [
  {
    q: "Will an AI agent make my D2C brand feel cold or robotic?",
    a: "No. We train your AI agents on your actual customer service logs, product guides, and brand voice guidelines. The AI responds empathetically, understands context, speaks in English or Hindi, and uses friendly formatting. If a customer is frustrated or asks a complex question, the agent triggers a seamless 1-click human handoff."
  },
  {
    q: "How does the COD verification call work?",
    a: "Within 10 minutes of a customer placing a COD order on your store, our system triggers an automated voice call. The AI introduces itself, reads out the order items, and asks the customer to confirm or cancel. Once verified, the order status in Shopify updates instantly. Unconfirmed orders are flagged, stopping you from shipping RTO-heavy packages."
  },
  {
    q: "What is the setup cost and timeline?",
    a: "We build, test, and deploy your custom operations team within 2 to 3 weeks. There is a small setup fee, followed by a performance retainer. We are so confident in our RTO reduction and support automation that we build a custom demo for your brand for free before you pay anything."
  },
  {
    q: "How does this integrate with Shopify, WhatsApp, and ship panels?",
    a: "Our agents connect natively via official APIs. We support Shopify, WooCommerce, Shiprocket, WhatsApp Business API (Cloud/WATI), and various CRMs. You don't need any developers; our team handles 100% of the integration and testing."
  }
];

export default function D2CAutomation() {
  const { openCalBooking } = useCalBooking();
  const [activeTab, setActiveTab] = useState('whatsapp');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // WhatsApp Simulator State
  const [whatsappChat, setWhatsappChat] = useState([
    { sender: 'ai', text: 'Hey there! 👋 Thanks for checking out GoRan AI. I am the virtual operations agent trained for this D2C store. Ask me anything about your order, sizing, or policies to see how I work!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [codVerified, setCodVerified] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [whatsappChat, isTyping]);

  const handleWhatsappPrompt = (type) => {
    if (isTyping) return;
    
    let userMsg = '';
    let responseText = '';
    let actionItem = null;

    if (type === 'tracking') {
      userMsg = '📦 Where is my order #1084?';
      responseText = "Let me check that for you... 🔍 Found it! Order #1084 (Oversized Cotton Hoodie) was shipped yesterday via Bluedart. It is currently in transit and out for delivery in Mumbai today! You can track it here: bluedart.com/track/849204. Would you like me to ping you when it's delivered?";
    } else if (type === 'sizing') {
      userMsg = '📏 What size fits a 5\'10" frame?';
      responseText = "Great question! For our Hoodies, a 5'10\" height usually fits a size L perfectly for a relaxed, oversized aesthetic. If you prefer a standard, snug fit, I'd recommend a size M. I've attached our quick size chart below. Let me know if you'd like to update your order size! 🛒";
    } else if (type === 'cod') {
      userMsg = '💳 Can I confirm my COD order?';
      responseText = "Absolutely! I see your Cash on Delivery order #1092 is currently pending confirmation. To ship it out today, please tap the confirm button below so we can verify your address. It saves our team from RTO shipping losses!";
      actionItem = 'confirm_btn';
    }

    setWhatsappChat(prev => [...prev, { sender: 'customer', text: userMsg }]);
    setCurrentPrompt(type);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setWhatsappChat(prev => [...prev, { sender: 'ai', text: responseText, action: actionItem }]);
    }, 1500);
  };

  const verifyCodInChat = () => {
    setCodVerified(true);
    setWhatsappChat(prev => [
      ...prev,
      { sender: 'customer', text: '✅ Clicked: Confirm COD Order' },
    ]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setWhatsappChat(prev => [
        ...prev,
        { sender: 'ai', text: 'Awesome! Order #1092 verified successfully. 🚀 Your package has been pushed to our warehouse queue and will ship in the next batch. You just saved ₹150 in potential return shipping fees!' }
      ]);
    }, 1200);
  };

  const resetChat = () => {
    setWhatsappChat([
      { sender: 'ai', text: 'Hey there! 👋 Thanks for checking out GoRan AI. I am the virtual operations agent trained for this D2C store. Ask me anything about your order, sizing, or policies to see how I work!' }
    ]);
    setCurrentPrompt(null);
    setCodVerified(false);
  };

  // Calling Agent Simulator State
  const [callPlaying, setCallPlaying] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, active, ended
  const callIntervalRef = useRef(null);

  const callTranscript = [
    { time: 1000, speaker: 'system', text: '🔊 Dialing +91 99342 XXXXX...' },
    { time: 3000, speaker: 'system', text: '📲 Call Answered' },
    { time: 4500, speaker: 'ai', text: '“Hi Ashish! I am calling from BrandHQ regarding your recent Cash on Delivery order #4928 for the Premium Hoodie. Am I speaking with Ashish?”' },
    { time: 9000, speaker: 'customer', text: '“Yes, this is Ashish speaking.”' },
    { time: 11500, speaker: 'ai', text: '“Great! We just wanted to confirm your delivery address: Flat 402, Skyline Tower, Mumbai. Is this correct and should we dispatch your order today?”' },
    { time: 17000, speaker: 'customer', text: '“Yes, that is correct. Please send it.”' },
    { time: 19500, speaker: 'ai', text: '“Awesome! I have marked your order as verified in our system. It will ship out this afternoon. You will receive a WhatsApp tracking link shortly. Have a great day!”' },
    { time: 24500, speaker: 'system', text: '❌ Call Ended • Verified successfully • RTO saved: ₹180' }
  ];

  const startCallDemo = () => {
    if (callPlaying) {
      clearInterval(callIntervalRef.current);
      setCallPlaying(false);
      setCallStatus('idle');
      setVisibleLines([]);
      return;
    }

    setCallPlaying(true);
    setCallStatus('calling');
    setVisibleLines([]);

    let index = 0;
    const runStep = () => {
      if (index < callTranscript.length) {
        const line = callTranscript[index];
        if (index === 1) setCallStatus('active');
        if (index === callTranscript.length - 1) setCallStatus('ended');
        setVisibleLines(prev => [...prev, line]);
        index++;
        
        if (index < callTranscript.length) {
          const nextDelay = callTranscript[index].time - callTranscript[index - 1].time;
          callIntervalRef.current = setTimeout(runStep, nextDelay);
        } else {
          setCallPlaying(false);
        }
      }
    };

    callIntervalRef.current = setTimeout(runStep, 500);
  };

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', whatsappNumber: '', brandName: '', instaHandle: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buildStep, setBuildStep] = useState(0);
  const [aiReport, setAiReport] = useState('');
  const [reportCopied, setReportCopied] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.whatsappNumber || !formData.brandName) return;

    setIsSubmitting(true);
    setBuildStep(0);

    const steps = [
      () => setBuildStep(1),
      () => setBuildStep(2),
      () => setBuildStep(3)
    ];

    setTimeout(steps[0], 500);
    setTimeout(steps[1], 1000);
    setTimeout(steps[2], 1500);

    setTimeout(async () => {
      let report = '';
      try {
        const n8nResult = await triggerN8nWebhook(formData);
        if (n8nResult && n8nResult.aiReport) {
          report = n8nResult.aiReport;
        } else {
          try {
            report = await generateD2CGeminiReport(formData);
          } catch (err) {
            console.warn("Gemini blueprint failed, falling back to local D2C generator", err);
            report = generateD2CLocalReport(formData);
          }
        }
        setAiReport(report);
        setFormSubmitted(true);
      } catch (err) {
        console.error("Audit compiler failed", err);
        report = generateD2CLocalReport(formData);
        setAiReport(report);
        setFormSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    }, 2000);
  };

  const handleCopyReport = () => {
    if (!aiReport) return;
    navigator.clipboard.writeText(aiReport);
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2000);
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

  return (
    <main className="w-full bg-white text-[#211C20] font-body antialiased min-h-screen relative overflow-hidden flex flex-col">
      <SEOHead
        title="Operations Autopilot for D2C Brands | GoRan AI"
        description="Verify COD orders, automate WhatsApp support, and recover carts. Cut RTO losses by 60% with tailored AI agents. Get a free demo for your Shopify store."
        canonicalPath="/scale"
      />

      {/* Background grids and lights aligned with main website */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(229, 231, 235, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-b from-brand-yellow/10 to-transparent blur-[100px]" />
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-[90px]" />
      </div>

      {/* Continuity Top Alert Banner */}
      <div className="w-full bg-brand-yellow text-brand-dark py-3 px-4 text-center text-xs font-semibold tracking-wide relative z-50">
        👋 Commented on our Instagram reel? Welcome! Here is the AI Operations Autopilot system we mentioned.
      </div>

      {/* Minimal Light Header */}
      <header className="relative z-50 border-b border-brand-border/80 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/Logo.png" alt="GoRan AI Logo" className="h-12 rounded-xl" />
          </a>
          <button 
            onClick={openCalBooking}
            className="bg-brand-dark text-white hover:bg-brand-dark-hover font-semibold text-xs py-2.5 px-5 rounded-full transition-all duration-200 cursor-pointer border-none shadow-md"
          >
            Book a Call
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-20 md:pt-24 md:pb-28 px-6">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-bold text-brand-dark uppercase tracking-wider mb-6 animate-fadeIn">
            <Sparkles size={12} className="text-brand-yellow fill-brand-yellow" /> D2C Operations Engine
          </div>
          
          <h1 className="font-heading font-black text-brand-dark text-[2.2rem] sm:text-[3.2rem] md:text-[5.5rem] leading-[1.05] tracking-tight max-w-[900px] mb-6 animate-fadeIn">
            Stop Losing Sales to Slow Replies, Missed Leads, and COD Returns
          </h1>

          <p className="text-brand-text-muted text-base sm:text-lg md:text-xl max-w-[700px] leading-relaxed mb-10 animate-fadeIn" style={{ animationDelay: '0.15s' }}>
            We build custom, autonomous AI agents that act as your brand's digital operations team—answering support questions, confirming COD orders, and recovering carts 24/7.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-base py-4 px-8 rounded-full shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get My Free Demo</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById('sandbox-proof')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-brand-bg-light hover:bg-[#F2F2F2] text-brand-dark font-semibold text-base py-4 px-8 rounded-full border border-brand-border transition-all duration-200 cursor-pointer flex items-center justify-center"
            >
              See Live Simulator
            </button>
          </div>
        </div>
      </section>

      {/* Client Showcase Section */}
      <div className="border-t border-b border-brand-border/60 py-2.5 bg-white relative z-10">
        <ClientMarquee />
      </div>

      {/* The Problem Section */}
      <section className="relative z-10 py-24 bg-brand-bg-light border-t border-b border-brand-border px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[750px] mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 uppercase tracking-wider mb-3 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              <ShieldAlert size={14} /> The Leaks in Your Store
            </div>
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight">
              Running a D2C brand is chaotic. Operations leaks are quietly draining your margins.
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base mt-4 leading-relaxed">
              While you burn cash acquiring customers with ads, these five points are where your profit margins actually slip away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Card 1 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-dark mb-5">
                <Clock size={20} className="text-[#F5A623]" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2 font-heading">Customer support overload</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                Endless repetitive questions about sizing, order status, and returns across WhatsApp and Instagram, with zero night or weekend coverage.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-red-55 flex items-center justify-center mb-5">
                <ShieldAlert size={20} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2 font-heading">High COD & RTO losses</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                A massive share of cash-on-delivery orders never get delivered. They bounce back as RTO, draining double shipping fees and locking inventory.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                <LayoutDashboard size={20} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2 font-heading">Multi-channel order chaos</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                Juggling Shopify, Instagram, WhatsApp, and marketplaces with no single source of truth for orders, stock, or customer profiles.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                <ShoppingCart size={20} className="text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2 font-heading">Abandoned carts & lost DMs</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                Purchase inquiries in DMs and carts left at checkout go completely unanswered, losing track of potential revenue without recovery systems.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-brand-border rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-5">
                <User size={20} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2 font-heading">Founder burnout</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">
                One person trying to handle customer service, dispatch, packing lists, marketing ads, and finance simultaneously, with no time left to actually grow.
              </p>
            </div>
          </div>

          {/* Hard Fact Stat Block */}
          <div className="w-full rounded-2xl bg-white border border-brand-border p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card hover:shadow-card-hover transition-all duration-300">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dark bg-brand-yellow px-2.5 py-1 rounded-full">Did You Know?</span>
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark mt-4 mb-2 font-heading">COD Return-To-Origin (RTO) rates drain Indian D2C brands</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed max-w-[700px]">
                In India, typical RTO rates for COD-heavy D2C brands stand at **25% to 40%**. For every returned delivery, brands lose ₹120–180 in double shipping and restocking fees, locking up cash flow and inventory.
              </p>
            </div>
            <div className="text-center md:text-right shrink-0 bg-brand-bg-light border border-brand-border p-5 rounded-2xl min-w-[200px]">
              <div className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight">₹1,50,000+</div>
              <div className="text-xs text-brand-text-muted font-bold tracking-wide uppercase mt-2">Avg. Monthly RTO Loss / 1k Orders</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Bridge */}
      <section className="py-24 relative z-10 bg-white px-6 border-b border-brand-border/60">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="text-xs font-bold uppercase text-brand-text-muted tracking-[0.15em]">The Bridge</span>
          <p className="text-xl md:text-3xl font-heading text-brand-dark leading-relaxed mt-4 font-normal italic">
            "We build tailored AI systems that act like an extra team for your brand — handling customer support, COD confirmations, order tracking, and follow-ups automatically, so nothing falls through the cracks."
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-brand-bg-light border-t border-b border-brand-border px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight">
              AI Automations Built for Growth
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base mt-3 leading-relaxed">
              We deploy custom operations agents directly into your existing stack. Scan our core capabilities below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <MessageSquare size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">AI WhatsApp Support Agent</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                Answers customer questions instantly, 24/7, in English or Hindi. Resolves sizing, shipping delays, and policy FAQs.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Saves 80% support hours + instant replies.
              </div>
            </div>

            {/* Capability 2 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <PhoneCall size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">AI COD Confirmation Agent</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                Automatically triggers confirmation voice calls or WhatsApp pings before shipping to verify COD customer intent and addresses.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Slashes RTO losses by up to 65%.
              </div>
            </div>

            {/* Capability 3 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <LayoutDashboard size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">Centralized Order Dashboard</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                One unified visual interface tracking orders and inventory across Shopify, WhatsApp, and ship panels. No more manual seller-panel hopping.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Clear order visibility, zero stockouts.
              </div>
            </div>

            {/* Capability 4 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <ShoppingCart size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">Cart & Lead Recovery</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                Detects abandoned checkouts and cold DM inquiries, following up automatically with custom offers on WhatsApp/Instagram.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Recovers 15-22% of abandoned revenue.
              </div>
            </div>

            {/* Capability 5 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <Star size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">Review & Reputation Automation</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                Automatically checks shipping delivery status and pings customers for feedback at the perfect time. Flags poor reviews to support teams.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Boosts 5-star reviews while catching issues early.
              </div>
            </div>

            {/* Capability 6 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <RotateCcw size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">Returns & Exchange Assistant</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                Walks customers through self-serve returns and exchanges on WhatsApp. Handles picture uploads for defects and updates tracking.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Effortless returns management, higher customer trust.
              </div>
            </div>

            {/* Capability 7 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <TrendingUp size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">Personalized Marketing</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                Replaces generic broadcast spam with smart, customized recommendation flows based on what customers actually browsed.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Doubles WhatsApp campaign conversion rates.
              </div>
            </div>

            {/* Capability 8 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <LayoutDashboard size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">Daily Business Insights</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                A simple daily summary of sales, support queue logs, and active delivery pipelines sent straight to your WhatsApp/Slack.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Complete business control without logging into spreadsheets.
              </div>
            </div>

            {/* Capability 9 */}
            <div className="bg-white border border-brand-border rounded-xl p-6 hover:shadow-card-hover transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                  <Sparkles size={16} />
                </div>
                <h3 className="font-bold text-brand-dark font-heading">Founder Productivity Tools</h3>
              </div>
              <p className="text-brand-text-muted text-xs leading-relaxed mb-4">
                Small automations matching founder routines: voice-to-task lists, automated warehouse checklists, and low-inventory reminders.
              </p>
              <div className="text-[11px] text-brand-text-muted font-mono bg-brand-bg-light p-2 rounded-lg">
                <span className="text-brand-dark font-bold">Outcome:</span> Saves founders 10+ operational hours every single week.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Process / How it works */}
      <section className="py-24 relative z-10 bg-white px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">How We Work</span>
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight mt-2">
              From Scope to Launch in 5 Steps
            </h2>
            <p className="text-brand-text-muted text-sm mt-3 leading-relaxed">
              We design and configure the systems for you. No coding required on your end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-bg-light border border-brand-border flex items-center justify-center font-bold text-brand-dark text-base mb-4 relative z-10 shadow-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-brand-dark mb-2 font-heading">Discovery Call</h3>
              <p className="text-brand-text-muted text-xs leading-relaxed">
                15-min call to audit your current store pipelines and identify your biggest leaks.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-bg-light border border-brand-border flex items-center justify-center font-bold text-brand-dark text-base mb-4 relative z-10 shadow-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-brand-dark mb-2 font-heading">Free Demo Build</h3>
              <p className="text-brand-text-muted text-xs leading-relaxed">
                We build a custom, working demo of your WhatsApp agent and dialer dashboard for free.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-bg-light border border-brand-border flex items-center justify-center font-bold text-brand-dark text-base mb-4 relative z-10 shadow-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-brand-dark mb-2 font-heading">Live Review</h3>
              <p className="text-brand-text-muted text-xs leading-relaxed">
                You test the live demo agent with your own catalog and see exactly how it processes orders.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-bg-light border border-brand-border flex items-center justify-center font-bold text-brand-dark text-base mb-4 relative z-10 shadow-sm">
                4
              </div>
              <h3 className="text-sm font-bold text-brand-dark mb-2 font-heading">Integration</h3>
              <p className="text-brand-text-muted text-xs leading-relaxed">
                We connect your shop logs, shipping panels, and official WhatsApp APIs in 48 hours.
              </p>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center font-bold text-base mb-4 relative z-10 shadow-[0_4px_12px_rgba(246,199,68,0.25)] border-none">
                5
              </div>
              <h3 className="text-sm font-bold text-brand-dark mb-2 font-heading">Scale & Support</h3>
              <p className="text-brand-text-muted text-xs leading-relaxed">
                Ongoing agent fine-tuning, dashboard analytics reporting, and priority support.
              </p>
            </div>

            {/* Connecting lines on desktop */}
            <div className="hidden md:block absolute top-6 left-10 right-10 h-[1px] bg-brand-border z-0" />
          </div>
        </div>
      </section>

      {/* Proof Section - Live Interactive Sandbox */}
      <section id="sandbox-proof" className="py-24 bg-brand-bg-light border-t border-b border-brand-border px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[700px] mx-auto mb-14">
            <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">Proof of Concept</span>
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight mt-2">
              See It Before You Believe It
            </h2>
            <p className="text-brand-text-muted text-sm mt-3 leading-relaxed">
              We'd rather show you a working prototype than ask you to trust a generic case study. Interact with our sandbox simulations below.
            </p>
          </div>

          {/* Sandbox Tabs */}
          <div className="flex justify-center gap-2 mb-8 bg-white p-1.5 rounded-full border border-brand-border max-w-[550px] mx-auto">
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-2 px-4 rounded-full font-bold text-xs md:text-sm transition-all border-none cursor-pointer ${
                activeTab === 'whatsapp' 
                  ? 'bg-brand-yellow text-brand-dark shadow-sm' 
                  : 'text-brand-text-muted hover:text-brand-dark bg-transparent'
              }`}
            >
              WhatsApp Agent
            </button>
            <button
              onClick={() => setActiveTab('calling')}
              className={`flex-1 py-2 px-4 rounded-full font-bold text-xs md:text-sm transition-all border-none cursor-pointer ${
                activeTab === 'calling' 
                  ? 'bg-brand-yellow text-brand-dark shadow-sm' 
                  : 'text-brand-text-muted hover:text-brand-dark bg-transparent'
              }`}
            >
              COD Calling
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 py-2 px-4 rounded-full font-bold text-xs md:text-sm transition-all border-none cursor-pointer ${
                activeTab === 'dashboard' 
                  ? 'bg-brand-yellow text-brand-dark shadow-sm' 
                  : 'text-brand-text-muted hover:text-brand-dark bg-transparent'
              }`}
            >
              Store Dashboard
            </button>
          </div>

          {/* Sandbox Content Container */}
          <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 min-h-[520px] flex flex-col justify-between max-w-[850px] mx-auto relative overflow-hidden shadow-card">
            
            {/* 1. WhatsApp Chat Simulator */}
            {activeTab === 'whatsapp' && (
              <div className="w-full flex flex-col h-full animate-fadeIn">
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 relative">
                      <MessageSquare size={18} />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-dark font-heading">GoRan AI WhatsApp Demo</h4>
                      <p className="text-[10px] text-brand-text-muted font-mono">Agent Active • Official Sandbox Integration</p>
                    </div>
                  </div>
                  <button 
                    onClick={resetChat}
                    className="text-xs text-brand-text-muted hover:text-brand-dark font-semibold bg-transparent border-none cursor-pointer"
                  >
                    Reset Chat
                  </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 max-h-[300px] min-h-[260px] scrollbar-hide py-2">
                  {whatsappChat.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed ${
                        msg.sender === 'customer' 
                          ? 'bg-brand-dark text-white font-medium rounded-tr-none' 
                          : 'bg-brand-bg-light text-brand-dark rounded-tl-none border border-brand-border'
                      }`}>
                        {msg.text}
                        
                        {msg.action === 'confirm_btn' && (
                          <div className="mt-3">
                            {codVerified ? (
                              <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 py-2.5 px-4 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1.5">
                                <Check size={14} /> Verified successfully!
                              </div>
                            ) : (
                              <button
                                onClick={verifyCodInChat}
                                className="w-full bg-brand-yellow text-brand-dark hover:bg-brand-yellow-hover font-bold text-xs py-2.5 px-4 rounded-xl transition-all border-none cursor-pointer shadow-sm"
                              >
                                Confirm Order Dispatch 🚚
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-brand-bg-light rounded-2xl rounded-tl-none p-3.5 text-xs border border-brand-border flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Option Prompts Input */}
                <div className="border-t border-brand-border/60 pt-4 mt-4">
                  <p className="text-[10px] text-brand-text-muted uppercase tracking-wider mb-2.5 font-mono">Select a question to test the AI response:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleWhatsappPrompt('tracking')}
                      disabled={isTyping}
                      className={`py-2 px-3.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        currentPrompt === 'tracking'
                          ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark'
                          : 'bg-brand-bg-light border-brand-border text-brand-text-muted hover:bg-brand-yellow/10 hover:border-brand-yellow hover:text-brand-dark'
                      }`}
                    >
                      📦 Where is order #1084?
                    </button>
                    <button
                      onClick={() => handleWhatsappPrompt('sizing')}
                      disabled={isTyping}
                      className={`py-2 px-3.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        currentPrompt === 'sizing'
                          ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark'
                          : 'bg-brand-bg-light border-brand-border text-brand-text-muted hover:bg-brand-yellow/10 hover:border-brand-yellow hover:text-brand-dark'
                      }`}
                    >
                      📏 Sizing for 5'10" frame?
                    </button>
                    <button
                      onClick={() => handleWhatsappPrompt('cod')}
                      disabled={isTyping}
                      className={`py-2 px-3.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        currentPrompt === 'cod'
                          ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark'
                          : 'bg-brand-bg-light border-brand-border text-brand-text-muted hover:bg-brand-yellow/10 hover:border-brand-yellow hover:text-brand-dark'
                      }`}
                    >
                      💳 Confirm COD order?
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Calling Agent Simulator */}
            {activeTab === 'calling' && (
              <div className="w-full flex flex-col justify-between h-full animate-fadeIn">
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                      <PhoneCall size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-dark font-heading">GoRan AI Caller Dialer</h4>
                      <p className="text-[10px] text-brand-text-muted font-mono">Real-time COD Verification Call Simulation</p>
                    </div>
                  </div>
                  
                  <div className={`text-[10px] font-bold font-mono uppercase tracking-wider py-1.5 px-3 rounded-full border ${
                    callStatus === 'idle' ? 'bg-brand-bg-light border-brand-border text-brand-text-muted' :
                    callStatus === 'calling' ? 'bg-amber-50 border-amber-200 text-[#F5A623] animate-pulse' :
                    callStatus === 'active' ? 'bg-green-50 border-green-200 text-green-600' :
                    'bg-emerald-50 border-emerald-200 text-emerald-600'
                  }`}>
                    {callStatus === 'idle' ? 'Idle' : 
                     callStatus === 'calling' ? 'Dialing...' : 
                     callStatus === 'active' ? 'Call Active 📞' : 
                     'Call Completed'}
                  </div>
                </div>

                {/* Simulated Dial Screen & Waveform */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center flex-1 my-4">
                  {/* Dialer Card */}
                  <div className="md:col-span-2 bg-brand-bg-light border border-brand-border rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[200px]">
                    <div className="w-16 h-16 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-dark mb-4 relative">
                      {callStatus === 'active' && (
                        <span className="absolute inset-0 rounded-full bg-brand-yellow/20 animate-ping" />
                      )}
                      <PhoneCall size={28} />
                    </div>
                    <div className="font-bold text-brand-dark text-base font-heading">Ashish Ranjan</div>
                    <div className="text-xs text-brand-text-muted font-mono mt-1">+91 99342 XXXXX</div>
                    
                    <div className="flex items-center gap-1 mt-6 h-10 w-full justify-center">
                      {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((val, idx) => (
                        <div 
                          key={idx}
                          className={`voice-wave-bar bg-brand-dark rounded-full ${
                            callStatus === 'active' 
                              ? idx % 4 === 0 ? 'anim-wave-active-1' :
                                idx % 4 === 1 ? 'anim-wave-active-2' :
                                idx % 4 === 2 ? 'anim-wave-active-3' : 'anim-wave-active-4'
                              : callStatus === 'calling' ? 'anim-wave-slow' : 'h-1'
                          }`}
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Transcript Feed (Keep dark for contrast and logs layout) */}
                  <div className="md:col-span-3 bg-brand-dark rounded-2xl p-4 h-[240px] overflow-y-auto scrollbar-hide flex flex-col justify-end space-y-3 font-mono text-[11px] leading-relaxed text-gray-300 shadow-inner">
                    {visibleLines.length === 0 ? (
                      <div className="text-gray-500 text-center py-10">
                        Click "Start Call Simulation" to check transcription log
                      </div>
                    ) : (
                      visibleLines.map((line, idx) => (
                        <div key={idx} className="animate-fadeIn">
                          {line.speaker === 'system' ? (
                            <div className="text-gray-400 font-semibold">{line.text}</div>
                          ) : (
                            <div className="flex gap-2 text-left">
                              <span className={`font-bold uppercase tracking-wider shrink-0 ${line.speaker === 'ai' ? 'text-brand-yellow' : 'text-blue-400'}`}>
                                {line.speaker === 'ai' ? 'AI Agent' : 'Customer'}:
                              </span>
                              <span className="text-white">{line.text}</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                  <p className="text-[10px] text-brand-text-muted font-mono">Test the automated voice confirmation script.</p>
                  <button
                    onClick={startCallDemo}
                    className={`font-bold py-2.5 px-6 rounded-full text-xs transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                      callPlaying 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-brand-dark text-white hover:bg-brand-dark-hover shadow-md'
                    }`}
                  >
                    {callPlaying ? 'Stop Simulation ⏹️' : 'Start Call Simulation ▶️'}
                  </button>
                </div>
              </div>
            )}

            {/* 3. Dashboard Analytics Mockup */}
            {activeTab === 'dashboard' && (
              <div className="w-full flex flex-col justify-between h-full animate-fadeIn">
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-dark font-bold">
                      <LayoutDashboard size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-dark font-heading">GoRan AI Store Dashboard</h4>
                      <p className="text-[10px] text-brand-text-muted font-mono">Real-time Operations Audit Insights</p>
                    </div>
                  </div>
                  <div className="text-[10px] text-green-600 font-bold font-mono bg-green-50 border border-green-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" /> Live Feed
                  </div>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4 flex-1">
                  {/* Metric 1 */}
                  <div className="bg-brand-bg-light border border-brand-border rounded-xl p-4 flex flex-col justify-between text-left">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brand-text-muted">COD RTO Rate</span>
                    <div>
                      <div className="text-2xl md:text-3xl font-black text-brand-dark mt-2 font-heading">8.4%</div>
                      <span className="text-[10px] text-emerald-600 font-bold font-mono">-22.8% Decrease</span>
                    </div>
                  </div>
                  {/* Metric 2 */}
                  <div className="bg-brand-bg-light border border-brand-border rounded-xl p-4 flex flex-col justify-between text-left">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brand-text-muted">Support Answers</span>
                    <div>
                      <div className="text-2xl md:text-3xl font-black text-brand-dark mt-2 font-heading">94.2%</div>
                      <span className="text-[10px] text-emerald-600 font-bold font-mono">Instant Resolves</span>
                    </div>
                  </div>
                  {/* Metric 3 */}
                  <div className="bg-brand-bg-light border border-brand-border rounded-xl p-4 flex flex-col justify-between text-left">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brand-text-muted">Cart Saved</span>
                    <div>
                      <div className="text-2xl md:text-3xl font-black text-brand-dark mt-2 font-heading">₹84,200</div>
                      <span className="text-[10px] text-brand-dark font-bold font-mono">18% Recovery rate</span>
                    </div>
                  </div>
                  {/* Metric 4 */}
                  <div className="bg-brand-bg-light border border-brand-border rounded-xl p-4 flex flex-col justify-between text-left">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-brand-text-muted">Response Time</span>
                    <div>
                      <div className="text-2xl md:text-3xl font-black text-brand-dark mt-2 font-heading">&lt; 0.8s</div>
                      <span className="text-[10px] text-brand-text-muted font-mono">24/7 Autopilot</span>
                    </div>
                  </div>
                </div>

                {/* Inner Chart Mockup */}
                <div className="w-full bg-brand-bg-light rounded-xl border border-brand-border p-4 flex flex-col justify-between h-40">
                  <div className="flex justify-between items-center text-[10px] text-brand-text-muted font-mono">
                    <span>weekly operations workload (Handled by AI vs Human)</span>
                    <div className="flex items-center gap-3 font-semibold text-brand-dark">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-brand-yellow" /> AI (91%)</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-brand-dark/20" /> Human (9%)</span>
                    </div>
                  </div>
                  {/* Visual Chart Bars */}
                  <div className="flex items-end gap-3 h-20 px-2 justify-between">
                    {[35, 55, 45, 75, 65, 85, 95].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col gap-1 items-center">
                        <div className="w-full flex flex-col justify-end bg-brand-border rounded-md h-16 overflow-hidden">
                          <div className="bg-brand-yellow w-full rounded-sm" style={{ height: `${val}%` }} />
                        </div>
                        <span className="text-[8px] text-brand-text-muted font-mono uppercase">Day {idx+1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordions Section */}
      <section className="py-24 relative z-10 bg-white px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">Frequently Asked Questions</span>
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight mt-2">
              Addressing Objections Upfront
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-brand-bg-light border border-brand-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-text-muted/30"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left bg-transparent border-none cursor-pointer text-brand-dark hover:text-brand-dark/80 transition-all font-heading font-semibold"
                  >
                    <span className="font-bold text-sm md:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-yellow' : 'text-brand-text-muted'}`} size={18} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-brand-border/50 text-brand-text-muted text-xs md:text-sm leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Form & Booking Intake */}
      <section id="demo-form" className="py-24 bg-brand-bg-light border-t border-brand-border relative z-10 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-2 text-left">
            <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">Take the Next Step</span>
            <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-brand-dark leading-tight mt-3 mb-6">
              Ready to See What This Looks Like for Your Brand?
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base leading-relaxed mb-8">
              Book a direct scoping call with our lead founder or fill out our diagnostic form to request a free custom prototype built around your brand. No commitments, just proof.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-yellow/15 flex items-center justify-center text-brand-dark shrink-0 mt-0.5 font-bold">
                  <Check size={12} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider font-heading">Scoping Session</h4>
                  <p className="text-brand-text-muted text-xs mt-0.5">Direct 15-minute diagnostic call of operational blockages.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-yellow/15 flex items-center justify-center text-brand-dark shrink-0 mt-0.5 font-bold">
                  <Check size={12} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider font-heading">Custom Prototype</h4>
                  <p className="text-brand-text-muted text-xs mt-0.5">Live WhatsApp support agent demo preloaded with 5 of your inventory products.</p>
                </div>
              </div>
            </div>

            <button
              onClick={openCalBooking}
              className="mt-8 bg-brand-dark text-white hover:bg-brand-dark-hover font-semibold text-sm py-3 px-6 rounded-full border-none cursor-pointer flex items-center gap-1.5 shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Schedule Call with Founder</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Right Column Form Card */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-lg text-left">
              
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark mb-1 font-heading">Request Free Brand Demo</h3>
                    <p className="text-xs text-brand-text-muted mb-4">We will build a custom operations prototype for your store.</p>
                  </div>

                  {/* Direct Booking Invitation */}
                  <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-3 mb-2 flex items-center justify-between text-xs gap-3">
                    <span className="text-brand-dark font-medium leading-normal">Skip the form and talk to our founder directly:</span>
                    <button
                      type="button"
                      onClick={openCalBooking}
                      className="bg-brand-dark text-white hover:bg-brand-dark-hover font-bold py-1.5 px-3 rounded-lg border-none cursor-pointer transition-all active:scale-95 shrink-0"
                    >
                      Book a Call
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="full-name" className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        id="full-name"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-brand-bg-light border border-brand-border focus:border-brand-yellow/60 rounded-xl py-3 px-4 text-xs md:text-sm text-brand-dark focus:outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="email-address" className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wide">Work Email *</label>
                      <input
                        type="email"
                        id="email-address"
                        required
                        placeholder="e.g. sarah@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-brand-bg-light border border-brand-border focus:border-brand-yellow/60 rounded-xl py-3 px-4 text-xs md:text-sm text-brand-dark focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="brand-name" className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wide">Brand Name *</label>
                      <input
                        type="text"
                        id="brand-name"
                        required
                        placeholder="e.g. Urban Threads"
                        value={formData.brandName}
                        onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                        className="w-full bg-brand-bg-light border border-brand-border focus:border-brand-yellow/60 rounded-xl py-3 px-4 text-xs md:text-sm text-brand-dark focus:outline-none transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="insta-handle" className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wide">Instagram Handle</label>
                      <input
                        type="text"
                        id="insta-handle"
                        placeholder="e.g. @urbanthreads.in"
                        value={formData.instaHandle}
                        onChange={(e) => setFormData({...formData, instaHandle: e.target.value})}
                        className="w-full bg-brand-bg-light border border-brand-border focus:border-brand-yellow/60 rounded-xl py-3 px-4 text-xs md:text-sm text-brand-dark focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="whatsapp-num" className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wide">WhatsApp Number *</label>
                    <input
                      type="tel"
                      id="whatsapp-num"
                      required
                      placeholder="e.g. +91 99342 XXXXX"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                      className="w-full bg-brand-bg-light border border-brand-border focus:border-brand-yellow/60 rounded-xl py-3 px-4 text-xs md:text-sm text-brand-dark focus:outline-none transition-all"
                    />
                  </div>

                  {isSubmitting ? (
                    <div className="bg-brand-bg-light border border-brand-border rounded-xl p-4 space-y-2 mt-4 text-brand-dark">
                      <div className="flex items-center gap-2 text-xs text-brand-dark font-mono font-bold uppercase tracking-wider">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-ping" />
                        <span>Compiling Custom Agent Pipelines...</span>
                      </div>
                      <ul className="list-none p-0 m-0 text-[10px] text-brand-text-muted font-mono space-y-1.5">
                        <li className="flex items-center gap-1.5">
                          {buildStep >= 1 ? <Check size={12} className="text-emerald-600" /> : <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" />}
                          <span className={buildStep >= 1 ? 'text-brand-dark font-semibold' : ''}>1. Mocking store inventory hook</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          {buildStep >= 2 ? <Check size={12} className="text-emerald-600" /> : <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />}
                          <span className={buildStep >= 2 ? 'text-brand-dark font-semibold' : ''}>2. Training AI model on sizing chart parameters</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          {buildStep >= 3 ? <Check size={12} className="text-emerald-600" /> : <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />}
                          <span className={buildStep >= 3 ? 'text-brand-dark font-semibold' : ''}>3. Deploying sandboxed dialer script</span>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-sm py-3.5 px-6 rounded-xl transition-all border-none cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/10 mt-6"
                    >
                      <span>Request My Custom Demo</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 animate-fadeIn text-brand-dark">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark font-heading">Operations Blueprint Generated!</h3>
                  <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed max-w-[400px] mx-auto">
                    Thank you, <strong className="text-brand-dark">{formData.name}</strong>. We've compiled your custom scoping report and sent details to <strong className="text-brand-dark">{formData.email}</strong>.
                  </p>

                  {/* ── AI Scoping Blueprint Card inside Light Theme ── */}
                  {aiReport && (
                    <div className="w-full bg-[#0E0E0E] border border-brand-yellow/30 rounded-2xl p-5 text-left my-6 shadow-md relative overflow-hidden animate-fadeIn">
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-yellow/5 blur-[40px] pointer-events-none" />

                      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-[9px] font-bold tracking-widest text-brand-yellow uppercase flex items-center gap-1 font-heading">
                            <Sparkles className="w-3 h-3" />
                            D2C Scoping Audit
                          </span>
                        </div>
                        
                        <button
                          onClick={handleCopyReport}
                          className="flex items-center gap-1 text-[9px] font-bold text-white/60 hover:text-brand-yellow uppercase tracking-widest border border-white/10 hover:border-brand-yellow/30 bg-white/5 hover:bg-brand-yellow/10 rounded-lg px-2 py-1 transition-all cursor-pointer"
                        >
                          {reportCopied ? <Check size={10} className="text-green-400" /> : <Copy size={10} />}
                          <span>{reportCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                        {formatReportText(aiReport)}
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2">
                        <p className="text-[9px] text-white/40 leading-relaxed">
                          Click the button below to lock in a scoping call to review this blueprint with our founder and see a live screen share demo.
                        </p>
                        <button
                          onClick={openCalBooking}
                          className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-semibold text-xs py-2.5 rounded-xl transition-all duration-200 shadow-md border-none cursor-pointer text-center"
                        >
                          Schedule Free Scoping Call
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', whatsappNumber: '', brandName: '', instaHandle: '' }); }}
                    className="w-full bg-brand-dark hover:bg-brand-dark-hover text-white py-3 px-6 rounded-xl text-center font-semibold text-xs transition-all border-none cursor-pointer hover:-translate-y-0.5 shadow-md"
                  >
                    Request Another Demo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer (Matches standard dark footer theme of main site) */}
      <footer className="border-t border-brand-border bg-brand-dark py-12 relative z-10 px-6 text-center text-white/50">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <a href="/" className="inline-block mb-3">
              <img src="/Logo.png" alt="GoRan AI Logo" className="h-9 rounded-lg" />
            </a>
            <p className="text-[10px] text-white/40 max-w-[320px] leading-relaxed">
              GoRan AI: Scale your D2C brand operations on autopilot without scaling your manual support team.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-xs font-semibold text-white/40">
            <a href="mailto:goran.dotin@gmail.com" className="hover:text-white transition-colors no-underline">goran.dotin@gmail.com</a>
            <span>/</span>
            <a href="https://wa.me/919934225353" className="hover:text-white transition-colors no-underline">WhatsApp Support</a>
            <span>/</span>
            <a href="/privacy" className="hover:text-white transition-colors no-underline">Privacy</a>
            <span>/</span>
            <a href="/terms" className="hover:text-white transition-colors no-underline">Terms</a>
          </div>
        </div>
        <div className="text-[10px] text-white/30 mt-8 border-t border-white/[0.05] pt-6">
          &copy; {new Date().getFullYear()} GoRan AI. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
