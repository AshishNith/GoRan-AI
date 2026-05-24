import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ParallaxComponent() {
  const sectionRef = useRef(null);
  
  // Scoping Form States
  const [formData, setFormData] = useState({ name: '', target: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.email) {
      setFormSubmitted(true);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const triggerEl = section.querySelector('[data-parallax-layers]');
    if (!triggerEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Layer 1 — deep background grid: slowest
      tl.to('[data-parallax-layer="1"]', { yPercent: 40, ease: 'none', duration: 2 }, 0);
      // Layer 2 — floating nodes ring: medium
      tl.to('[data-parallax-layer="2"]', { yPercent: 60, ease: 'none', duration: 2 }, 0);
      // Layer 4 — foreground glow orb: fastest
      tl.to('[data-parallax-layer="4"]', { yPercent: 80, ease: 'none', duration: 2 }, 0);

      // Layer 3 — headline text: Fades out and slides up from progress 0.1 to 0.7
      tl.to('[data-parallax-layer="3"]', { 
        autoAlpha: 0, 
        yPercent: -20, 
        ease: 'power1.inOut', 
        duration: 0.6 
      }, 0.1);

      // Layer 5 — CTA Form: Fades in and slides up from progress 0.9 to 1.6
      tl.fromTo('[data-parallax-layer="5"]', 
        { autoAlpha: 0, yPercent: 20 },
        { autoAlpha: 1, yPercent: 0, ease: 'power1.inOut', duration: 0.7 },
        0.9
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} id="cta" className="parallax-wrap relative w-full" style={{ height: '300vh' }}>
      {/* Sticky viewport pinning */}
      <div
        data-parallax-layers
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#060608]"
      >
        {/* ── Layer 1: Deep background — circuit grid ── */}
        <div data-parallax-layer="1" className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(246,199,68,0.07)" strokeWidth="0.5"/>
                <circle cx="0" cy="0" r="1.5" fill="rgba(246,199,68,0.12)"/>
                <circle cx="40" cy="40" r="1" fill="rgba(246,199,68,0.06)"/>
              </pattern>
              <pattern id="circuit-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="0" cy="0" r="0.8" fill="rgba(255,255,255,0.04)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-dots)"/>
            <rect width="100%" height="100%" fill="url(#circuit-grid)"/>
          </svg>
        </div>

        {/* ── Layer 2: Floating agent network nodes ── */}
        <div data-parallax-layer="2" className="absolute inset-0 w-full h-[140%] -top-[20%] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow-yellow">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
              <filter id="glow-blue">
                <feGaussianBlur stdDeviation="8" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
              <radialGradient id="node-grad-yellow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F6C744" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#F6C744" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="node-grad-blue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="node-grad-purple" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* Connection lines between nodes */}
            <g opacity="0.25">
              <line x1="200" y1="200" x2="500" y2="350" stroke="#F6C744" strokeWidth="0.8" strokeDasharray="6 4"/>
              <line x1="500" y1="350" x2="720" y2="220" stroke="#60A5FA" strokeWidth="0.8" strokeDasharray="6 4"/>
              <line x1="720" y1="220" x2="1000" y2="400" stroke="#A78BFA" strokeWidth="0.8" strokeDasharray="6 4"/>
              <line x1="1000" y1="400" x2="1250" y2="250" stroke="#F6C744" strokeWidth="0.8" strokeDasharray="6 4"/>
              <line x1="200" y1="200" x2="400" y2="600" stroke="#60A5FA" strokeWidth="0.6" strokeDasharray="4 6"/>
              <line x1="400" y1="600" x2="800" y2="700" stroke="#F6C744" strokeWidth="0.6" strokeDasharray="4 6"/>
              <line x1="800" y1="700" x2="1100" y2="620" stroke="#A78BFA" strokeWidth="0.6" strokeDasharray="4 6"/>
              <line x1="1100" y1="620" x2="1250" y2="250" stroke="#60A5FA" strokeWidth="0.6" strokeDasharray="4 6"/>
              <line x1="500" y1="350" x2="800" y2="700" stroke="#A78BFA" strokeWidth="0.5" strokeDasharray="3 8"/>
              <line x1="720" y1="220" x2="1100" y2="620" stroke="#F6C744" strokeWidth="0.5" strokeDasharray="3 8"/>
            </g>

            {/* Agent node: LLM Core */}
            <g filter="url(#glow-yellow)">
              <circle cx="720" cy="220" r="28" fill="none" stroke="#F6C744" strokeWidth="1.5" opacity="0.8"/>
              <circle cx="720" cy="220" r="18" fill="rgba(246,199,68,0.15)"/>
              <circle cx="720" cy="220" r="6" fill="#F6C744" opacity="0.9"/>
            </g>
            <text x="720" y="262" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">LLM Core</text>

            {/* Agent node: Data Ingestion */}
            <g filter="url(#glow-blue)">
              <circle cx="200" cy="200" r="20" fill="none" stroke="#60A5FA" strokeWidth="1.2" opacity="0.7"/>
              <circle cx="200" cy="200" r="12" fill="rgba(96,165,250,0.12)"/>
              <circle cx="200" cy="200" r="4" fill="#60A5FA" opacity="0.8"/>
            </g>
            <text x="200" y="232" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">Data Ingest</text>

            {/* Agent node: RAG Store */}
            <g filter="url(#glow-purple)">
              <circle cx="1250" cy="250" r="22" fill="none" stroke="#A78BFA" strokeWidth="1.2" opacity="0.7"/>
              <circle cx="1250" cy="250" r="14" fill="rgba(167,139,250,0.12)"/>
              <circle cx="1250" cy="250" r="5" fill="#A78BFA" opacity="0.8"/>
            </g>
            <text x="1250" y="284" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">RAG Store</text>

            {/* Agent node: Orchestrator */}
            <g filter="url(#glow-yellow)">
              <circle cx="500" cy="350" r="18" fill="none" stroke="#F6C744" strokeWidth="1" opacity="0.6"/>
              <circle cx="500" cy="350" r="10" fill="rgba(246,199,68,0.1)"/>
              <circle cx="500" cy="350" r="4" fill="#F6C744" opacity="0.7"/>
            </g>
            <text x="500" y="380" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace">Orchestrator</text>

            {/* Agent node: Output Agent */}
            <g filter="url(#glow-blue)">
              <circle cx="1000" cy="400" r="18" fill="none" stroke="#60A5FA" strokeWidth="1" opacity="0.6"/>
              <circle cx="1000" cy="400" r="10" fill="rgba(96,165,250,0.1)"/>
              <circle cx="1000" cy="400" r="4" fill="#60A5FA" opacity="0.7"/>
            </g>
            <text x="1000" y="430" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace">Output Agent</text>

            {/* Agent node: Workflow Runner */}
            <g filter="url(#glow-purple)">
              <circle cx="800" cy="700" r="16" fill="none" stroke="#A78BFA" strokeWidth="1" opacity="0.5"/>
              <circle cx="800" cy="700" r="8" fill="rgba(167,139,250,0.1)"/>
              <circle cx="800" cy="700" r="3" fill="#A78BFA" opacity="0.6"/>
            </g>
            <text x="800" y="728" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">Workflow</text>

            {/* Ambient data pulses */}
            <circle cx="400" cy="600" r="8" fill="none" stroke="#F6C744" strokeWidth="0.8" opacity="0.4"/>
            <circle cx="400" cy="600" r="3" fill="#F6C744" opacity="0.5"/>
            <circle cx="1100" cy="620" r="8" fill="none" stroke="#60A5FA" strokeWidth="0.8" opacity="0.4"/>
            <circle cx="1100" cy="620" r="3" fill="#60A5FA" opacity="0.5"/>
          </svg>
        </div>

        {/* ── Layer 3: Central headline text ── */}
        <div
          data-parallax-layer="3"
          className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center pointer-events-none"
          style={{ top: '-5%' }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(246,199,68,0.3)] bg-[rgba(246,199,68,0.06)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F6C744] animate-pulse inline-block"></span>
            <span className="text-[#F6C744] text-xs font-semibold tracking-widest uppercase">Systems Online</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
            AI that works<br/>
            <span style={{ color: '#F6C744' }}>while you sleep.</span>
          </h2>
          <p className="mt-6 text-white/50 text-lg md:text-xl max-w-xl leading-relaxed">
            We architect autonomous agent networks that run, decide, and execute — 24/7, without interruption.
          </p>
        </div>

        {/* ── Layer 5: CTA / Contact Form Section ── */}
        <div
          data-parallax-layer="5"
          className="absolute inset-0 flex flex-col items-center justify-center z-25 px-6 text-center"
          style={{ opacity: 0 }}
        >
          <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-6">
            <h2 className="text-white text-3xl md:text-4xl font-heading font-bold">
              Ready to automate your operations?
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed">
              Work with our expert engineering team to build secure, robust, custom autonomous solutions that scale.
            </p>

            {formSubmitted ? (
              <div className="bg-white/10 p-6 rounded-xl border border-white/20 w-full max-w-[440px] mt-4 backdrop-blur-md">
                <h3 className="text-brand-yellow font-heading font-bold text-lg mb-2">Blueprint Requested!</h3>
                <p className="text-white/90 text-sm leading-normal">
                  We've received your request and will schedule a scoping call inside 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5 w-full max-w-[440px] mt-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md text-left">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-white/60 uppercase">Project Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Lead Pipeline Automation"
                    className="bg-white/8 border border-white/15 rounded-lg p-2.5 text-white outline-none focus:border-white/30 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-white/60 uppercase">Target Systems to Connect</label>
                  <input
                    type="text"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    placeholder="e.g. Salesforce, Slack, Gmail"
                    className="bg-white/8 border border-white/15 rounded-lg p-2.5 text-white outline-none focus:border-white/30 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-white/60 uppercase">Your Work Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    required
                    className="bg-white/8 border border-white/15 rounded-lg p-2.5 text-white outline-none focus:border-white/30 text-sm"
                  />
                </div>
                <button type="submit" className="bg-brand-yellow text-brand-dark py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-brand-yellow-hover hover:translate-y-[-2px] border-none cursor-pointer mt-2 text-center w-full shadow-[0_4px_12px_rgba(246,199,68,0.2)]">
                  Request Scoping Blueprint
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Layer 4: Foreground ambient glow orbs ── */}
        <div data-parallax-layer="4" className="absolute inset-0 w-full h-[150%] -top-[25%] pointer-events-none">
          <div
            className="absolute rounded-full"
            style={{
              width: '600px', height: '600px',
              top: '10%', left: '50%',
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, rgba(246,199,68,0.12) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '400px', height: '400px',
              top: '20%', left: '-5%',
              background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '350px', height: '350px',
              top: '30%', right: '-3%',
              background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        {/* Bottom fade out to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-30"
          style={{ background: 'linear-gradient(to bottom, transparent, #060608)' }}
        />
      </div>
    </div>
  );
}
