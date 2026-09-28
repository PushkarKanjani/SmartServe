import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const STEPS = [
  {
    num: '01',
    title: 'Tell us what you need',
    body: "Browse our 457+ services and pick what fits — whether it's a one-off deep clean or a regular electrician on call.",
  },
  {
    num: '02',
    title: 'We find your fit',
    body: "We match you with a vetted, local professional. You see their profile, rating, and price upfront — no surprises.",
  },
  {
    num: '03',
    title: 'Feel the difference',
    body: "Your pro arrives on time and completes the job with OTP-verified confirmation. If anything's off, we make it right.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        background: '#FAF7F0',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header — staggered eyebrow → title */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <Reveal delay={0}>
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 600, fontSize: '0.8rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#7A9E6E', marginBottom: '1rem',
              }}
            >
              How it works
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 400, color: '#1F2A1E',
                lineHeight: 1.15, letterSpacing: '-0.015em',
                maxWidth: '22ch', margin: '0 auto',
              }}
            >
              Three steps to a home that feels looked after.
            </h2>
          </Reveal>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            position: 'relative',
          }}
        >
          {/* Connector line — scaleX 0→1 on view */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              position: 'absolute',
              top: '2.75rem',
              left: '10%',
              right: '10%',
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(122,158,110,0.35) 20%, rgba(122,158,110,0.35) 80%, transparent)',
              pointerEvents: 'none',
              transformOrigin: 'left center',
            }}
          />

          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.12}>
              <article
                style={{
                  background: '#F2EDE1',
                  borderRadius: 24,
                  border: '1px solid rgba(31,42,30,0.07)',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  position: 'relative',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 400,
                    color: '#C9A15A',
                    lineHeight: 1,
                    marginBottom: '1rem',
                    opacity: 0.9,
                  }}
                >
                  {step.num}
                </div>

                <h3
                  style={{
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontWeight: 700, fontSize: '1.05rem',
                    color: '#2F5233', marginBottom: '0.65rem',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: '0.875rem', lineHeight: 1.75,
                    color: 'rgba(31,42,30,0.62)',
                  }}
                >
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
