'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Sparkles, MapPinned, Wallet, Hotel, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  const handleStartPlanning = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('prayana_token');
    if (!token) {
      router.push('/login?redirect=/trips/new');
    } else {
      router.push('/trips/new');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-[#38BDF8]/30">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#0F4C81] tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#0F4C81]" />
            <span>Prayana <span className="text-[#38BDF8]">AI</span></span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-[#0F4C81] transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="bg-[#0F4C81] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:bg-[#0c3e69] transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden px-4 flex flex-col justify-center items-center bg-gradient-to-b from-white via-slate-50 to-blue-50/20">
        <div className="absolute top-0 opacity-40 pointer-events-none w-full max-w-7xl h-full flex justify-between px-10">
          <div className="w-[400px] h-[400px] bg-sky-200/30 blur-[120px] rounded-full transform -translate-y-20" />
          <div className="w-[500px] h-[500px] bg-blue-200/20 blur-[150px] rounded-full transform translate-y-40" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#0F4C81] mb-6 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" /> Smart Travel Planner
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#0F4C81] tracking-tight leading-[1.15] mb-6">
            Plan Your Next Trip <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C81] via-[#38BDF8] to-[#F97316]">
              With Smart AI
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
            Create custom day-by-day schedules, clear budget plans, and find great hotel recommendations based on your needs in just a few seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
            <button onClick={handleStartPlanning} className="w-full sm:w-auto bg-[#0F4C81] text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:bg-[#0c3e69] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group">
              Start Planning <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link href="/login" className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-semibold text-base shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center">
              Access Account
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-slate-100 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#38BDF8] mb-3">Main Features</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-[#0F4C81] tracking-tight">Everything you need to explore the world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                <MapPinned className="w-6 h-6 text-[#0F4C81]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F4C81] mb-3">Easy Daily Schedules</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our AI builds the best route for your days, keeping track of travel times, local weather, and opening hours.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-[#F97316]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F4C81] mb-3">Clear Budget Estimates</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get helpful cost estimates broken down by hotels, food, transport, and extra spending money.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-6">
                <Hotel className="w-6 h-6 text-[#38BDF8]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F4C81] mb-3">Handpicked Hotels</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Save time looking through endless websites. Get a curated list of top-rated places to stay that match your budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50/50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#F97316] mb-3">The Process</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-[#0F4C81] tracking-tight">How It Works</p>
            <p className="text-slate-500 text-sm mt-3">Go from a basic idea to a fully organized travel plan in under a minute.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-24 right-24 h-0.5 bg-dashed bg-slate-200 z-0" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center font-bold text-lg text-slate-700 mb-4">
                1
              </div>
              <h4 className="text-base font-bold text-[#0F4C81] mb-2">Share Details</h4>
              <p className="text-slate-500 text-xs px-4 leading-relaxed">Pick your destination, dates, who you are traveling with, and your budget limit.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center font-bold text-lg text-slate-700 mb-4">
                2
              </div>
              <h4 className="text-base font-bold text-[#0F4C81] mb-2">AI Creates Plan</h4>
              <p className="text-slate-500 text-xs px-4 leading-relaxed">The system instantly looks up local details, maps, and real travel data.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center font-bold text-lg text-slate-700 mb-4">
                3
              </div>
              <h4 className="text-base font-bold text-[#0F4C81] mb-2">Tailored For You</h4>
              <p className="text-slate-500 text-xs px-4 leading-relaxed">The itinerary adjusts to your preferred pace, meal preferences, and activities.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#0F4C81] border-2 border-[#0F4C81] shadow-md flex items-center justify-center font-bold text-lg text-white mb-4">
                4
              </div>
              <h4 className="text-base font-bold text-[#0F4C81] mb-2">Save & Share</h4>
              <p className="text-slate-500 text-xs px-4 leading-relaxed">View your finalized trip setup on your phone or easily share it with friends.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F4C81] text-white relative overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white blur-[150px] rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Ready to plan your next adventure?</h2>
          <p className="text-blue-100/80 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Join thousands of travelers who have ditched messy spreadsheets for fast, automated, and smart travel planning.
          </p>
          <button onClick={handleStartPlanning} className="bg-white text-[#0F4C81] hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-base shadow-xl transition-all transform active:scale-[0.98]">
            Create Your AI Trip Now
          </button>

          <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/10 w-full max-w-2xl text-center">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-[#38BDF8]">100%</p>
              <p className="text-xs text-blue-200/70 uppercase tracking-wider font-semibold mt-1">Automatic</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-[#38BDF8]">3 Secs</p>
              <p className="text-xs text-blue-200/70 uppercase tracking-wider font-semibold mt-1">Setup Time</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-[#38BDF8]">Free</p>
              <p className="text-xs text-blue-200/70 uppercase tracking-wider font-semibold mt-1">To Plan</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 text-xs py-12 px-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-bold">
            <Compass className="w-4 h-4 text-[#38BDF8]" />
            <span>Prayana AI</span>
          </div>
          <div className="flex items-center gap-6 text-slate-400 font-medium">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
            <Link href="/travel-tips" className="hover:text-white transition-colors">Tips</Link>
          </div>
          <div className="text-slate-500 font-medium">
            &copy; Prayana AI. Plan Smarter. Journey Better.
          </div>
        </div>
      </footer>
    </div>
  );
}