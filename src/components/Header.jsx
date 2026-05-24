import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + targetId);
    }
  };

  const navbarClasses = `w-full max-w-[1040px] rounded-full flex items-center justify-between py-2 px-3 pl-6 transition-all duration-300 ${
    scrolled
      ? 'bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-brand-border/60'
      : 'bg-white/70 backdrop-blur-md border border-white/50 shadow-nav'
  }`;

  return (
    <header className="fixed top-4 left-0 right-0 w-full flex justify-center z-50 px-4">
      <nav className={navbarClasses}>
        <Link to="/" className="flex items-center no-underline bg-brand-dark px-3.5 py-1.5 rounded-lg transition-all duration-300 hover:bg-brand-dark-hover">
          <img
            src="https://www.goran.in/Assets/LOGO.png"
            alt="Synapse Logo"
            className="h-4.5 w-auto block"
          />
        </Link>
        
        <ul className="flex items-center gap-1.5 list-none max-md:hidden">
          <li className="nav-item">
            <Link
              to="/about"
              className="no-underline text-brand-text-muted font-medium text-sm py-2 px-4 rounded-full transition-all duration-300 cursor-pointer hover:text-brand-dark hover:bg-black/3"
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <a 
              href="#sandbox" 
              onClick={(e) => handleNavClick(e, '#sandbox')}
              className="no-underline text-brand-text-muted font-medium text-sm py-2 px-4 rounded-full transition-all duration-300 cursor-pointer hover:text-brand-dark hover:bg-black/3"
            >
              Sandbox
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#steps" 
              onClick={(e) => handleNavClick(e, '#steps')}
              className="no-underline text-brand-text-muted font-medium text-sm py-2 px-4 rounded-full transition-all duration-300 cursor-pointer hover:text-brand-dark hover:bg-black/3"
            >
              Our Process
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, '#services')}
              className="no-underline text-brand-text-muted font-medium text-sm py-2 px-4 rounded-full transition-all duration-300 cursor-pointer hover:text-brand-dark hover:bg-black/3"
            >
              Services
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#trust" 
              onClick={(e) => handleNavClick(e, '#trust')}
              className="no-underline text-brand-text-muted font-medium text-sm py-2 px-4 rounded-full transition-all duration-300 cursor-pointer hover:text-brand-dark hover:bg-black/3"
            >
              Trust
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="no-underline text-brand-text-muted font-medium text-sm transition-all duration-300 cursor-pointer hover:text-brand-dark"
          >
            Contact
          </Link>
          <a
            href="#sandbox"
            className="inline-flex items-center gap-2 no-underline bg-brand-dark text-white font-medium text-sm py-2 px-4 rounded-full cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-brand-dark-hover group"
            onClick={(e) => handleNavClick(e, '#sandbox')}
          >
            Get Started
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-0.75"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
