'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { UserPlus, ArrowLeft, Compass } from 'lucide-react';

interface RegisterFormInputs {
  [key: string]: string;
}

interface ApiErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('prayana_token');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    setServerError('');
    try {
      const response = await api.post('/auth/register', data);
      localStorage.setItem('prayana_token', response.data.token);
      router.replace('/dashboard');
    } catch (err) {
      const error = err as ApiErrorResponse;
      setServerError(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white md:bg-slate-50">
      <div className="hidden md:flex md:w-[65%] bg-slate-900 relative overflow-hidden items-center p-8 lg:p-12">
        <Image 
          src="/images/register-travel.png" 
          alt="Scenic Mountain Horizon Trails" 
          fill
          priority
          sizes="65vw"
          className="object-cover opacity-75 object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        <div className="relative z-10 mt-auto max-w-xl">
          <div className="flex items-center gap-2 text-white mb-4">
            <Compass className="w-8 h-8 text-[#38BDF8]" />
            <span className="text-2xl font-bold tracking-tight">Prayana AI</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">Map your dreams into timelines.</h2>
          <p className="text-base lg:text-lg text-slate-200 font-medium leading-relaxed max-w-lg">Join thousands of travelers utilizing smart structural mapping tools to automate beautiful international paths.</p>
        </div>
      </div>

      <div className="w-full md:w-[35%] flex items-center justify-center p-6 sm:p-12 md:p-8 lg:p-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 text-[#0F4C81] mb-8 md:hidden">
            <Compass className="w-6 h-6 text-[#0F4C81]" />
            <span className="text-xl font-bold tracking-tight">Prayana <span className="text-[#38BDF8]">AI</span></span>
          </div>

          <h2 className="text-3xl font-extrabold text-[#0F4C81] tracking-tight mb-2">Create Account</h2>
          <p className="text-sm text-slate-500 mb-8 font-medium">Sign up to start planning your next travel trip.</p>

          {serverError && (
            <div className="p-4 mb-5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-xl border border-rose-100">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                {...register('name', { required: true })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] text-sm font-medium bg-slate-50/40 focus:bg-white transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                {...register('email', { required: true })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] text-sm font-medium bg-slate-50/40 focus:bg-white transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password"
                {...register('password', { required: true })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0F4C81] text-sm font-medium bg-slate-50/40 focus:bg-white transition-colors" 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#0F4C81] hover:bg-[#0c3d69] text-white rounded-xl py-3.5 text-sm font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Creating your account...' : 'Sign Up'}</span>
            </button>
          </form>

          <p className="text-center md:text-left text-xs text-slate-500 mt-8 font-medium flex items-center justify-center md:justify-start gap-1">
            <span>Already registered?</span> 
            <Link href="/login" className="text-[#38BDF8] hover:text-[#0F4C81] transition-colors underline font-semibold flex items-center gap-0.5">
              <ArrowLeft className="w-3 h-3" />
              <span>Login here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}