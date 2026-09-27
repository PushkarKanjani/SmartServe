import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import HowItWorks from './components/HowItWorks';
import StatsBar from './components/StatsBar';
import RoleSelector from './components/RoleSelector';
import Footer from './components/Footer';

/**
 * App — SmartServe Landing (port 5176)
 *
 * Intro visibility is pure component state initialized to `true` on mount.
 * NO localStorage / sessionStorage / cookie gating — plays on every refresh.
 * Content renders only after `onFinish` fires or "Skip Intro" is pressed.
 */
export default function App() {
  const [splashDone, setSplashDone] = useState(false);

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
