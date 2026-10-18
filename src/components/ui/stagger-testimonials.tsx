"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface StaggerItem {
  /** Stable id, reported through onCenterChange. */
  id: string;
  /** The line shown on the card. */
  testimonial: string;
  /** Who said it, such as "Name, Role, Company". */
  by: string;
  /** Initials shown on the card when there is no picture. */
  initials?: string;
  /** Optional picture; takes the place of the initials block. */
  imgSrc?: string;
}

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-7 sm:p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-brand-dark text-white border-brand-dark"
          : "z-0 bg-white text-brand-dark border-brand-border hover:border-brand-yellow"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -45 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
    >
      <span
        className={cn("absolute block origin-top-right rotate-45", isCenter ? "bg-white/30" : "bg-brand-border")}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      {testimonial.imgSrc ? (
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by.split(',')[0]}
          className="mb-4 h-14 w-12 bg-brand-bg-light object-cover object-top"
          style={{ boxShadow: "3px 3px 0px rgba(23,23,23,0.12)" }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="mb-4 flex h-14 w-12 items-center justify-center bg-brand-yellow font-heading text-base font-bold text-brand-dark"
          style={{ boxShadow: "3px 3px 0px rgba(23,23,23,0.18)" }}
        >
          {testimonial.initials}
        </span>
      )}
      <h3
        className={cn(
          "m-0 font-heading text-lg sm:text-2xl font-bold leading-snug",
          isCenter ? "text-white" : "text-brand-dark"
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-7 sm:bottom-8 left-7 sm:left-8 right-7 sm:right-8 m-0 text-xs sm:text-sm italic leading-snug",
          isCenter ? "text-white/75" : "text-brand-text-muted"
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

const ARROW =
  "flex h-14 w-14 items-center justify-center text-2xl transition-colors bg-white border-2 border-brand-border text-brand-dark hover:bg-brand-dark hover:border-brand-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2";

export const StaggerTestimonials: React.FC<{
  items: StaggerItem[];
  /** Called with the id of the card in the middle, on load and after every move. */
  onCenterChange?: (id: string) => void;
  height?: number;
}> = ({ items, onCenterChange, height = 560 }) => {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(() => items.map((item, i) => ({ ...item, tempId: i })));

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const centerIndex = list.length % 2 ? (list.length + 1) / 2 : list.length / 2;
  const centerId = list[Math.min(centerIndex, list.length - 1)]?.id;
  useEffect(() => {
    if (centerId !== undefined) onCenterChange?.(centerId);
  }, [centerId, onCenterChange]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height }} role="region" aria-roledescription="carousel" aria-label="Client testimonials">
      {list.map((testimonial, index) => {
        const position = list.length % 2
          ? index - (list.length + 1) / 2
          : index - list.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
        <button onClick={() => handleMove(-1)} className={ARROW} aria-label="Previous testimonial">
          <ChevronLeft />
        </button>
        <button onClick={() => handleMove(1)} className={ARROW} aria-label="Next testimonial">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
