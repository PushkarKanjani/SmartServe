import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { scrollToEl } from '../lib/lenis';
import { SERVICES } from '../data/services';
import type { MockupKey } from '../data/services';
import {
  EmergencyDispatchMockup,
  MaintenanceSlotsMockup,
  WellnessBookingMockup,
  CleaningChecklistMockup,
  AiMatchingMockup,
  LiveTrackingMockup,
} from './showcase';

// ─── Per-service subtle card ambient gradients ───────────────────────────────
const GRADIENTS: Record<MockupKey, string> = {
  emergency:
    'radial-gradient(ellipse 120% 80% at 20% 30%, #FECACA 0%, #FCA5A5 35%, #FED7AA 70%, #FDBA74 100%)',
  maintenance:
    'radial-gradient(ellipse 130% 85% at 70% 20%, #A7F3D0 0%, #6EE7B7 30%, #BAE6FD 65%, #7DD3FC 100%)',
  wellness:
    'radial-gradient(ellipse 120% 90% at 15% 70%, #FBCFE8 0%, #F9A8D4 30%, #E9D5FF 65%, #C4B5FD 100%)',
  cleaning:
    'radial-gradient(ellipse 140% 80% at 80% 10%, #BAE6FD 0%, #7DD3FC 30%, #A5F3FC 60%, #67E8F9 100%)',
  aimatch:
    'radial-gradient(ellipse 130% 90% at 10% 80%, #EDE9FE 0%, #C4B5FD 30%, #DDD6FE 55%, #A5B4FC 85%, #818CF8 100%)',
  tracking:
    'radial-gradient(ellipse 120% 80% at 60% 20%, #CCFBF1 0%, #5EEAD4 30%, #99F6E4 55%, #86EFAC 90%)',
};

// ─── Reduced motion ───────────────────────────────────────────────────────────
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Mockup renderer ─────────────────────────────────────────────────────────
function ShowcaseMockup({ id, accent }: { id: MockupKey; accent: string }) {
  switch (id) {
    case 'emergency':   return <EmergencyDispatchMockup accent={accent} />;
    case 'maintenance': return <MaintenanceSlotsMockup accent={accent} />;
    case 'wellness':    return <WellnessBookingMockup accent={accent} />;
    case 'cleaning':    return <CleaningChecklistMockup accent={accent} />;
    case 'aimatch':     return <AiMatchingMockup accent={accent} />;
    case 'tracking':    return <LiveTrackingMockup accent={accent} />;
  }
}

