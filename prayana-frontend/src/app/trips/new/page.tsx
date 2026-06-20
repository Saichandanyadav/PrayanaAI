'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { Utensils, Landmark, Compass, ShoppingBag, TreePine, Camera, Plane, Sparkles } from 'lucide-react';

const INTEREST_OPTIONS = [
  { label: 'Food', value: 'Food', icon: Utensils },
  { label: 'Culture', value: 'Culture', icon: Landmark },
  { label: 'Adventure', value: 'Adventure', icon: Compass },
  { label: 'Shopping', value: 'Shopping', icon: ShoppingBag },
  { label: 'Nature', value: 'Nature', icon: TreePine },
  { label: 'Photography', value: 'Photography', icon: Camera }
];

const LOADING_STEPS = [
  "Planning your journey...",
  "Finding the best experiences...",
  "Building your personalized itinerary...",
  "Estimating your travel budget...",
  "Discovering recommended hotels..."
];

function NewTripForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const destParam = searchParams.get('destination');
    if (destParam) {
      setDestination(destParam);
    }
  }, [searchParams]);

  const toggleInterest = (val: string) => {
    setSelectedInterests(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const handleGenerate = async () => {
    if (!destination || selectedInterests.length === 0) return;
    setLoading(true);
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % LOADING_STEPS.length);
    }, 2200);

    try {
      const response = await api.post('/trips', {
        destination,
        numberOfDays: days,
        budgetType: budget,
        interests: selectedInterests
      });
      clearInterval(stepInterval);
      router.push(`/trips/${response.data._id}`);
    } catch (err) {
      console.error(err);
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-slate-100 border-t-[#0F4C81] rounded-full animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-lg">
            <Plane className="w-5 h-5 text-[#0F4C81] animate-bounce" />
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-[#0F4C81] mb-2 animate-pulse px-4">{LOADING_STEPS[loadingStep]}</h3>
        <p className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide uppercase">Creating your schedule now</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-5xl mb-6 md:mb-8 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F4C81] mb-1">Set Up Your Journey</h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-500">Fill in the fields to generate an AI plan for your travel.</p>
      </div>

      <div className="w-full max-w-5xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 rounded-2xl md:rounded-3xl p-4 sm:p-8 md:p-10 flex flex-col justify-between min-h-[500px] lg:min-h-[450px]">
        <div className="space-y-5 md:space-y-6">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 md:text-sm">Where do you want to go?</label>
            <input type="text" placeholder="e.g. Tokyo, Paris, Iceland" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full px-4 sm:px-5 py-2.5 md:py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] text-sm md:text-base font-medium bg-slate-50/40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 md:text-sm">Number of Days</label>
              <input type="number" min={1} max={14} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full px-4 sm:px-5 py-2.5 md:py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] text-sm md:text-base font-medium bg-slate-50/40" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 md:text-sm">Trip Budget Level</label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(['Low', 'Medium', 'High'] as const).map((tier) => (
                  <button key={tier} type="button" onClick={() => setBudget(tier)} className={`py-2.5 md:py-3 rounded-xl border text-xs sm:text-sm md:text-base font-semibold transition-all ${budget === tier ? 'border-[#0F4C81] bg-[#0F4C81]/5 text-[#0F4C81]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 md:text-sm">Select Your Interests</label>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              {INTEREST_OPTIONS.map((item) => {
                const active = selectedInterests.includes(item.value);
                const Icon = item.icon;
                return (
                  <button key={item.value} type="button" onClick={() => toggleInterest(item.value)} className={`p-3 md:p-3.5 rounded-xl border text-left text-xs sm:text-sm md:text-base font-medium transition-all flex items-center justify-between ${active ? 'border-[#38BDF8] bg-[#38BDF8]/5 text-slate-800 font-semibold shadow-sm' : 'border-slate-100 bg-slate-50/40 text-slate-600 hover:bg-slate-50'}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${active ? 'text-[#38BDF8]' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {active && <span className="text-[10px] bg-[#38BDF8] text-white rounded-full w-4 h-4 flex-shrink-0 flex items-center justify-center">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 w-full">
          <button type="button" onClick={handleGenerate} disabled={!destination || selectedInterests.length === 0} className="w-full bg-[#0F4C81] hover:bg-[#0c3d69] text-white rounded-xl py-3.5 md:py-4 text-sm md:text-base font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 transition-all hover:shadow-lg transform active:scale-[0.99]">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Generate AI Travel Itinerary</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewTripPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-medium text-slate-400">Loading form setup...</div>}>
      <NewTripForm />
    </Suspense>
  );
}