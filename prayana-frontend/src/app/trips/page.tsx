'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Trip } from '@/types';
import { Compass, Trash2, ArrowRight, DollarSign, Calendar, AlertTriangle } from 'lucide-react';

export default function TripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

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

  const openDeleteModal = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTripToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!tripToDelete) return;
    const id = tripToDelete;
    setTripToDelete(null);
    setActionId(id);
    try {
      await api.delete(`/trips/${id}`);
      setTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-sm font-medium text-slate-400 space-y-3 max-w-7xl mx-auto">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F4C81] mx-auto" />
        <p>Loading your trips list...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8 sm:mb-10">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-[#0F4C81] truncate">My Journeys</h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate">Manage, view, or delete your saved travel plans.</p>
          </div>
          <div className="shrink-0">
            <Link href="/trips/new" className="bg-[#0F4C81] text-white font-semibold p-3 md:px-5 md:py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm">
              <Compass className="w-4 h-4" />
              <span className="hidden md:inline">Plan New Journey</span>
            </Link>
          </div>
        </div>

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
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {trip.budgetType} Budget
                    </span>
                    <span className="text-xs font-bold text-[#0F4C81] bg-blue-50 px-2 py-0.5 rounded flex items-center gap-0.5">
                      <DollarSign className="w-3 h-3" />
                      <span>{trip.budgetEstimate.total}</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F4C81] mb-1">{trip.destination}</h3>
                  <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{trip.numberOfDays} Days Trip</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {trip.interests.map((interest, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-blue-50/50 border border-blue-100/60 rounded-full text-slate-600 font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button 
                    onClick={(e) => openDeleteModal(trip._id, e)}
                    disabled={actionId === trip._id}
                    className="text-xs font-bold text-rose-500 hover:text-rose-700 disabled:opacity-40 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{actionId === trip._id ? 'Removing...' : 'Delete'}</span>
                  </button>
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

      {tripToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Travel Plan</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to permanently delete this trip plan?</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setTripToDelete(null)} className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl transition-all">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}