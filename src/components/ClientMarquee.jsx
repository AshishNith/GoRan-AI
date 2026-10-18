// Single-colour silhouettes in /public/clients/mono, tinted with CSS so every logo shares one style.
// `w` and `h` are the file's pixel size; they set each logo's display size (see logoSize).
const ROWS = [
  [
    { name: "Million Flats", file: "million-flats", w: 256, h: 114 },
    { name: "Visvam", file: "visvam", w: 649, h: 160 },
    { name: "Sasteghar", file: "sasteghar", w: 302, h: 160 },
    { name: "MathEd", file: "mathed", w: 483, h: 160 },
    { name: "Anaaj AI", file: "anaaj", w: 482, h: 160 },
    { name: "A Robotics Services", file: "arobotics", w: 497, h: 160 },
    { name: "DESE - IISc Bangalore", file: "dese", w: 123, h: 148 },
  ],
  [
    { name: "Vyomira Tech Solutions", file: "vyomira", w: 794, h: 160 },
    { name: "NandniVerse", file: "nandniverse", w: 159, h: 159 },
    { name: "Herbsera", file: "herbsera", w: 728, h: 160 },
    { name: "Codewave", file: "codewave", w: 775, h: 133 },
    { name: "GreenWrench Solutions", file: "greenwrench", w: 158, h: 160 },
    { name: "Hadoti Farms", file: "hadoti", w: 430, h: 160 },
  ],
];

// Give every logo roughly the same visual area, so wide wordmarks and square badges look balanced
const LOGO_AREA = 5200;
const logoSize = ({ w, h }) => {
  const ratio = w / h;
  const height = Math.min(54, Math.max(24, Math.sqrt(LOGO_AREA / ratio)));
  return { width: Math.round(height * ratio), height: Math.round(height) };
};

function ClientLogo({ logo }) {
  const url = `url(/clients/mono/${logo.file}.png)`;
  return (
    <li className="client-logo shrink-0 flex items-center justify-center px-7 md:px-9 h-16">
      <span
        role="img"
        aria-label={logo.name}
        title={logo.name}
        className="client-logo-mark block"
        style={{ ...logoSize(logo), WebkitMaskImage: url, maskImage: url }}
      />
    </li>
  );
}

function MarqueeRow({ logos, reverse }) {
  // Two identical halves; the track slides by exactly one half, so the loop has no visible jump.
  // Each half repeats the row twice so it is wider than ultra-wide screens.
  const half = [...logos, ...logos];
  return (
    <div className="clients-marquee-container">
      <ul className={`clients-marquee-track list-none m-0 p-0 ${reverse ? 'clients-marquee-reverse' : ''}`}>
        {[...half, ...half].map((logo, idx) => (
          <ClientLogo key={idx} logo={logo} />
        ))}
      </ul>
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section className="py-14 md:py-16 bg-brand-bg-light border-t border-b border-brand-border/60 text-center overflow-hidden relative">
      <div className="w-full max-w-[1200px] mx-auto px-6 mb-8 relative z-10 flex items-center justify-center gap-4">
        <span className="hidden sm:block h-px w-12 bg-brand-border" />
        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-text-muted select-none m-0">
          Trusted by operators at scale
        </h4>
        <span className="hidden sm:block h-px w-12 bg-brand-border" />
      </div>

      <div className="relative z-10 flex flex-col gap-2 md:gap-3">
        {ROWS.map((logos, idx) => (
          <MarqueeRow key={idx} logos={logos} reverse={idx % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
