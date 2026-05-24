import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Stat {
  label: string;
  value: string;
}

interface CaseStudyContent {
  tag: string;
  heading: string;
  description: string;
  stats: Stat[];
}

interface PageData {
  leftBgImage: string | null;
  rightBgImage: string | null;
  leftContent: CaseStudyContent | null;
  rightContent: CaseStudyContent | null;
  path: string | null;
}

const pages: PageData[] = [
  {
    leftBgImage: '/case_study_intro.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      tag: 'Our Past Work',
      heading: 'Real Stories. Real Business Growth.',
      description: 'We don\'t build AI for the sake of it. We build smart, custom tools that solve actual headaches for real companies. Here is a look at what we have delivered.',
      stats: [
        { label: 'Client Feedback', value: '4.9/5 Rating' },
        { label: 'Core Focus', value: 'Efficiency & Sales' }
      ]
    },
    path: null
  },
  {
    leftBgImage: null,
    rightBgImage: '/audit_dashboard.png',
    leftContent: {
      tag: '01. AI Workflow Audit',
      heading: '1,280 Wasted Hours Saved for IBS',
      description: 'The team at IBS Insurance Brokers was drowning in paperwork, manually copying client info from emails into policy documents. We audited their workflows and built an automated data pipeline. In just 28 days, we eliminated 1,280 hours of repetitive staff work per month.',
      stats: [
        { label: 'Client Partner', value: 'IBS Brokers' },
        { label: 'Time Reclaimed', value: '1,280 Hours/Mo' }
      ]
    },
    rightContent: null,
    path: 'ibs-brokers'
  },
  {
    leftBgImage: '/booking_dashboard.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      tag: '02. Voice AI & Booking',
      heading: '88+ Bookings for Hospitadent',
      description: 'Hospitadent was losing potential patients who called or messaged after-hours. We built a 24/7 automated assistant that handles patient inquiries and schedules bookings instantly. In the first month, it secured 88+ new bookings without staff lifting a finger.',
      stats: [
        { label: 'Client Partner', value: 'Hospitadent' },
        { label: 'New Bookings', value: '88+ in Month 1' }
      ]
    },
    path: 'hospitadent'
  },
  {
    leftBgImage: null,
    rightBgImage: '/sorting_dashboard.png',
    leftContent: {
      tag: '03. Custom Dashboard',
      heading: 'UrbanWear Cuts Prep Time by 50%',
      description: 'UrbanWear spent hours every morning manually sorting custom clothing orders by sizes and print hubs. We designed a custom dashboard that automatically reads customer notes, tags orders, and routes them to the correct print stations instantly.',
      stats: [
        { label: 'Client Partner', value: 'UrbanWear Co.' },
        { label: 'Fulfillment Speed', value: '50% Faster Prep' }
      ]
    },
    rightContent: null,
    path: 'urbanwear'
  },
  {
    leftBgImage: '/training_dashboard.png',
    rightBgImage: null,
    leftContent: null,
    rightContent: {
      tag: '04. Internal Enablement',
      heading: 'Apex Reclaims 4.5 Hours/Week',
      description: 'Apex Logistics\' support team was bogged down by policy lookup questions and carrier rules. We ran hands-on team training and built an internal AI search tool. Employees now get instant answers, saving 4.5 hours of administrative work every week.',
      stats: [
        { label: 'Client Partner', value: 'Apex Logistics' },
        { label: 'Time Reclaimed', value: '4.5 Hours/Wk' }
      ]
    },
    path: 'apex-logistics'
  },
];

// ── Motion Graphic Vector Components ──

