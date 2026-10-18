import React from 'react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqRow {
  id: string;
  /** Time for one full loop, as a CSS time such as "60s". */
  speed?: string;
  direction?: 'left' | 'right';
  faqItems: FaqItem[];
}

export interface FaqData {
  mainTitle: string;
  mainSubtitle?: string;
  rows: FaqRow[];
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * HorizontalScroller
 * A seamless sideways loop. It pauses while you hover it and fades out at both edges. Each half of
 * the loop has to be wider than the screen to stay seamless (FaqSection repeats the items for that).
 */
export const HorizontalScroller = ({
  children,
  speed = '40s',
  direction = 'left',
}: {
  children: React.ReactNode;
  speed?: string;
  direction?: 'left' | 'right';
}) => {
  const animationClass = direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';
  const style = { '--scroll-duration': speed } as React.CSSProperties;

  return (
    <div className="w-full overflow-hidden group relative scroller-mask">
      <div className={`flex w-max ${animationClass}`} style={style}>
        <div className="flex items-stretch flex-shrink-0">{children}</div>
        {/* duplicate for the seamless loop */}
        <div className="flex items-stretch flex-shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Title, subtitle and the questions as open text cells in rows that loop in opposite directions.
 * There are no boxes or fills: each cell is split from the next by a soft, slightly blurred
 * hairline, and a matching line runs between the rows (the .faq-loop-* rules in index.css).
 */
const FaqSection = ({ data, repeat = 2 }: { data: FaqData; repeat?: number }) => {
  return (
    <div className="relative flex flex-col items-center gap-14 w-full">
      <div className="flex flex-col items-center gap-5 text-center z-10 max-w-2xl px-6">
        <h2
          className="m-0 text-3xl md:text-5xl font-heading font-bold text-brand-dark leading-[1.1] text-balance"
          style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 0.2s forwards' }}
        >
          {data.mainTitle}
        </h2>
        {data.mainSubtitle && (
          <p
            className="m-0 text-base md:text-lg leading-relaxed text-brand-text-muted"
            style={{ opacity: 0, animation: 'fadeInUp 0.7s ease-out 0.4s forwards' }}
          >
            {data.mainSubtitle}
          </p>
        )}
      </div>

      <div className="relative z-10 w-full">
        {data.rows.map((row, rowIndex) => {
          const offset = data.rows.slice(0, rowIndex).reduce((total, r) => total + r.faqItems.length, 0);
          return (
            <React.Fragment key={row.id}>
              {rowIndex > 0 && <div className="faq-loop-rule" aria-hidden="true" />}
              <HorizontalScroller speed={row.speed} direction={row.direction}>
                {Array.from({ length: repeat }).flatMap((_, copy) =>
                  row.faqItems.map((item, i) => (
                    <div key={`${item.id}-${copy}`} className="faq-loop-cell" aria-hidden={copy > 0 ? true : undefined}>
                      <span className="font-mono text-xs font-semibold text-brand-text-muted/70">{pad(offset + i + 1)}</span>
                      <h3 className="m-0 mt-3 font-heading text-lg md:text-xl font-bold leading-snug text-brand-dark">{item.question}</h3>
                      <p className="m-0 mt-3 text-sm md:text-[0.95rem] leading-relaxed text-brand-text-muted">{item.answer}</p>
                    </div>
                  )),
                )}
              </HorizontalScroller>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
