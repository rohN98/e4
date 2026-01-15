
import React from 'react';

interface SettingsProps {
  onBack: () => void;
  onNotifyRequest: () => void;
  notifyStatus: NotificationPermission;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
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

      <section className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600 ml-4 dot-matrix">APK_Package_Assistant</h3>
        <div className="glass-card p-8 bg-zinc-900/40 border-white/5 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h4 className="text-[10px] font-black uppercase text-white mb-2 tracking-widest flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Step-by-Step APK
            </h4>
            <ol className="text-[9px] text-zinc-400 font-bold leading-relaxed uppercase space-y-2">
              <li>1. Open <span className="text-white">PWABuilder.com</span></li>
              <li>2. Click "Upload" or "Start from File"</li>
              <li>3. <span className="text-red-500">IMPORTANT:</span> Select only visible files. Avoid folders or files starting with a dot (.).</li>
              <li>4. Generate "Android" Package.</li>
            </ol>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-[8px] font-black uppercase text-zinc-500 tracking-[0.2em]">Package Manifest</h4>
            <div className="grid grid-cols-2 gap-2">
              {['index.html', 'manifest.json', 'sw.js', 'App.tsx', 'index.tsx', 'icon.jpg'].map(file => (
                <div key={file} className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-zinc-800">
                  <div className="w-1 h-1 bg-green-500 rounded-full" />
                  <span className="text-[8px] font-bold text-zinc-300 dot-matrix">{file}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={openBuildPortal}
            className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-full active:scale-95 transition-all shadow-xl"
          >
            Launch PWABuilder
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600 ml-4 dot-matrix">Hardware</h3>
        <div className="glass-card p-6 bg-zinc-900/20 border-white/5 space-y-4">
           <div className="flex justify-between items-center">
             <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Target</span>
             <span className="text-[9px] text-white uppercase font-black dot-matrix">Nothing Phone (2a)</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">OS</span>
             <span className="text-[9px] text-white uppercase font-black dot-matrix">NOS_4.0_Stable</span>
           </div>
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
