import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-50 via-white to-blue-50/30 overflow-hidden px-4">
      {/* Decorative background vectors representing path/mapping tracks */}
      <div className="absolute top-0 opacity-40 pointer-events-none w-full max-w-7xl h-full flex justify-between px-10">
        <div className="w-[400px] h-[400px] bg-sky-200/30 blur-[120px] rounded-full transform -translate-y-20" />
        <div className="w-[500px] h-[500px] bg-blue-200/20 blur-[150px] rounded-full transform translate-y-40" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-[#0F4C81] mb-6 tracking-wide uppercase">
          🌎 Global Exploration Engine
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#0F4C81] tracking-tight leading-tight mb-6">
          Plan Your Next Journey <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C81] via-[#38BDF8] to-[#F97316]">With AI Intelligence</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
          Generate highly personalized itineraries, comprehensive budget breakdowns, and trusted hotel selections tailored directly to your criteria in seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/trips/new" className="w-full sm:w-auto bg-[#0F4C81] text-white px-8 py-4 rounded-xl font-medium text-base shadow-lg hover:bg-[#0c3e69] transition-all transform active:scale-[0.98]">
            Start Planning
          </Link>
          <Link href="/login" className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-medium text-base shadow-sm hover:bg-slate-50 transition-all">
            Access Account
          </Link>
        </div>
      </div>
      <div className="absolute bottom-6 text-xs text-slate-400 font-medium">
        Prayana AI — Plan Smarter. Journey Better.
      </div>
    </div>
  );
}