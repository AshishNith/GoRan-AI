"use client";

import { ArrowUp } from "lucide-react";

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Footer scroll-to-top: a small dotted pill holding an up arrow.
 * The original also carried a light/dark switch on either side; this site has a single theme, so it
 * is just the arrow.
 */
const ScrollTopPill = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-full border border-dotted border-brand-dark/30">
        <button
          type="button"
          onClick={handleScrollTop}
          className="group flex h-11 w-11 items-center justify-center rounded-full text-brand-dark transition-colors duration-200 hover:bg-brand-yellow cursor-pointer border-none bg-transparent"
        >
          <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={1.75} />
          <span className="sr-only">Back to top</span>
        </button>
      </div>
    </div>
  );
};

export default ScrollTopPill;
