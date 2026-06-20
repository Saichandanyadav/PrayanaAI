'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, HelpCircle, MessageCircle, FileText, User, AlertCircle, LucideProps } from 'lucide-react';

interface PredefinedMessage {
  id: string;
  label: string;
  response: string;
  icon: React.ComponentType<LucideProps>;
}

interface MessageItem {
  sender: 'user' | 'bot';
  text: string;
  animate?: boolean;
}

function TypingMessage({ text, sender, animate = false }: { text: string; sender: 'user' | 'bot'; animate?: boolean }) {
  const [displayedText, setDisplayedText] = useState(animate ? '' : text);

  useEffect(() => {
    if (!animate || sender === 'user') {
      setDisplayedText(text);
      return;
    }
    
    setDisplayedText('');
    let currentIdx = 0;
    
    const interval = setInterval(() => {
      if (currentIdx < text.length) {
        setDisplayedText(text.slice(0, currentIdx + 1));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text, sender, animate]);

  return (
    <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-medium leading-relaxed shadow-sm ${
      sender === 'user' 
        ? 'bg-[#0F4C81] text-white rounded-br-none' 
        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
    }`}>
      {displayedText}
    </div>
  );
}

export default function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [chatHistory, setChatHistory] = useState<MessageItem[]>([
    { sender: 'bot', text: 'Hello! How can I help you plan your travel plans today?', animate: false }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isOpen]);

  const predefinedOptions: PredefinedMessage[] = [
    {
      id: 'itinerary',
      label: 'How does the AI create my travel plan?',
      response: 'Prayana AI looks at travel routes, weather, and open times to auto-arrange your chosen cities into a perfect day-by-day schedule.',
      icon: HelpCircle
    },
    {
      id: 'pricing',
      label: 'Is this travel planner free to use?',
      response: 'Yes! Creating travel plans and using your dashboard is 100% free. Premium accounts are only needed for very complex flights across many countries.',
      icon: FileText
    },
    {
      id: 'account',
      label: 'Can I share my plan with friends?',
      response: 'Yes! You can copy a private link to send to your friends or invite them to edit your travel dashboard together.',
      icon: MessageCircle
    },
    {
      id: 'human',
      label: 'Can I talk to a real support person?',
      response: 'Yes. I am connecting you to our team right now. A real support teammate will message you here in less than 5 minutes.',
      icon: User
    }
  ];

  const handleOptionClick = (option: PredefinedMessage) => {
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: option.label, animate: false },
      { sender: 'bot', text: option.response, animate: true }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-32px)]">
      {showTooltip && !isOpen && (
        <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl mb-3 mr-1 animate-bounce relative max-w-xs border border-slate-800 hidden sm:block">
          Have questions? Chat with us!
          <div className="absolute right-4 bottom-[-4px] w-2 h-2 bg-slate-900 rotate-45"></div>
        </div>
      )}

      {isOpen && (
        <div className="bg-white w-[320px] sm:w-[360px] md:w-[380px] h-[75vh] max-h-[560px] min-h-[400px] rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
          <div className="bg-[#0F4C81] text-white flex flex-col flex-shrink-0">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <MessageSquare className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Prayana Support</h3>
                  <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                    AI Assistant Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-[#0b3860] px-4 py-2 flex items-start gap-2 border-t border-white/5">
              <AlertCircle className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-200 font-medium leading-normal">
                These responses are not realtime they are static just added for realtime UI.
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <TypingMessage text={msg.text} sender={msg.sender} animate={msg.animate} />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex-shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">Select a topic:</p>
            <div className="grid grid-cols-1 gap-1.5 max-h-[160px] overflow-y-auto pr-0.5">
              {predefinedOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt)}
                    className="w-full flex items-center gap-2.5 text-left text-xs font-semibold text-slate-600 hover:text-[#0F4C81] bg-slate-50 hover:bg-slate-100/80 border border-slate-100 rounded-xl px-3 py-2.5 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
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
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110 duration-200" />
        )}
      </button>
    </div>
  );
}