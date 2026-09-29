import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ to, accent }: { to: number; accent: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, delay: 0.5, ease: 'easeOut' });
    return controls.stop;
  }, [count, to]);

  return (
    <motion.span
      ref={ref}
      style={{
        fontFamily: '"DM Serif Display", Georgia, serif',
        fontSize: '2rem',
        color: accent,
      }}
    >
      {rounded}
    </motion.span>
  );
}

export function AiMatchingMockup({ accent = '#7C3AED' }: { accent?: string }) {
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
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            color: '#1F2A1E',
            marginBottom: '1.25rem',
          }}
        >
          🤖 AI Match Engine
        </div>

        {/* Node connector diagram */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          {/* Customer node */}
          <div
            style={{
              flex: 1,
              background: `${accent}12`,
              border: `1.5px solid ${accent}40`,
              borderRadius: 12,
              padding: '0.6rem 0.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>👤</div>
            <div
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.65rem',
                color: accent,
              }}
            >
              Customer Intent
            </div>
          </div>

          {/* Animated connector */}
          <div style={{ flex: 1.5, position: 'relative', height: 24 }}>
            <svg
              width="100%"
              height="24"
              viewBox="0 0 120 24"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0"
                y1="12"
                x2="120"
                y2="12"
                stroke={accent}
                strokeWidth="2"
                strokeDasharray="6 4"
                animate={{ strokeDashoffset: [24, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
            {/* Match badge */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: accent,
                color: '#fff',
                borderRadius: 6,
                padding: '0.15rem 0.4rem',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              AI ⚡
            </div>
          </div>

          {/* Provider node */}
          <div
            style={{
              flex: 1,
              background: '#F0FDF4',
              border: '1.5px solid #16A34A40',
              borderRadius: 12,
              padding: '0.6rem 0.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>🔧</div>
            <div
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.65rem',
                color: '#16A34A',
              }}
            >
              Provider Profile
            </div>
          </div>
        </div>

        {/* Match confidence */}
        <div
          style={{
            background: '#FAFAFA',
            borderRadius: 12,
            padding: '1rem',
            textAlign: 'center',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '0.72rem',
              color: '#6B7280',
              marginBottom: '0.4rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Match Confidence
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.1rem' }}>
            <AnimatedCounter to={96} accent={accent} />
            <span
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                color: accent,
              }}
            >
              %
            </span>
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#F0FDF4',
              borderRadius: 8,
              padding: '0.3rem 0.65rem',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#16A34A',
            }}
          >
            ✓ OCR Verified
          </div>
          <div
            style={{
              background: `${accent}14`,
              borderRadius: 8,
              padding: '0.3rem 0.65rem',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: accent,
            }}
          >
            96% match
          </div>
        </div>
      </div>
    </div>
  );
}
