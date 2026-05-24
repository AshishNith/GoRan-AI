import { useEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  topOffset = 120,
  cardGap = 30,
}) => {
  const containerRef = useRef(null);
  const rafId = useRef(null);

  const updateCards = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.scroll-stack-card');
    const totalCards = cards.length;

    cards.forEach((card, i) => {
      const stickyTop = topOffset + i * cardGap;
      const rect = card.getBoundingClientRect();

      // How far past its sticky point has the card been pushed?
      // When a card is stuck, rect.top ≈ stickyTop.
      // Cards below haven't reached their sticky point yet.
      const distFromSticky = rect.top - stickyTop;

      // Card is "stuck" when distFromSticky is near 0 or negative
      const isStuck = distFromSticky <= 5;

      // For stuck cards, figure out how many cards are stacked on top
      // by checking how many later cards are also stuck
      let cardsAbove = 0;
      if (isStuck) {
        for (let j = i + 1; j < totalCards; j++) {
          const jRect = cards[j].getBoundingClientRect();
          const jStickyTop = topOffset + j * cardGap;
          if (jRect.top - jStickyTop <= 5) {
            cardsAbove++;
          }
        }
      }

      // Scale down cards that have other cards stacked on top
      const scale = isStuck ? 1 - cardsAbove * 0.035 : 1;
      const opacity = isStuck ? 1 - cardsAbove * 0.12 : 1;

      card.style.transform = `scale(${Math.max(0.88, scale)})`;
      card.style.opacity = `${Math.max(0.5, opacity)}`;
    });
  }, [topOffset, cardGap]);

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateCards);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial call
    updateCards();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [updateCards]);

  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className={`scroll-stack-container ${className}`.trim()} ref={containerRef}>
      {childArray.map((child, i) => (
        <div
          className="scroll-stack-sticky-wrapper"
          key={i}
          style={{ top: `${topOffset + i * cardGap}px`, zIndex: i + 1 }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollStack;
