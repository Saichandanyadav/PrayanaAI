'use client';
import { useEffect, useState, use } from 'react';
import api from '@/lib/api';
import { Trip } from '@/types';
import jsPDF from 'jspdf';
import { Download, MapPin, RefreshCw, Hotel, Coins, Star, Globe, Trash2, Edit2, Check, X, Plus } from 'lucide-react';

const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  INR: { symbol: '₹', rate: 86.5, label: 'INR (₹)' },
  EUR: { symbol: '€', rate: 0.94, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  AUD: { symbol: 'A$', rate: 1.58, label: 'AUD (A$)' },
  CAD: { symbol: 'C$', rate: 1.41, label: 'CAD (C$)' },
  JPY: { symbol: '¥', rate: 154.2, label: 'JPY (¥)' },
  AED: { symbol: 'د.إ', rate: 3.67, label: 'AED (د.إ)' },
  SGD: { symbol: 'S$', rate: 1.35, label: 'SGD (S$)' }
};

type CurrencyKey = keyof typeof CURRENCIES;

export default function TripDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenLoading, setRegenLoading] = useState<number | null>(null);
  const [currency, setCurrency] = useState<CurrencyKey>('USD');
  const [newActivityText, setNewActivityText] = useState<{ [key: number]: string }>({});
  const [editingTarget, setEditingTarget] = useState<{ day: number; index: number } | null>(null);
  const [editingText, setEditingText] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<{ day: number; index: number } | null>(null);

  useEffect(() => {
    api.get(`/trips/${resolvedParams.id}`)
      .then(res => setTrip(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [resolvedParams.id]);

  const activeCurrency = CURRENCIES[currency];

  const formatCost = (usdAmount: number) => {
    const converted = Math.round(usdAmount * activeCurrency.rate);
    return `${activeCurrency.symbol}${converted.toLocaleString()}`;
  };

  const handleRegenDay = async (dayNum: number) => {
    const text = newActivityText[dayNum]?.trim() || '';
    setRegenLoading(dayNum);
    try {
      const response = await api.post(`/trips/${resolvedParams.id}/regenerate-day`, {
        day: dayNum,
        specialInstructions: text
      });
      setTrip(response.data);
      setNewActivityText(prev => ({ ...prev, [dayNum]: '' }));
    } catch (err) {
      console.error(err);
    } finally {
      setRegenLoading(null);
    }
  };

  const handleAddActivity = async (dayNum: number) => {
    const text = newActivityText[dayNum]?.trim();
    if (!text) return;
    try {
      const response = await api.post(`/trips/${resolvedParams.id}/activity`, {
        day: dayNum,
        activity: text
      });
      setTrip(response.data);
      setNewActivityText(prev => ({ ...prev, [dayNum]: '' }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartEdit = (dayNum: number, idx: number, currentText: string) => {
    setEditingTarget({ day: dayNum, index: idx });
    setEditingText(currentText);
  };

  const handleSaveEdit = async () => {
    if (!editingTarget || !editingText.trim()) return;
    try {
      const response = await api.put(`/trips/${resolvedParams.id}/activity`, {
        day: editingTarget.day,
        activityIndex: editingTarget.index,
        updatedActivity: editingText.trim()
      });
      setTrip(response.data);
      setEditingTarget(null);
      setEditingText('');
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDeleteActivity = async () => {
    if (!deleteTarget) return;
    try {
      const response = await api.delete(`/trips/${resolvedParams.id}/activity`, {
        data: { day: deleteTarget.day, activityIndex: deleteTarget.index }
      });
      setTrip(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTarget(null);
    }
  };

  const exportToPDF = () => {
    if (!trip) return;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const contentWidth = 170;
    let currentY = 25;

    const checkPageBreak = (neededHeight: number) => {
      if (currentY + neededHeight > pageHeight - margin) {
        doc.addPage();
        currentY = 25;
      }
    };

    doc.setFillColor(15, 76, 129);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text(`PRAYANA AI`, margin, 18);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Official Travel Itinerary Blueprint: ${trip.destination}`, margin, 26);
    
    currentY = 52;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 76, 129);
    doc.text('Trip Details', margin, currentY);
    
    currentY += 8;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY, margin + contentWidth, currentY);
    
    currentY += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(`Destination: ${trip.destination}`, margin, currentY);
    doc.text(`Duration: ${trip.numberOfDays} Days`, margin + 60, currentY);
    doc.text(`Budget Tier: ${trip.budgetType}`, margin + 120, currentY);
    
    currentY += 6;
    doc.text(`Interests: ${trip.interests.join(', ')}`, margin, currentY);
    
    currentY += 14;
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 76, 129);
    doc.text(`Budget Estimates (${currency})`, margin, currentY);
    
    currentY += 8;
    doc.line(margin, currentY, margin + contentWidth, currentY);
    
    currentY += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(`Flights cost: ${formatCost(trip.budgetEstimate.flights)}`, margin, currentY);
    doc.text(`Hotel cost: ${formatCost(trip.budgetEstimate.accommodation)}`, margin + 85, currentY);
    
    currentY += 6;
    doc.text(`Food cost: ${formatCost(trip.budgetEstimate.food)}`, margin, currentY);
    doc.text(`Activities cost: ${formatCost(trip.budgetEstimate.activities)}`, margin + 85, currentY);
    
    currentY += 8;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 76, 129);
    doc.text(`Total Budget: ${formatCost(trip.budgetEstimate.total)}`, margin, currentY);
    
    currentY += 16;
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 76, 129);
    doc.text('Recommended Hotels', margin, currentY);
    
    currentY += 8;
    doc.line(margin, currentY, margin + contentWidth, currentY);
    currentY += 4;

    trip.hotels.forEach((hotel) => {
      const descLines = doc.splitTextToSize(hotel.description, contentWidth);
      const neededHeight = 16 + (descLines.length * 5);
      
      currentY += 6;
      checkPageBreak(neededHeight);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(30, 41, 59);
      doc.text(`${hotel.name} (${hotel.rating} Stars)`, margin, currentY);
      
      currentY += 5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(249, 115, 22);
      doc.text(`Type: ${hotel.category} | Budget: ${hotel.budgetLevel}`, margin, currentY);
      
      currentY += 5;
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      descLines.forEach((line: string) => {
        checkPageBreak(6);
        doc.text(line, margin, currentY);
        currentY += 5;
      });
    });

    currentY += 12;
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(15, 76, 129);
    doc.text('Day-by-Day Travel Schedule', margin, currentY);
    
    currentY += 8;
    doc.line(margin, currentY, margin + contentWidth, currentY);
    currentY += 4;

    trip.itinerary.forEach((item) => {
      currentY += 6;
      checkPageBreak(15);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(15, 76, 129);
      doc.text(`Day ${item.day}`, margin, currentY);
      currentY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      
      item.activities.forEach((act) => {
        const cleanActText = `* ${act}`;
        const splitActivityLines = doc.splitTextToSize(cleanActText, contentWidth);
        const activityBlockHeight = splitActivityLines.length * 5.5;
        
        checkPageBreak(activityBlockHeight);
        
        splitActivityLines.forEach((line: string) => {
          doc.text(line, margin, currentY);
          currentY += 5.5;
          if (currentY > pageHeight - margin) {
            doc.addPage();
            currentY = 25;
          }
        });
        currentY += 2;
      });
      currentY += 4;
    });

    doc.save(`Prayana_AI_Itinerary_${trip.destination}.pdf`);
  };

  if (loading || !trip) return <div className="p-12 text-center text-sm font-medium text-slate-400">Loading trip information...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-6 sm:pb-8 mb-6 sm:mb-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-4xl font-extrabold text-[#0F4C81] tracking-tight mb-1 truncate">Trip Blueprint: {trip.destination}</h1>
          <p className="text-[10px] sm:text-sm text-slate-500 font-medium">Trip ID: {trip._id}</p>
        </div>
        <button onClick={exportToPDF} className="bg-[#F97316] hover:bg-orange-600 text-white font-semibold p-3 md:px-5 md:py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm shrink-0">
          <Download className="w-4 h-4" />
          <span className="hidden md:inline">Export to PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Travel Itinerary Flow</h2>
          {trip.itinerary.map((item) => (
            <div key={item.day} className="premium-card p-4 sm:p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3 sm:pb-4 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#0F4C81]">Day {item.day} Activities</h3>
                {regenLoading === item.day && <span className="text-xs font-semibold text-orange-500 animate-pulse">Updating day timeline...</span>}
              </div>
              
              <ul className="space-y-3 pl-1 sm:pl-2 mb-6">
                {item.activities.map((act, index) => {
                  const isEditing = editingTarget?.day === item.day && editingTarget?.index === index;
                  return (
                    <li key={index} className="text-xs sm:text-sm text-slate-600 flex items-start justify-between gap-3 group bg-slate-50/50 hover:bg-slate-50 p-2.5 rounded-xl border border-transparent hover:border-slate-100 transition-all">
                      <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                        <MapPin className="w-4 h-4 text-[#38BDF8] mt-0.5 flex-shrink-0" />
                        {isEditing ? (
                          <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} className="w-full px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:border-[#0F4C81] bg-white text-slate-800" />
                        ) : (
                          <span className="leading-relaxed break-words text-slate-700 font-medium">{act}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        {isEditing ? (
                          <>
                            <button onClick={handleSaveEdit} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"><Check className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setEditingTarget(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded transition-colors"><X className="w-3.5 h-3.5" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleStartEdit(item.day, index, act)} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => setDeleteTarget({ day: item.day, index })} className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col sm:flex-row items-center gap-2 border-t border-slate-100 pt-4">
                <input type="text" placeholder="Add custom activity or instructions to regenerate day..." value={newActivityText[item.day] || ''} onChange={(e) => setNewActivityText(prev => ({ ...prev, [item.day]: e.target.value }))} className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                  <button onClick={() => handleAddActivity(item.day)} className="bg-[#0F4C81] hover:bg-[#0c3e69] text-white p-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 px-3 font-semibold h-9"><Plus className="w-3.5 h-3.5" /> Add</button>
                  <button onClick={() => handleRegenDay(item.day)} disabled={regenLoading !== null} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all flex items-center justify-center gap-1 h-9">
                    <RefreshCw className={`w-3 h-3 ${regenLoading === item.day ? 'animate-spin' : ''}`} />
                    <span>Regenerate Day</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
          <div>
            <div className="premium-card p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-100">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 pb-4 mb-4">
                <div className="flex items-center gap-1.5 text-slate-800 shrink-0">
                  <Coins className="w-5 h-5 text-[#0F4C81]" />
                  <h2 className="text-lg sm:text-2xl font-bold">Trip Costs</h2>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 sm:px-2.5 py-1.5 rounded-lg shadow-sm max-w-[140px] sm:max-w-none">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <select value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyKey)} className="bg-transparent text-xs font-bold text-slate-600 outline-none pr-1 cursor-pointer min-w-0 w-full">
                    {Object.entries(CURRENCIES).map(([key, value]) => (
                      <option key={key} value={key}>{value.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs sm:text-sm"><span className="text-slate-500 font-medium">Flights</span><span className="font-bold text-slate-800">{formatCost(trip.budgetEstimate.flights)}</span></div>
                <div className="flex justify-between text-xs sm:text-sm"><span className="text-slate-500 font-medium">Hotels</span><span className="font-bold text-slate-800">{formatCost(trip.budgetEstimate.accommodation)}</span></div>
                <div className="flex justify-between text-xs sm:text-sm"><span className="text-slate-500 font-medium">Food</span><span className="font-bold text-slate-800">{formatCost(trip.budgetEstimate.food)}</span></div>
                <div className="flex justify-between text-xs sm:text-sm"><span className="text-slate-500 font-medium">Activities</span><span className="font-bold text-slate-800">{formatCost(trip.budgetEstimate.activities)}</span></div>
                <div className="border-t border-slate-200 pt-3 flex justify-between text-sm sm:text-base font-extrabold text-[#0F4C81]"><span className="font-bold">Total Budget</span><span>{formatCost(trip.budgetEstimate.total)}</span></div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-4 text-slate-800">
              <Hotel className="w-5 h-5 text-[#0F4C81]" />
              <h2 className="text-xl sm:text-2xl font-bold">Suggested Places to Stay</h2>
            </div>
            <div className="space-y-4">
              {trip.hotels.map((hotel, idx) => (
                <div key={idx} className="premium-card p-4 sm:p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">{hotel.name}</h4>
                    <span className="flex items-center gap-0.5 text-xs text-amber-500 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-md font-bold shrink-0"><Star className="w-3 h-3 fill-amber-500" /> {hotel.rating}</span>
                  </div>
                  <div className="flex gap-1.5 mb-2.5 flex-wrap">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{hotel.category}</span>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded uppercase tracking-wider">{hotel.budgetLevel} Budget</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{hotel.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-100 transform transition-all scale-100">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Activity?</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">Are you sure you want to remove this activity from your itinerary? This cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors">Cancel</button>
              <button onClick={confirmDeleteActivity} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}