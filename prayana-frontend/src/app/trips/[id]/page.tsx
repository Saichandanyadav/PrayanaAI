'use client';
import { useEffect, useState, use } from 'react';
import api from '@/lib/api';
import { Trip, ItineraryDay } from '@/types';
import jsPDF from 'jspdf';
import { Download, MapPin, RefreshCw, Plane, Hotel, Coins, Star, Globe } from 'lucide-react';

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
  const [instructions, setInstructions] = useState<{ [key: number]: string }>({});
  const [currency, setCurrency] = useState<CurrencyKey>('USD');

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
    setRegenLoading(dayNum);
    try {
      const response = await api.post(`/trips/${resolvedParams.id}/regenerate-day`, {
        day: dayNum,
        specialInstructions: instructions[dayNum] || ''
      });
      setTrip(response.data);
      setInstructions(prev => ({ ...prev, [dayNum]: '' }));
    } catch (err) {
      console.error(err);
    } finally {
      setRegenLoading(null);
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
            <div key={item.day} className="premium-card p-4 sm:p-6 bg-white">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3 sm:pb-4 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-bold text-[#0F4C81]">Day {item.day} Activities</h3>
                {regenLoading === item.day && <span className="text-xs font-semibold text-orange-500 animate-pulse">Updating day timeline...</span>}
              </div>
              <ul className="space-y-3 pl-1 sm:pl-2">
                {item.activities.map((act, index) => (
                  <li key={index} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 sm:gap-3">
                    <MapPin className="w-4 h-4 text-[#38BDF8] mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-50 flex flex-col sm:flex-row items-center gap-2">
                <input type="text" placeholder="e.g. Add more outdoor exploration tours" value={instructions[item.day] || ''} onChange={(e) => setInstructions(prev => ({ ...prev, [item.day]: e.target.value }))} className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#0F4C81]" />
                <button onClick={() => handleRegenDay(item.day)} disabled={regenLoading !== null} className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-all flex items-center justify-center gap-1">
                  <RefreshCw className={`w-3 h-3 ${regenLoading === item.day ? 'animate-spin' : ''}`} />
                  <span>Regenerate Day</span>
                </button>
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
                <div key={idx} className="premium-card p-4 sm:p-5 bg-white">
                  <div className="flex items-start justify-between mb-1.5 gap-2">
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">{hotel.name}</h4>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded font-semibold whitespace-nowrap flex items-center gap-0.5">
                      <span>{hotel.rating}</span>
                      <Star className="w-2.5 h-2.5 sm:w-3 h-3 fill-emerald-600 stroke-none" />
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-bold tracking-wide uppercase mb-2">{hotel.category} • Budget {hotel.budgetLevel}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{hotel.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}