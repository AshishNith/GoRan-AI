import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, ArrowRight, Check, Globe, Mic, MicOff, PhoneCall, PhoneOff, RotateCw, Smartphone } from 'lucide-react';
import { AudioStreamer } from '../utils/audioStreamer';

// The calling agent backend sends no CORS headers, so outbound-call requests go through this
// same-origin path, which is proxied to the backend (vercel.json in production, vite.config.js in dev).
const AGENT_API = '/api/agent/outbound';
// WebSockets are not subject to CORS, so the browser call connects to the backend directly.
const LIVE_WS_URL = 'wss://goran-calling-agent.onrender.com/api/live';
const OUTBOUND_PERSONA = 'arjun-outbound';
const WEB_PERSONA = 'riya-inbound';

const TERMINAL_STATUSES = ['completed', 'failed', 'busy', 'no-answer'];
const CALL_STEPS = [
  'Details received by the agent',
  'Dialing your number',
  'Your phone is ringing',
  'On the call with the agent',
];
// Which step is in progress for each status the backend reports
const STEP_FOR_STATUS = { initiating: 0, initiated: 1, ringing: 2, 'in-progress': 3, completed: 4 };
const FAILURE_MESSAGES = {
  busy: 'Your line was busy. Try again when you are free to pick up.',
  'no-answer': 'The call was not answered. Keep your phone handy and try again.',
  failed: 'The call could not be placed. Please check the number and try again.',
};

const inputClass = 'w-full bg-brand-bg-light border border-brand-border focus:border-brand-yellow/60 rounded-xl py-3 px-4 text-sm text-brand-dark focus:outline-none transition-all';

// Returns the 10-digit mobile number, or null if it is not a valid Indian mobile
const normalizeIndianMobile = (value) => {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
};

const formatTime = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const CardHeader = ({ icon: Icon, tag, title, children }) => (
  <div className="mb-6">
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-dark bg-brand-yellow px-2.5 py-1 rounded-full">
      <Icon size={12} /> {tag}
    </span>
    <h3 className="text-2xl font-heading font-bold text-brand-dark leading-tight mt-4 mb-2">{title}</h3>
    <p className="text-brand-text-muted text-sm leading-relaxed">{children}</p>
  </div>
);

