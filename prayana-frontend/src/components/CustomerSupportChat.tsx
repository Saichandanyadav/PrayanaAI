'use client';
import { useState, useEffect } from 'react';
import { X, Video } from 'lucide-react';

export default function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-32px)]">
      {showTooltip && !isOpen && (
        <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl mb-3 mr-1 animate-bounce relative max-w-xs border border-slate-800 hidden sm:block">
          Watch our guide video!
          <div className="absolute right-4 bottom-[-4px] w-2 h-2 bg-slate-900 rotate-45"></div>
        </div>
      )}

      {isOpen && (
        <div className="bg-white w-[320px] sm:w-[460px] md:w-[560px] aspect-video rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          <div className="bg-[#0F4C81] text-white flex flex-shrink-0 items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span className="font-bold text-xs sm:text-sm tracking-wide">Guide Video Player</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 bg-black relative w-full h-full">
            <iframe 
              className="w-full h-full absolute inset-0 border-0"
              src="https://www.youtube.com/embed/GZL3EvoyVwU?autoplay=1&si=xrKXLPAGipZaOtWz" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            />
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className="bg-[#0F4C81] hover:bg-[#0c3d69] text-white p-3.5 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/10 flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-90 duration-200" />
        ) : (
          <Video className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110 duration-200 fill-white" />
        )}
      </button>
    </div>
  );
}