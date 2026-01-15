
import React from 'react';

interface SettingsProps {
  onBack: () => void;
  onNotifyRequest: () => void;
  notifyStatus: NotificationPermission;
}

export const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const openBuildPortal = () => {
    const siteUrl = window.location.href.split('?')[0];
    const instructions = `FREE APK STEPS:\n\n1. Copy your URL:\n${siteUrl}\n\n2. Open PWABuilder.com\n3. Paste the URL and click Start\n4. Click 'Package for Store' -> 'Android'\n5. Download the APK file!`;
    alert(instructions);
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
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600 ml-4 dot-matrix">Deployment_Center</h3>
        <div className="glass-card p-8 bg-zinc-900/40 border-white/5 space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] text-white font-black uppercase tracking-widest">Platform: Android (TWA)</p>
            <p className="text-[9px] text-zinc-500 font-medium leading-relaxed uppercase tracking-widest">
              Convert this interface into a native APK for Nothing Phone (2a) using the free PWABuilder portal.
            </p>
          </div>
          <button 
            onClick={openBuildPortal}
            className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-full active:scale-95 transition-all shadow-xl"
          >
            Generate Free APK
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600 ml-4 dot-matrix">Maintenance</h3>
        <button 
           onClick={() => window.location.reload()}
           className="w-full py-6 glass-card border-white/5 text-zinc-500 font-bold text-[10px] uppercase tracking-[0.5em] active:text-white"
        >
          Flash System Cache
        </button>
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
