import { motion } from 'framer-motion';

const CHECKLIST = [
  'Vacuum & mop all floors',
  'Kitchen deep clean & degreasing',
  'Bathroom sanitisation & descaling',
  'Window & surface wipe-down',
];

export function CleaningChecklistMockup({ accent = '#0284C7' }: { accent?: string }) {
  const checked = [true, true, true, false];

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
            🌿 Cleaning Checklist
          </div>
          {/* Progress ring SVG */}
          <div style={{ position: 'relative', width: 44, height: 44 }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="4"
              />
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke={accent}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 18}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 18 * (1 - 0.75),
                }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '22px 22px' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '0.7rem',
                color: accent,
              }}
            >
              75%
            </div>
          </div>
        </div>

        {/* Checklist items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {CHECKLIST.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4, duration: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: checked[i] ? accent : '#F3F4F6',
                  border: `2px solid ${checked[i] ? accent : '#D1D5DB'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {checked[i] && (
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
              <span
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: '0.82rem',
                  color: checked[i] ? '#6B7280' : '#1F2A1E',
                  textDecoration: checked[i] ? 'line-through' : 'none',
                  fontWeight: checked[i] ? 500 : 600,
                }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <div
          style={{
            marginTop: '1rem',
            padding: '0.5rem 0.75rem',
            background: `${accent}10`,
            borderRadius: 8,
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: accent,
          }}
        >
          🧹 3 of 4 tasks completed · In progress
        </div>
      </div>
    </div>
  );
}