const IntroGraphic = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-brand-bg-light flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      <svg className="w-[80%] h-[80%] max-w-[340px]" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            @keyframes spin-constellation {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes pulse-node {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.15); opacity: 1; }
            }
            @keyframes dash-circuit {
              to { stroke-dashoffset: -40; }
            }
            .orbit-group {
              transform-origin: 200px 200px;
              animation: spin-constellation 40s linear infinite;
            }
            .pulse-core {
              transform-origin: 200px 200px;
              animation: pulse-node 4s ease-in-out infinite;
            }
            .circuit-line {
              stroke-dasharray: 8 6;
              animation: dash-circuit 2s linear infinite;
            }
          `}</style>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F6C744" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F6C744" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        <circle cx="200" cy="200" r="100" fill="url(#core-glow)" />
        <circle cx="200" cy="200" r="110" stroke="var(--color-brand-border)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="60" stroke="var(--color-brand-border)" strokeWidth="1" strokeDasharray="3 6" />

        <line x1="200" y1="200" x2="90" y2="120" stroke="var(--color-brand-yellow)" strokeWidth="1.5" className="circuit-line" />
        <line x1="200" y1="200" x2="310" y2="150" stroke="var(--color-brand-yellow)" strokeWidth="1.5" className="circuit-line" />
        <line x1="200" y1="200" x2="140" y2="290" stroke="var(--color-brand-yellow)" strokeWidth="1.5" className="circuit-line" />
        <line x1="200" y1="200" x2="270" y2="280" stroke="var(--color-brand-yellow)" strokeWidth="1.5" className="circuit-line" />

        <g className="orbit-group">
          <g style={{ animation: 'pulse-node 3s ease-in-out infinite', transformOrigin: '90px 120px' }}>
            <circle cx="90" cy="120" r="14" fill="white" stroke="var(--color-brand-yellow)" strokeWidth="2.5" />
            <circle cx="90" cy="120" r="6" fill="var(--color-brand-yellow)" />
          </g>
          <g style={{ animation: 'pulse-node 5s ease-in-out infinite 1s', transformOrigin: '310px 150px' }}>
            <circle cx="310" cy="150" r="12" fill="white" stroke="var(--color-brand-yellow)" strokeWidth="2" />
            <circle cx="310" cy="150" r="5" fill="var(--color-brand-yellow)" />
          </g>
          <g style={{ animation: 'pulse-node 4s ease-in-out infinite 0.5s', transformOrigin: '140px 290px' }}>
            <circle cx="140" cy="290" r="16" fill="white" stroke="var(--color-brand-yellow)" strokeWidth="2.5" />
            <circle cx="140" cy="290" r="7" fill="var(--color-brand-yellow)" />
          </g>
          <g style={{ animation: 'pulse-node 6s ease-in-out infinite 1.5s', transformOrigin: '270px 280px' }}>
            <circle cx="270" cy="280" r="10" fill="white" stroke="var(--color-brand-yellow)" strokeWidth="1.5" />
            <circle cx="270" cy="280" r="4" fill="var(--color-brand-yellow)" />
          </g>
        </g>

        <g className="pulse-core">
          <circle cx="200" cy="200" r="28" fill="white" stroke="var(--color-brand-yellow)" strokeWidth="4" />
          <circle cx="200" cy="200" r="14" fill="var(--color-brand-yellow)" />
        </g>
      </svg>
    </div>
  );
};

const IBSBrokersGraphic = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex items-center justify-center">
      <svg className="w-[85%] h-[80%] max-w-[380px]" viewBox="0 0 450 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            @keyframes fly-doc {
              0% { transform: translate(0, 0); opacity: 0; }
              15% { opacity: 1; }
              45% { transform: translate(120px, 0); opacity: 1; }
              55% { transform: translate(120px, 0); opacity: 0; }
              100% { transform: translate(120px, 0); opacity: 0; }
            }
            @keyframes parse-gear {
              0%, 40% { transform: rotate(0deg); }
              45%, 55% { transform: rotate(180deg); }
              60%, 100% { transform: rotate(180deg); }
            }
            @keyframes emit-check {
              0%, 50% { opacity: 0; transform: scale(0.6); }
              60%, 100% { opacity: 1; transform: scale(1); }
            }
            @keyframes row-light {
              0%, 52% { fill: transparent; }
              60%, 100% { fill: rgba(74, 222, 128, 0.08); }
            }
            .doc-flow {
              animation: fly-doc 4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
            }
            .gear-icon {
              transform-origin: 210px 150px;
              animation: parse-gear 4s ease-in-out infinite;
            }
            .row-bg-anim {
              animation: row-light 4s ease-out infinite;
            }
            .check-badge {
              transform-origin: 390px 150px;
              animation: emit-check 4s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
            }
          `}</style>
          <radialGradient id="gear-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F6C744" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F6C744" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="30" y="110" width="70" height="80" rx="10" fill="var(--color-brand-bg-light)" stroke="var(--color-brand-border)" strokeWidth="2" />
        <path d="M 45 140 L 85 140 M 45 155 L 85 155" stroke="var(--color-brand-text-muted)" strokeWidth="2" strokeLinecap="round" />
        <rect x="50" y="118" width="30" height="15" rx="3" fill="var(--color-brand-yellow)" opacity="0.8" />
        <text x="65" y="128" fill="var(--color-brand-dark)" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">IN</text>
        
        <line x1="100" y1="150" x2="180" y2="150" stroke="var(--color-brand-border)" strokeWidth="2" strokeDasharray="4 6" />

        <g className="doc-flow">
          <rect x="65" y="135" width="24" height="30" rx="3" fill="white" stroke="var(--color-brand-yellow)" strokeWidth="2" />
          <line x1="71" y1="143" x2="83" y2="143" stroke="var(--color-brand-yellow)" strokeWidth="1.5" />
          <line x1="71" y1="149" x2="83" y2="149" stroke="var(--color-brand-yellow)" strokeWidth="1.5" />
          <line x1="71" y1="155" x2="77" y2="155" stroke="var(--color-brand-yellow)" strokeWidth="1.5" />
        </g>

        <circle cx="210" cy="150" r="45" fill="url(#gear-glow)" />
        <circle cx="210" cy="150" r="30" fill="white" stroke="var(--color-brand-border)" strokeWidth="2" />
        
        <g className="gear-icon">
          <circle cx="210" cy="150" r="16" fill="none" stroke="var(--color-brand-yellow)" strokeWidth="4" />
          {Array.from({ length: 8 }).map((_, idx) => {
            const rot = idx * 45;
            return (
              <rect
                key={idx}
                x="207"
                y="126"
                width="6"
                height="8"
                rx="1"
                fill="var(--color-brand-yellow)"
                transform={`rotate(${rot} 210 150)`}
              />
            );
          })}
        </g>
        
        <line x1="240" y1="150" x2="310" y2="150" stroke="var(--color-brand-border)" strokeWidth="2" strokeDasharray="4 6" />

        <rect x="310" y="80" width="110" height="140" rx="12" fill="white" stroke="var(--color-brand-border)" strokeWidth="2" />
        
        <rect x="320" y="95" width="90" height="24" rx="6" fill="var(--color-brand-bg-light)" />
        <circle cx="332" cy="107" r="4" fill="var(--color-brand-border)" />
        <rect x="344" y="104" width="45" height="6" rx="2" fill="var(--color-brand-border)" />

        <rect x="320" y="127" width="90" height="46" rx="6" stroke="var(--color-brand-border)" strokeWidth="1.5" className="row-bg-anim" />
        <rect x="330" y="137" width="50" height="6" rx="2.5" fill="var(--color-brand-text-muted)" opacity="0.3" />
        <rect x="330" y="149" width="30" height="5" rx="2" fill="var(--color-brand-text-muted)" opacity="0.2" />

        <rect x="320" y="181" width="90" height="24" rx="6" fill="var(--color-brand-bg-light)" />
        <circle cx="332" cy="193" r="4" fill="var(--color-brand-border)" />
        <rect x="344" y="190" width="35" height="6" rx="2" fill="var(--color-brand-border)" />

        <g className="check-badge">
          <circle cx="390" cy="150" r="11" fill="#27C93F" />
          <path d="M 385 150 L 388.5 153.5 L 395 146.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
};

