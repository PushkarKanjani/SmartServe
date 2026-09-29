import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import HowItWorks from './components/HowItWorks';
import StatsBar from './components/StatsBar';
import RoleSelector from './components/RoleSelector';
import Footer from './components/Footer';
import { getLenis, destroyLenis } from './lib/lenis';

/**
 * App — SmartServe Landing (port 5176)
 *
 * Splash: pure state, NO storage gating, plays on every refresh.
 * Lenis: started after splash, stopped during splash, destroyed on unmount.
 * prefers-reduced-motion: Lenis never created; native scroll.
 */
export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  // ── Lenis lifecycle ──
  useEffect(() => {
    if (!splashDone) {
      // Keep Lenis stopped while splash is visible (also locks body scroll)
      getLenis()?.stop();
      return;
    }
    // Start Lenis once splash finishes
    getLenis()?.start();
  }, [splashDone]);

  // Destroy on unmount
  useEffect(() => {
    return () => destroyLenis();
  }, []);

  return (
    <>
      {/* Canonical cinematic splash — plays unconditionally on every mount */}
      {!splashDone && (
        <SplashScreen onFinish={() => setSplashDone(true)} />
      )}

      {splashDone && (
        <div
          style={{
            minHeight: '100vh',
            background: '#FAF7F0',
            color: '#1F2A1E',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          }}
        >
          {/* Fixed navbar — z-50, always above page, always below splash */}
          <Navbar />

          <Hero />
          <WhatWeDo />
          <HowItWorks />
          <StatsBar />
          <RoleSelector />
          <Footer />
        </div>
      )}
    </>
  );
}
