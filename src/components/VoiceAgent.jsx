import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Radio } from 'lucide-react';

const DIALOG_EN = [
  { time: 1.5, sender: 'user', text: "Hi, how fast can you build a custom document automation agent?" },
  { time: 4.5, sender: 'agent', text: "We typically ship custom workflow agents, like document automation pipelines, in 3 to 4 weeks. For instance, for IBS Brokers, we automated their entire data entry queue in 28 days." },
  { time: 12.0, sender: 'user', text: "That's fast. What tech stack do you use for agentic pipelines?" },
  { time: 15.0, sender: 'agent', text: "We build backends using Python, FastAPI, and LangGraph for multi-agent workflows, and integrate them with databases like PostgreSQL and tools like Airtable or Slack." },
  { time: 23.5, sender: 'user', text: "Awesome. How do I get started with a project scoping call?" },
  { time: 26.0, sender: 'agent', text: "You can request a scoping blueprint by filling out the form right below this section, or I can schedule a callback for you if you leave your email!" }
];

const DIALOG_HI = [
  { time: 1.5, sender: 'user', text: "नमस्ते, आप हमारे लिए दस्तावेज़ स्वचालन एजेंट को कितनी तेज़ी से तैयार कर सकते हैं?" },
  { time: 4.5, sender: 'agent', text: "नमस्ते! हम सामान्य तौर पर दस्तावेज़ स्वचालन पाइपलाइन जैसे कस्टम एजेंट 3 से 4 हफ़्तों में बना लेते हैं। उदाहरण के लिए, हमने IBS Brokers के पूरे काम को केवल 28 दिनों में स्वचालित कर दिया था।" },
  { time: 12.0, sender: 'user', text: "यह तो वाकई बहुत तेज़ है। आप इसके लिए किस तकनीकी स्टैक का उपयोग करते हैं?" },
  { time: 15.0, sender: 'agent', text: "हम बैकएंड के लिए Python, FastAPI और LangGraph का उपयोग करते हैं, और इसे PostgreSQL डेटाबेस तथा Airtable या Slack जैसे टूल्स के साथ सुरक्षित रूप से जोड़ते हैं।" },
  { time: 23.5, sender: 'user', text: "बहुत बढ़िया। मैं प्रोजेक्ट स्कोपिंग कॉल कैसे शुरू करूँ?" },
  { time: 26.0, sender: 'agent', text: "आप इस सेक्शन के ठीक नीचे दिए गए फॉर्म को भरकर स्कोपिंग कॉल का अनुरोध कर सकते हैं, या फिर अपना ईमेल छोड़ दें तो मैं आपके लिए कॉल शेड्यूल कर दूँगी!" }
];

