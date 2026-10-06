import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const CUSTOMER_BULLETS = [
  '457+ services across 8 categories',
  'Real-time slot booking',
  'Emergency priority dispatch',
  'OTP-verified job completion',
];

const PARTNER_BULLETS = [
  'Set your own schedule & slots',
  'Receive real-time job requests',
  'Track earnings & performance',
  'OCR-verified credential badges',
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const customerUrl = import.meta.env.VITE_CUSTOMER_URL || 'https://smartserve-customer-alpha.vercel.app';
const providerUrl = import.meta.env.VITE_PROVIDER_URL || 'https://smartserve-provider.vercel.app';

export default function RoleSelector() {
  return (
    <section
      id="get-started"
      style={{
        background: '#F2EDE1',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        scrollMarginTop: '1.5rem',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#7A9E6E',
                marginBottom: '1rem',
              }}
            >
              Entry Gateway
            </p>
            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 400,
                color: '#1F2A1E',
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                marginBottom: '0.75rem',
              }}
            >
              Get Started
            </h2>
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'rgba(31,42,30,0.6)',
              }}
            >
              Choose how you'd like to use SmartServe
            </p>
          </div>
        </Reveal>

        {/* Dual cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '1.5rem',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          {/* Customer card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            style={{
              background: '#FAF7F0',
              borderRadius: 28,
              border: '1.5px solid rgba(47,82,51,0.15)',
              padding: 'clamp(2rem, 4vw, 2.75rem)',
              boxShadow: '0 8px 32px -10px rgba(31,42,30,0.10)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '2rem',
              transition: 'box-shadow 0.25s ease',
            }}
          >
            <div>
              {/* Icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: 'rgba(47,82,51,0.08)',
                  border: '1px solid rgba(47,82,51,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '1.5rem',
                }}
              >
                🏠
              </div>

              <h3
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  color: '#1F2A1E',
                  marginBottom: '0.75rem',
                }}
              >
                I'm a Customer
              </h3>
              <p
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'rgba(31,42,30,0.62)',
                  marginBottom: '1.5rem',
                }}
              >
                Browse services, book verified professionals, track your bookings, and manage your home — all in one place.
              </p>

              <div
                style={{
                  borderTop: '1px solid rgba(31,42,30,0.08)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {CUSTOMER_BULLETS.map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <CheckIcon color="#2F5233" />
                    <span
                      style={{
                        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                        fontSize: '0.8375rem',
                        fontWeight: 600,
                        color: '#1F2A1E',
                      }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={customerUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: '#FAF7F0',
                background: '#2F5233',
                border: 'none',
                borderRadius: 9999,
                padding: '0.9rem 1.75rem',
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(47,82,51,0.28)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#3D6B42';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#2F5233';
              }}
            >
              Enter Customer Portal
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>

          {/* Partner card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            style={{
              background: '#FAF7F0',
              borderRadius: 28,
              border: '1.5px solid rgba(201,161,90,0.3)',
              padding: 'clamp(2rem, 4vw, 2.75rem)',
              boxShadow: '0 8px 32px -10px rgba(31,42,30,0.10)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            <div>
              {/* Icon */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: 'rgba(201,161,90,0.10)',
                  border: '1px solid rgba(201,161,90,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '1.5rem',
                }}
              >
                🛠️
              </div>

              <h3
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  color: '#1F2A1E',
                  marginBottom: '0.75rem',
                }}
              >
                I'm a Service Partner
              </h3>
              <p
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'rgba(31,42,30,0.62)',
                  marginBottom: '1.5rem',
                }}
              >
                Manage your services, set your availability, accept bookings, and grow your business with SmartServe.
              </p>

              <div
                style={{
                  borderTop: '1px solid rgba(31,42,30,0.08)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {PARTNER_BULLETS.map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <CheckIcon color="#C9A15A" />
                    <span
                      style={{
                        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                        fontSize: '0.8375rem',
                        fontWeight: 600,
                        color: '#1F2A1E',
                      }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={providerUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: '#1F2A1E',
                background: 'transparent',
                border: '1.5px solid rgba(201,161,90,0.55)',
                borderRadius: 9999,
                padding: '0.9rem 1.75rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,161,90,0.10)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#C9A15A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,161,90,0.55)';
              }}
            >
              Enter Partner Workspace
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
