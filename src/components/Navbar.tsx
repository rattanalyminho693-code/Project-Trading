import React from 'react';
import { Role, Language, UserAccount } from '../types';
import { TrendingUp, ShieldCheck, Zap, Lock, Globe, LogOut, User } from 'lucide-react';

interface NavbarProps {
  currentRole: Role;
  setRole: (role: Role) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenArchitecture: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingPaymentCount: number;
  onOpenMT5?: () => void;
  mt5Enabled?: boolean;
  isMT5Authorized?: boolean;
  authenticatedCustomer?: UserAccount | null;
  onOpenCustomerAuth?: () => void;
  onLogoutCustomer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  lang,
  setLang,
  activeTab,
  setActiveTab,
  pendingPaymentCount,
  authenticatedCustomer,
  onOpenCustomerAuth,
  onLogoutCustomer
}) => {
  const isKm = lang === 'km';

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single wordmark */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            <TrendingUp className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
            AlphaSignal<span className="text-amber-500">.VIP</span>
          </span>
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'home' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isKm ? 'ទំព័រដើម' : 'Home'}
          </button>

          <button
            onClick={() => {
              if (currentRole === 'visitor') {
                setActiveTab('pricing');
              } else if (currentRole === 'member') {
                setActiveTab('payment');
              } else {
                setActiveTab('signals');
              }
            }}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'signals' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>VIP Signals</span>
            {currentRole === 'visitor' && <Lock className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          <button
            onClick={() => setActiveTab('academy')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'academy' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isKm ? 'វីដេអូមេរៀន' : 'Academy'}
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'chat' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isKm ? 'ឆាត Telegram' : 'Community'}
          </button>

          <button
            onClick={() => setActiveTab('management')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'management' ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isKm ? 'គ្រប់គ្រងមុខតំណែង' : 'Management'}
          </button>
        </nav>

        {/* Zone 3: Language toggle & Primary Customer Auth / Account Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setLang(lang === 'km' ? 'en' : 'km')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">{lang === 'km' ? 'ខ្មែរ' : 'EN'}</span>
          </button>

          {currentRole === 'admin' ? (
            <button
              onClick={() => setActiveTab('management')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {isKm ? 'ផ្ទាំងគ្រប់គ្រង' : 'Management'}
                {pendingPaymentCount > 0 ? ` (${pendingPaymentCount})` : ''}
              </span>
            </button>
          ) : authenticatedCustomer ? (
            <button
              onClick={onLogoutCustomer}
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
              title={isKm ? 'ចាកចេញពីគណនីអតិថិជន' : 'Sign Out Customer Account'}
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[120px] truncate">{authenticatedCustomer.name}</span>
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
            </button>
          ) : (
            <button
              onClick={onOpenCustomerAuth}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              {currentRole === 'vip' ? <Zap className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              <span>{isKm ? 'ចូល / ចុះឈ្មោះ (Gmail)' : 'Login / Sign Up'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

