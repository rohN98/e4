
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
    if (debugConsole) debugConsole.innerText = "FATAL: Root Element Missing";
    return;
  }

  try {
    if (debugConsole) debugConsole.innerText = "System_Link: Initializing_React...";
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Hide booting UI once rendered successfully
    setTimeout(() => {
      hideBoot();
      if (debugConsole) debugConsole.innerText = "System_Link: Successful";
    }, 500);
    
  } catch (error) {
    hideBoot(); // Show the screen so we can see the error
    if (debugConsole) {
      debugConsole.style.color = '#ff2e2e';
      debugConsole.innerText = `MOUNT_ERROR: ${error.message}`;
    }
    console.error("Mount failed", error);
  }
};

// Start the engine
mountApp();