// ─── Floating icon tab ────────────────────────────────────────────────────────
function IconTab({
  service,
  isActive,
  onSelect,
}: {
  service: (typeof SERVICES)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = service.icon;
  return (
    <motion.button
      onClick={onSelect}
      role="tab"
      aria-selected={isActive}
      aria-label={service.label}
      title={service.label}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{
        position: 'relative',
        width: 56,
        height: 56,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        outline: 'none',
        /* Glass pill effect */
        background: isActive
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isActive
          ? `0 6px 20px rgba(31, 42, 30, 0.12), 0 0 0 2.5px ${service.accent}`
          : '0 2px 8px rgba(31, 42, 30, 0.06)',
        transition: 'background 0.25s, box-shadow 0.25s',
      }}
    >
      <Icon
        size={22}
        color={isActive ? service.accent : 'rgba(31, 42, 30, 0.5)'}
        strokeWidth={2}
        style={{ transition: 'color 0.2s' }}
      />
      {/* Active dot below */}
      {isActive && (
        <motion.div
          layoutId="icon-active-dot"
          style={{
            position: 'absolute',
            bottom: -9,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: service.accent,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        />
      )}
    </motion.button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WhatWeDo() {
  const [activeId, setActiveId] = useState<MockupKey>('emergency');
  const hoverRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeService = SERVICES.find((s) => s.id === activeId)!;
  const activeIndex   = SERVICES.findIndex((s) => s.id === activeId);
  const Icon          = activeService.icon;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (prefersReducedMotion) return;
    timerRef.current = setInterval(() => {
      if (!hoverRef.current) {
        setActiveId((cur) => {
          const idx = SERVICES.findIndex((s) => s.id === cur);
          return SERVICES[(idx + 1) % SERVICES.length].id;
        });
      }
    }, 6000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleSelect = (id: MockupKey) => {
    setActiveId(id);
    resetTimer();
  };

  // Keyboard arrow nav on tablist
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleSelect(SERVICES[(activeIndex + 1) % SERVICES.length].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSelect(SERVICES[(activeIndex - 1 + SERVICES.length) % SERVICES.length].id);
    }
  };

  return (
    <section
      id="what-we-do"
      style={{
        scrollMarginTop: 80,
        position: 'relative',
        background: '#FAF7F0',
        padding: 'clamp(4.5rem, 7vw, 6.5rem) clamp(1.25rem, 4vw, 2.5rem)',
      }}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
    >
      {/* ── Centered content container with generous framing margins ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 3.5vw, 2.75rem)' }}
        >
          <p
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(31, 42, 30, 0.55)',
              marginBottom: '0.75rem',
            }}
          >
            Capabilities &amp; Coverage
          </p>
          <h2
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              color: '#1F2A1E',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              marginBottom: '0.5rem',
            }}
          >
            What We Do
          </h2>
          <p
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'rgba(31, 42, 30, 0.55)',
            }}
          >
            One platform. Every home service. Zero guesswork.
          </p>
        </motion.div>

        {/* ── 6 floating icon tabs ── */}
        <div
          role="tablist"
          aria-label="Service categories"
          onKeyDown={onKeyDown}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 1rem)',
            marginBottom: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            flexWrap: 'wrap',
          }}
        >
          {SERVICES.map((svc) => (
            <IconTab
              key={svc.id}
              service={svc}
              isActive={activeId === svc.id}
              onSelect={() => handleSelect(svc.id)}
            />
          ))}
        </div>

        {/* ── Compact Centered Showcase Card (Calendly-style) ── */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            maxWidth: 1160,
            margin: '0 auto',
            borderRadius: 24,
            border: '1.5px solid rgba(47, 82, 51, 0.1)',
            boxShadow: '0 24px 60px -12px rgba(31, 42, 30, 0.10), 0 4px 18px rgba(31, 42, 30, 0.04)',
            background: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Dynamic Ambient Gradient contained strictly inside the card */}
          <AnimatePresence initial={false}>
            <motion.div
              key={activeId + '-card-tint'}
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: GRADIENTS[activeId],
                opacity: 0.16,
                zIndex: 0,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.16 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeInOut' }}
            />
          </AnimatePresence>

          {/* Internal Content Grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 items-center"
            style={{
              position: 'relative',
              zIndex: 1,
              padding: 'clamp(2rem, 4vw, 3.25rem)',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              minHeight: 480,
            }}
          >
            {/* Copy block — left */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId + '-copy'}
                role="tabpanel"
                aria-live="polite"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.32, ease: 'easeOut' }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
              >
                {/* Service chip */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    width: 'fit-content',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: `${activeService.accent}1A`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={14} color={activeService.accent} />
                  </div>
                  <span
                    style={{
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      letterSpacing: '0.04em',
                      color: activeService.accent,
                    }}
                  >
                    {activeService.tagline}
                  </span>
                </div>

                {/* Heading */}
                <h3
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                    fontWeight: 400,
                    color: '#1F2A1E',
                    lineHeight: 1.2,
                    letterSpacing: '-0.015em',
                    margin: 0,
                  }}
                >
                  {activeService.heading}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: '0.9rem',
                    lineHeight: 1.75,
                    color: 'rgba(31, 42, 30, 0.65)',
                    margin: 0,
                  }}
                >
                  {activeService.description}
                </p>

                {/* Bullets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {activeService.bullets.map((b) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 6,
                          background: '#2F5233',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <Check size={11} color="#C9A15A" strokeWidth={2.5} />
                      </div>
                      <span
                        style={{
                          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#1F2A1E',
                          lineHeight: 1.55,
                        }}
                      >
                        {b}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Learn more CTA */}
                <button
                  onClick={() => scrollToEl('#get-started')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: '#2F5233',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: 0,
                    width: 'fit-content',
                    textDecoration: 'none',
                    marginTop: '0.25rem',
                  }}
                >
                  Learn more →
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Mockup — right */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId + '-mockup'}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, rotateY: 6 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  perspective: '1200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <ShowcaseMockup id={activeService.mockup} accent={activeService.accent} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom label */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeId + '-label'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'rgba(31, 42, 30, 0.5)',
                letterSpacing: '0.04em',
              }}
            >
              {activeService.label}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