// ── Option 1: fill the form, the agent calls your phone ──
function PhoneCallCard() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, initiating, then whatever the backend reports
  const [callId, setCallId] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState('');
  const transcriptRef = useRef(null);

  const isTerminal = TERMINAL_STATUSES.includes(status);
  const isFailure = isTerminal && status !== 'completed';
  const currentStep = STEP_FOR_STATUS[status] ?? 1;

  // Poll the call while it is live
  useEffect(() => {
    if (!callId || TERMINAL_STATUSES.includes(status)) return;
    const poll = setInterval(async () => {
      try {
        const res = await fetch(`${AGENT_API}/status/${callId}`);
        const data = await res.json();
        if (!data.success) return;
        if (data.status) setStatus(data.status);
        setTranscript(data.transcript || []);
        if (data.error) setError(data.error);
      } catch {
        // One failed poll should not end the call view; the next tick retries
      }
    }, 2000);
    return () => clearInterval(poll);
  }, [callId, status]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const digits = normalizeIndianMobile(phone);
    if (!digits) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }

    setError('');
    setTranscript([]);
    setCallId(null);
    setStatus('initiating');

    try {
      const res = await fetch(`${AGENT_API}/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The backend dials `toNumber` with `personaId`. `leadName` rides along for when it starts using it.
        body: JSON.stringify({ toNumber: `+91${digits}`, personaId: OUTBOUND_PERSONA, leadName: name.trim() }),
      });
      const data = await res.json().catch(() => null);
      if (!data?.success) {
        throw new Error(data?.error || 'The calling agent could not be reached. Please try again in a moment.');
      }
      setCallId(data.callId);
      setStatus('initiated');
    } catch (err) {
      setError(err instanceof TypeError ? 'The calling agent could not be reached. Please try again in a moment.' : err.message);
      setStatus('idle');
    }
  };

  const hangUp = async () => {
    if (!callId) return;
    try {
      await fetch(`${AGENT_API}/hangup/${callId}`, { method: 'POST' });
    } catch {
      // The call view still closes below; the backend ends the call when the line drops
    }
    setStatus('completed');
  };

  const reset = () => {
    setStatus('idle');
    setCallId(null);
    setTranscript([]);
    setError('');
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col">
      <CardHeader icon={Smartphone} tag="Option 1 · Phone call" title="Get a call on your phone">
        This is the same funnel your customers go through. Fill the form and the agent calls you.
      </CardHeader>

      {status === 'idle' ? (
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
          <div className="flex flex-col gap-1">
            <label htmlFor="qual-name" className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wide">Your Name *</label>
            <input
              type="text"
              id="qual-name"
              required
              autoComplete="name"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="qual-phone" className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wide">Mobile Number *</label>
            <div className="flex gap-2">
              <span className="shrink-0 bg-brand-bg-light border border-brand-border rounded-xl py-3 px-3.5 text-sm font-semibold text-brand-dark">+91</span>
              <input
                type="tel"
                id="qual-phone"
                required
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-xs text-brand-text-muted leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-brand-yellow shrink-0 cursor-pointer"
            />
            I agree to receive an automated call from GoRan AI on this number.
          </label>

          {error && (
            <div role="alert" className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl p-3 leading-relaxed">
              <AlertCircle size={14} className="shrink-0 mt-0.5" /> {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-auto w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-sm py-3.5 px-6 rounded-xl transition-all border-none cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-yellow/10"
          >
            <PhoneCall size={16} /> Call Me Now
          </button>
        </form>
      ) : (
        <div className="flex-1 flex flex-col animate-fadeIn">
          {isFailure ? (
            <div role="alert" className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl p-4 leading-relaxed mb-4">
              <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error || FAILURE_MESSAGES[status]}
            </div>
          ) : (
            <ol className="list-none p-0 m-0 space-y-3 mb-5" aria-live="polite">
              {CALL_STEPS.map((label, idx) => {
                const done = idx < currentStep;
                const active = idx === currentStep;
                return (
                  <li key={label} className={`flex items-center gap-3 text-sm transition-colors duration-300 ${done || active ? 'text-brand-dark' : 'text-brand-text-muted/50'}`}>
                    <span className={`relative w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-emerald-50 text-emerald-600' : active ? 'bg-brand-yellow' : 'bg-brand-bg-light border border-brand-border'}`}>
                      {active && <span className="absolute inset-0 rounded-full bg-brand-yellow/50 animate-ping" />}
                      {done && <Check size={13} />}
                    </span>
                    <span className={active ? 'font-semibold' : ''}>{label}</span>
                  </li>
                );
              })}
            </ol>
          )}

          {/* Live transcript from the phone call */}
          {!isFailure && (
            <div
              ref={transcriptRef}
              data-lenis-prevent
              className="flex-1 min-h-[150px] max-h-[220px] bg-brand-dark rounded-2xl p-4 overflow-y-auto scrollbar-hide space-y-3 font-mono text-xs leading-relaxed"
            >
              {transcript.length === 0 ? (
                <div className="h-full min-h-[118px] flex items-center justify-center text-gray-500 text-center">
                  {status === 'completed' ? 'Call ended' : `Pick up, ${name.trim().split(' ')[0] || 'the agent is calling'}. The conversation appears here.`}
                </div>
              ) : (
                transcript.map((line, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-0.5 sm:gap-2 text-left">
                    <span className={`font-bold uppercase tracking-wider shrink-0 sm:w-16 ${line.role === 'agent' ? 'text-brand-yellow' : 'text-blue-400'}`}>
                      {line.role === 'agent' ? 'Agent' : 'You'}
                    </span>
                    <span className="text-white">{line.text}</span>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-5">
            {isTerminal ? (
              <button
                type="button"
                onClick={reset}
                className="w-full bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all border-none cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCw size={14} /> {isFailure ? 'Try Again' : 'Call Me Again'}
              </button>
            ) : (
              <button
                type="button"
                onClick={hangUp}
                disabled={!callId}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all border-none cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PhoneOff size={14} /> Hang Up
              </button>
            )}
          </div>
        </div>
      )}

      {status === 'idle' && (
        <p className="text-[11px] text-brand-text-muted mt-4 mb-0 text-center">Indian mobile numbers only. The call comes within moments of submitting.</p>
      )}
    </div>
  );
}

// ── Option 2: talk to the agent from the browser ──
function WebCallCard() {
  const [callState, setCallState] = useState('IDLE'); // IDLE, CONNECTING, CONNECTED, ERROR
  const [isMuted, setIsMuted] = useState(false);
  const [caption, setCaption] = useState(null); // { who: 'agent' | 'user', text }
  const [errorMsg, setErrorMsg] = useState('');
  const [duration, setDuration] = useState(0);

  const socketRef = useRef(null);
  const streamerRef = useRef(null);
  const pingRef = useRef(null);

  useEffect(() => {
    const streamer = new AudioStreamer();
    streamerRef.current = streamer;
    return () => {
      clearInterval(pingRef.current);
      const ws = socketRef.current;
      socketRef.current = null;
      if (ws) ws.close();
      streamer.close();
    };
  }, []);

  useEffect(() => {
    if (callState !== 'CONNECTED') return;
    const timer = setInterval(() => setDuration((secs) => secs + 1), 1000);
    return () => clearInterval(timer);
  }, [callState]);

  const endCall = (nextState = 'IDLE') => {
    clearInterval(pingRef.current);
    // Clear the ref first so the socket's own close handler does not overwrite `nextState`
    const ws = socketRef.current;
    socketRef.current = null;
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      ws.close();
    }
    streamerRef.current.stopRecording();
    streamerRef.current.stopPlayback();
    setCallState(nextState);
    setIsMuted(false);
    setCaption(null);
  };

  const failCall = (message) => {
    setErrorMsg(message);
    endCall('ERROR');
  };

  const startCall = async () => {
    setErrorMsg('');
    setDuration(0);
    setCallState('CONNECTING');
    const streamer = streamerRef.current;
    streamer.setMute(false);

    try {
      await streamer.init();

      const ws = new WebSocket(LIVE_WS_URL);
      socketRef.current = ws;

      ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'setup', personaId: WEB_PERSONA }));

        streamer.startRecording((base64Data) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'audio', data: base64Data }));
          }
        }).catch(() => {
          if (socketRef.current === ws) failCall('Microphone access was blocked. Allow the microphone and try again.');
        });

        streamer.startPlayback();

        pingRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping', id: Date.now() }));
          }
        }, 10000);
      };

      ws.onmessage = (event) => {
        if (socketRef.current !== ws) return;
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'status') {
            if (message.message === 'connected') setCallState('CONNECTED');
            else if (message.message === 'disconnected') endCall();
          } else if (message.type === 'audio') {
            setCallState('CONNECTED');
            streamer.playChunk(message.data);
          } else if (message.type === 'output-transcription') {
            setCaption({ who: 'agent', text: message.text });
          } else if (message.type === 'input-transcription') {
            setCaption({ who: 'user', text: message.text });
          } else if (message.type === 'interrupted') {
            streamer.clearPlayback();
          } else if (message.type === 'error') {
            failCall(message.message || 'The agent ended the call unexpectedly.');
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onerror = () => {
        if (socketRef.current === ws) failCall('Could not connect to the agent. The server may be starting up, so try again in a few seconds.');
      };

      ws.onclose = () => {
        if (socketRef.current === ws) endCall();
      };
    } catch (err) {
      console.error('Call startup failed:', err);
      failCall('Could not start audio in this browser. Please try again.');
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    streamerRef.current.setMute(nextMute);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 flex flex-col">
      <CardHeader icon={Globe} tag="Option 2 · Browser" title="Talk from this page">
        No phone needed. Allow your microphone and speak with the agent directly from the website.
      </CardHeader>

      <div className="flex-1 flex flex-col items-center justify-center text-center bg-brand-bg-light border border-brand-border rounded-2xl p-6 min-h-[300px]">
        {callState === 'IDLE' && (
          <>
            <button
              type="button"
              onClick={startCall}
              aria-label="Start talking to the agent"
              className="relative w-24 h-24 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark flex items-center justify-center border-none cursor-pointer shadow-lg shadow-brand-yellow/20 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 rounded-full border border-brand-yellow animate-ping" style={{ animationDuration: '2.5s' }} />
              <Mic size={32} />
            </button>
            <div className="font-heading font-bold text-brand-dark text-base mt-5">Start Talking</div>
            <p className="text-xs text-brand-text-muted leading-relaxed mt-1.5 mb-0 max-w-[260px]">
              Tap the mic, then tell the agent about your business. It replies in English or Hindi.
            </p>
          </>
        )}

        {callState === 'CONNECTING' && (
          <div className="animate-fadeIn" aria-live="polite">
            <div className="relative w-24 h-24 mx-auto rounded-full border-2 border-brand-border border-t-brand-yellow animate-spin" />
            <div className="font-heading font-bold text-brand-dark text-base mt-5">Connecting to the agent...</div>
            <p className="text-xs text-brand-text-muted mt-1.5 mb-0">Allow microphone access if your browser asks.</p>
          </div>
        )}

        {callState === 'CONNECTED' && (
          <div className="w-full animate-fadeIn">
            <div className="flex items-center justify-center gap-1 h-16">
              {[1, 2, 4, 2, 1, 4, 2, 1, 2].map((wave, idx) => (
                <div
                  key={idx}
                  className={`voice-wave-bar rounded-full ${isMuted ? 'bg-brand-border h-1' : `bg-brand-dark anim-wave-active-${wave}`}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                />
              ))}
            </div>

            <div className="min-h-[76px] flex items-center justify-center mt-3" aria-live="polite">
              {caption ? (
                <div className="w-full bg-white border border-brand-border rounded-xl px-4 py-3">
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${caption.who === 'agent' ? 'text-[#C9971A]' : 'text-blue-500'}`}>
                    {caption.who === 'agent' ? 'Agent' : 'You'}
                  </div>
                  <p className="text-sm text-brand-dark leading-relaxed m-0 break-words">{caption.text}</p>
                </div>
              ) : (
                <p className="text-xs text-brand-text-muted m-0">{isMuted ? 'You are muted' : 'Listening. Say hello to begin.'}</p>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={toggleMute}
                aria-pressed={isMuted}
                className={`inline-flex items-center gap-1.5 font-semibold text-xs py-2.5 px-4 rounded-full border transition-all cursor-pointer ${
                  isMuted ? 'bg-red-50 border-red-100 text-red-600' : 'bg-white border-brand-border text-brand-dark hover:bg-brand-bg-light'
                }`}
              >
                {isMuted ? <MicOff size={14} /> : <Mic size={14} />} {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <span className="text-xs font-mono text-brand-text-muted tabular-nums">{formatTime(duration)}</span>
              <button
                type="button"
                onClick={() => endCall()}
                className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-2.5 px-4 rounded-full border-none transition-all cursor-pointer"
              >
                <PhoneOff size={14} /> End Call
              </button>
            </div>
          </div>
        )}

        {callState === 'ERROR' && (
          <div className="animate-fadeIn" role="alert">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <AlertCircle size={26} />
            </div>
            <p className="text-sm text-brand-dark leading-relaxed mt-4 mb-4 max-w-[280px]">{errorMsg}</p>
            <button
              type="button"
              onClick={startCall}
              className="inline-flex items-center gap-1.5 bg-brand-dark hover:bg-brand-dark-hover text-white font-bold text-xs py-2.5 px-5 rounded-full border-none transition-all cursor-pointer"
            >
              <RotateCw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] text-brand-text-muted mt-4 mb-0 text-center">Works best with headphones in a quiet room.</p>
    </div>
  );
}

export default function QualificationLiveDemo() {
  return (
    <section id="try-live" className="relative z-10 py-20 md:py-24 bg-brand-dark px-6 scroll-mt-16 overflow-hidden">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-140 h-80 rounded-full bg-brand-yellow/15 blur-[110px] pointer-events-none" />

      <div className="max-w-[1140px] mx-auto relative">
        <div className="text-center max-w-[700px] mx-auto mb-12">
          <span className="text-xs font-bold uppercase text-brand-yellow tracking-wider">Try It Live</span>
          <h2 className="text-3xl md:text-[2.6rem] font-heading font-bold text-white leading-tight mt-2 text-balance">
            Now talk to the agent yourself
          </h2>
          <p className="text-white/60 text-sm md:text-base mt-4 leading-relaxed">
            Fill the form and the agent calls your phone, exactly like it would call your customer. Or skip the phone and talk to it right here in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <PhoneCallCard />
          <WebCallCard />
        </div>

        <p className="flex items-center justify-center gap-2 text-xs text-white/40 mt-8 mb-0">
          <ArrowRight size={12} /> This is our own agent. For your business it asks your questions, in your brand's name.
        </p>
      </div>
    </section>
  );
}
