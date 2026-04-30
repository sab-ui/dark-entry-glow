import { ChevronDown, Menu } from "lucide-react";

const HERO_IMG = "/hero-bg.png";

export const EntryScreen = ({ onEnter }: { onEnter: () => void }) => (
  <div className="relative w-full min-h-screen bg-black overflow-hidden">

    {/* ─── Full-bleed hero image ─── */}
    <div className="absolute inset-0">
      <img
        src={HERO_IMG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: "saturate(1.1) brightness(0.85)", objectPosition: "72% 20%" }}
      />
      {/* left dark gradient so text is readable, fades out at ~50% so face shows right */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #000 0%, #000 30%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.1) 65%, transparent 80%)" }} />
      {/* bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* subtle top gradient for nav readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
    </div>

    {/* grain */}
    <div className="grain pointer-events-none fixed inset-0 z-[1]" />

    {/* ─── Navigation ─── */}
    <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-5 pb-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="font-black text-xl sm:text-2xl text-primary leading-none"
          style={{ textShadow: "0 0 20px hsl(335 100% 50% / 0.9), 0 0 40px hsl(335 100% 50% / 0.4)" }}>
          ✦ A
        </span>
        <div className="hidden sm:block">
          <div className="text-[8px] uppercase tracking-[0.5em] text-white/30 leading-tight">Afterdark</div>
          <div className="text-[8px] uppercase tracking-[0.5em] text-white/20 leading-tight">Affair</div>
        </div>
      </div>

      {/* Partner logos – centre of nav */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[7px] uppercase tracking-[0.5em] text-white/35">Presented by</span>
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Eventora – white bg so navy/gold shows */}
          <div className="bg-white rounded px-3 py-2 flex items-center"
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}>
            <img src="/logo-eventora.png" alt="Eventora" className="h-10 sm:h-12 w-auto object-contain" />
          </div>
          <div className="w-px h-8 bg-white/15" />
          {/* Versova Vibes */}
          <img src="/logo-versova.jpg" alt="Versova Vibes Cafe"
            className="h-14 sm:h-16 w-auto object-contain rounded"
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }} />
        </div>
      </div>

      {/* Register Now – desktop */}
      <button onClick={onEnter}
        className="hidden md:block text-[10px] uppercase tracking-[0.4em] font-black text-white px-5 py-2.5 border border-primary/70 hover:bg-primary/10 hover:border-primary transition-all duration-300"
        style={{ boxShadow: "0 0 20px hsl(335 100% 50% / 0.25)" }}>
        Register Now
      </button>

      {/* Hamburger – mobile */}
      <Menu className="md:hidden w-5 h-5 text-white/60" />
    </nav>

    {/* ─── Hero content ─── */}
    <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-160px)] px-6 sm:px-10 md:px-16 pb-16 max-w-[640px]">

      {/* Tagline */}
      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.55em] text-white/55 mb-5 font-semibold">
        Where the{" "}
        <span className="text-primary" style={{ textShadow: "0 0 10px hsl(335 100% 50% / 0.7)" }}>Strange</span>
        {" "}meets the{" "}
        <span className="text-secondary" style={{ textShadow: "0 0 10px hsl(272 100% 55% / 0.7)" }}>Wild</span>
        {" "}♡
      </p>

      {/* SVG filter for rough text edges */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* "The" – handwritten */}
      <div className="font-marker text-white/90 -mb-3 sm:-mb-5 leading-none"
        style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}>
        The
      </div>

      {/* AFTERDARK – massive pink rough */}
      <h1 className="font-black text-primary leading-[0.88] tracking-tight"
        style={{
          fontSize: "clamp(4rem, 17vw, 12rem)",
          filter: "url(#rough)",
          textShadow: "0 0 40px hsl(335 100% 50% / 0.8), 0 0 80px hsl(335 100% 50% / 0.3), 4px 4px 0 hsl(335 100% 28%)",
        }}>
        AFTERDARK
      </h1>

      {/* AFFAIR 1.0 */}
      <div className="flex items-baseline gap-3 sm:gap-5 -mt-1 sm:-mt-3">
        <h2 className="font-black italic text-white leading-none tracking-tight"
          style={{
            fontSize: "clamp(2.8rem, 11vw, 8.5rem)",
            textShadow: "3px 3px 0 rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.05)"
          }}>
          AFFAIR
        </h2>
        <span className="font-black text-primary leading-none"
          style={{
            fontSize: "clamp(1.8rem, 7vw, 5.5rem)",
            textShadow: "0 0 20px hsl(335 100% 50% / 0.9)"
          }}>
          1.0
        </span>
      </div>

      {/* ─── Feature icons ─── */}
      <div className="flex items-stretch mt-7 sm:mt-9 border-t border-b border-white/10 py-3.5">
        {[
          { icon: "🎧", label: "DJ Night" },
          { icon: "🎭", label: "Face Art" },
          { icon: "🎪", label: "Alter Egos" },
          { icon: "⚡", label: "Dark Vibes" },
        ].map(({ icon, label }, i) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1.5 relative">
            {i > 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6 bg-white/10" />}
            <span className="text-lg sm:text-xl" style={{ filter: "grayscale(0.3)" }}>{icon}</span>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.3em] text-white/40 font-bold text-center">{label}</span>
          </div>
        ))}
      </div>

      {/* ─── CTA ─── */}
      <div className="mt-7 sm:mt-9 flex flex-col items-start gap-0">
        <button onClick={onEnter}
          className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-black/50 text-white font-black text-sm sm:text-base uppercase tracking-[0.4em] border border-primary/80 hover:bg-primary/10 transition-all duration-300"
          style={{ boxShadow: "0 0 25px hsl(335 100% 50% / 0.35), 0 0 60px hsl(335 100% 50% / 0.15), inset 0 0 20px hsl(335 100% 50% / 0.05)" }}>
          Enter if you dare
        </button>

        {/* drip drops */}
        <div className="flex gap-2.5 ml-10">
          {[10, 16, 8, 13, 7, 11].map((h, i) => (
            <div key={i} className="w-[2px] rounded-b-full"
              style={{ height: h, background: "hsl(335 100% 50%)", boxShadow: "0 0 6px hsl(335 100% 50% / 0.8)", opacity: 0.7 - i * 0.05 }} />
          ))}
        </div>

        <p className="mt-3 text-[8px] sm:text-[9px] uppercase tracking-[0.55em] text-white/25">Step into your alter ego</p>
        <ChevronDown className="w-4 h-4 text-primary/40 mt-2 animate-bounce" />
      </div>
    </div>

    {/* ─── Bottom info bar ─── */}
    <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[0.07] bg-black/75 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/[0.07]">
        {[["📅", "8 May"], ["🕗", "8:00 PM Onwards"], ["📍", "Versova Vibes Cafe, Andheri West"]].map(([icon, text]) => (
          <div key={text} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5">
            <span className="text-sm">{icon}</span>
            <span className="text-[10px] sm:text-xs text-white/50 font-medium tracking-wide">{text}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/[0.05] py-1.5 text-center">
        <span className="text-[9px] tracking-[0.4em] text-primary/50 uppercase">For Reservations: </span>
        <span className="text-[9px] text-white/35 font-mono">+91 96121 80626</span>
      </div>

    </div>
  </div>
);
