
import React, { useState, useEffect, useRef } from 'react';
import { Dashboard } from './components/Dashboard.tsx';
import { Timetable } from './components/Timetable.tsx';
import { SystemInsights } from './components/SystemInsights.tsx';
import { Settings } from './components/Settings.tsx';
import { Learning } from './components/Learning.tsx';
import { Market } from './components/Market.tsx';
import { FocusFlow } from './components/FocusFlow.tsx';
import { ACLChecklist } from './components/ACLChecklist.tsx';

export type View = 'dashboard' | 'timetable' | 'insights' | 'settings' | 'learning' | 'market' | 'flow' | 'acl';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const [isFocusActive, setIsFocusActive] = useState(() => localStorage.getItem('ess_sw_active') === 'true');

  const navigateTo = (view: View) => {
    setCurrentView(view);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleStorage = () => {
      setIsFocusActive(localStorage.getItem('ess_sw_active') === 'true');
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(handleStorage, 1000);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard onNavigate={navigateTo} />;
      case 'timetable': return <Timetable />;
      case 'insights': return <SystemInsights />;
      case 'flow': return <FocusFlow onBack={() => navigateTo('dashboard')} />;
      case 'learning': return <Learning />;
      case 'market': return <Market />;
      case 'acl': return <ACLChecklist />;
      case 'settings': return <Settings onBack={() => navigateTo('dashboard')} onNotifyRequest={() => {}} notifyStatus="default" />;
      default: return <Dashboard onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="h-full w-full bg-black flex flex-col relative overflow-hidden">
      {/* Nothing 2a Bezel-less Status Bar Support */}
      <header className="px-8 flex justify-between items-center z-40 relative pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-4">
        <div onClick={() => navigateTo('dashboard')} className="cursor-pointer active:scale-95 transition-transform group">
          <h1 className="text-xl font-black tracking-tighter dot-matrix uppercase flex items-center gap-1">
            Essential<span className={`transition-all duration-700 ${isFocusActive ? 'nothing-red animate-pulse' : 'text-zinc-900 group-hover:text-zinc-700'}`}>•</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center">
           <div className={`w-2 h-2 rounded-full ${isFocusActive ? 'nothing-red-bg shadow-[0_0_10px_red]' : 'bg-zinc-900'}`} />
        </div>
      </header>

      {/* Main Content Area */}
      <main ref={mainScrollRef} className="flex-1 overflow-y-auto no-scrollbar relative z-10 px-6 pt-2 pb-44">
        <div className="max-w-xl mx-auto">
          {renderView()}
        </div>
      </main>

      {/* Nothing 2a Bezel-less Gesture Bar Support */}
      <nav className="fixed bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[420px]">
        <div className="glass-card rounded-full p-2 flex items-center justify-between shadow-[0_40px_80px_rgba(0,0,0,0.8)] border-white/5 bg-zinc-950/90 backdrop-blur-3xl">
          <button onClick={() => navigateTo('dashboard')} className={`flex-1 py-4 rounded-full text-[9px] uppercase tracking-[0.4em] font-black transition-all ${currentView === 'dashboard' ? 'bg-white text-black' : 'text-zinc-700 hover:text-zinc-400'}`}>Core</button>
          <button onClick={() => navigateTo('insights')} className={`flex-1 py-4 rounded-full text-[9px] uppercase tracking-[0.4em] font-black transition-all ${currentView === 'insights' ? 'bg-white text-black' : 'text-zinc-700 hover:text-zinc-400'}`}>Log</button>
          <button onClick={() => navigateTo('flow')} className={`flex-1 py-4 rounded-full text-[9px] uppercase tracking-[0.4em] font-black transition-all ${currentView === 'flow' ? 'bg-white text-black' : 'nothing-red hover:opacity-80'}`}>Flow</button>
          <button onClick={() => navigateTo('settings')} className={`w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-90 ${currentView === 'settings' ? 'bg-white text-black' : 'text-zinc-800 hover:text-white'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
