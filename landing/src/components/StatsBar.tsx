import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { Reveal } from './Reveal';

const PRM =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface StatItem {
  /** Numeric value to count up to */
  to: number;
  /** Suffix to append ('+', '%', ',000+') */
  suffix: string;
  /** Prefix if any */
  prefix?: string;
  label: string;
}

const STATS: StatItem[] = [
  { to: 457,  suffix: '+',    label: 'Services in Catalog' },
  { to: 85,   suffix: '+',    label: 'Verified Professionals' },
  { to: 1200, suffix: '+',    label: 'Happy Customers', prefix: '' },
  { to: 98,   suffix: '%',    label: 'Booking Completion Rate' },
];

function CountUp({ to, suffix, prefix = '' }: { to: number; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    const n = Math.round(v);
    // Format thousands
    return prefix + n.toLocaleString('en-IN') + suffix;
  });

  useEffect(() => {
    if (!inView) return;
    if (PRM) {
      count.set(to);
      return;
    }
    const ctrl = animate(count, to, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => ctrl.stop();
  }, [inView, to, count]);

  return (
    <motion.span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {rounded}
    </motion.span>
  );
}

export default function StatsBar() {
  return (
    <section
      id="why-smartserve"
      style={{
        background: '#2F5233',
        padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <Reveal>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <div
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                    fontWeight: 400,
                    color: '#FAF7F0',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  <CountUp to={stat.to} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div
                  style={{
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'rgba(250,247,240,0.6)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
