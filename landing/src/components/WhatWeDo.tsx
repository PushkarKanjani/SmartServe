import { motion } from 'framer-motion';

const SERVICES = [
  {
    icon: '⚡',
    title: 'Emergency Repairs',
    body: 'Short circuits, pipe bursts, gas leaks — flagged for immediate priority dispatch.',
    accent: '#C9A15A',
  },
  {
    icon: '🔧',
    title: 'Home Maintenance',
    body: 'Plumbing, electrical, carpentry, and painting — scheduled at your convenience.',
    accent: '#2F5233',
  },
  {
    icon: '✨',
    title: 'Beauty & Wellness',
    body: 'Salon-grade facials, haircare, and grooming — delivered to your home.',
    accent: '#7A9E6E',
  },
  {
    icon: '🌿',
    title: 'Cleaning & Hygiene',
    body: 'Deep cleaning, sanitisation, and pest control by background-verified pros.',
    accent: '#2F5233',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Matching',
    body: 'OCR-verified credentials, AI confidence scoring, smart provider recommendations.',
    accent: '#C9A15A',
  },
  {
    icon: '📍',
    title: 'Real-Time Tracking',
    body: 'Live booking status, OTP-verified job completion, transparent pricing.',
    accent: '#7A9E6E',
  },
];

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      style={{
        background: '#F2EDE1',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 5rem)' }}
        >
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
            Capabilities &amp; Coverage
          </p>
          <h2
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 400,
              color: '#1F2A1E',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              marginBottom: '1rem',
            }}
          >
            What We Do
          </h2>
          <p
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'rgba(31,42,30,0.6)',
            }}
          >
            One platform. Every home service. Zero guesswork.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {SERVICES.map((svc, i) => (
            <motion.article
              key={svc.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
              style={{
                background: '#FAF7F0',
                borderRadius: 24,
                border: '1px solid rgba(31,42,30,0.08)',
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                boxShadow: '0 4px 20px -6px rgba(31,42,30,0.08)',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                cursor: 'default',
              }}
              whileHover={{
                y: -4,
                boxShadow: '0 16px 40px -10px rgba(31,42,30,0.14)',
              }}
            >
              {/* Icon orb */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: `${svc.accent}14`,
                  border: `1px solid ${svc.accent}28`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1.25rem',
                }}
              >
                {svc.icon}
              </div>

              <h3
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: '#1F2A1E',
                  marginBottom: '0.65rem',
                }}
              >
                {svc.title}
              </h3>

              <p
                style={{
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  color: 'rgba(31,42,30,0.6)',
                }}
              >
                {svc.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
