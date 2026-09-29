// Wellness Booking Mockup — premium at-home beauty service card
export function WellnessBookingMockup({ accent = '#DB2777' }: { accent?: string }) {
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
        {/* Service header */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: `${accent}14`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              flexShrink: 0,
            }}
          >
            ✨
          </div>
          <div>
            <div
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#1F2A1E',
                marginBottom: '0.2rem',
              }}
            >
              24K Gold Radiance Facial
            </div>
            <div
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: '0.75rem',
                color: '#6B7280',
              }}
            >
              75 min · At-home luxury
            </div>
          </div>
        </div>

        {/* Stars */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            marginBottom: '1rem',
          }}
        >
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#C9A15A"
              style={{ flexShrink: 0 }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '0.82rem',
              color: '#1F2A1E',
              marginLeft: '0.25rem',
            }}
          >
            4.9
          </span>
          <span
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '0.75rem',
              color: '#9CA3AF',
            }}
          >
            (128 reviews)
          </span>
        </div>

        {/* Price + provider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: '1.5rem',
              color: '#1F2A1E',
            }}
          >
            ₹1,499
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#F0FDF4',
              borderRadius: 8,
              padding: '0.3rem 0.6rem',
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '0.6rem',
              }}
            >
              PS
            </div>
            <div>
              <div
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  color: '#1F2A1E',
                }}
              >
                Pooja S.
              </div>
              <div
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: '0.62rem',
                  color: '#16A34A',
                }}
              >
                ✓ OCR Verified
              </div>
            </div>
          </div>
        </div>

        {/* Book button */}
        <button
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: 10,
            background: '#2F5233',
            color: '#FAF7F0',
            border: 'none',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontWeight: 700,
            fontSize: '0.875rem',
            cursor: 'default',
          }}
        >
          Book Now → ₹1,499
        </button>
      </div>
    </div>
  );
}