export default function VoiceAgent() {
  const [callState, setCallState] = useState('IDLE'); // IDLE, CONNECTING, CONNECTED
  const [language, setLanguage] = useState('en'); // en, hi
  const [isMuted, setIsMuted] = useState(false);
  const [activeSpeech, setActiveSpeech] = useState('none'); // none, user, agent
  const [activeText, setActiveText] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [statusLog, setStatusLog] = useState('Ready to connect');

  // Select dialogue dataset
  const activeDialog = language === 'en' ? DIALOG_EN : DIALOG_HI;

  // Handle call timer
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

  // Dialogue simulation logic based on call duration
  useEffect(() => {
    if (callState !== 'CONNECTED') return;

    const logInterval = setInterval(() => {
      const timeElapsed = callDuration;
      
      // Find the current active dialog line
      const activeLine = activeDialog.find(line => 
        timeElapsed >= line.time && timeElapsed < (line.time + 3.5)
      );

      if (activeLine) {
        setActiveSpeech(activeLine.sender);
        setActiveText(activeLine.text);
        setStatusLog(
          activeLine.sender === 'agent' 
            ? (language === 'en' ? 'Agent is speaking...' : 'एजेंट बोल रहा है...') 
            : (language === 'en' ? 'Listening...' : 'सुन रहा हूँ...')
        );
      } else {
        setActiveSpeech('none');
        setActiveText('');
        setStatusLog(
          language === 'en' 
            ? 'Listening... Ask a question about Synapse.' 
            : 'सुन रहा हूँ... साइनेप्स के बारे में कुछ भी पूछें।'
        );
      }
    }, 200);

    return () => clearInterval(logInterval);
  }, [callState, callDuration, activeDialog, language]);

  const startCall = () => {
    setCallState('CONNECTING');
    setStatusLog(language === 'en' ? 'Connecting to Synapse network...' : 'साइनेप्स नेटवर्क से जुड़ रहा है...');
    
    setTimeout(() => {
      setCallState('CONNECTED');
      setStatusLog(language === 'en' ? 'Connected' : 'कनेक्टेड');
    }, 1500);
  };

  const endCall = () => {
    setCallState('IDLE');
    setIsMuted(false);
    setActiveSpeech('none');
    setActiveText('');
    setStatusLog(language === 'en' ? 'Ready to connect' : 'कनेक्ट करने के लिए तैयार');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (language === 'en') {
      setStatusLog(isMuted ? 'Connected' : 'Muted');
    } else {
      setStatusLog(isMuted ? 'कनेक्टेड' : 'म्यूट किया गया');
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section className="py-24 bg-white border-t border-brand-border relative overflow-hidden text-brand-text-main" id="voice-agent">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F6C744]/8 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Background Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-0 opacity-25 h-[80px]">
        <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className="relative block h-full" style={{ width: '200%' }}>
          <defs>
            <style>{`
              @keyframes wave-slide-left {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @keyframes wave-slide-right {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .wave-group-1 {
                animation: wave-slide-left 25s linear infinite;
              }
              .wave-group-2 {
                animation: wave-slide-right 35s linear infinite;
              }
            `}</style>
          </defs>
          <g className="wave-group-1">
            <path
              d="M 0 60 C 360 20, 360 100, 720 60 C 1080 20, 1080 100, 1440 60 C 1800 20, 1800 100, 2160 60 C 2520 20, 2520 100, 2880 60 L 2880 120 L 0 120 Z"
              fill="var(--color-brand-yellow)"
              opacity="0.1"
            />
          </g>
          <g className="wave-group-2">
            <path
              d="M 0 80 C 360 110, 360 50, 720 80 C 1080 110, 1080 50, 1440 80 C 1800 110, 1800 50, 2160 80 C 2520 110, 2520 50, 2880 80 L 2880 120 L 0 120 Z"
              fill="var(--color-brand-yellow)"
              opacity="0.06"
            />
          </g>
        </svg>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-6 flex flex-col items-center justify-center text-center gap-7 relative z-10">
        
        {/* Text Header */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-brand-dark leading-tight tracking-tight">
            Talk to our support agent.
          </h2>
          <p className="text-brand-text-muted text-sm md:text-base leading-relaxed max-w-md">
            Select your preferred language, click below, and start speaking.
          </p>
        </div>

        {/* Language Selector Pills */}
        <div className="flex bg-black/5 border border-black/5 p-1 rounded-xl backdrop-blur-md relative z-30">
          <button
            onClick={() => { console.log('Language changed to: EN'); setLanguage('en'); }}
            disabled={callState !== 'IDLE'}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 relative z-30 hover:bg-black/5 active:scale-95 ${
              language === 'en'
                ? 'bg-brand-yellow text-brand-dark shadow-md'
                : 'text-brand-text-muted hover:text-brand-dark disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            English
          </button>
          <button
            onClick={() => { console.log('Language changed to: HI'); setLanguage('hi'); }}
            disabled={callState !== 'IDLE'}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 relative z-30 hover:bg-black/5 active:scale-95 ${
              language === 'hi'
                ? 'bg-brand-yellow text-brand-dark shadow-md'
                : 'text-brand-text-muted hover:text-brand-dark disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            हिंदी (Hindi)
          </button>
        </div>

        {/* Voice Core Circle */}
        <div className="flex flex-col items-center justify-center mt-1">
          <div className="relative w-60 h-60 rounded-full flex items-center justify-center bg-white border border-brand-border backdrop-blur-md shadow-card-hover">
            
            {/* Concentric pulsing rings (Idle state) */}
            {callState === 'IDLE' && (
              <>
                <div className="absolute inset-0 rounded-full border border-brand-yellow/20 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-4 rounded-full border border-brand-yellow/30 animate-pulse" />
              </>
            )}

            {/* Glowing animated visualizer rings (Connected state) */}
            {callState === 'CONNECTED' && !isMuted && (
              <>
                <div className={`absolute inset-0 rounded-full border border-brand-yellow/45 transition-all duration-300 ${activeSpeech === 'agent' ? 'scale-105 opacity-60' : 'scale-100 opacity-20'}`} />
                <div className={`absolute -inset-4 rounded-full border border-brand-yellow/20 transition-all duration-500 ${activeSpeech === 'agent' ? 'scale-110 opacity-40' : 'scale-100 opacity-0'}`} />
                
                {/* Voice Visualizer Waves */}
                <div className="absolute inset-8 rounded-full bg-brand-yellow/8 border border-brand-yellow/25 flex items-center justify-center gap-1.5 overflow-hidden">
                  <span className={`voice-wave-bar h-8 bg-brand-yellow/60 rounded ${activeSpeech === 'agent' ? 'anim-wave-active-1' : activeSpeech === 'user' ? 'anim-wave-slow' : 'h-1'}`} />
                  <span className={`voice-wave-bar h-16 bg-brand-yellow/80 rounded ${activeSpeech === 'agent' ? 'anim-wave-active-2' : activeSpeech === 'user' ? 'anim-wave-slow' : 'h-1'}`} />
                  <span className={`voice-wave-bar h-12 bg-brand-yellow rounded ${activeSpeech === 'agent' ? 'anim-wave-active-3' : activeSpeech === 'user' ? 'anim-wave-slow' : 'h-1'}`} />
                  <span className={`voice-wave-bar h-20 bg-brand-yellow/80 rounded ${activeSpeech === 'agent' ? 'anim-wave-active-4' : activeSpeech === 'user' ? 'anim-wave-slow' : 'h-1'}`} />
                  <span className={`voice-wave-bar h-10 bg-brand-yellow/60 rounded ${activeSpeech === 'agent' ? 'anim-wave-active-2' : activeSpeech === 'user' ? 'anim-wave-slow' : 'h-1'}`} />
                </div>
              </>
            )}

            {/* Connecting Spinner */}
            {callState === 'CONNECTING' && (
              <div className="absolute inset-0 rounded-full border-4 border-black/5 border-t-brand-yellow animate-spin" />
            )}

            {/* Central Trigger Button */}
            <button
              onClick={callState === 'IDLE' ? startCall : endCall}
              className={`relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center border transition-all duration-300 cursor-pointer shadow-lg active:scale-95 group ${
                callState === 'CONNECTED'
                  ? 'bg-red-500 border-red-400 text-white hover:bg-red-600'
                  : 'bg-brand-yellow border-brand-yellow-hover text-brand-dark hover:bg-brand-yellow-hover hover:scale-105'
              }`}
            >
              {callState === 'CONNECTED' ? (
                <>
                  <PhoneOff className="w-6 h-6" />
                  <span className="text-[9px] mt-1 font-semibold tracking-wider uppercase">
                    {language === 'en' ? 'End' : 'समाप्त'}
                  </span>
                </>
              ) : callState === 'CONNECTING' ? (
                <span className="text-[9px] font-bold tracking-widest text-brand-dark uppercase animate-pulse">
                  {language === 'en' ? 'Linking' : 'कनेक्टिंग'}
                </span>
              ) : (
                <>
                  <Phone className="w-6 h-6" />
                  <span className="text-[9px] mt-1 font-semibold tracking-wider uppercase">
                    {language === 'en' ? 'Call' : 'कॉल करें'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Active Call Controls */}
          {callState === 'CONNECTED' && (
            <div className="flex items-center gap-4 mt-6 bg-black/5 px-4 py-2 rounded-full border border-black/5 backdrop-blur-md shadow-card">
              <button
                onClick={toggleMute}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isMuted ? 'bg-red-500/20 text-red-500 border border-red-500/25' : 'bg-black/5 text-brand-text-main/80 hover:text-brand-dark hover:bg-black/10'
                }`}
                title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
              >
                {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>
              <div className="w-px h-4 bg-black/15" />
              <div className="text-[11px] font-mono text-brand-text-muted tracking-wider">
                {formatTime(callDuration)}
              </div>
              <div className="w-px h-4 bg-black/15" />
              <div className="text-[11px] text-brand-text-main font-medium flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-brand-yellow" />
                {language === 'en' ? 'Active' : 'सक्रिय'}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Status / Subtitles Caption overlay */}
        <div className="w-full max-w-lg min-h-[90px] flex flex-col justify-center items-center">
          {callState === 'CONNECTING' ? (
            <div className="text-xs text-brand-text-muted italic flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              {statusLog}
            </div>
          ) : callState === 'CONNECTED' ? (
            activeText ? (
              <div className="w-full bg-white border border-brand-border rounded-xl p-4 shadow-card animate-fadeIn text-center">
                <div className="text-[9px] font-mono uppercase text-[#B45309] tracking-wider mb-1">
                  {activeSpeech === 'user' ? (language === 'en' ? 'You' : 'आप') : (language === 'en' ? 'AI Support Agent' : 'एआई सपोर्ट एजेंट')}
                </div>
                <p className="text-xs md:text-sm text-brand-text-main leading-normal font-medium max-w-md mx-auto">
                  "{activeText}"
                </p>
              </div>
            ) : (
              <div className="text-xs text-brand-text-muted italic flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                {language === 'en' ? 'Listening... Speak now.' : 'सुन रहा हूँ... अब बोलें।'}
              </div>
            )
          ) : null}
        </div>

      </div>
    </section>
  );
}
