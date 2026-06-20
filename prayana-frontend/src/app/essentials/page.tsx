'use client';
import { Wallet, Landmark, Wifi, Smartphone, Plug, BriefcaseMedical } from 'lucide-react';

export default function EssentialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 mb-3 uppercase tracking-wider border border-emerald-100">
          <Wallet className="w-3.5 h-3.5" /> Packing & Prep
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0F4C81] mb-2">
          Currency & Travel Essentials
        </h1>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          Simple details about cash, internet connection, and items you must bring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
              <Landmark className="w-5 h-5 text-[#0F4C81]" />
              <span>Money & Cards</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl">
                <p className="font-bold text-slate-800 mb-1 text-sm">Tell Your Bank</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Call your bank before you leave. If they see payments from a new country, they might block your card.
                </p>
              </div>
              <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl">
                <p className="font-bold text-slate-800 mb-1 text-sm">Keep Local Cash</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Always keep some paper cash with you. Small food stalls and taxis often do not accept international cards.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
              <Wifi className="w-5 h-5 text-sky-500" />
              <span>Phones & Maps</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl">
                <p className="font-bold text-slate-800 mb-1 text-sm">Get an eSIM Online</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Buy a digital roaming plan online before departure. This helps you get internet as soon as you land.
                </p>
              </div>
              <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-xl">
                <p className="font-bold text-slate-800 mb-1 text-sm">Download Offline Maps</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Save maps of the city on your mobile phone app. You can find your way even without network signal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-100 rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <BriefcaseMedical className="w-5 h-5 text-rose-500" />
                <span>Must-Pack Items</span>
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <Plug className="w-5 h-5 text-[#0F4C81] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Universal Adapter</p>
                    <p className="text-xs text-slate-500 mt-0.5">Brings connection to match different global wall plug shapes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <Smartphone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Powerbank Battery</p>
                    <p className="text-xs text-slate-500 mt-0.5">Keep a portable backup battery to charge your devices anywhere.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                  <BriefcaseMedical className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Daily Medicines</p>
                    <p className="text-xs text-slate-500 mt-0.5">Bring enough personal medication pills to last your full travel days.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}