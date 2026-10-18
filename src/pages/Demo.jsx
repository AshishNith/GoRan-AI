import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Headphones, Pause, Play, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useCalBooking } from '../components/CalBookingModal';
import QualificationLiveDemo from '../components/QualificationLiveDemo';

// Edit titles and descriptions here. `duration` is shown until the browser reads the real length.
const RECORDINGS = [
  { id: 'call-1', src: '/demos/call-demo-1.mp3', title: 'Demo Call 1', desc: 'A full conversation between the AI calling agent and a customer.', duration: 156 },
  { id: 'call-2', src: '/demos/call-demo-2.mp3', title: 'Demo Call 2', desc: 'Another real call handled end to end by the agent.', duration: 93 },
  { id: 'call-3', src: '/demos/call-demo-3.mp3', title: 'Demo Call 3', desc: 'A longer call where the agent works through the full set of questions.', duration: 339 },
  { id: 'call-4', src: '/demos/call-demo-4.wav', title: 'Demo Call 4', desc: 'A live call recorded straight from the calling agent.', duration: 123 },
  { id: 'call-5', src: '/demos/call-demo-5.m4a', title: 'Demo Call 5', desc: 'One more sample call, so you can hear how it handles a different customer.', duration: 126 },
];

const formatTime = (secs) => {
  if (!Number.isFinite(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

function RecordingPlayer({ recording, index, playingId, onPlay, onStop }) {
  const audioRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(recording.duration);
  const [failed, setFailed] = useState(false);
  const isPlaying = playingId === recording.id;

  // Only one recording plays at a time
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !isPlaying && !audio.paused) audio.pause();
  }, [isPlaying]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setFailed(true));
    } else {
      audio.pause();
    }
  };

  const seek = (e) => {
    const audio = audioRef.current;
    const next = Number(e.target.value);
    if (audio) audio.currentTime = next;
    setCurrent(next);
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div className={`bg-white border rounded-2xl p-5 md:p-6 transition-all duration-300 ${isPlaying ? 'border-brand-yellow shadow-card-hover' : 'border-brand-border hover:shadow-card-hover'}`}>
      <audio
        ref={audioRef}
        src={recording.src}
        preload="metadata"
        onPlay={() => { setFailed(false); onPlay(recording.id); }}
        onPause={() => onStop(recording.id)}
        onEnded={() => { setCurrent(0); onStop(recording.id); }}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => Number.isFinite(e.currentTarget.duration) && setDuration(e.currentTarget.duration)}
        onError={() => setFailed(true)}
      />

      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={`${isPlaying ? 'Pause' : 'Play'} ${recording.title}`}
          className="relative shrink-0 w-14 h-14 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark flex items-center justify-center border-none cursor-pointer shadow-lg shadow-brand-yellow/20 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          {isPlaying && <span className="absolute inset-0 rounded-full border border-brand-yellow animate-ping" style={{ animationDuration: '2s' }} />}
          {isPlaying ? <Pause size={22} className="fill-current" /> : <Play size={22} className="fill-current ml-0.5" />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">Recording {index + 1}</span>
            <span className="text-[11px] font-mono text-brand-text-muted tabular-nums">· {formatTime(duration)}</span>
          </div>
          <h3 className="font-heading font-bold text-brand-dark text-lg leading-tight mt-1 mb-1">{recording.title}</h3>
          <p className="text-brand-text-muted text-sm leading-relaxed m-0">{recording.desc}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <span className="text-xs font-mono text-brand-text-muted tabular-nums w-10 text-right">{formatTime(current)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          onChange={seek}
          aria-label={`Seek ${recording.title}`}
          className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer accent-[#F6C744]"
          style={{ background: `linear-gradient(to right, #F6C744 ${progress}%, #E5E5E5 ${progress}%)` }}
        />
        <span className="text-xs font-mono text-brand-text-muted tabular-nums w-10">{formatTime(duration)}</span>
      </div>

      {failed && (
        <p role="alert" className="text-xs text-red-600 mt-3 mb-0">This recording could not be played. Please refresh and try again.</p>
      )}
    </div>
  );
}

export default function Demo() {
  const { openCalBooking } = useCalBooking();
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="w-full bg-white relative overflow-hidden min-h-screen">
      <SEOHead
        title="AI Calling Agent Demo"
        description="Listen to real calls handled by the GoRan AI calling agent, then test the agent yourself on your own phone or right in your browser."
        canonicalPath="/demo"
        noIndex
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="w-full max-w-[1140px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center no-underline">
            <img src="/Logo.png" alt="GoRan AI Logo" className="h-10 w-auto block rounded-xl" />
          </Link>
          <button
            onClick={openCalBooking}
            className="inline-flex items-center gap-1 bg-brand-dark text-white font-semibold text-xs py-2 px-4 rounded-full shadow-sm hover:bg-brand-dark-hover border-none cursor-pointer"
          >
            Book a Call
          </button>
        </div>
      </header>

      <div className="grid-bg-overlay" />
      <div className="absolute top-[3%] right-[-10%] w-140 h-140 rounded-full bg-brand-yellow/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-15%] w-120 h-120 rounded-full bg-brand-yellow/5 blur-[100px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="relative z-10 pt-32 pb-14 md:pt-40 md:pb-16 px-6">
        <div className="max-w-[900px] mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-xs font-bold text-brand-dark uppercase tracking-wider mb-6 animate-fadeIn">
            <Sparkles size={12} className="text-brand-yellow fill-brand-yellow" /> AI Calling Agent · Demo
          </div>

          <h1 className="font-heading font-black text-brand-dark text-[2.2rem] sm:text-[3.2rem] md:text-[4.5rem] leading-[1.05] tracking-tight mb-6 animate-fadeIn">
            Hear the AI calling agent <span className="text-brand-yellow">in action</span>
          </h1>

          <p className="text-brand-text-muted text-base sm:text-lg md:text-xl max-w-[720px] leading-relaxed mb-10 animate-fadeIn" style={{ animationDelay: '0.15s' }}>
            Listen to real calls first. Then test the agent yourself: it can call your phone, or you can talk to it right here in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => scrollTo('recordings')}
              className="w-full sm:w-auto bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-base py-4 px-8 rounded-full shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <Headphones size={16} />
              <span>Listen to the Demos</span>
            </button>
            <button
              onClick={() => scrollTo('try-live')}
              className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-base py-4 px-8 rounded-full shadow-lg shadow-brand-yellow/10 transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Test the Agent Live</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Demo recordings ── */}
      <section id="recordings" className="relative z-10 pb-20 md:pb-24 px-6 scroll-mt-20">
        <div className="max-w-[820px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase text-brand-text-muted tracking-wider">Demo Recordings</span>
            <h2 className="text-3xl md:text-[2.4rem] font-heading font-bold text-brand-dark leading-tight mt-2 text-balance">
              Real calls, played back
            </h2>
            <p className="text-brand-text-muted text-sm md:text-base mt-4 leading-relaxed">
              Press play on any recording. Headphones give the clearest sound.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {RECORDINGS.map((recording, idx) => (
              <RecordingPlayer
                key={recording.id}
                recording={recording}
                index={idx}
                playingId={playingId}
                onPlay={setPlayingId}
                onStop={(id) => setPlayingId((prev) => (prev === id ? null : prev))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Test the agent: phone call + browser call ── */}
      <QualificationLiveDemo />

      {/* ── Closing CTA ── */}
      <section className="relative z-10 py-20 md:py-24 px-6">
        <div className="max-w-[1140px] mx-auto bg-brand-dark rounded-3xl px-6 py-14 md:py-20 text-center relative overflow-hidden">
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-140 h-80 rounded-full bg-brand-yellow/15 blur-[100px] pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight tracking-tight max-w-[760px] mx-auto text-balance">
              Want a calling agent for <span className="text-brand-yellow">your business?</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-[560px] mx-auto mt-5 mb-9">
              Book a call and we will set up an agent with your questions, your script and your brand's name.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={openCalBooking}
                className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-base py-4 px-8 rounded-full transition-all duration-200 hover:-translate-y-0.5 border-none cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/10"
              >
                <span>Book a Call</span>
                <ArrowRight size={16} />
              </button>
              <Link
                to="/qualification"
                className="w-full sm:w-auto text-white/80 hover:text-white font-semibold text-base py-4 px-8 rounded-full border border-white/20 no-underline inline-flex items-center justify-center transition-all"
              >
                See the lead qualification funnel
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-brand-bg-light border-t border-brand-border py-8 px-6 relative z-10">
        <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text-muted">
          <span>© 2026 GoRan AI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-brand-dark hover:underline no-underline">Privacy Policy</a>
            <a href="/terms" className="hover:text-brand-dark hover:underline no-underline">Terms of Service</a>
            <Link to="/" className="hover:text-brand-dark hover:underline no-underline">Main Website</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
