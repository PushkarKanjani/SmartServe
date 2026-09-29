// Emergency Dispatch Mockup — map-style UI with pulsing priority dispatch
export function EmergencyDispatchMockup({ accent = '#DC2626' }: { accent?: string }) {
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
      {/* Main 3D card */}
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '1.5rem',
          boxShadow: '0 24px 56px -12px rgba(31,42,30,0.18), 0 8px 24px rgba(0,0,0,0.08)',
          transform: 'rotateY(-6deg) rotateX(4deg)',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* Priority ribbon */}
        <div
          style={{
            background: accent,
            color: '#fff',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontWeight: 800,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.4rem 1rem',
            borderRadius: 6,
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          ⚡ EMERGENCY — PRIORITY DISPATCH
        </div>

        {/* Grid background */}
        <div
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(31,42,30,0.04) 0px, rgba(31,42,30,0.04) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(31,42,30,0.04) 0px, rgba(31,42,30,0.04) 1px, transparent 1px, transparent 32px)',
            borderRadius: 12,
            height: 120,
            position: 'relative',
            marginBottom: '1rem',
            overflow: 'hidden',
          }}
        >
          {/* Map pin with pulse */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Ping ring */}
            <div
              style={{
                position: 'absolute',
                inset: -14,
                borderRadius: '50%',
                border: `2px solid ${accent}`,
                opacity: 0,
                animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                border: `2px solid ${accent}`,
                opacity: 0,
                animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) 0.5s infinite',
              }}
            />
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: accent,
                border: '3px solid #fff',
                boxShadow: `0 0 0 4px ${accent}40`,
              }}
            />
          </div>
        </div>

        {/* Pro chip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: '#F9FAFB',
            borderRadius: 10,
            padding: '0.6rem 0.8rem',
            marginBottom: '0.75rem',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#2F5233',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '0.85rem',
              flexShrink: 0,
            }}
          >
            AK
          </div>
          <div>
            <div
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '0.82rem',
                color: '#1F2A1E',
              }}
            >
              Amit K. · Electrical
            </div>
            <div
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: '0.72rem',
                color: '#6B7280',
              }}
            >
              1.2 km away · ★ 4.9
            </div>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              background: accent,
              color: '#fff',
              borderRadius: 6,
              padding: '0.25rem 0.55rem',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '0.72rem',
              flexShrink: 0,
            }}
          >
            ETA 9 min
          </div>
        </div>

        {/* Floating chip */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#FEF2F2',
            border: `1px solid ${accent}30`,
            color: accent,
            borderRadius: 8,
            padding: '0.3rem 0.7rem',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        >
          <span style={{ fontSize: '0.6rem' }}>🔴</span> Alert sent to 3 pros
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
