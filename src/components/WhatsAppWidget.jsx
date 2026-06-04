import React, { useState, useEffect } from 'react';
import WhatsappIcon from './ui/WhatsappIcon';

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a gentle helper tooltip 3 seconds after loading to engage users
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Auto-hide the tooltip after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 11000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const whatsappUrl = "https://wa.me/919934225353?text=Hi%20GoRan%20AI,%20I'd%20like%20to%20discuss%20an%20AI%20automation%20project%20for%20my%20business.";

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 font-body flex items-center gap-3 pointer-events-none">
      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="pointer-events-auto w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3),0_0_0_1px_rgba(37,211,102,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 group relative shrink-0"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing Outer Glow */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 -z-10 group-hover:animate-none" />
        
        {/* Official WhatsApp Logo Icon */}
        <WhatsappIcon
          className="w-6 h-6 transition-transform group-hover:scale-110"
        />
      </a>

      {/* Interactive Tooltip Bubble */}
      <div
        className={`pointer-events-auto bg-brand-dark text-white text-[11px] font-medium py-2 px-3.5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/[0.08] transition-all duration-500 ease-out flex items-center gap-2 max-w-[200px] sm:max-w-xs origin-left ${
          showTooltip
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 -translate-x-4 scale-95 pointer-events-none'
        }`}
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" />
          <span className="relative rounded-full w-2 h-2 bg-[#25D366]" />
        </span>
        <span>Chat with us on WhatsApp for Instant Inquiry</span>
        <button
          onClick={() => setShowTooltip(false)}
          className="text-white/40 hover:text-white ml-1 bg-none border-none cursor-pointer text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
