import { Mail, Phone, MapPin } from 'lucide-react';
import { scrollToEl } from '../lib/lenis';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Service Catalog', href: '#what-we-do' },
  { label: 'Partner Program', href: '#get-started' },
  { label: 'Pricing', href: '#pricing' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', href: '#help' },
  { label: 'Safety & Trust', href: '#safety' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Privacy Policy', href: '#privacy' },
];

const colLabel: React.CSSProperties = {
  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
  fontWeight: 700,
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(250,247,240,0.45)',
  marginBottom: '1.25rem',
};

const colLink: React.CSSProperties = {
  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'rgba(250,247,240,0.65)',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.7rem',
  transition: 'color 0.15s ease',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  textAlign: 'left',
};

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: '#1F2A1E',
        borderTop: '1px solid rgba(250,247,240,0.06)',
        padding: 'clamp(4rem, 6vw, 6rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 4vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* 4-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 'clamp(2.5rem, 4vw, 4rem)',
            marginBottom: 'clamp(3rem, 5vw, 5rem)',
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: '#FAF7F0',
                  letterSpacing: '-0.01em',
                }}
              >
                Smart<span style={{ color: '#C9A15A', fontStyle: 'italic' }}>Serve</span>
              </span>
            </div>
            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'rgba(250,247,240,0.55)',
                lineHeight: 1.7,
                maxWidth: '22ch',
              }}
            >
              India's premier verified home &amp; lifestyle services marketplace. Your home, well cared for.
            </p>
          </div>

          {/* Col 2 — Platform */}
          <div>
            <p style={colLabel}>Platform</p>
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollToEl(l.href)}
                style={colLink}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#FAF7F0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,247,240,0.65)')}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Col 3 — Support */}
          <div>
            <p style={colLabel}>Support</p>
            {SUPPORT_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => {
                  if (l.href.startsWith('#')) {
                    const el = document.querySelector(l.href);
                    if (el) scrollToEl(l.href);
                  }
                }}
                style={colLink}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#FAF7F0')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,247,240,0.65)')}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p style={colLabel}>Contact Us</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <a
                href="mailto:support@smartserve.com"
                style={{
                  ...colLink,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  marginBottom: 0,
                  wordBreak: 'break-all',
                }}
              >
                <Mail style={{ width: 14, height: 14, color: '#7A9E6E', marginTop: 2, flexShrink: 0 }} />
                support@smartserve.com
              </a>
              <a
                href="tel:+919876543210"
                style={{ ...colLink, display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: 0 }}
              >
                <Phone style={{ width: 14, height: 14, color: '#7A9E6E', flexShrink: 0 }} />
                +91 98765 43210
              </a>
              <div
                style={{
                  ...colLink,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  marginBottom: 0,
                  fontSize: '0.8rem',
                  cursor: 'default',
                }}
              >
                <MapPin style={{ width: 14, height: 14, color: '#7A9E6E', marginTop: 2, flexShrink: 0 }} />
                SmartServe HQ, Sector 62, Noida, UP 201301, India
              </div>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {[
                {
                  label: 'Twitter/X',
                  path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                },
                {
                  label: 'LinkedIn',
                  path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                },
                {
                  label: 'GitHub',
                  path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={`SmartServe on ${social.label}`}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(250,247,240,0.07)',
                    border: '1px solid rgba(250,247,240,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.15s ease',
                    color: 'rgba(250,247,240,0.55)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(250,247,240,0.12)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#FAF7F0';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(250,247,240,0.07)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(250,247,240,0.55)';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(250,247,240,0.08)',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(250,247,240,0.4)',
            }}
          >
            © 2026 SmartServe. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(250,247,240,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            Built with <span style={{ color: '#C9A15A' }}>♥</span> by Pushkar Kanjani &amp; Aastha
          </p>
        </div>
      </div>
    </footer>
  );
}
