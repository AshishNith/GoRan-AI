import React, { useState, useEffect } from 'react';

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

  const whatsappUrl = "https://wa.me/919934225353?text=Hi%20GoRan%20AI,%20I'd%2520like%2520to%2520discuss%2520an%2520AI%2520automation%2520project%2520for%2520my%2520business.";

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
        
        {/* WhatsApp SVG Icon */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="transition-transform group-hover:scale-110"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.905-6.99C16.457 1.875 13.99 .843 11.372.843 5.939.843 1.517 5.263 1.513 10.7c-.001 1.692.443 3.342 1.285 4.792l-1.026 3.748 3.875-.986zm11.367-7.397c-.3-.15-1.771-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-3.04-1.257-4.743-3.69-5.468-4.942-.175-.3-.025-.45.075-.6l.45-.6c.1-.15.15-.25.225-.4.075-.15.038-.3-.013-.45-.05-.15-.475-1.15-.65-1.575-.171-.413-.343-.35-.475-.35-.125-.004-.27-.004-.413-.004-.143 0-.376.054-.572.27-.197.216-.752.735-.752 1.792s.77 2.08.877 2.225c.107.145 1.51 2.305 3.659 3.228.512.22 1.054.382 1.518.528.513.164.98.14 1.35.084.412-.06 1.77-.724 2.02-.975.25-.25.25-.475.25-.525-.001-.05-.1-.15-.4-.3z" />
        </svg>
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
