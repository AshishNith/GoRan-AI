import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Trash2, Sparkles } from 'lucide-react';
import { useCalBooking } from './CalBookingModal';

// 1. Synapse Context Data for System Prompt and Mock Responder
const SYNAPSE_DATA = {
  services: [
    { name: 'AI Audit', desc: 'Identify where AI can cut costs and automate operations (2-3 weeks roadmap).' },
    { name: 'Product Development', desc: 'End-to-end custom AI products, agentic backends, and frontend builds (6-12 weeks).' },
    { name: 'Product Management', desc: 'Embed an experienced AI PM to own roadmaps and sprint planning.' },
    { name: 'AI Training & Enablement', desc: 'Upskill your team with prompt engineering and custom no-code workshop programs.' }
  ],
  caseStudies: [
    { client: 'IBS Insurance Brokers', impact: 'Saved 1,280 hours/month', desc: 'Automated data entry from PDFs into database using a custom document agent.' },
    { client: 'Hospitadent Clinic', impact: '88+ new bookings/month', desc: 'Voice AI & webchat assistant scheduling patient appointments 24/7.' },
    { client: 'UrbanWear Co.', impact: '50% faster fulfillment prep', desc: 'Custom Shopify-integrated batch order processing dashboard.' },
    { client: 'Apex Logistics', impact: '4.5 hours/week saved per employee', desc: 'Secure internal policy search portal and employee prompt training.' }
  ]
};

const SYSTEM_PROMPT = `
You are the official AI Assistant for Synapse, a premium AI agency. 
Your goal is to guide visitors, answer their questions about Synapse's services, share metrics and details from case studies, and encourage them to book a free 30-minute scoping call (which they can do by filling out the form at the bottom of the page or clicking "Book a Scoping Call").

Synapse Services:
1. AI Audit (Discovery & Strategy): 2-3 weeks. Identifies cost reduction, automation opportunities, delivers roadmap & ROI matrix.
2. Product Development (Engineering & Build): 6-12 weeks. End-to-end AI products, agentic backends (LangGraph, FastAPI, Python), interfaces (React, Tailwind), databases, and deployment.
3. Product Management (Strategy & Execution): Ongoing monthly. Embeds a senior AI PM, backlog ownership, sprint planning, roadmapping.
4. AI Training & Enablement (Education & Upskilling): 1 day to 6 weeks. Role-specific hands-on workshops, prompt engineering, no-code AI tools (Make, Zapier), private knowledge bases.

Case Studies (Proven Results):
1. IBS Insurance Brokers: Saved 1,280 hours of manual data entry/month, reduced processing times from 5 days to under 30 minutes, eliminated copy-paste errors for 92% of files. Tech stack: Python, FastAPI, Airtable, Google Document AI, Slack.
2. Hospitadent Dental Clinic: Secured 88+ new patient bookings in month one, handled 920 inquiries entirely on autopilot. Tech stack: React, Node.js, Vapi Voice AI, OpenAI, Dentrix CRM.
3. UrbanWear Co.: Cut fulfillment prep times in half (50% faster), extended same-day shipping cut-off from 10:00 AM to 3:00 PM, handled 40% volume spike. Tech stack: React, Tailwind, PostgreSQL, Shopify API, Node.js.
4. Apex Logistics: Saved 4.5 hours/week per employee. Conversational search over policy manuals. Tech stack: Claude 3.5 Sonnet, OpenSearch Vector DB, Node, React, Tailwind.

Core metrics: 99.9% uptime, 500k+ daily agent executions, 4.9/5 client rating.
Response Tone: Professional, expert, friendly, helpful, and concise. Keep responses to under 2-3 short paragraphs where possible, using bullet points for readability. Bold important numbers and metrics. Do not mention that you are a language model or AI from Google. You are Synapse's custom assistant.
`;

