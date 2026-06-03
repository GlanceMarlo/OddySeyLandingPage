import ReactDOM from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import App from './App.jsx';
import './index.css';

// NOTE: intentionally no <React.StrictMode> — it double-invokes effects in dev,
// which remounts the heavy Three.js video-decode effect and leaves the canvas blank.
ReactDOM.createRoot(document.getElementById('root')).render(
  <HeroUIProvider>
    <main className="text-foreground bg-background">
      <App />
    </main>
  </HeroUIProvider>
);
