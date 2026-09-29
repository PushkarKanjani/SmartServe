import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';
import { scrollToEl } from '../lib/lenis';

const PRM =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const HERO_VIDEOS = [
  { src: '/videos/cleaning.mp4', poster: '/videos/cleaning-poster.jpg' },
  { src: '/videos/repair.mp4', poster: '/videos/repair-poster.jpg' },
  { src: '/videos/home-service.mp4', poster: '/videos/home-service-poster.jpg' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Parallax: orbs drift on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);

  // Smooth crossfade between the 3 videos every 5.5 seconds
  useEffect(() => {
    if (PRM) return;
    const interval = setInterval(() => {
      setActiveVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Ensure playback is active on mount and when active video changes
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.play().catch(() => {});
      }
    });
    const currentVid = videoRefs.current[activeVideoIndex];
    if (currentVid) {
      currentVid.play().catch(() => {});
    }
  }, [activeVideoIndex]);

  return (
    <section
      ref={sectionRef}
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
      {/* ── LAYER 1: Subtle Cinematic Video Carousel Background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {HERO_VIDEOS.map((item, idx) => (
          <video
            key={item.src}
            ref={(el) => { videoRefs.current[idx] = el; }}
            src={item.src}
            poster={item.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              opacity: activeVideoIndex === idx ? 0.32 : 0,
              filter: 'blur(7px) saturate(0.8) brightness(1.02)',
              transform: 'scale(1.08)',
              transformOrigin: 'center center',
              transition: PRM ? 'none' : 'opacity 1.6s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity',
            }}
          />
        ))}
      </div>

      {/* ── LAYER 2: Warm Translucent Ivory Overlay & Blur ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(250, 247, 240, 0.72) 0%, rgba(250, 247, 240, 0.88) 60%, rgba(250, 247, 240, 0.97) 100%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Decorative warm radial glow — parallax drift */}
      <motion.div
        aria-hidden="true"
        style={{
          y: PRM ? 0 : orbY1,
          willChange: 'transform',
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50vw',
          height: '70vh',
          background: 'radial-gradient(ellipse, rgba(201,161,90,0.12) 0%, rgba(122,158,110,0.06) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          y: PRM ? 0 : orbY2,
          willChange: 'transform',
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '40vw',
          height: '50vh',
          background: 'radial-gradient(ellipse, rgba(47,82,51,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── LAYER 3 & 4: Existing Hero Content, Text & Buttons ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* Eyebrow pill */}
        <Reveal delay={0}>
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
        </Reveal>

        {/* H1 */}
        <Reveal delay={0.08}>
          <h1 style={{ margin: 0 }}>
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
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.16}>
          <p
            style={{
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
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.24}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2.75rem' }}>
            <button
              onClick={() => scrollToEl('#get-started')}
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 600, fontSize: '0.9375rem',
                color: '#FAF7F0', background: '#2F5233', border: 'none',
                borderRadius: 9999, padding: '0.875rem 2.25rem', cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(47,82,51,0.28)',
                transition: 'all 0.2s ease',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#3D6B42'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(47,82,51,0.38)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#2F5233'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(47,82,51,0.28)'; }}
            >
              Find a Service
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button
              onClick={() => scrollToEl('#get-started')}
              style={{
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                fontWeight: 600, fontSize: '0.9375rem',
                color: '#1F2A1E', background: 'transparent',
                border: '1.5px solid rgba(31,42,30,0.2)',
                borderRadius: 9999, padding: '0.875rem 2rem', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#2F5233'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(47,82,51,0.06)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(31,42,30,0.2)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              Become a Partner
            </button>
          </div>
        </Reveal>

        {/* Trust strip */}
        <Reveal delay={0.32}>
          <div
            style={{
              display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              justifyContent: 'center', marginTop: '3rem',
              paddingTop: '2rem', borderTop: '1px solid rgba(31,42,30,0.08)',
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
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(31,42,30,0.7)',
                }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
