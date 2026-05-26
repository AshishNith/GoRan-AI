import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { CAL_BOOKING_URL } from '../lib/constants';

const CalBookingContext = createContext();

export function useCalBooking() {
  return useContext(CalBookingContext);
}

export function CalBookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCalBooking = useCallback(() => setIsOpen(true), []);
  const closeCalBooking = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <CalBookingContext.Provider value={{ openCalBooking, closeCalBooking }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeCalBooking}
          />
          <div className="relative z-10 w-full max-w-200 mx-3 sm:mx-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-text-muted">
                  Book a Strategy Call
                </span>
              </div>
              <button
                onClick={closeCalBooking}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent border-none cursor-pointer text-brand-text-muted hover:text-brand-dark hover:bg-black/5 transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Iframe */}
            <div className="flex-1 min-h-[calc(95vh-65px)] sm:min-h-162.5 overflow-y-auto">
              <iframe
                src={CAL_BOOKING_URL}
                className="w-full h-[calc(95vh-65px)] sm:h-162.5 border-none"
                title="Book a Scoping Call"
                allow="calendar"
              />
            </div>
          </div>
        </div>
      )}
    </CalBookingContext.Provider>
  );
}
