import React from 'react';

const horizontalLogos = [
  { name: "", url: "https://www.anaaj.ai/assets/Footer%20Logo.png" },
  { name: "A Robotic Services", url: "https://aroboticservices.com/assets/Logo-mIvZkugz.png" },
  { name: "DESE - IISC banglore", url: "https://res.cloudinary.com/dinhcaf2c/image/upload/v1750332367/dese_o261go.jpg" },
  { name: "Vyomira Tech Solutions", url: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFXc1PpGYRXxGmZIG6vcIFwSU1w49cBVwjw80a05diLaM-_pdSnrRFo9qL__FCgalHnrHcuir3iGYg-imY7euDnrnX7koEpe7vwEI3_T4zf962gfdxYwzF8_2LTQ_KdXK2ezXPMBsJjRHan=s1360-w1360-h1020-rw" },
  { name: "", url: "https://yt3.googleusercontent.com/xB0EZsEWAU0h3jf4tjNFWN2y9q_HfQXfT3D1cMHOzIEdZ7R5-BsmA3iVv_Pq60DksAF8emf2Lw=s160-c-k-c0x00ffffff-no-rj" },
  { name: "", url: "https://codewave.it.com/assets/Logo_Orginal-BDXHym7S.png" },
  { name: "GreenWrench Solutions", url: "https://www.greenwrenchsolutions.in/assets/GreenLogo-RH2irvlH.png" },
  { name: "Hadoti Farms", url: "https://hadoti-farms.vercel.app/Creatives/darkLogo.png" },
  { name: "", url: "https://mathed2025.nith.ac.in/Assets/logo.ico" },
];

export default function ClientMarquee() {
  // Triple the items to ensure there is no blank space on ultra-wide screens
  const marqueeItems = [...horizontalLogos, ...horizontalLogos, ...horizontalLogos];

  return (
    <section className="py-12 bg-black/30 border-t border-b border-brand-border text-center overflow-hidden relative">
      <div className="w-full max-w-[1200px] mx-auto px-6 mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-text- select-none">
          Trusted by operators at scale
        </h4>
      </div>

      <div className="clients-marquee-container relative py-2">
        <div className="clients-marquee-track">
          {marqueeItems.map((logo, idx) => (
            <div 
              className="client-logo-item group relative flex flex-col items-center justify-center h-32 w-64 px-6 select-none shrink-0" 
              key={idx}
            >
              <img
                src={logo.url}
                alt={`${logo.name} Logo`}
                className="relative max-h-12 max-w-full object-contain opacity-95 transition-all duration-300 select-none pointer-events-none mb-2"
                loading="lazy"
              />
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#111111]/60 uppercase transition-colors duration-200 group-hover:text-brand-yellow select-none">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