const HospitadentGraphic = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-brand-bg-light flex items-center justify-center">
      <svg className="w-[85%] h-[80%] max-w-[380px]" viewBox="0 0 450 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            @keyframes bar-bounce-1 {
              0%, 100% { height: 12px; }
              50% { height: 48px; }
            }
            @keyframes bar-bounce-2 {
              0%, 100% { height: 20px; }
              50% { height: 64px; }
            }
            @keyframes bar-bounce-3 {
              0%, 100% { height: 8px; }
              50% { height: 36px; }
            }
            @keyframes chat-bubble-in {
              0%, 25% { opacity: 0; transform: translateY(15px) scale(0.9); }
              35%, 100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes calendar-lock {
              0%, 55% { fill: var(--color-brand-border); }
              70%, 100% { fill: #27C93F; }
            }
            .wave-bar-1 { animation: bar-bounce-1 1s ease-in-out infinite; }
            .wave-bar-2 { animation: bar-bounce-2 0.8s ease-in-out infinite; }
            .wave-bar-3 { animation: bar-bounce-3 1.2s ease-in-out infinite; }
            
            .bubble-left {
              transform-origin: 30px 65px;
              animation: chat-bubble-in 6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
            }
            .bubble-right {
              transform-origin: 330px 105px;
              animation: chat-bubble-in 6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite 1.8s;
            }
            .calendar-slot-anim {
              animation: calendar-lock 6s ease-out infinite;
            }
          `}</style>
        </defs>

        <g className="bubble-left">
          <rect x="30" y="25" width="160" height="42" rx="12" fill="white" stroke="var(--color-brand-border)" strokeWidth="1.5" />
          <path d="M 170 67 L 178 75 L 180 67 Z" fill="white" stroke="var(--color-brand-border)" strokeWidth="1.5" />
          <path d="M 169 66 L 181 66" stroke="white" strokeWidth="2" />
          <rect x="42" y="37" width="110" height="5" rx="2.5" fill="var(--color-brand-text-muted)" opacity="0.4" />
          <rect x="42" y="48" width="60" height="5" rx="2.5" fill="var(--color-brand-text-muted)" opacity="0.3" />
          <circle cx="168" cy="46" r="8" fill="var(--color-brand-border)" opacity="0.3" />
          <text x="168" y="49" fill="var(--color-brand-dark)" fontSize="8" fontWeight="bold" textAnchor="middle">?</text>
        </g>

        <g className="bubble-right">
          <rect x="230" y="65" width="190" height="42" rx="12" fill="var(--color-brand-dark)" />
          <path d="M 250 107 L 242 115 L 240 107 Z" fill="var(--color-brand-dark)" />
          <rect x="245" y="77" width="130" height="5" rx="2.5" fill="white" opacity="0.8" />
          <rect x="245" y="88" width="90" height="5" rx="2.5" fill="white" opacity="0.5" />
          <rect x="390" y="77" width="16" height="16" rx="3" fill="var(--color-brand-yellow)" />
          <text x="398" y="89" fill="var(--color-brand-dark)" fontSize="10" fontWeight="bold" textAnchor="middle">📅</text>
        </g>

        <circle cx="225" cy="150" r="32" fill="white" stroke="var(--color-brand-border)" strokeWidth="1.5" />
        <g transform="translate(195, 150)" strokeWidth="0">
          <rect x="10" y="-6" width="5" height="12" rx="2.5" fill="var(--color-brand-yellow)" className="wave-bar-1" style={{ transformOrigin: '12px 0' }} />
          <rect x="20" y="-10" width="5" height="20" rx="2.5" fill="var(--color-brand-yellow)" className="wave-bar-2" style={{ transformOrigin: '22px 0' }} />
          <rect x="30" y="-12" width="5" height="24" rx="2.5" fill="var(--color-brand-yellow)" className="wave-bar-2" style={{ animationDelay: '0.2s', transformOrigin: '32px 0' }} />
          <rect x="40" y="-4" width="5" height="8" rx="2.5" fill="var(--color-brand-yellow)" className="wave-bar-3" style={{ transformOrigin: '42px 0' }} />
        </g>

        <rect x="125" y="195" width="200" height="85" rx="14" fill="white" stroke="var(--color-brand-border)" strokeWidth="2" />
        
        <rect x="125" y="195" width="200" height="22" rx="0" fill="var(--color-brand-bg-light)" style={{ clipPath: 'inset(0 0 0 0 round 14px 14px 0 0)' }} />
        <line x1="125" y1="217" x2="325" y2="217" stroke="var(--color-brand-border)" strokeWidth="1.5" />
        
        <g transform="translate(135, 227)" fill="var(--color-brand-bg-light)" strokeWidth="0">
          <rect x="5" y="5" width="30" height="18" rx="4" />
          <rect x="42" y="5" width="30" height="18" rx="4" />
          <rect x="79" y="5" width="30" height="18" rx="4" />
          <rect x="116" y="5" width="30" height="18" rx="4" />
          <rect x="153" y="5" width="30" height="18" rx="4" />

          <rect x="5" y="28" width="30" height="18" rx="4" />
          <rect x="42" y="28" width="30" height="18" rx="4" />
          
          <rect x="79" y="28" width="30" height="18" rx="4" strokeWidth="1.5" className="calendar-slot-anim" />
          
          <rect x="116" y="28" width="30" height="18" rx="4" />
          <rect x="153" y="28" width="30" height="18" rx="4" />
        </g>
      </svg>
    </div>
  );
};

const UrbanWearGraphic = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex items-center justify-center">
      <svg className="w-[85%] h-[80%] max-w-[380px]" viewBox="0 0 450 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            @keyframes conveyor-box {
              0% { transform: translate(-40px, 0); opacity: 0; }
              10% { opacity: 1; }
              40% { transform: translate(145px, 0); }
              45%, 55% { transform: translate(145px, 0); }
              85% { transform: translate(320px, 0); opacity: 1; }
              95%, 100% { transform: translate(350px, 0); opacity: 0; }
            }
            @keyframes laser-sweep {
              0%, 38% { transform: translateY(0); opacity: 0; }
              40% { opacity: 0.8; }
              45%, 52% { transform: translateY(46px); opacity: 0.8; }
              55% { transform: translateY(0); opacity: 0; }
              100% { opacity: 0; }
            }
            @keyframes tag-popup {
              0%, 48% { opacity: 0; transform: scale(0.6) translateY(5px); }
              54%, 85% { opacity: 1; transform: scale(1) translateY(0); }
              90%, 100% { opacity: 0; }
            }
            .package-box {
              animation: conveyor-box 6s linear infinite;
            }
            .laser-beam {
              animation: laser-sweep 6s ease-in-out infinite;
            }
            .sort-tag {
              transform-origin: 195px 105px;
              animation: tag-popup 6s cubic-bezier(0.175, 0.885, 0.32, 1.2) infinite;
            }
          `}</style>
          <linearGradient id="laser-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <rect x="20" y="165" width="410" height="15" rx="7.5" fill="var(--color-brand-bg-light)" stroke="var(--color-brand-border)" strokeWidth="1.5" />
        <circle cx="50" cy="172.5" r="4" fill="var(--color-brand-border)" />
        <circle cx="100" cy="172.5" r="4" fill="var(--color-brand-border)" />
        <circle cx="150" cy="172.5" r="4" fill="var(--color-brand-border)" />
        <circle cx="200" cy="172.5" r="4" fill="var(--color-brand-border)" />
        <circle cx="250" cy="172.5" r="4" fill="var(--color-brand-border)" />
        <circle cx="300" cy="172.5" r="4" fill="var(--color-brand-border)" />
        <circle cx="350" cy="172.5" r="4" fill="var(--color-brand-border)" />
        <circle cx="400" cy="172.5" r="4" fill="var(--color-brand-border)" />

        <line x1="20" y1="180" x2="430" y2="180" stroke="var(--color-brand-border)" strokeWidth="1.5" strokeDasharray="5 7" />

        <g className="package-box">
          <rect x="35" y="115" width="50" height="50" rx="6" fill="#F4E3D7" stroke="#D2B48C" strokeWidth="2" />
          <rect x="57" y="115" width="6" height="50" fill="#CD853F" />
          <rect x="35" y="137" width="50" height="6" fill="#CD853F" />
          
          <rect x="42" y="125" width="12" height="6" fill="white" />
          <line x1="44" y1="128" x2="46" y2="128" stroke="black" strokeWidth="1" />
          <line x1="48" y1="128" x2="52" y2="128" stroke="black" strokeWidth="1.5" />
        </g>

        <rect x="160" y="55" width="70" height="15" rx="5" fill="var(--color-brand-dark)" />
        <rect x="175" y="65" width="40" height="3" fill="#60A5FA" />
        
        <g className="laser-beam">
          <polygon points="175,68 215,68 230,114 160,114" fill="url(#laser-glow)" />
          <line x1="160" y1="114" x2="230" y2="114" stroke="#60A5FA" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px #60A5FA)' }} />
        </g>

        <g className="sort-tag">
          <rect x="165" y="88" width="60" height="20" rx="10" fill="var(--color-brand-yellow)" />
          <text x="195" y="102" fill="var(--color-brand-dark)" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">HUB - L</text>
          <line x1="195" y1="108" x2="195" y2="115" stroke="var(--color-brand-yellow)" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>

        <g transform="translate(320, 205)" stroke="var(--color-brand-border)" strokeWidth="1.5">
          <rect x="0" y="0" width="40" height="50" rx="6" fill="var(--color-brand-bg-light)" />
          <text x="20" y="28" fill="var(--color-brand-text-muted)" stroke="none" fontSize="8" fontWeight="bold" textAnchor="middle">HUB-A</text>
          
          <rect x="52" y="0" width="40" height="50" rx="6" fill="white" strokeWidth="2" stroke="var(--color-brand-yellow)" />
          <text x="72" y="28" fill="var(--color-brand-dark)" stroke="none" fontSize="8" fontWeight="bold" textAnchor="middle">HUB-L</text>
        </g>
      </svg>
    </div>
  );
};

