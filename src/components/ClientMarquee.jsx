import React from 'react';

const horizontalLogos = [
  { name: "Google", url: "https://cdn.worldvectorlogo.com/logos/google-2015.svg" },
  { name: "Microsoft", url: "https://cdn.worldvectorlogo.com/logos/microsoft.svg" },
  { name: "Netflix", url: "https://cdn.worldvectorlogo.com/logos/netflix-3.svg" },
  { name: "Airbnb", url: "https://cdn.worldvectorlogo.com/logos/airbnb.svg" },
  { name: "Spotify", url: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg" },
  { name: "Dropbox", url: "https://cdn.worldvectorlogo.com/logos/dropbox-1.svg" },
  { name: "Stripe", url: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg" },
  { name: "Slack", url: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" },
  { name: "Amazon", url: "https://cdn.worldvectorlogo.com/logos/amazon-2.svg" },
  { name: "PayPal", url: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg" }
];

export default function ClientMarquee() {
  // Duplicate for infinite loop
  const marqueeItems = [...horizontalLogos, ...horizontalLogos];

  return (
    <section className="py-12 bg-white border-t border-brand-border text-center overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-6">
          Trusted by operators at scale
        </h4>
        <div className="clients-marquee-container">
          <div className="clients-marquee-track">
            {marqueeItems.map((logo, idx) => (
              <div className="client-logo-item group" key={idx}>
                <img
                  src={logo.url}
                  alt={`${logo.name} Logo`}
                  className="client-logo-img"
                  style={{ height: '24px', width: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
