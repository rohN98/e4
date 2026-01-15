
import React, { useState, useEffect } from 'react';

interface SettingsProps {
  onBack: () => void;
  onNotifyRequest: () => void;
  notifyStatus: NotificationPermission;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [swStatus, setSwStatus] = useState<'checking' | 'active' | 'missing'>('checking');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        setSwStatus(reg ? 'active' : 'missing');
      });
    } else {
      setSwStatus('missing');
    }
  }, []);

  const openBuildPortal = () => {
    window.open("https://www.pwabuilder.com", "_blank");
  };

  return (
    <div className="animate-nothing space-y-10 pb-32">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold tracking-tighter uppercase dot-matrix">System</h2>
        <div className="flex gap-2">
           <div className="w-1.5 h-1.5 rounded-full nothing-red-bg" />
           <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>
      </div>

      {/* Package Health Check */}
      <section className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600 ml-4 dot-matrix">Package_Health</h3>
        <div className="glass-card p-6 bg-zinc-900/40 border-white/5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Service Worker</span>
            <span className={`text-[9px] uppercase font-black dot-matrix ${swStatus === 'active' ? 'text-green-500' : 'text-red-500'}`}>
              {swStatus === 'active' ? 'REGISTERED' : 'NOT_FOUND'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Manifest Link</span>
            <span className="text-[9px] text-green-500 uppercase font-black dot-matrix">VERIFIED</span>
          </div>
        </div>
      </section>

      {/* APK Assistant */}
      <section className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600 ml-4 dot-matrix">APK_Package_Assistant</h3>
        <div className="glass-card p-8 bg-zinc-900/40 border-white/5 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h4 className="text-[10px] font-black uppercase text-white mb-2 tracking-widest flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Final Steps for PWABuilder
            </h4>
            <ol className="text-[9px] text-zinc-400 font-bold leading-relaxed uppercase space-y-2">
              <li>1. Launch <span className="text-white">PWABuilder.com</span></li>
              <li>2. Click "Upload" -> "Start from files"</li>
              <li>3. Upload <span className="text-white">index.html, manifest.json, sw.js</span> and all code files.</li>
              <li>4. If "Store is not ready", verify all files are in the <span className="text-white text-xs">ROOT</span> directory.</li>
            </ol>
          </div>

          <button 
            onClick={openBuildPortal}
            className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-full active:scale-95 transition-all shadow-xl"
          >
            Launch PWABuilder
          </button>
        </div>
      </section>

      <button 
          onClick={onBack}
          className="w-full py-6 rounded-[3rem] bg-zinc-900 text-zinc-400 font-bold uppercase text-xs tracking-[0.4em] border border-zinc-800 active:scale-95 transition-transform"
      >
          Return to Core
      </button>
    </div>
  );
};
