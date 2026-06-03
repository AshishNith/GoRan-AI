import React, { useState } from 'react';

const horizontalLogos = [
  { name: "MathEd", url: "https://res.cloudinary.com/dvwpxb2oa/image/upload/v1780484846/copy_of_chatgpt_image_jun_3_2026_04_34_38_pm_zl5hql.png", invert: false },
  { name: "Anaaj AI", url: "https://res.cloudinary.com/dvwpxb2oa/image/upload/v1773933014/FullWhiteLogo_nlnlbh.svg", invert: false },
  { name: "A Robotics Services", url: "https://res.cloudinary.com/dvwpxb2oa/image/upload/v1780491579/ChatGPT_Image_Jun_3_2026_04_47_02_PM_tnbgan.png", invert: false },
  { name: "DESE - IISc Bangalore", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1750332367/dese_o261go.jpg", invert: false },
  { name: "Vyomira Tech Solutions", url: "https://res.cloudinary.com/dvwpxb2oa/image/upload/v1780485044/ChatGPT_Image_Jun_3_2026_04_39_46_PM_1_e81kwv.png", invert: false },
  { name: "NandniVerse", url: "https://yt3.googleusercontent.com/xB0EZsEWAU0h3jf4tjNFWN2y9q_HfQXfT3D1cMHOzIEdZ7R5-BsmA3iVv_Pq60DksAF8emf2Lw=s160-c-k-c0x00ffffff-no-rj", invert: false },
  { name: "Herbsera", url: "https://res.cloudinary.com/dvwpxb2oa/image/upload/v1780485724/ChatGPT_Image_Jun_3_2026_04_51_26_PM_hgo6dh.png", invert: false },
  { name: "Codewave", url: "https://codewave.it.com/assets/Logo_Orginal-BDXHym7S.png", invert: false },
  { name: "GreenWrench Solutions", url: "https://www.greenwrenchsolutions.in/assets/GreenLogo-RH2irvlH.png", invert: false },
  { name: "Hadoti Farms", url: "https://hadoti-farms.vercel.app/Creatives/whiteLogo.png", invert: false },
];

function ClientLogoItem({ logo }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="client-logo-card group relative flex items-center justify-center bg-[#121212] border border-white/[0.08] shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:border-brand-yellow/30 rounded-2xl h-20 w-44 px-6 select-none shrink-0 transition-all duration-300 hover:-translate-y-1 mx-1.5 cursor-pointer hover:bg-[#1a1a1a]">
      {!hasError ? (
        <img
          src={logo.url}
          alt={`${logo.name} Logo`}
          onError={() => setHasError(true)}
          className={`relative max-h-10 max-w-full object-contain opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300 select-none pointer-events-none ${logo.invert ? 'invert' : ''}`}
          loading="lazy"
        />
      ) : (
        <span className="font-heading text-xs font-black tracking-widest text-white/50 group-hover:text-white transition-colors duration-300 text-center uppercase leading-tight select-none">
          {logo.name}
        </span>
      )}
    </div>
  );
}

export default function ClientMarquee() {
  // Triple the items to ensure there is no blank space on ultra-wide screens
  const marqueeItems = [...horizontalLogos, ...horizontalLogos, ...horizontalLogos];

  return (
    <section className="py-14 bg-brand-bg-light border-t border-b border-brand-border/60 text-center overflow-hidden relative">
      {/* Soft background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      
      <div className="w-full max-w-[1200px] mx-auto px-6 mb-8 relative z-10">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-text-muted select-none">
          Trusted by operators at scale
        </h4>
      </div>

      <div className="clients-marquee-container relative py-4 z-10">
        <div className="clients-marquee-track">
          {marqueeItems.map((logo, idx) => (
            <ClientLogoItem key={idx} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}

