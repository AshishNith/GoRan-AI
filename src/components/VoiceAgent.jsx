import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { AudioStreamer } from '../utils/audioStreamer';

const SYSTEM_INSTRUCTION = `You are GoRan AI's voice assistant, custom built for GoRan AI Agency. Guide users on GoRan AI's services: AI Audits (discovery & roadmap), custom Product Development (engineering and custom builds), Product Management, and AI Training. Encourage callers to book a free 30-minute scoping call (which they can request on the website). Mention key case studies: Anaaj AI, HerbsEra (92% support automation + live voice agent), Hadoti Farms, Codewave, GreenWrench, and A Robotics Services. Keep replies conversational, concise (under 2-3 sentences), warm, and helpful. Do not read out long lists of bullet points unless asked. Encourage booking a call.`;

function OrbitingDot({ index, total, radius, size, color, duration, delay }) {
  const angle = (index / total) * 360;
  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        animation: `orbit-spin ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: color,
          boxShadow: `0 0 6px ${color}`,
          transform: `translate(${Math.cos(angle * Math.PI / 180) * radius}px, ${Math.sin(angle * Math.PI / 180) * radius}px)`,
        }}
      />
    </div>
  );
}

export default function VoiceAgent() {
  const [callState, setCallState] = useState('IDLE'); // IDLE, CONNECTING, CONNECTED
  const [isMuted, setIsMuted] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState('none'); // user, agent, none
  const [activeText, setActiveText] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [statusLog, setStatusLog] = useState('Ready to connect');
  const [pulsePhase, setPulsePhase] = useState(0);
  const [barHeights, setBarHeights] = useState([4, 4, 4, 4, 4, 4, 4, 4]);
  const captionRef = useRef(null);

  const socketRef = useRef(null);
  const streamerRef = useRef(null);
  const pingIntervalRef = useRef(null);
  const activeSpeechTimeoutRef = useRef(null);

  // Initialize AudioStreamer
  useEffect(() => {
    streamerRef.current = new AudioStreamer();
    return () => {
      if (streamerRef.current) {
        streamerRef.current.close();
      }
      clearInterval(pingIntervalRef.current);
      clearTimeout(activeSpeechTimeoutRef.current);
    };
  }, []);

  // Update Call Duration Timer
  useEffect(() => {
    let timer;
    if (callState === 'CONNECTED') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
      setActiveText('');
    }
    return () => clearInterval(timer);
  }, [callState]);

  // Continuous pulse phase for idle ring
  useEffect(() => {
    if (callState !== 'IDLE') return;
    const interval = setInterval(() => {
      setPulsePhase(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [callState]);

  const startCall = async () => {
    setCallState('CONNECTING');
    setStatusLog('Initializing microphone...');
    setIsMuted(false);

    try {
      await streamerRef.current.init();

      setStatusLog('Connecting to live voice network...');

      const wsUrl = "wss://goran-calling-agent.onrender.com/api/live";
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setCallState('CONNECTED');
        setStatusLog('Connected');

        ws.send(JSON.stringify({
          type: "setup",
          voice: "Aoede",
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7
        }));

        streamerRef.current.startRecording(
          (base64Data) => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: "audio",
                data: base64Data
              }));
            }
          },
          (volume) => {
            if (volume > 5) {
              setActiveSpeech('user');
              resetActiveSpeechTimeout();
              // Drive visualizer bars dynamically
              setBarHeights(Array.from({ length: 8 }, () => Math.max(4, Math.round(4 + (volume / 6) * (0.6 + Math.random() * 0.8)))));
            } else {
              setBarHeights(prev => prev.map(h => Math.max(4, h - 2)));
            }
          }
        );

        streamerRef.current.startPlayback((volume) => {
          if (volume > 5) {
            setActiveSpeech('agent');
            resetActiveSpeechTimeout();
            // Drive visualizer bars dynamically
            setBarHeights(Array.from({ length: 8 }, () => Math.max(4, Math.round(4 + (volume / 6) * (0.6 + Math.random() * 0.8)))));
          } else {
            setBarHeights(prev => prev.map(h => Math.max(4, h - 2)));
          }
        });

        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping", id: Date.now() }));
          }
        }, 10000);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          if (message.type === 'audio') {
            streamerRef.current.playChunk(message.data);
          } else if (message.type === 'output-transcription') {
            setActiveText(message.text);
            setActiveSpeech('agent');
            resetActiveSpeechTimeout();
          } else if (message.type === 'input-transcription') {
            setActiveText(message.text);
            setActiveSpeech('user');
            resetActiveSpeechTimeout();
          } else if (message.type === 'interrupted') {
            streamerRef.current.clearPlayback();
            setActiveSpeech('none');
            setActiveText('');
            setBarHeights([4, 4, 4, 4, 4, 4, 4, 4]);
          } else if (message.type === 'error') {
            setStatusLog(message.message);
            endCall();
          }
        } catch (err) {
          console.error("Error parsing message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setStatusLog('Connection failed');
        endCall();
      };

      ws.onclose = () => {
        endCall();
      };

    } catch (err) {
      console.error("Microphone or live calling startup failed:", err);
      setStatusLog('Microphone error');
      endCall();
    }
  };

  const endCall = () => {
    clearInterval(pingIntervalRef.current);
    clearTimeout(activeSpeechTimeoutRef.current);

    if (socketRef.current) {
      if (socketRef.current.readyState === WebSocket.OPEN || socketRef.current.readyState === WebSocket.CONNECTING) {
        socketRef.current.close();
      }
      socketRef.current = null;
    }

    if (streamerRef.current) {
      streamerRef.current.stopRecording();
      streamerRef.current.stopPlayback();
    }

    setCallState('IDLE');
    setIsMuted(false);
    setActiveSpeech('none');
    setActiveText('');
    setStatusLog('Ready to connect');
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (streamerRef.current) {
      streamerRef.current.setMute(nextMute);
    }
    setStatusLog(nextMute ? 'Muted' : 'Connected');
  };

  const resetActiveSpeechTimeout = () => {
    clearTimeout(activeSpeechTimeoutRef.current);
    activeSpeechTimeoutRef.current = setTimeout(() => {
      setActiveSpeech('none');
    }, 3000);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const idlePulseScale = 1 + Math.sin(pulsePhase * 0.1) * 0.03;

  return (
    <section className="py-24 bg-white border-t border-brand-border relative overflow-hidden" id="voice-agent">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-brand-yellow/5 rounded-full blur-[160px]" />
        <div className="absolute top-[20%] right-[10%] w-75 h-75 bg-purple-500/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-62.5 h-62.5 bg-blue-500/3 rounded-full blur-[100px]" />

        {/* Animated wave lines */}
        <svg className="absolute bottom-0 left-0 w-full h-auto opacity-[0.06]" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ filter: 'blur(1px)' }}>
          <defs>
            <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F6C744" stopOpacity="0" />
              <stop offset="50%" stopColor="#F6C744" stopOpacity="1" />
              <stop offset="100%" stopColor="#F6C744" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g style={{ animation: 'wave-drift 12s ease-in-out infinite alternate' }}>
            <path d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z" fill="url(#wave-grad)" />
          </g>
          <g style={{ animation: 'wave-drift 18s ease-in-out infinite alternate-reverse' }}>
            <path d="M0,80 C240,100 480,40 720,80 C960,120 1200,60 1440,80 L1440,120 L0,120 Z" fill="url(#wave-grad)" opacity="0.5" />
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wave-drift {
          0% { transform: translateX(-3%) scaleX(1); }
          100% { transform: translateX(3%) scaleX(1.05); }
        }
      `}</style>

      <div className="w-full max-w-180 mx-auto px-6 relative z-10 flex flex-col items-center gap-8">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-text-muted">
              Customer Support 24 X 7
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-dark leading-tight">
            Speak with our AI agent
          </h2>
        </div>

        {/* Voice circle */}
        <div className="voice-agent-orbit relative flex items-center justify-center mt-2">
          {/* ── IDLE STATE ── */}
          {callState === 'IDLE' && (
            <>
              {/* Orbits */}
              <div className="absolute w-[320px] h-80" style={{ animation: 'orbit-spin 20s linear infinite' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-brand-yellow/30"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translateX(160px)`,
                      boxShadow: '0 0 4px rgba(246,199,68,0.3)',
                    }}
                  />
                ))}
              </div>
              <div className="absolute w-65 h-65" style={{ animation: 'orbit-spin 25s linear infinite reverse' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/20"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 90 + 45}deg) translateX(130px)`,
                    }}
                  />
                ))}
              </div>

              {/* Pulsing rings */}
              <div
                className="absolute w-70 h-70 rounded-full border border-brand-yellow/20 transition-all duration-300"
                style={{ transform: `scale(${idlePulseScale})` }}
              />
              <div className="absolute w-65 h-65 rounded-full border border-brand-yellow/10" />
              <div className="absolute w-75 h-75 rounded-full border border-brand-yellow/5 animate-ping" style={{ animationDuration: '4s' }} />
            </>
          )}

          {/* ── CONNECTING STATE ── */}
          {callState === 'CONNECTING' && (
            <>
              <div className="absolute w-75 h-75 rounded-full border-2 border-black/5 border-t-brand-yellow animate-spin" style={{ animationDuration: '0.8s' }} />
              <div className="absolute w-70 h-70 rounded-full border border-black/5 border-b-brand-yellow/50 animate-spin" style={{ animationDuration: '1.2s', animationDirection: 'reverse' }} />
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-65 h-65 rounded-full border border-brand-yellow/10"
                  style={{
                    animation: `ping 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
            </>
          )}

          {/* ── CONNECTED STATE ── */}
          {callState === 'CONNECTED' && !isMuted && (
            <>
              {/* Outer orbit rings */}
              <div className="absolute w-85 h-85" style={{ animation: 'orbit-spin 15s linear infinite' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateX(170px)`,
                      background: activeSpeech === 'agent' ? '#F6C744' : '#E5E7EB',
                      opacity: activeSpeech === 'agent' ? 0.6 : 0.2,
                      boxShadow: activeSpeech === 'agent' ? '0 0 6px rgba(246,199,68,0.4)' : 'none',
                    }}
                  />
                ))}
              </div>
              <div className="absolute w-75 h-75" style={{ animation: 'orbit-spin 22s linear infinite reverse' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.75 h-0.75 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translateX(150px)`,
                      background: activeSpeech === 'user' ? '#C084FC' : '#E5E7EB',
                      opacity: activeSpeech === 'user' ? 0.5 : 0.15,
                    }}
                  />
                ))}
              </div>

              {/* Expanding rings */}
              <div
                className="absolute w-70 h-70 rounded-full border transition-all duration-500"
                style={{
                  borderColor: activeSpeech === 'agent' ? 'rgba(246,199,68,0.3)' : 'rgba(246,199,68,0.08)',
                  transform: activeSpeech === 'agent' ? 'scale(1.08)' : 'scale(1)',
                }}
              />
              <div
                className="absolute w-[320px] h-80 rounded-full border transition-all duration-500"
                style={{
                  borderColor: activeSpeech === 'agent' ? 'rgba(246,199,68,0.15)' : 'rgba(246,199,68,0.04)',
                  transform: activeSpeech === 'agent' ? 'scale(1.06)' : 'scale(1)',
                }}
              />
              <div
                className="absolute w-90 h-90 rounded-full border transition-all duration-500"
                style={{
                  borderColor: activeSpeech === 'agent' ? 'rgba(246,199,68,0.08)' : 'rgba(246,199,68,0.02)',
                  transform: activeSpeech === 'agent' ? 'scale(1.04)' : 'scale(1)',
                }}
              />

              {/* Pulse wave */}
              {activeSpeech !== 'none' && (
                <div className="absolute w-65 h-65 rounded-full border border-brand-yellow/20 animate-ping" style={{ animationDuration: '1.5s' }} />
              )}
            </>
          )}

          {/* Muted state — dimmed */}
          {callState === 'CONNECTED' && isMuted && (
            <div className="absolute w-65 h-65 rounded-full border border-red-500/20" />
          )}

          {/* Main circle */}
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full flex items-center justify-center bg-white border border-brand-border shadow-lg">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-brand-yellow/3 to-transparent pointer-events-none" />

            {/* Visualizer ring — connected */}
            {callState === 'CONNECTED' && !isMuted && (
              <div className="absolute inset-5 rounded-full flex items-center justify-center gap-0.5">
                {barHeights.map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full transition-all duration-100"
                    style={{
                      height: `${h}px`,
                      background: activeSpeech === 'agent'
                        ? '#F6C744'
                        : activeSpeech === 'user'
                          ? '#C084FC'
                          : '#E5E7EB',
                      opacity: activeSpeech !== 'none' ? 0.8 : 0.2,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Muted overlay */}
            {callState === 'CONNECTED' && isMuted && (
              <div className="absolute inset-5 rounded-full flex items-center justify-center">
                <div className="flex items-center gap-1.5 text-red-400">
                  <MicOff size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Muted</span>
                </div>
              </div>
            )}

            {/* Central button */}
            <button
              onClick={callState === 'IDLE' ? startCall : endCall}
              className={`relative z-10 w-18 h-18 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 ${
                callState === 'CONNECTED'
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20'
                  : 'bg-brand-yellow text-brand-dark hover:bg-brand-yellow-hover shadow-lg shadow-brand-yellow/20 hover:scale-105'
              }`}
            >
              {callState === 'CONNECTED' ? (
                <>
                  <PhoneOff size={20} />
                  <span className="text-[8px] mt-0.5 font-bold uppercase tracking-wider">
                    End
                  </span>
                </>
              ) : callState === 'CONNECTING' ? (
                <span className="text-[9px] font-bold tracking-widest uppercase animate-pulse">
                  Linking
                </span>
              ) : (
                <>
                  <Phone size={20} />
                  <span className="text-[8px] mt-0.5 font-bold uppercase tracking-wider">
                    Call
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Call controls bar */}
        {callState === 'CONNECTED' && (
          <div className="flex items-center gap-4 bg-brand-bg-light border border-brand-border rounded-full px-5 py-2 shadow-sm">
            <button
              onClick={toggleMute}
              className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                isMuted
                  ? 'bg-red-500/15 text-red-500'
                  : 'text-brand-text-muted hover:text-brand-dark hover:bg-black/5'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
            </button>
            <div className="w-px h-4 bg-brand-border" />
            <span className="text-xs font-mono text-brand-text-muted tabular-nums tracking-wider min-w-9 text-center">
              {formatTime(callDuration)}
            </span>
            <div className="w-px h-4 bg-brand-border" />
            <div className="flex items-center gap-1.5 text-xs text-brand-text-muted">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
                <span className="relative rounded-full w-2 h-2 bg-green-500" />
              </span>
              Live
            </div>
          </div>
        )}

        {/* Status / Caption */}
        <div className="w-full min-h-22.5 flex flex-col items-center justify-center">
          {callState === 'CONNECTING' ? (
            <div className="flex items-center gap-3 text-xs text-brand-text-muted">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-brand-yellow animate-ping" />
                <span className="relative rounded-full w-2 h-2 bg-brand-yellow" />
              </span>
              {statusLog}
            </div>
          ) : callState === 'CONNECTED' ? (
            activeText ? (
              <div
                ref={captionRef}
                className="w-full max-w-135 bg-linear-to-br from-brand-bg-light to-white border border-brand-border rounded-xl px-5 py-4 text-center shadow-sm break-words"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: activeSpeech === 'agent' ? '#F6C744' : '#C084FC',
                      animation: 'ping 1s ease-in-out infinite',
                    }}
                  />
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: activeSpeech === 'agent' ? '#F6C744' : '#C084FC' }}
                  >
                    {activeSpeech === 'user' ? 'You' : 'AI Support Agent'}
                  </span>
                </div>
                <p className="text-sm text-brand-text-main leading-relaxed font-medium">
                  "{activeText}"
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-xs text-brand-text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  <span className="font-medium">Listening</span>
                </div>
                <span className="text-[10px] text-brand-text-muted/50">
                  Ask a question about GoRan AI...
                </span>
              </div>
            )
          ) : null}
        </div>

      </div>
    </section>
  );
}
