import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FADE_UP = (delay = 0): any => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

export default function Hero() {
  const scrollToRoleSelector = () => {
    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        minHeight: '88vh',
        background: '#FAF7F0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative warm radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50vw',
          height: '70vh',
          background: 'radial-gradient(ellipse, rgba(201,161,90,0.12) 0%, rgba(122,158,110,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '40vw',
          height: '50vh',
          background: 'radial-gradient(ellipse, rgba(47,82,51,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Eyebrow pill */}
        <motion.div {...FADE_UP(0)}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '0.8125rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#2F5233',
              background: 'rgba(47,82,51,0.08)',
              border: '1px solid rgba(47,82,51,0.15)',
              borderRadius: 9999,
              padding: '0.45rem 1.1rem',
              marginBottom: '2.25rem',
            }}
          >
            <span style={{ fontSize: '0.7rem', color: '#C9A15A' }}>✦</span>
            AI-Powered Home Services Marketplace
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1 {...FADE_UP(0.1)}>
          <span
            style={{
              display: 'block',
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(2.75rem, 7vw, 5.25rem)',
              fontWeight: 400,
              color: '#1F2A1E',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '0.1em',
            }}
          >
            Your home,
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(2.75rem, 7vw, 5.25rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#2F5233',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            well cared for.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...FADE_UP(0.2)}>
          <span
            style={{
              display: 'block',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.175rem)',
              fontWeight: 500,
              color: 'rgba(31,42,30,0.65)',
              lineHeight: 1.7,
              maxWidth: '56ch',
              margin: '1.75rem auto 0',
            }}
          >
            SmartServe connects you with{' '}
            <strong style={{ color: '#1F2A1E', fontWeight: 700 }}>457+ verified home service professionals</strong>{' '}
            — from emergency repairs to premium wellness. Real-time booking, AI matching, and transparent tracking.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...FADE_UP(0.3)}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2.75rem' }}
        >
          <button
            onClick={scrollToRoleSelector}
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: '#FAF7F0',
              background: '#2F5233',
              border: 'none',
              borderRadius: 9999,
              padding: '0.875rem 2.25rem',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(47,82,51,0.28)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#3D6B42';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(47,82,51,0.38)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#2F5233';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(47,82,51,0.28)';
            }}
          >
            Find a Service
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          <button
            onClick={scrollToRoleSelector}
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 600,
              fontSize: '0.9375rem',
              color: '#1F2A1E',
              background: 'transparent',
              border: '1.5px solid rgba(31,42,30,0.2)',
              borderRadius: 9999,
              padding: '0.875rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#2F5233';
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(47,82,51,0.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(31,42,30,0.2)';
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            Become a Partner
          </button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          {...FADE_UP(0.4)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(31,42,30,0.08)',
          }}
        >
          {[
            { icon: '✓', text: 'Trusted by 1,200+ customers', color: '#2F5233' },
            { icon: '★', text: '85+ verified professionals', color: '#C9A15A' },
            { icon: '✓', text: '4.9 average rating', color: '#2F5233' },
          ].map((item) => (
            <span
              key={item.text}
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'rgba(31,42,30,0.7)',
              }}
            >
              <span style={{ color: item.color }}>{item.icon}</span>
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
