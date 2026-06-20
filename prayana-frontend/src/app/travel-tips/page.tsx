'use client';
import { Shield, ShieldAlert, Sparkles, Umbrella, HeartPulse, CheckCircle } from 'lucide-react';

const TIPS_DATA = [
  {
    title: 'Keep Copies of Documents',
    desc: 'Always save photos of your passport, visa, and tickets on your phone or email. If you lose the paper copies, digital ones will save you.',
    icon: Shield,
    colorClass: 'text-[#0F4C81] bg-blue-50/80 border-blue-100',
    category: 'Security'
  },
  {
    title: 'Stay Aware of Your Surroundings',
    desc: 'Do not display too much cash or expensive jewelry in crowded places. Keep your bag zipped close to your body while walking or moving.',
    icon: ShieldAlert,
    colorClass: 'text-amber-600 bg-amber-50/80 border-amber-100',
    category: 'Safety'
  },
  {
    title: 'Pack Basic Medicines',
    desc: 'Carry simple pills for headaches, stomach pain, cold, and band-aids. Finding a pharmacy that sells your exact requirement can be hard in a new city.',
    icon: HeartPulse,
    colorClass: 'text-emerald-600 bg-emerald-50/80 border-emerald-100',
    category: 'Health'
  },
  {
    title: 'Check the Local Weather',
    desc: 'Look at the weather forecast before you close your bags. Packing a light umbrella or jacket will protect you from sudden rain or chill winds.',
    icon: Umbrella,
    colorClass: 'text-[#38BDF8] bg-sky-50/80 border-sky-100',
    category: 'Preparation'
  },
  {
    title: 'Learn a Few Local Words',
    desc: 'Knowing how to say simple words like "Hello", "Thank you", and "Please" in the local language makes people friendly and happy to help you.',
    icon: Sparkles,
    colorClass: 'text-purple-600 bg-purple-50/80 border-purple-100',
    category: 'Culture'
  }
];

export default function TravelTipsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0F4C81]/5 text-[#0F4C81] mb-3 uppercase tracking-wider">
          <CheckCircle className="w-3.5 h-3.5" /> Smart Traveler Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F4C81] mb-3">
          Useful Travel Tips
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">
          Simple and important tips to make your upcoming trip safe, smooth, and happy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {TIPS_DATA.map((tip, index) => {
          const IconComponent = tip.icon;
          return (
            <div 
              key={index} 
              className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${tip.colorClass} transition-transform group-hover:scale-105 duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-50 rounded-md text-slate-400">
                    {tip.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#0F4C81] transition-colors duration-200">
                  {tip.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {tip.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}