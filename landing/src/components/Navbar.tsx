import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { getLenis, scrollToEl, scrollToTop } from '../lib/lenis';

const NAV_LINKS = [
  { label: 'What We Do',    href: '#what-we-do' },
  { label: 'How It Works',  href: '#how-it-works' },
  { label: 'Why SmartServe', href: '#why-smartserve' },
  { label: 'Get Started',   href: '#get-started' },
  { label: 'Contact',       href: '#contact' },
];

const SECTION_IDS = [
  'what-we-do',
  'how-it-works',
  'why-smartserve',
  'get-started',
  'contact',
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Scroll detection (passive, works with Lenis scroll events too) ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Lenis emits 'scroll' on window but also mutates scrollY
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section via IntersectionObserver ──
  useEffect(() => {
    const entries = new Map<string, boolean>();

    observerRef.current = new IntersectionObserver(
      (obs) => {
        obs.forEach((e) => entries.set(e.target.id, e.isIntersecting));
        for (const id of SECTION_IDS) {
          if (entries.get(id)) { setActiveSection(id); break; }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // ── Lenis stop/start with mobile menu ──
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // ── Escape to close menu ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Nav click handler — close menu, then Lenis scroll ──
  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const selector = href.startsWith('#') ? href : `#${href}`;
    // Small delay so menu close animation doesn't fight scroll
    setTimeout(() => scrollToEl(selector), 60);
  }, []);

  const handleLogoClick = useCallback(() => {
    setMenuOpen(false);
    scrollToTop();
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50"
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? 'rgba(244, 241, 234, 0.88)'
            : 'rgba(244, 241, 234, 0)',
          backdropFilter: scrolled ? 'blur(14px)' : 'blur(0px)',
          borderBottomWidth: scrolled ? 1 : 0,
          borderBottomColor: scrolled ? '#E4DFD3' : 'transparent',
          boxShadow: scrolled ? '0 1px 12px rgba(31,42,30,0.08)' : '0 0 0 transparent',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ borderBottomStyle: 'solid' }}
      >
        <div
          style={{
            maxWidth: 1280, margin: '0 auto',
            padding: '0 clamp(1rem, 3vw, 2rem)',
            height: 72,
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '1rem',
          }}
        >
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, minHeight: 'auto', display: 'flex', alignItems: 'center' }}
            aria-label="SmartServe – scroll to top"
          >
            <span style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: '#2F5233', letterSpacing: '-0.01em', lineHeight: 1 }}>Smart</span>
            <span style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.4rem', fontWeight: 400, color: '#C9A15A', fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1 }}>Serve</span>
          </button>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative"
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '0.5rem 0.85rem', minHeight: 'auto',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: '0.875rem', fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#2F5233' : '#1F2A1E',
                    borderRadius: 8, transition: 'color 0.2s, background 0.2s', position: 'relative',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#2F5233'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(47,82,51,0.05)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = isActive ? '#2F5233' : '#1F2A1E'; (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', height: 2, width: '60%', borderRadius: 9999, background: '#C9A15A' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNavClick('#get-started')}
            className="hidden lg:flex items-center gap-1.5"
            style={{
              background: '#2F5233', color: '#FAF7F0', border: 'none',
              borderRadius: 9999, padding: '0.6rem 1.35rem',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
              transition: 'background 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 10px rgba(47,82,51,0.24)', minHeight: 'auto',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#3D6B42'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(47,82,51,0.32)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#2F5233'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 10px rgba(47,82,51,0.24)'; }}
          >
            Get Started →
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Main menu" aria-expanded={menuOpen}
            style={{
              background: 'none', border: '1.5px solid rgba(31,42,30,0.15)',
              borderRadius: 8, padding: '0.4rem', cursor: 'pointer',
              color: '#1F2A1E', display: 'flex', alignItems: 'center',
              justifyContent: 'center', minHeight: 'auto',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-[72px] inset-x-0 z-40 overflow-hidden lg:hidden"
            style={{ background: 'rgba(244,241,234,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E4DFD3', boxShadow: '0 8px 24px rgba(31,42,30,0.12)' }}
          >
            <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map((link) => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: isActive ? 'rgba(47,82,51,0.07)' : 'none',
                      border: 'none', borderRadius: 10, padding: '0.75rem 1rem',
                      textAlign: 'left', cursor: 'pointer',
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize: '0.95rem', fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#2F5233' : '#1F2A1E',
                      minHeight: 'auto', width: '100%',
                    }}
                  >
                    {link.label}
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick('#get-started')}
                style={{
                  background: '#2F5233', color: '#FAF7F0', border: 'none',
                  borderRadius: 9999, padding: '0.8rem 1.5rem',
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                  marginTop: '0.75rem', width: '100%', minHeight: 'auto',
                }}
              >
                Get Started →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(31,42,30,0.3)' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
