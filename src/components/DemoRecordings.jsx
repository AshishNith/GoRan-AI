import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play } from 'lucide-react';

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

// The AI calling agent demo recordings, shared by /demo and /clinic.
export default function DemoRecordings() {
  const [playingId, setPlayingId] = useState(null);

  return (
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
  );
}