const ApexLogisticsGraphic = () => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-brand-bg-light flex items-center justify-center">
      <svg className="w-[85%] h-[80%] max-w-[380px]" viewBox="0 0 450 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>{`
            @keyframes type-text {
              0%, 10% { width: 0; }
              40%, 80% { width: 140px; }
              90%, 100% { width: 0; }
            }
            @keyframes doc-search-glow {
              0%, 40% { transform: translateY(0); opacity: 0.2; }
              50%, 75% { transform: translateY(28px); opacity: 1; }
              85%, 100% { transform: translateY(0); opacity: 0.2; }
            }
            @keyframes match-beam {
              0%, 55% { opacity: 0; stroke-dashoffset: 40; }
              65%, 80% { opacity: 0.7; stroke-dashoffset: 0; }
              90%, 100% { opacity: 0; }
            }
            @keyframes text-hilight {
              0%, 65% { fill: transparent; }
              70%, 80% { fill: #FFF2CC; }
              90%, 100% { fill: transparent; }
            }
            .query-text-box {
              width: 140px;
              animation: type-text 6s steps(22, end) infinite;
            }
            .search-beam-glow {
              animation: doc-search-glow 6s ease-in-out infinite;
            }
            .retrieval-beam {
              stroke-dasharray: 6 4;
              animation: match-beam 6s linear infinite;
            }
            .highlight-bg {
              animation: text-hilight 6s ease-out infinite;
            }
          `}</style>
        </defs>

        <rect x="40" y="30" width="370" height="36" rx="10" fill="white" stroke="var(--color-brand-border)" strokeWidth="2" />
        
        <circle cx="56" cy="48" r="5" stroke="var(--color-brand-text-muted)" strokeWidth="1.5" />
        <line x1="60" y1="52" x2="65" y2="57" stroke="var(--color-brand-text-muted)" strokeWidth="1.5" />
        
        <rect x="75" y="44" className="query-text-box" height="8" rx="2" fill="var(--color-brand-text-main)" opacity="0.8" />
        <line x1="220" y1="42" x2="220" y2="54" stroke="var(--color-brand-yellow)" strokeWidth="2" />

        <g transform="translate(40, 110)">
          <rect x="20" y="20" width="130" height="90" rx="8" fill="white" stroke="var(--color-brand-border)" strokeWidth="1.5" opacity="0.4" />
          <rect x="10" y="10" width="130" height="90" rx="8" fill="white" stroke="var(--color-brand-border)" strokeWidth="1.5" opacity="0.7" />
          <rect x="0" y="0" width="130" height="90" rx="8" fill="white" stroke="var(--color-brand-border)" strokeWidth="2" />
          
          <g transform="translate(12, 15)" fill="var(--color-brand-border)" strokeWidth="0">
            <rect x="0" y="0" width="105" height="4" rx="1.5" />
            <rect x="0" y="10" width="105" height="4" rx="1.5" />
            <rect x="0" y="20" width="105" height="4" rx="1.5" />
            
            <rect x="0" y="28" width="95" height="8" rx="2" className="highlight-bg" />
            <rect x="0" y="30" width="95" height="4" rx="1.5" fill="var(--color-brand-yellow)" />
            
            <rect x="0" y="42" width="70" height="4" rx="1.5" />
            <rect x="0" y="52" width="105" height="4" rx="1.5" />
            <rect x="0" y="62" width="50" height="4" rx="1.5" />
          </g>
        </g>

        <g className="search-beam-glow">
          <ellipse cx="105" cy="120" rx="60" ry="12" fill="none" stroke="var(--color-brand-yellow)" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 3px #F6C744)' }} />
          <ellipse cx="105" cy="120" rx="60" ry="12" fill="var(--color-brand-yellow)" opacity="0.08" />
        </g>

        <path d="M 170 148 C 220 148, 220 185, 270 185" fill="none" stroke="var(--color-brand-yellow)" strokeWidth="2" className="retrieval-beam" />

        <g transform="translate(270, 110)">
          <rect x="0" y="0" width="140" height="90" rx="12" fill="white" stroke="var(--color-brand-border)" strokeWidth="2" />
          <rect x="0" y="0" width="140" height="18" rx="0" fill="var(--color-brand-bg-light)" style={{ clipPath: 'inset(0 0 0 0 round 12px 12px 0 0)' }} />
          <line x1="0" y1="18" x2="140" y2="18" stroke="var(--color-brand-border)" strokeWidth="1.5" />
          <circle cx="16" cy="9" r="4" fill="#27C93F" />
          <rect x="26" y="6" width="30" height="5" rx="1.5" fill="var(--color-brand-text-muted)" opacity="0.4" />

          <g transform="translate(12, 30)" fill="var(--color-brand-border)" strokeWidth="0">
            <rect x="0" y="0" width="115" height="4" rx="1.5" fill="var(--color-brand-dark)" opacity="0.8" />
            <rect x="0" y="10" width="115" height="4" rx="1.5" fill="var(--color-brand-dark)" opacity="0.8" />
            <rect x="0" y="20" width="115" height="4" rx="1.5" fill="var(--color-brand-dark)" opacity="0.8" />
            <rect x="0" y="30" width="75" height="4" rx="1.5" fill="var(--color-brand-dark)" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default function ScrollAdventure() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightPanelsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation via dots and chevrons
  const goToPage = (pageIndex: number) => {
    const trigger = ScrollTrigger.getById('case-studies-trigger');
    if (!trigger) return;

    const start = trigger.start;
    const end = trigger.end;
    const totalScroll = end - start;
    const progress = (pageIndex - 1) / (numOfPages - 1);
    const targetScroll = start + totalScroll * progress;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create GSAP timeline linked to scroll pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'case-studies-trigger',
        trigger: container,
        start: 'top top',
        end: () => `+=${window.innerHeight * (numOfPages - 1)}`,
        scrub: 0.5, // slightly loose scrub for butter-smooth feeling
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Dynamically compute closest page (1 to 5)
          const activeIndex = Math.round(progress * (numOfPages - 1)) + 1;
          setCurrentPage(activeIndex);
        },
      },
    });

    // Animate pages 2 to 5 (index 1 to 4)
    for (let i = 1; i < numOfPages; i++) {
      const leftPanel = leftPanelsRef.current[i];
      const rightPanel = rightPanelsRef.current[i];

      if (leftPanel && rightPanel) {
        tl.to(leftPanel, { y: '0%', ease: 'none' }, `slide-${i}`)
          .to(rightPanel, { y: '0%', ease: 'none' }, `slide-${i}`);
      }
    }

    return () => {
      // Cleanup trigger on unmount
      ScrollTrigger.getById('case-studies-trigger')?.kill();
    };
  }, [numOfPages]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden h-screen bg-white w-full border-t border-b border-brand-border"
    >
      {pages.map((page, i) => {
        const idx = i + 1;
        const isFirst = i === 0;

        return (
          <div
            key={idx}
            className="absolute inset-0 flex flex-col md:flex-row"
            style={{ 
              zIndex: idx,
              pointerEvents: currentPage === idx ? 'auto' : 'none'
            }}
          >
            {/* Left Half */}
            <div
              ref={(el) => {
                leftPanelsRef.current[i] = el;
              }}
              className="w-full md:w-1/2 h-1/2 md:h-full absolute top-0 left-0"
              style={{
                transform: isFirst ? 'none' : 'translateY(100vh)',
                willChange: 'transform',
              }}
            >
              <div
                className="w-full h-full bg-white relative"
              >
                {page.leftBgImage && (
                  <div className="absolute inset-0 z-0">
                    {i === 0 && <IntroGraphic />}
                    {i === 2 && <HospitadentGraphic />}
                    {i === 4 && <ApexLogisticsGraphic />}
                  </div>
                )}
                <div className="relative flex flex-col items-center justify-center h-full text-brand-text-main p-8 md:p-16 z-10">
                  {page.leftContent && (
                    <div className="max-w-[440px] w-full text-left bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-brand-border md:border-none md:p-0 md:bg-transparent md:backdrop-blur-none">
                      <span className="text-[#B45309] font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
                        {page.leftContent.tag}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-heading font-bold text-brand-dark mb-4 tracking-tight leading-tight">
                        {page.leftContent.heading}
                      </h3>
                      <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed font-body mb-8">
                        {page.leftContent.description}
                      </p>

                      {page.leftContent.stats && (
                        <div className="pt-6 border-t border-brand-border grid grid-cols-2 gap-4">
                          {page.leftContent.stats.map((stat, sIdx) => (
                            <div key={sIdx}>
                              <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider">
                                {stat.label}
                              </span>
                              <span className="text-base font-bold text-[#B45309] mt-1 block">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {page.path && (
                        <Link 
                          to={`/case-studies/${page.path}`}
                          className="inline-flex items-center gap-1.5 mt-8 py-2.5 px-6 rounded-full text-xs font-semibold bg-brand-yellow text-brand-dark transition-all duration-300 hover:bg-brand-yellow-hover hover:translate-y-[-1px] no-underline shadow-card"
                        >
                          Read Case Study
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              ref={(el) => {
                rightPanelsRef.current[i] = el;
              }}
              className="w-full md:w-1/2 h-1/2 md:h-full absolute bottom-0 md:top-0 right-0"
              style={{
                transform: isFirst ? 'none' : 'translateY(-100vh)',
                willChange: 'transform',
              }}
            >
              <div
                className="w-full h-full bg-white relative"
              >
                {page.rightBgImage && (
                  <div className="absolute inset-0 z-0">
                    {i === 1 && <IBSBrokersGraphic />}
                    {i === 3 && <UrbanWearGraphic />}
                  </div>
                )}
                <div className="relative flex flex-col items-center justify-center h-full text-brand-text-main p-8 md:p-16 z-10">
                  {page.rightContent && (
                    <div className="max-w-[440px] w-full text-left bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-brand-border md:border-none md:p-0 md:bg-transparent md:backdrop-blur-none">
                      <span className="text-[#B45309] font-mono text-xs uppercase tracking-widest font-semibold block mb-3">
                        {page.rightContent.tag}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-heading font-bold text-brand-dark mb-4 tracking-tight leading-tight">
                        {page.rightContent.heading}
                      </h3>
                      <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed font-body mb-8">
                        {page.rightContent.description}
                      </p>

                      {page.rightContent.stats && (
                        <div className="pt-6 border-t border-brand-border grid grid-cols-2 gap-4">
                          {page.rightContent.stats.map((stat, sIdx) => (
                            <div key={sIdx}>
                              <span className="block text-[10px] uppercase font-mono text-brand-text-muted tracking-wider">
                                {stat.label}
                              </span>
                              <span className="text-base font-bold text-[#B45309] mt-1 block">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {page.path && (
                        <Link 
                          to={`/case-studies/${page.path}`}
                          className="inline-flex items-center gap-1.5 mt-8 py-2.5 px-6 rounded-full text-xs font-semibold bg-brand-yellow text-brand-dark transition-all duration-300 hover:bg-brand-yellow-hover hover:translate-y-[-1px] no-underline shadow-card"
                        >
                          Read Case Study
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Slide Navigation Dots */}
      <div className="absolute left-6 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-[100] flex md:flex-col gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentPage === i + 1 ? 'bg-brand-yellow scale-125' : 'bg-black/20 hover:bg-black/40'
            }`}
          />
        ))}
      </div>

      {/* Slide Navigation Buttons */}
      <div className="absolute right-6 bottom-6 z-[100] flex gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Slide"
          className="w-10 h-10 rounded-full border border-brand-border bg-white text-brand-text-main flex items-center justify-center transition-all duration-200 hover:bg-black/5 hover:border-brand-text-muted disabled:opacity-30 disabled:pointer-events-none shadow-card"
        >
          <ChevronUp size={20} />
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === numOfPages}
          aria-label="Next Slide"
          className="w-10 h-10 rounded-full border border-brand-border bg-white text-brand-text-main flex items-center justify-center transition-all duration-200 hover:bg-black/5 hover:border-brand-text-muted disabled:opacity-30 disabled:pointer-events-none shadow-card"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Section Indicator Label */}
      <div className="absolute left-6 top-6 z-[100] hidden md:block">
        <span className="text-[10px] font-bold text-brand-text-muted tracking-[0.2em] uppercase">
          Case Studies — {currentPage} / {numOfPages}
        </span>
      </div>
    </section>
  );
}
