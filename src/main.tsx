// Suppress unhandled WebSocket errors and fetch setter errors in sandboxed preview environments
if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get() {
        return currentFetch;
      },
      set(fn) {
        currentFetch = fn;
      },
      configurable: true,
      enumerable: true,
    });
  } catch {
    // Ignore if property is non-configurable
  }

  window.addEventListener(
    'error',
    (event) => {
      if (
        event.message &&
        (event.message.includes('Cannot set property fetch') ||
          event.message.includes('WebSocket'))
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      (event.reason.message === 'WebSocket closed without opened.' ||
        (typeof event.reason === 'string' &&
          (event.reason.includes('WebSocket') || event.reason.includes('fetch'))))
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
