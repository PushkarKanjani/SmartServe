// Maintenance Slots Mockup — Calendly-style mini weekly calendar
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const SLOTS = [
  { time: '9:00 AM', selected: false },
  { time: '11:00 AM', selected: true },
  { time: '2:00 PM', selected: false },
  { time: '4:30 PM', selected: false },
];

export function MaintenanceSlotsMockup({ accent = '#16A34A' }: { accent?: string }) {
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
            marginBottom: '1rem',
          }}
        >
          📅 Book a Maintenance Slot
        </div>

        {/* Day selector row */}
        <div
          style={{
            display: 'flex',
            gap: '0.35rem',
            marginBottom: '1rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
          }}
        >
          {DAYS.map((d, i) => (
            <div
              key={d}
              style={{
                flexShrink: 0,
                width: 38,
                height: 44,
                borderRadius: 10,
                background: i === 2 ? accent : '#F3F4F6',
                color: i === 2 ? '#fff' : '#6B7280',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: i === 2 ? 700 : 500,
                fontSize: '0.6rem',
                gap: '0.15rem',
              }}
            >
              {d}
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{i + 12}</span>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {SLOTS.map((s) => (
            <div
              key={s.time}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.55rem 0.85rem',
                borderRadius: 10,
                background: s.selected ? `${accent}14` : '#F9FAFB',
                border: `1.5px solid ${s.selected ? accent : 'transparent'}`,
              }}
            >
              <span
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontWeight: s.selected ? 700 : 500,
                  fontSize: '0.82rem',
                  color: s.selected ? accent : '#374151',
                }}
              >
                {s.time}
              </span>
              {s.selected && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
          ))}
        </div>

        {/* Confirm button */}
        <button
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.7rem',
            borderRadius: 10,
            background: accent,
            color: '#fff',
            border: 'none',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'default',
          }}
        >
          Confirm Slot — 11:00 AM ✓
        </button>
      </div>
    </div>
  );
}