export default function Chatbot() {
  const { openCalBooking } = useCalBooking();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm the Synapse AI Assistant. Ask me anything about our AI Audits, Custom Product builds, or case studies!",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const chatEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Log warning if API key is missing
  useEffect(() => {
    const activeKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!activeKey) {
      console.warn(
        "Synapse Chatbot: VITE_GEMINI_API_KEY is not defined. The chatbot is currently running in Demo/Fallback Mode. To connect Gemini, create a .env file and add: VITE_GEMINI_API_KEY=your_key_here"
      );
    }
  }, []);

  // Quick Chips
  const handleChipClick = (chipText) => {
    sendMessage(chipText);
  };

  // Format message text (bolding **text** and lists)
  const formatMessageText = (text) => {
    if (!text) return '';

    // Split by lines to render paragraph blocks & list items
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let content = line;

      // Handle bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-semibold text-brand-dark">{match[1]}</strong>);
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
          itemParts.push(<strong key={itemMatch.index} className="font-semibold text-brand-dark">{itemMatch[1]}</strong>);
          itemLastIndex = boldItemRegex.lastIndex;
        }
        if (itemLastIndex < itemText.length) {
          itemParts.push(itemText.substring(itemLastIndex));
        }
        return (
          <li key={idx} className="list-disc ml-5 mb-1.5 text-xs text-brand-text-main leading-relaxed">
            {itemParts.length > 0 ? itemParts : itemText}
          </li>
        );
      }

      return (
        <p key={idx} className="mb-2 text-xs text-brand-text-main leading-relaxed last:mb-0">
          {formattedContent}
        </p>
      );
    });
  };

  // Custom Mock Response Mode logic
  const getMockResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('service') || q.includes('what do you do') || q.includes('offer')) {
      return `Synapse offers **four core services** to embed AI into your business operations:
      - **AI Audit**: A 2-3 week discovery process mapping your workflows to identify high-ROI automations.
      - **Product Development**: End-to-end custom AI products, agentic backends, and frontend builds (6-12 weeks).
      - **Product Management**: Embedding an experienced AI PM to guide sprints, prioritize features, and drive outcomes.
      - **AI Training & Enablement**: Role-specific workshops, custom prompt engineering guides, and learning libraries.
      
      Would you like to hear about a specific service?`;
    }

    if (q.includes('audit') || q.includes('discover') || q.includes('roadmap')) {
      return `Our **AI Audit** is a 2-3 week deep-dive engagement where we analyze your technical stack and workflows. We map and score every manual process by effort and impact.
      
      You receive:
      - A comprehensive **AI Opportunity Report**
      - An **ROI Scoring Matrix**
      - A detailed **8-Week Implementation Roadmap** you can hand directly to any engineering team.
      
      It's the perfect starting point to cut operations overhead. You can request a scoping call using our CTA form at the bottom of the page!`;
    }

    if (q.includes('case') || q.includes('portfolio') || q.includes('work') || q.includes('project') || q.includes('client')) {
      return `We have successfully delivered high-impact automation for several clients:
      - **IBS Insurance Brokers**: Saved **1,280 hours/month** by automating policy document data entry from emails.
      - **Hospitadent Dental Clinic**: Secured **88+ patient bookings** in month one with a 24/7 Voice AI & webchat assistant.
      - **UrbanWear Co.**: Halved order prep times (**50% faster fulfillment**) with a custom batch-sorting dashboard.
      - **Apex Logistics**: Saved **4.5 hours/week per employee** through an internal AI policy search portal.
      
      Which of these projects would you like to explore further?`;
    }

    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('hire') || q.includes('quote')) {
      return `Our pricing models are designed around clear deliverables:
      - **AI Audits**: Offered at a fixed scope based on team size (typically completed in 2-3 weeks).
      - **Product builds**: Scoped individually based on integrations, models, and UI complexity (typically 6-12 weeks).
      - **Product Management**: Offered on a monthly rolling retainer.
      
      To get an exact scope and pricing blueprint, we recommend booking a free **30-minute scoping call**. You can request this in the contact section at the bottom of the page!`;
    }

    if (q.includes('ibs') || q.includes('insurance') || q.includes('broker')) {
      return `For **IBS Insurance Brokers**, we automated their heavy administrative backlog. 
      
      We built a custom document pipeline that monitors their inbox, extracts client info using OCR and LLMs, and updates their internal database. 
      - **Impact**: Saved **1,280 hours of manual labor** every single month.
      - **Speed**: Reduced processing times from **5 days down to under 30 minutes**.
      - **Accuracy**: Eliminated copy-paste errors for **92%** of incoming files.`;
    }

    if (q.includes('hospitadent') || q.includes('dent') || q.includes('booking') || q.includes('voice')) {
      return `For **Hospitadent Dental Clinic**, we solved their after-hours lead-loss problem. 
      
      We deployed a **24/7 webchat & voice booking assistant** connected directly to their Dentrix CRM calendar.
      - **Impact**: Secured **88+ new patient bookings** in the first 30 days entirely on autopilot.
      - **Engagement**: Handled **920+ patient inquiries** about hours, pricing, and insurance, freeing up the reception desk.`;
    }

    if (q.includes('urban') || q.includes('wear') || q.includes('shopify') || q.includes('fulfillment')) {
      return `For **UrbanWear Co.**, we built a custom fulfillment sorting engine. 
      
      The tool parses raw Shopify payloads to batch-route orders color-coded by print hubs, optimizing warehouse packing lines.
      - **Impact**: Cut shipment preparation times by **50% (in half)**.
      - **Sales Support**: Allowed extending the same-day shipping cut-off from **10:00 AM to 3:00 PM**, helping handle Black Friday volume spikes easily.`;
    }

    if (q.includes('apex') || q.includes('logistics') || q.includes('training') || q.includes('search')) {
      return `For **Apex Logistics**, we built a secure internal knowledge search portal and trained staff in prompt engineering.
      
      Support agents can query policy handbooks and carrier manuals in plain English to get cited policy answers instantly.
      - **Impact**: Saved an average of **4.5 hours per employee per week** in search overhead.
      - **Resolution**: Enabled team to resolve complex driver questions on the spot without callbacks.`;
    }

    if (q.includes('book') || q.includes('call') || q.includes('contact') || q.includes('scoping') || q.includes('blueprint')) {
      return `We'd love to help you design a custom AI architecture! 
      
      You can request a free **Scoping Call** and receive a custom blueprint by filling out the contact form at the bottom of the page. Once submitted, our engineering team will get back to you within 24 hours to schedule a session. Let me know if you have any questions about what we discuss in the call!`;
    }

    return `I can help you learn more about Synapse AI Agency! 
    
    Here is what you can ask:
    - **What services do you offer?** (Audits, builds, workshops)
    - **Show me your case studies** (IBS Brokers, Hospitadent, etc.)
    - **How do we get started?** (Scoping call details)`;
  };

  // Send message handler
  const sendMessage = async (textToSend) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    setErrorMsg('');
    const userMsg = { sender: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    setIsTyping(true);

    // Get active API Key from environment variables
    const activeKey = "AIzaSyACFXMNL9vGYNqDzlI_8NdYxDG1-fOzUuo";
    // const activeKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!activeKey) {
      // Offline / Demo Mode Fallback
      setTimeout(() => {
        const reply = getMockResponse(text);
        setMessages(prev => [...prev, { sender: 'bot', text: reply, timestamp: new Date() }]);
        setIsTyping(false);
      }, 800);
      return;
    }

    // Call Gemini API directly from Frontend
    try {
      const conversationHistory = [];
      const recentMessages = messages.concat(userMsg).slice(-10);

      recentMessages.forEach(msg => {
        conversationHistory.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${activeKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: conversationHistory,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const botReply = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!botReply) {
        throw new Error("Empty response received from Gemini.");
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply, timestamp: new Date() }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setErrorMsg(err.message || 'Connection failed.');
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: `⚠️ **Gemini API Error:** ${err.message || 'Unable to connect'}. Falling back to Demo Mode. Here's a quick answer: \n\n ${getMockResponse(text)}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Chat cleared! Ask me anything about Synapse AI Agency services or case studies.",
        timestamp: new Date()
      }
    ]);
    setErrorMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body select-none">
      {/* ── Chat Float Button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15),0_0_0_1px_rgba(246,199,68,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 group relative"
          aria-label="Open Chatbot"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-6" />
        </button>
      )}

      {/* ── Chat Widget Window ── */}
      {isOpen && (
        <div className="w-[360px] sm:w-[380px] h-[520px] max-h-[85vh] bg-white/90 backdrop-blur-md border border-brand-border rounded-2xl shadow-card-hover flex flex-col overflow-hidden transition-all duration-300 ease-out transform translate-y-0 opacity-100 origin-bottom-right">

          {/* Header */}
          <div className="bg-brand-dark text-white p-4 flex items-center justify-between border-b border-brand-border/10">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-brand-yellow/15 flex items-center justify-center border border-brand-yellow/20">
                <Sparkles className="w-4 h-4 text-brand-yellow" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-brand-dark" />
              </div>
              <div className="text-left">
                <h4 className="font-heading text-sm font-bold text-white tracking-wide">Synapse AI</h4>
                <p className="text-[10px] text-white/50 leading-none">Online Assistant</p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-bg-light/40">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-xs text-left shadow-card ${msg.sender === 'user'
                      ? 'bg-brand-yellow text-brand-text-main rounded-tr-none'
                      : 'bg-white text-brand-text-main border border-brand-border rounded-tl-none'
                    }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap leading-relaxed text-xs">{msg.text}</p>
                  ) : (
                    formatMessageText(msg.text)
                  )}
                </div>
                <span className="text-[9px] text-brand-text-muted mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start max-w-[85%] mr-auto">
                <div className="bg-white border border-brand-border px-4 py-3 rounded-2xl rounded-tl-none shadow-card flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="px-4 py-2 border-t border-brand-border/60 bg-white overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-1.5">
            <button
              onClick={() => handleChipClick("What services do you offer?")}
              className="inline-block bg-brand-bg-light hover:bg-brand-yellow/10 hover:border-brand-yellow/40 border border-brand-border text-brand-text-main text-[10px] font-medium px-3 py-1 rounded-full cursor-pointer transition-colors shrink-0"
            >
              Services
            </button>
            <button
              onClick={() => handleChipClick("Tell me about your case studies")}
              className="inline-block bg-brand-bg-light hover:bg-brand-yellow/10 hover:border-brand-yellow/40 border border-brand-border text-brand-text-main text-[10px] font-medium px-3 py-1 rounded-full cursor-pointer transition-colors shrink-0"
            >
              Case Studies
            </button>
            <button
              onClick={openCalBooking}
              className="inline-block bg-brand-bg-light hover:bg-brand-yellow/10 hover:border-brand-yellow/40 border border-brand-border text-brand-text-main text-[10px] font-medium px-3 py-1 rounded-full cursor-pointer transition-colors shrink-0"
            >
              Book a Call
            </button>
            <button
              onClick={() => handleChipClick("How much does an AI Audit cost?")}
              className="inline-block bg-brand-bg-light hover:bg-brand-yellow/10 hover:border-brand-yellow/40 border border-brand-border text-brand-text-main text-[10px] font-medium px-3 py-1 rounded-full cursor-pointer transition-colors shrink-0"
            >
              Audit Price
            </button>
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-white border-t border-brand-border flex gap-2 items-center">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything..."
              className="flex-1 bg-brand-bg-light border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-dark outline-none focus:border-brand-yellow focus:bg-white transition-all placeholder:text-brand-text-muted/70"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputVal.trim() || isTyping}
              className="w-9 h-9 bg-brand-dark hover:bg-brand-dark-hover text-white disabled:bg-brand-border disabled:text-brand-text-muted/50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center cursor-pointer transition-all shrink-0 shadow-card active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
