'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Trip } from '@/types';
import { Compass, Briefcase, ArrowRight, DollarSign, Calendar } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('prayana_token');
    if (!token) {
      router.replace('/login');
      return;
    }

    api.get('/trips')
      .then((res) => setTrips(res.data))
      .catch((err) => {
        console.error(err);
        localStorage.removeItem('prayana_token');
        router.replace('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const totalBudgetCost = trips.reduce((sum, trip) => sum + (trip.budgetEstimate?.total || 0), 0);
  const totalPlannedDays = trips.reduce((sum, trip) => sum + (trip.numberOfDays || 0), 0);

  if (loading) {
    return (
      <div className="p-12 text-center text-sm font-medium text-slate-400 space-y-3 max-w-7xl mx-auto">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C81] mx-auto" />
        <p>Loading your space...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8 sm:mb-10">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-[#0F4C81] truncate">Dashboard Workspace</h1>
          <p className="text-xs sm:text-sm text-slate-500 truncate">View and manage your travel items.</p>
        </div>
        <div className="shrink-0">
          <Link href="/trips/new" className="bg-[#0F4C81] text-white font-semibold p-3 md:px-5 md:py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm">
            <Compass className="w-4 h-4" />
            <span className="hidden md:inline">Plan New Journey</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="premium-card p-6 bg-gradient-to-br from-blue-50/50 to-white flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Trips</div>
            <div className="text-4xl font-extrabold text-[#0F4C81]">{trips.length}</div>
          </div>
          <Briefcase className="w-8 h-8 text-[#0F4C81] opacity-20" />
        </div>

        <div className="premium-card p-6 bg-gradient-to-br from-emerald-50/50 to-white flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Travel Budget</div>
            <div className="text-4xl font-extrabold text-emerald-600">${totalBudgetCost}</div>
          </div>
          <DollarSign className="w-8 h-8 text-emerald-600 opacity-20" />
        </div>

        <div className="premium-card p-6 bg-gradient-to-br from-orange-50/50 to-white flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Travel Days</div>
            <div className="text-4xl font-extrabold text-[#F97316]">{totalPlannedDays}</div>
          </div>
          <Calendar className="w-8 h-8 text-[#F97316] opacity-20" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Travel Plans</h2>
      {trips.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-3xl text-center p-16 bg-white">
          <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-700 text-lg mb-1">No trips found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">Create your first personalized travel path using our AI assistant tool.</p>
          <Link href="/trips/new" className="bg-[#0F4C81] text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex">Create Travel Plan</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip._id} className="premium-card overflow-hidden flex flex-col bg-white">
              <div className="p-6 flex-1">
                <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  {trip.budgetType} Budget
                </span>
                <h3 className="text-xl font-bold text-[#0F4C81] mb-1">{trip.destination}</h3>
                <p className="text-xs text-slate-400 mb-4">{trip.numberOfDays} Days Travel Duration</p>
                <div className="flex flex-wrap gap-1.5">
                  {trip.interests.slice(0, 3).map((interest, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-blue-50/50 border border-blue-100/60 rounded-full text-slate-600 font-medium">{interest}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex justify-end">
                <Link href={`/trips/${trip._id}`} className="text-xs font-bold text-[#0F4C81] hover:text-[#38BDF8] flex items-center gap-1">
                  <span>View Timeline</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}