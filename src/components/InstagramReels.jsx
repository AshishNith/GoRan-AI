import React from 'react';
import { instagramReels } from '../data/instagramReels';
import { Button05 } from './ui/arrow-dots-button';

export default function InstagramReels() {
  return (
    <section className="py-24 bg-brand-bg-light border-t border-brand-border relative overflow-hidden" id="instagram">
      {/* Background decorations matching the subtle styling of the FAQ section */}
      <div className="absolute top-1/2 left-[-10%] w-150 h-150 rounded-full bg-brand-yellow/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-125 h-125 rounded-full bg-purple-500/3 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-300 mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-yellow font-heading font-semibold tracking-wider text-xs uppercase">
            GoRan AI In Action
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-tight mt-2">
            Inside GoRan AI
          </h2>
          <p className="text-brand-text-muted text-base md:text-lg leading-relaxed mt-4">
            See how we build, test, and deploy autonomous AI calling agents and workflows. Play our latest reels directly inline.
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-250 md:max-w-none mx-auto">
          {instagramReels.map((reel) => (
            <div
              key={reel.id}
              className="relative w-full h-[480px] md:h-[540px] rounded-3xl overflow-hidden border border-brand-border bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
            >
              <iframe
                src={`https://www.instagram.com/reel/${reel.reelId}/embed`}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={`Instagram Reel ${reel.reelId}`}
              />
            </div>
          ))}
        </div>

        {/* CTA Button using the standard Button05 component */}
        <div className="mt-16 text-center">
          <Button05
            label="Follow @goran.dotin on Instagram"
            href="https://www.instagram.com/goran.dotin/"
            variant="dark"
            className="shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
