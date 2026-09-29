import { motion } from 'framer-motion';

const STEPS = [
  { label: 'Booking Accepted', done: true },
  { label: 'Professional En Route', done: true },
  { label: 'On Job', done: true },
  { label: 'OTP Verified', done: false },
];

export function LiveTrackingMockup({ accent = '#0D9488' }: { accent?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        perspective: '1200px',
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '1.5rem',
          boxShadow: '0 24px 56px -12px rgba(31,42,30,0.18), 0 8px 24px rgba(0,0,0,0.08)',
          transform: 'rotateY(-6deg) rotateX(4deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#1F2A1E',
            }}
          >
            📍 Live Job Tracking
          </div>
          <div
            style={{
              background: accent,
              color: '#fff',
              borderRadius: 6,
              padding: '0.2rem 0.55rem',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 800,
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              animation: 'livePulse 2s ease-in-out infinite',
            }}
          >
            LIVE
          </div>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {/* Progress line */}
          <div
            style={{
              width: 2,
              background: '#F3F4F6',
              borderRadius: 9999,
              position: 'relative',
              flexShrink: 0,
              marginLeft: '0.55rem',
              marginTop: '0.4rem',
              marginBottom: '0.4rem',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                background: accent,
                borderRadius: 9999,
              }}
              initial={{ height: '0%' }}
              animate={{ height: '75%' }}
              transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
            />
            {/* Courier dot */}
            <motion.div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: accent,
                border: '2px solid #fff',
                boxShadow: `0 0 0 3px ${accent}40`,
              }}
              initial={{ top: '0%' }}
              animate={{ top: '75%' }}
              transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', repeatDelay: 1 }}
            />
          </div>

          {/* Steps */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {STEPS.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: step.done ? accent : '#F3F4F6',
                    border: `2px solid ${step.done ? accent : '#D1D5DB'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 1,
                    marginLeft: -24,
                  }}
                >
                  {step.done && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {!step.done && i === 3 && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#D1D5DB' }} />
                  )}
                </div>
                <span
                  style={{
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontWeight: step.done ? 600 : 500,
                    fontSize: '0.82rem',
                    color: step.done ? '#1F2A1E' : '#9CA3AF',
                  }}
                >
                  {step.label}
                  {i === 3 && (
                    <span
                      style={{
                        marginLeft: '0.5rem',
                        background: '#F3F4F6',
                        borderRadius: 6,
                        padding: '0.1rem 0.4rem',
                        fontFamily: 'monospace',
                        fontSize: '0.7rem',
                        color: '#374151',
                      }}
                    >
                      •••• 4821
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
