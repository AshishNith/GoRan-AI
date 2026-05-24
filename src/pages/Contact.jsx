import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VoiceAgent from '../components/VoiceAgent';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    targets: '',
    message: '',
    budget: '$10k – $25k',
    timeline: '1–2 months',
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
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 900);
  };

  return (
    <main className="w-full min-h-screen bg-white relative overflow-hidden pt-36 pb-24 font-body">
      {/* Premium Background Mesh Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-yellow/5 blur-[80px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-yellow/3 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(229, 231, 235, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 231, 235, 0.25) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Breadcrumb / Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 no-underline text-brand-text-muted text-sm font-medium mb-10 group transition-colors hover:text-brand-dark"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-16 lg:gap-24 items-start">
          {/* ── Left Column: Information & Process ── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">

              <h1 className="text-4xl md:text-5.5rem font-heading font-bold text-brand-dark leading-[1.1] tracking-tight">
                Let's build <br />
                something autonomous.
              </h1>
              <p className="text-brand-text-muted text-base md:text-lg leading-relaxed max-w-lg">
                Ready to optimize your processes and deploy custom agent networks? Share your project details, and our engineering team will build your custom automation blueprint.
              </p>
            </div>

            {/* Steps Guide */}
            <div className="flex flex-col gap-6 border-t border-brand-border pt-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-text-muted">
                What happens next?
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <span className="font-heading text-lg font-bold text-brand-yellow select-none bg-brand-yellow/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-heading font-semibold text-brand-dark text-base">
                      Initial Consultation
                    </h4>
                    <p className="text-sm text-brand-text-muted leading-relaxed mt-1">
                      We'll connect for a brief, 30-minute scoping call to review your current tech stack, tools, and operational bottlenecks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-heading text-lg font-bold text-brand-yellow select-none bg-brand-yellow/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-heading font-semibold text-brand-dark text-base">
                      Custom Agentic Blueprint
                    </h4>
                    <p className="text-sm text-brand-text-muted leading-relaxed mt-1">
                      Our systems engineers draft a technical proposal containing database schemas, agent workflows, and API architectures.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-heading text-lg font-bold text-brand-yellow select-none bg-brand-yellow/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-heading font-semibold text-brand-dark text-base">
                      Rapid Deployment
                    </h4>
                    <p className="text-sm text-brand-text-muted leading-relaxed mt-1">
                      Once approved, we construct, integrate, test, and release your production agents within 4 to 8 weeks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 border-t border-brand-border pt-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted">
                  System Uptime
                </span>
                <span className="font-heading text-xl md:text-2xl font-bold text-brand-dark">
                  99.9%
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-text-muted">
                  Daily Executions
                </span>
                <span className="font-heading text-xl md:text-2xl font-bold text-brand-dark">
                  500k+
                </span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Interactive Form or Success Panel ── */}
          <div className="w-full">
            {formSubmitted ? (
              <div className="flex flex-col items-center text-center py-8">
                {/* Success Animation Ring */}
                <div className="w-16 h-16 rounded-full bg-[#27C93F]/10 border border-[#27C93F]/30 flex items-center justify-center mb-6 animate-pulse">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#27C93F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-heading font-bold text-2xl text-brand-dark mb-3">
                  Blueprint Requested!
                </h2>
                <p className="text-brand-text-muted text-sm leading-relaxed max-w-sm mb-8">
                  Thank you, <strong className="text-brand-dark">{formData.name}</strong>. We've registered your request for a scoping blueprint and sent a confirmation to <strong className="text-brand-dark">{formData.email}</strong>. Our team will contact you within 24 hours to schedule our call.
                </p>

                {/* Summary Card */}
                <div className="w-full bg-brand-bg-light border border-brand-border rounded-xl p-5 mb-8 text-left flex flex-col gap-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted border-b border-brand-border pb-2">
                    Request Parameters
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs">
                    <span className="text-brand-text-muted">Company</span>
                    <span className="text-brand-dark font-semibold text-right truncate">
                      {formData.company || '—'}
                    </span>
                    <span className="text-brand-text-muted">Target Budget</span>
                    <span className="text-brand-dark font-semibold text-right">
                      {formData.budget}
                    </span>
                    <span className="text-brand-text-muted">Desired Timeline</span>
                    <span className="text-brand-dark font-semibold text-right">
                      {formData.timeline}
                    </span>
                    <span className="text-brand-text-muted">Connected APIs</span>
                    <span className="text-brand-dark font-semibold text-right truncate">
                      {formData.targets || '—'}
                    </span>
                  </div>
                </div>

                <Link
                  to="/"
                  className="w-full bg-brand-dark hover:bg-brand-dark-hover text-white text-center font-semibold text-sm py-3 px-6 rounded-xl no-underline transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] inline-block hover:-translate-y-0.5"
                >
                  Return to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full bg-white border border-brand-border rounded-xl p-3 text-brand-text-main outline-none focus:border-brand-yellow transition-colors text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="sarah@company.com"
                    required
                    className="w-full bg-white border border-brand-border rounded-xl p-3 text-brand-text-main outline-none focus:border-brand-yellow transition-colors text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Acme Corp"
                      className="w-full bg-white border border-brand-border rounded-xl p-3 text-brand-text-main outline-none focus:border-brand-yellow transition-colors text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">
                      Integrations / APIs
                    </label>
                    <input
                      type="text"
                      name="targets"
                      value={formData.targets}
                      onChange={handleInputChange}
                      placeholder="e.g. Salesforce, Slack"
                      className="w-full bg-white border border-brand-border rounded-xl p-3 text-brand-text-main outline-none focus:border-brand-yellow transition-colors text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                    />
                  </div>
                </div>

                {/* Target Budget Ranges (Chips Layout) */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">
                    Project Budget Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['< $10k', '$10k – $25k', '$25k – $50k', '$50k+'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption('budget', opt)}
                        className={`py-2.5 px-3 border rounded-xl font-medium text-xs text-center cursor-pointer transition-all duration-200 ${
                          formData.budget === opt
                            ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark shadow-sm'
                            : 'bg-white border-brand-border text-brand-text-muted hover:border-brand-text-muted/40 hover:text-brand-dark'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timelines (Chips Layout) */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">
                    Target Implementation Timeline
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Immediate', '1–2 months', '3+ months'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption('timeline', opt)}
                        className={`py-2.5 px-2 border rounded-xl font-medium text-xs text-center cursor-pointer transition-all duration-200 ${
                          formData.timeline === opt
                            ? 'bg-brand-yellow/15 border-brand-yellow text-brand-dark shadow-sm'
                            : 'bg-white border-brand-border text-brand-text-muted hover:border-brand-text-muted/40 hover:text-brand-dark'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-brand-text-muted uppercase tracking-wider">
                    Project Scope / Description
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about the workflows you need to build or automate..."
                    rows={4}
                    className="w-full bg-white border border-brand-border rounded-xl p-3 text-brand-text-main outline-none focus:border-brand-yellow transition-colors text-sm resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-brand-dark hover:bg-brand-dark-hover text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 border-none cursor-pointer mt-2 text-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-85 cursor-not-allowed' : 'hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating Request...
                    </>
                  ) : (
                    <>
                      <span>Request Scoping Blueprint</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
        </div>
      </div>
    </div>

      {/* Instant Audio Connection Divider & voice agent */}
      <div className="w-full mt-24">
        <div className="w-full max-w-[1200px] mx-auto px-6 mb-12 flex items-center justify-center">
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
