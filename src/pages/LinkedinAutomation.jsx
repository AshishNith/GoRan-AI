import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Copy, 
  Check, 
  FileJson, 
  Database, 
  Send, 
  Sparkles, 
  ExternalLink,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useCalBooking } from '../components/CalBookingModal';

const LinkedInIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 10.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function LinkedinAutomation() {
  const [copied, setCopied] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const { openCalBooking } = useCalBooking();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/Workflow/Linkedin%20Automation.json')
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.text();
      })
      .then(text => setJsonText(text))
      .catch(error => {
        console.error('Failed to load JSON workflow file:', error);
        setJsonText('{\n  "error": "Could not dynamically load workflow JSON. Please download the file directly."\n}');
      });
  }, []);

  const handleCopyJSON = async () => {
    if (!jsonText) return;
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying JSON:', error);
      alert('Could not copy automatically. Please click "Download Workflow JSON" to save the file.');
    }
  };

  return (
    <main className="w-full bg-white relative overflow-hidden min-h-screen">
      {/* Separate custom header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-border h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="w-full max-w-[1140px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center no-underline">
            <img src="/Logo.png" alt="GoRan AI Logo" className="h-5 w-auto block" />
          </Link>
          <button 
            onClick={openCalBooking}
            className="inline-flex items-center gap-1 bg-brand-dark text-white font-semibold text-xs py-2 px-4 rounded-full shadow-sm hover:bg-brand-dark-hover border-none cursor-pointer"
          >
            Book a Call
          </button>
        </div>
      </header>
      <SEOHead 
        title="LinkedIn Automation Setup Guide | GoRan AI"
        description="Step-by-step setup guide for the n8n + Google Gemini LinkedIn content agent. Download the workflow JSON and automate your content pipeline."
        canonicalPath="/linkedin-automation"
      />

      {/* Subtle grid background overlay */}
      <div className="grid-bg-overlay" />

      {/* Soft brand glow orbs */}
      <div className="absolute top-[5%] right-[-10%] w-140 h-140 rounded-full bg-brand-yellow/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[-15%] w-120 h-120 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1140px] mx-auto px-6 relative z-10 pt-32 pb-24">

        {/* ── SECTION 1: Here is the Workflow JSON (Centered Hero) ── */}
        <section className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-brand-dark leading-[1.05] tracking-tight mb-6 uppercase">
            Thanks for <br />
            <span className="text-brand-yellow">commenting!</span>
          </h1>

          <p className="text-brand-text-muted text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            Here is the LinkedIn Automation workflow JSON as promised. Copy the configuration or download the file directly to import it into your n8n workspace.
          </p>

          <div className="flex flex-wrap justify-center gap-3.5 w-full mb-12">
            <a 
              href="/Workflow/Linkedin Automation.json" 
              download="Linkedin Automation.json"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-dark hover:bg-brand-dark-hover font-semibold text-white transition-all shadow-md hover:shadow-lg text-xs"
            >
              <Download className="w-4 h-4" />
              Download JSON Workflow
            </a>
            <button 
              onClick={handleCopyJSON}
              disabled={!jsonText}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-brand-bg-light font-semibold text-brand-dark border border-brand-border transition-all shadow-sm hover:border-brand-dark/20 cursor-pointer text-xs disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500 animate-pulse" />
                  Copied Workflow!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-brand-text-muted" />
                  Copy JSON Code
                </>
              )}
            </button>
          </div>

          {/* macOS style editor container */}
          <div className="w-full max-w-2xl">
            <div className="border border-brand-border rounded-2xl bg-white shadow-card-hover overflow-hidden transition-all duration-300">
              {/* macOS Window Controls */}
              <div className="bg-brand-bg-light border-b border-brand-border px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-text-muted font-mono">
                  <FileJson className="w-3.5 h-3.5 text-brand-yellow" />
                  Linkedin Automation.json
                </div>
                <div className="w-12" /> {/* spacer balance */}
              </div>

              {/* Code Editor body */}
              <div className="relative bg-white">
                <pre className="p-6 overflow-auto text-xs text-brand-dark font-mono max-h-72 text-left leading-relaxed select-all">
                  {jsonText ? jsonText.split('\n').slice(0, 30).join('\n') + '\n  // ... rest of the workflow JSON configuration' : 'Loading workflow JSON configuration...'}
                </pre>
                {/* Fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: How to Setup: Step-by-Step Guide ── */}
        <section className="border-t border-brand-border pt-16">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark uppercase tracking-tight">
              How to setup
            </h2>
            <p className="text-brand-text-muted text-sm leading-relaxed mt-2">
              Get the autopilot content engine running in your environment with these sequential steps.
            </p>
          </div>

          {/* Timeline Steps Layout */}
          <div className="relative max-w-4xl pl-2 md:pl-6">
            {/* Connecting line */}
            <div className="absolute left-6 md:left-10 top-3 bottom-3 w-0.5 bg-brand-border pointer-events-none z-0" />

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative flex gap-6 md:gap-10 items-start z-10 group">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border-2 border-brand-yellow text-brand-dark font-black flex items-center justify-center shrink-0 text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
                  1
                </div>
                <div className="bg-white border border-brand-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-card-hover transition-all w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <FileJson className="w-5 h-5 text-brand-yellow" />
                    <h3 className="text-lg font-bold text-brand-dark">Import to n8n</h3>
                  </div>
                  <p className="text-sm text-brand-text-muted leading-relaxed">
                    Open your self-hosted or cloud n8n editor canvas. Click anywhere on the blank editor field and press <kbd className="bg-brand-bg-light border border-brand-border px-1.5 py-0.5 rounded text-brand-dark text-xs font-mono shadow-sm">Ctrl + V</kbd> (or <kbd className="bg-brand-bg-light border border-brand-border px-1.5 py-0.5 rounded text-brand-dark text-xs font-mono shadow-sm">Cmd + V</kbd> on Mac). The entire automation canvas node tree imports instantly.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative flex gap-6 md:gap-10 items-start z-10 group">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border-2 border-brand-yellow text-brand-dark font-black flex items-center justify-center shrink-0 text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
                  2
                </div>
                <div className="bg-white border border-brand-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-card-hover transition-all w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-brand-yellow" />
                    <h3 className="text-lg font-bold text-brand-dark">Google Sheets Setup & OAuth Credentials</h3>
                  </div>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-4">
                    Create a new Google Sheet and add these columns to <code className="text-brand-dark font-mono text-xs font-semibold">Sheet1</code> exactly:
                  </p>
                  
                  {/* Columns list */}
                  <div className="flex flex-wrap gap-2 mb-6 bg-brand-bg-light border border-brand-border rounded-xl p-3.5 font-mono text-xs text-brand-dark leading-normal">
                    <span className="font-semibold text-brand-dark">post_id</span>
                    <span className="text-brand-border">|</span>
                    <span className="font-semibold text-brand-dark">idea</span>
                    <span className="text-brand-border">|</span>
                    <span className="font-semibold text-brand-dark">status</span>
                    <span className="text-brand-border">|</span>
                    <span className="font-semibold text-brand-dark">post_text</span>
                    <span className="text-brand-border">|</span>
                    <span className="font-semibold text-brand-dark">image_prompt</span>
                    <span className="text-brand-border">|</span>
                    <span className="font-semibold text-brand-dark">media_url</span>
                    <span className="text-brand-border">|</span>
                    <span className="font-semibold text-brand-dark">posted_at</span>
                  </div>

                  <div className="border-t border-brand-border pt-4 mt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark block mb-2">🔑 How to get Google Credentials:</span>
                    <ol className="list-decimal pl-5 text-xs text-brand-text-muted space-y-2 leading-relaxed">
                      <li>Double-click the **Google Sheets** node in n8n, click *Create New Credential* and choose *OAuth2*. Copy the *OAuth Redirect URL* provided by n8n.</li>
                      <li>Go to the <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-dark font-semibold hover:underline inline-flex items-center gap-0.5">Google Cloud Console <ExternalLink className="w-3 h-3" /></a>, create a project, search the API Library for **Google Sheets API** and **Google Drive API**, and enable both.</li>
                      <li>Go to **OAuth Consent Screen**, set User Type to *External*, and fill out the basic app name and developer email.</li>
                      <li>Go to **Credentials** -&gt; **Create Credentials** -&gt; **OAuth Client ID**. Select *Web Application* as the type.</li>
                      <li>In the *Authorized redirect URIs* box, paste the OAuth Redirect URL you copied from n8n. Click Create.</li>
                      <li>Copy the generated **Client ID** and **Client Secret** and paste them into n8n's credential settings. Click Connect and sign in!</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex gap-6 md:gap-10 items-start z-10 group">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border-2 border-brand-yellow text-brand-dark font-black flex items-center justify-center shrink-0 text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
                  3
                </div>
                <div className="bg-white border border-brand-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-card-hover transition-all w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Send className="w-5 h-5 text-brand-yellow" />
                    <h3 className="text-lg font-bold text-brand-dark">Telegram Bot Token & Chat ID</h3>
                  </div>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-4">
                    Set up your Telegram Bot to receive drafts and listen for reviews:
                  </p>
                  
                  <div className="border-t border-brand-border pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark block mb-2">🔑 How to get Telegram Credentials:</span>
                    <ol className="list-decimal pl-5 text-xs text-brand-text-muted space-y-2 leading-relaxed">
                      <li>Open Telegram, search for <strong className="text-brand-dark">@BotFather</strong>, send the command <code className="bg-brand-bg-light px-1 py-0.5 rounded text-brand-dark font-mono text-xs">/newbot</code>, and follow the naming instructions.</li>
                      <li>Copy the HTTP API **Bot Token** (looks like <code className="text-brand-dark font-mono text-xs">123456789:ABCdefGh...</code>) provided in the confirmation message.</li>
                      <li>Search for <strong className="text-brand-dark">@userinfobot</strong> or <strong className="text-brand-dark">@GetMyChatID_Bot</strong> on Telegram, click Start, and copy the numeric **Chat ID** it responds with.</li>
                      <li>Inside n8n, paste your token in the "Config - Bot Token" nodes and your numeric ID in the "Config - Telegram Chat ID" node. Double click the Telegram Node, create a new credential, paste your Bot Token, and authorize it.</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex gap-6 md:gap-10 items-start z-10 group">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border-2 border-brand-yellow text-brand-dark font-black flex items-center justify-center shrink-0 text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
                  4
                </div>
                <div className="bg-white border border-brand-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-card-hover transition-all w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-brand-yellow" />
                    <h3 className="text-lg font-bold text-brand-dark">Gemini AI API Key</h3>
                  </div>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-4">
                    Connect Google Gemini to write text drafts and generate illustrations:
                  </p>
                  
                  <div className="border-t border-brand-border pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark block mb-2">🔑 How to get Gemini Credentials:</span>
                    <ol className="list-decimal pl-5 text-xs text-brand-text-muted space-y-2 leading-relaxed">
                      <li>Visit <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-dark font-semibold hover:underline inline-flex items-center gap-0.5">Google AI Studio <ExternalLink className="w-3 h-3" /></a> and sign in with your Google account.</li>
                      <li>Click the **Get API Key** button in the left sidebar menu.</li>
                      <li>Click **Create API Key** (choose a Google Cloud project or use the default one) and copy the generated API key.</li>
                      <li>In n8n, click the **HTTP Request** node for Gemini (Generate Text or Image). Under *Authentication*, select *Predefined Credential Type* &rarr; *Google PaLM API*. Click *Create New Credential*, paste your API Key in the field, and save!</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex gap-6 md:gap-10 items-start z-10 group">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border-2 border-brand-yellow text-brand-dark font-black flex items-center justify-center shrink-0 text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
                  5
                </div>
                <div className="bg-white border border-brand-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-card-hover transition-all w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <LinkedInIcon className="w-5 h-5 text-brand-yellow" />
                    <h3 className="text-lg font-bold text-brand-dark">LinkedIn Developer Credentials</h3>
                  </div>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-4">
                    Connect LinkedIn OAuth to allow publishing live updates:
                  </p>

                  <div className="border-t border-brand-border pt-4 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-dark block mb-2">🔑 How to get LinkedIn Credentials:</span>
                    <ol className="list-decimal pl-5 text-xs text-brand-text-muted space-y-2 leading-relaxed">
                      <li>Double-click the **LinkedIn node** in n8n, click *Create New Credential*, and copy the *OAuth Redirect URL*.</li>
                      <li>Go to the <a href="https://developer.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-brand-dark font-semibold hover:underline inline-flex items-center gap-0.5">LinkedIn Developer Portal <ExternalLink className="w-3 h-3" /></a> and sign in.</li>
                      <li>Click **My Apps** -&gt; **Create App**. Provide a name, associate it with a LinkedIn Page, and upload a logo.</li>
                      <li>Go to the **Auth** tab of your app, copy the **Client ID** and **Client Secret** and paste them into n8n.</li>
                      <li>In the *Authorized redirect URLs* field on LinkedIn, paste the OAuth Redirect URL you copied from n8n. Save it.</li>
                      <li>Go to the **Products** tab of your developer app, and request access to **Share on LinkedIn** and **Community Management API** (essential for post image uploads).</li>
                      <li>In n8n, click **Connect** on the LinkedIn node credential page to complete authentication!</li>
                    </ol>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex gap-3 max-w-3xl">
                    <AlertTriangle className="w-4 h-4 text-red-650 shrink-0 mt-0.5" />
                    <div className="text-xs text-red-750 leading-relaxed">
                      <strong className="text-red-900 block mb-0.5">LinkedIn 403 API Blocker Solution:</strong>
                      If image posting triggers a `403 ACCESS_DENIED` error during node execution, visit the LinkedIn Developer Console, click on your app configuration, head to **Products**, and request/enable access to the **Community Management API** product.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Separate custom footer */}
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
