import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCalBooking } from '../components/CalBookingModal';
import VoiceAgent from '../components/VoiceAgent';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  const inputClasses = "w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-brand-text-main outline-none focus:border-brand-yellow/60 focus:ring-2 focus:ring-brand-yellow/10 transition-all duration-200 text-sm placeholder:text-brand-text-muted/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]";

  return (
    <main className="w-full min-h-screen bg-white relative overflow-hidden pt-36 pb-24 font-body">
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
                      Creating Request...
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
