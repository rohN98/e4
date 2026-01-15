import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  const bootContainer = document.getElementById('boot-container');
  const debugConsole = document.getElementById('debug-console');

  const hideBoot = () => {
    if (bootContainer) {
      bootContainer.style.opacity = '0';
      setTimeout(() => bootContainer.remove(), 500);
    }
  };

  if (!rootElement) {
    if (debugConsole) debugConsole.innerText = "FATAL: Root Missing";
    return;
  }

  try {
    if (debugConsole) debugConsole.innerText = "System_Link: Booting...";
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Safety timeout to hide loader even if there is a minor rendering glitch
    setTimeout(() => {
      hideBoot();
      if (debugConsole) debugConsole.innerText = "System_Link: Online";
    }, 1200);
    
  } catch (error) {
    console.error("Mount failed", error);
    if (debugConsole) {
      debugConsole.style.color = '#ff2e2e';
      debugConsole.innerText = `ERR: ${error.message}`;
    }
    // Still hide loader so user can see error in console
    hideBoot();
  }
};

mountApp();