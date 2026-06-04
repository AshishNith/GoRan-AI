import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff, X, Sparkles, AlertCircle, RotateCw } from 'lucide-react';
import { AudioStreamer } from '../utils/audioStreamer';

const SYSTEM_INSTRUCTION = `You are GoRan AI's voice assistant, custom built for GoRan AI Agency. Guide users on GoRan AI's services: AI Audits (discovery & roadmap), custom Product Development (engineering and custom builds), Product Management, and AI Training. Encourage callers to book a free 30-minute scoping call (which they can request on the website). Mention key case studies: Anaaj AI (multilingual agriculture assistant), HerbsEra (92% support automation + live voice agent), Hadoti Farms (headless D2C store), Codewave (premium website), GreenWrench, and A Robotics Services. Keep replies conversational, concise (under 2-3 sentences), warm, and helpful. Do not read out long lists of bullet points unless asked. Encourage booking a call.`;

export default function VoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [callState, setCallState] = useState('IDLE'); // IDLE, CONNECTING, CONNECTED, ERROR
  const [isMuted, setIsMuted] = useState(false);
  
  const [userTranscript, setUserTranscript] = useState('');
  const [agentTranscript, setAgentTranscript] = useState('');
  const [activeSpeech, setActiveSpeech] = useState('none'); // user, agent, none
  
  const [callDuration, setCallDuration] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [micVolume, setMicVolume] = useState(0);
  const [playVolume, setPlayVolume] = useState(0);

  const socketRef = useRef(null);
  const streamerRef = useRef(null);
  const timerRef = useRef(null);
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
      clearInterval(timerRef.current);
      clearTimeout(activeSpeechTimeoutRef.current);
    };
  }, []);

  // Update Call Duration Timer
  useEffect(() => {
    if (callState === 'CONNECTED') {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setCallDuration(0);
    }
  }, [callState]);

  // Clean up transcripts and states when call ends
  useEffect(() => {
    if (callState !== 'CONNECTED' && callState !== 'CONNECTING') {
      setUserTranscript('');
      setAgentTranscript('');
      setActiveSpeech('none');
      setMicVolume(0);
      setPlayVolume(0);
    }
  }, [callState]);

  const startCall = async () => {
    setErrorMsg('');
    setCallState('CONNECTING');
    setIsMuted(false);

    try {
      // 1. Initialize Microphone and Playback Audio Streamer
      await streamerRef.current.init();

      // 2. Open WebSocket connection to the backend
      const wsUrl = "wss://goran-calling-agent.onrender.com/api/live";
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        // Send initial setup payload pointing to Riya's DB persona
        ws.send(JSON.stringify({
          type: "setup",
          personaId: "riya-inbound"
        }));

        // Start capturing and streaming microphone audio
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
            setMicVolume(volume);
            if (volume > 5) {
              setActiveSpeech('user');
              resetActiveSpeechTimeout();
            }
          }
        );

        // Start playback context
        streamerRef.current.startPlayback((volume) => {
          setPlayVolume(volume);
          if (volume > 5) {
            setActiveSpeech('agent');
            resetActiveSpeechTimeout();
          }
        });

        // Set up Web Socket keep-alive pings (every 10s)
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping", id: Date.now() }));
          }
        }, 10000);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          if (message.type === 'status') {
            if (message.message === 'connected') {
              setCallState('CONNECTED');
            } else if (message.message === 'disconnected') {
              endCall();
            }
          } else if (message.type === 'audio') {
            streamerRef.current.playChunk(message.data);
          } else if (message.type === 'output-transcription') {
            setAgentTranscript(message.text);
            setActiveSpeech('agent');
            resetActiveSpeechTimeout();
          } else if (message.type === 'input-transcription') {
            setUserTranscript(message.text);
            setActiveSpeech('user');
            resetActiveSpeechTimeout();
          } else if (message.type === 'interrupted') {
            // Instantly stop playing audio on user interrupt
            streamerRef.current.clearPlayback();
            setPlayVolume(0);
            setActiveSpeech('none');
          } else if (message.type === 'error') {
            setErrorMsg(message.message);
            setCallState('ERROR');
          }
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setErrorMsg("Failed to establish call connection. Server may be starting up.");
        setCallState('ERROR');
        endCall();
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
        endCall();
      };

    } catch (err) {
      console.error("Call startup failed:", err);
      setErrorMsg(err.message || "Microphone access denied or audio issue.");
      setCallState('ERROR');
    }
  };

  const endCall = () => {
    clearInterval(pingIntervalRef.current);
    
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
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (streamerRef.current) {
      streamerRef.current.setMute(nextMute);
    }
  };

  const resetActiveSpeechTimeout = () => {
    clearTimeout(activeSpeechTimeoutRef.current);
    activeSpeechTimeoutRef.current = setTimeout(() => {
      setActiveSpeech('none');
      setMicVolume(0);
      setPlayVolume(0);
    }, 3000); // 3 seconds of silence clears speech visual state
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Generate responsive bars based on live speech levels
  const getVisualizerHeights = () => {
    const active = activeSpeech !== 'none';
    const vol = activeSpeech === 'agent' ? playVolume : micVolume;
    return Array.from({ length: 6 }).map((_, i) => {
      if (!active) return 4;
      const base = 4;
      const factor = Math.max(1, vol / 8);
      const height = Math.max(4, Math.min(36, Math.round(base + factor * (0.4 + Math.random() * 0.8))));
      return height;
    });
  };

  const visualizerHeights = getVisualizerHeights();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-body select-none">
      
      {/* ── Cute Floating Voice Button (IDLE state) ── */}
      {callState === 'IDLE' && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-brand-dark hover:bg-brand-dark-hover text-brand-yellow rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 group relative"
          style={{ bottom: '80px', position: 'absolute', right: '0' }}
          aria-label="Call GoRan AI Voice Agent"
        >
          {/* Pulsing Outer Glow */}
          <span className="absolute inset-0 rounded-full bg-brand-yellow animate-ping opacity-15 pointer-events-none" />
          
          <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>
      )}

      {/* ── Call Widget Window (Opened) ── */}
      {isOpen && (
        <div className="w-[340px] sm:w-[360px] bg-brand-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out transform translate-y-0 opacity-100 origin-bottom-right">
          
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center border border-brand-yellow/20">
                <Sparkles className="w-4 h-4 text-brand-yellow" />
                {callState === 'CONNECTED' && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-brand-dark animate-pulse" />
                )}
              </div>
              <div className="text-left">
                <h4 className="font-heading text-sm font-bold text-white tracking-wide">GoRan Voice Agent</h4>
                <p className="text-[10px] text-white/50 leading-none">
                  {callState === 'IDLE' ? 'Ready to Call' : callState === 'CONNECTING' ? 'Connecting...' : 'Active Call'}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (callState !== 'IDLE') endCall();
                setIsOpen(false);
              }}
              className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Call Body */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center min-h-[220px] bg-linear-to-b from-brand-dark via-brand-dark to-black/40">
            
            {/* Visualizer Orb */}
            <div className="relative w-36 h-36 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02] shadow-inner mb-6">
              
              {/* Outer rings during active states */}
              {callState === 'CONNECTED' && activeSpeech !== 'none' && (
                <div 
                  className={`absolute inset-0 rounded-full border border-brand-yellow/20 animate-ping`}
                  style={{ animationDuration: '2s' }}
                />
              )}
              {callState === 'CONNECTING' && (
                <div className="absolute inset-0 rounded-full border-2 border-white/5 border-t-brand-yellow animate-spin" />
              )}

              {/* Volume Visualizer Bars */}
              {callState === 'CONNECTED' && !isMuted ? (
                <div className="flex items-center justify-center gap-1 h-10">
                  {visualizerHeights.map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full transition-all duration-100"
                      style={{
                        height: `${h}px`,
                        background: activeSpeech === 'agent' ? '#F6C744' : activeSpeech === 'user' ? '#a855f7' : '#ffffff',
                        opacity: activeSpeech !== 'none' ? 0.9 : 0.2
                      }}
                    />
                  ))}
                </div>
              ) : callState === 'CONNECTED' && isMuted ? (
                <div className="flex items-center gap-1.5 text-red-400 text-xs font-semibold uppercase tracking-wider">
                  <MicOff className="w-3.5 h-3.5" />
                  Muted
                </div>
              ) : callState === 'CONNECTING' ? (
                <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest animate-pulse">
                  Linking
                </span>
              ) : (
                <button
                  onClick={startCall}
                  className="w-16 h-16 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-yellow/10"
                >
                  <Phone className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Transcripts Display */}
            {callState === 'CONNECTED' && (
              <div className="w-full min-h-[64px] flex flex-col items-center justify-center text-center px-2">
                {activeSpeech === 'agent' && agentTranscript && (
                  <div className="text-white/95 text-xs bg-white/5 border border-white/10 px-3 py-2 rounded-xl max-w-full leading-relaxed animate-fadeIn">
                    <span className="text-[9px] font-bold uppercase text-brand-yellow block mb-0.5 tracking-wider">
                      Agent
                    </span>
                    "{agentTranscript}"
                  </div>
                )}
                {activeSpeech === 'user' && userTranscript && (
                  <div className="text-white/90 text-xs bg-purple-500/10 border border-purple-500/20 px-3 py-2 rounded-xl max-w-full leading-relaxed animate-fadeIn">
                    <span className="text-[9px] font-bold uppercase text-purple-400 block mb-0.5 tracking-wider">
                      You
                    </span>
                    "{userTranscript}"
                  </div>
                )}
                {activeSpeech === 'none' && (
                  <span className="text-[10px] text-white/40 italic">
                    Listening... Speak to the agent.
                  </span>
                )}
              </div>
            )}

            {/* Error display */}
            {callState === 'ERROR' && (
              <div className="w-full text-center px-4 flex flex-col items-center gap-2">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <p className="text-xs text-red-300 leading-normal">{errorMsg || "Connection Error"}</p>
                <button
                  onClick={startCall}
                  className="mt-2 text-xs font-semibold text-brand-yellow flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Retry Connection
                </button>
              </div>
            )}

            {/* Idle Text */}
            {callState === 'IDLE' && (
              <div className="text-center px-4">
                <p className="text-xs text-white/70 leading-normal">
                  Connect real-time to speak with our AI agent about GoRan AI's services & case studies.
                </p>
              </div>
            )}

          </div>

          {/* Control Bar Footer */}
          {callState !== 'IDLE' && callState !== 'ERROR' && (
            <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
              
              {/* Call Duration */}
              <span className="text-xs font-mono text-white/50 tabular-nums">
                {formatTime(callDuration)}
              </span>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className={`p-2 rounded-full cursor-pointer transition-all ${
                    isMuted
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={endCall}
                  className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full cursor-pointer transition-all active:scale-95 shadow-md shadow-red-500/10"
                  title="End Call"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
