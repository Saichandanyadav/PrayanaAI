'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Compass, LayoutDashboard, Map, LogOut, Menu, X, AlertTriangle, Lightbulb, Wallet, Globe } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('prayana_token'));
  }, [pathname]);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    setIsOpen(false);
    localStorage.removeItem('prayana_token');
    router.replace('/login');
  };

  if (['/login', '/register', '/'].includes(pathname)) return null;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          <div className="flex items-center min-w-max z-50">
            <Link href="/dashboard" className="text-xl font-bold text-[#0F4C81] tracking-tight flex items-center gap-2 whitespace-nowrap" onClick={() => setIsOpen(false)}>
              <Compass className="w-6 h-6 text-[#0F4C81] flex-shrink-0" />
              <span>Prayana <span className="text-[#38BDF8]">AI</span></span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-6 text-sm font-medium text-slate-600 absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <Link href="/dashboard" className={`flex items-center gap-1.5 transition-colors ${pathname === '/dashboard' ? 'text-[#0F4C81] font-semibold' : 'hover:text-[#0F4C81]'}`}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/trips" className={`flex items-center gap-1.5 transition-colors ${pathname === '/trips' ? 'text-[#0F4C81] font-semibold' : 'hover:text-[#0F4C81]'}`}>
              <Map className="w-4 h-4" />
              <span>My Trips</span>
            </Link>
            <Link href="/explore" className={`flex items-center gap-1.5 transition-colors ${pathname === '/explore' ? 'text-[#0F4C81] font-semibold' : 'hover:text-[#0F4C81]'}`}>
              <Globe className="w-4 h-4" />
              <span>Top Places</span>
            </Link>
            <Link href="/travel-tips" className={`flex items-center gap-1.5 transition-colors ${pathname === '/travel-tips' ? 'text-[#0F4C81] font-semibold' : 'hover:text-[#0F4C81]'}`}>
              <Lightbulb className="w-4 h-4" />
              <span>Travel Tips</span>
            </Link>
            <Link href="/essentials" className={`flex items-center gap-1.5 transition-colors ${pathname === '/essentials' ? 'text-[#0F4C81] font-semibold' : 'hover:text-[#0F4C81]'}`}>
              <Wallet className="w-4 h-4" />
              <span>Essentials</span>
            </Link>
            <Link href="/trips/new" className={`flex items-center gap-1.5 transition-colors ${pathname === '/trips/new' ? 'text-[#0F4C81] font-semibold' : 'hover:text-[#0F4C81]'}`}>
              <Compass className="w-4 h-4" />
              <span>Plan a Journey</span>
            </Link>
          </div>

          <div className="hidden lg:flex justify-end items-center gap-4">
            <button onClick={() => setShowLogoutModal(true)} className="text-sm font-medium text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1.5">
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>

          <div className="flex lg:hidden items-center z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className={`fixed inset-y-0 right-0 z-40 w-full bg-white p-6 pt-24 shadow-xl flex flex-col gap-2 text-base font-medium text-slate-600 transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl ${pathname === '/dashboard' ? 'bg-slate-50 text-[#0F4C81] font-semibold' : 'hover:bg-slate-50 hover:text-[#0F4C81]'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/trips" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl ${pathname === '/trips' ? 'bg-slate-50 text-[#0F4C81] font-semibold' : 'hover:bg-slate-50 hover:text-[#0F4C81]'}`}>
            <Map className="w-5 h-5" />
            <span>My Trips</span>
          </Link>
          <Link href="/explore" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl ${pathname === '/explore' ? 'bg-slate-50 text-[#0F4C81] font-semibold' : 'hover:bg-slate-50 hover:text-[#0F4C81]'}`}>
            <Globe className="w-5 h-5" />
            <span>Top Places</span>
          </Link>
          <Link href="/travel-tips" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl ${pathname === '/travel-tips' ? 'bg-slate-50 text-[#0F4C81] font-semibold' : 'hover:bg-slate-50 hover:text-[#0F4C81]'}`}>
            <Lightbulb className="w-5 h-5" />
            <span>Travel Tips</span>
          </Link>
          <Link href="/essentials" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl ${pathname === '/essentials' ? 'bg-slate-50 text-[#0F4C81] font-semibold' : 'hover:bg-slate-50 hover:text-[#0F4C81]'}`}>
            <Wallet className="w-5 h-5" />
            <span>Essentials</span>
          </Link>
          <Link href="/trips/new" onClick={() => setIsOpen(false)} className={`flex items-center gap-3 py-3 px-4 rounded-xl ${pathname === '/trips/new' ? 'bg-slate-50 text-[#0F4C81] font-semibold' : 'hover:bg-slate-50 hover:text-[#0F4C81]'}`}>
            <Compass className="w-5 h-5" />
            <span>Plan a Journey</span>
          </Link>
          <button onClick={() => { setIsOpen(false); setShowLogoutModal(true); }} className="flex items-center gap-3 py-3 px-4 rounded-xl text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left w-full mt-auto border-t border-slate-100 pt-6">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Log Out</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to log out of your travel account?</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl transition-all">
                Cancel
              </button>
              <button onClick={handleLogoutConfirm} className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl transition-all">
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}