import { motion } from 'framer-motion';

const STATS = [
  { value: '457+',   label: 'Services in Catalog' },
  { value: '85+',    label: 'Verified Professionals' },
  { value: '1,200+', label: 'Happy Customers' },
  { value: '98%',    label: 'Booking Completion Rate' },
];

export default function StatsBar() {
  return (
    <section
      style={{
        background: '#2F5233',
        padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
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
                {stat.value}
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
    </section>
  );
}
