import React from 'react';

const horizontalLogos = [
  { name: "Anaaj AI", url: "https://www.anaaj.ai/assets/Footer%20Logo.png" },
  { name: "A Robotic Services", url: "https://aroboticservices.com/assets/Logo-mIvZkugz.png" },
  { name: "Vyomira", url: "https://res.cloudinary.com/dmhabztbf/image/upload/v1770127502/Vyomira_1_copy_3-removebg-preview_qsaev9.png" },
  { name: "CodeWave", url: "https://codewave.it.com/assets/Logo_Orginal-BDXHym7S.png" },
  { name: "GreenWrench Solutions", url: "https://www.greenwrenchsolutions.in/assets/GreenLogo-RH2irvlH.png" },
  { name: "Mathed", url: "https://mathed2025.nith.ac.in/Assets/logo.ico" },
  { name: "DESE - IISC banglore", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1750332367/dese_o261go.jpg" },
  { name: "NandniVerse", url: "https://yt3.googleusercontent.com/xB0EZsEWAU0h3jf4tjNFWN2y9q_HfQXfT3D1cMHOzIEdZ7R5-BsmA3iVv_Pq60DksAF8emf2Lw=s160-c-k-c0x00ffffff-no-rj" }
];

export default function ClientMarquee() {
  // Triple the items to ensure there is no blank space on ultra-wide screens
  const marqueeItems = [...horizontalLogos, ...horizontalLogos, ...horizontalLogos];

  return (
    <section className="py-16 bg-white border-t border-b border-brand-border text-center overflow-hidden relative">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted/70 mb-8 select-none">
          Trusted by operators at scale
        </h4>
        <div className="clients-marquee-container relative py-2">
          <div className="clients-marquee-track">
            {marqueeItems.map((logo, idx) => (
              <div 
                className="client-logo-item group relative flex items-center justify-center h-16 w-44 px-6 bg-white border border-brand-border rounded-xl transition-all duration-300 hover:border-brand-yellow/30 hover:shadow-[0_8px_20px_rgba(246,199,68,0.06)] hover:-translate-y-0.5 select-none shrink-0" 
                key={idx}
              >
                <img
                  src={logo.url}
                  alt={`${logo.name} Logo`}
                  className="max-h-7 max-w-full object-contain filter grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-300 select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
