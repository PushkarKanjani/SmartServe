import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { getLenis, scrollToEl, scrollToTop } from '../lib/lenis';

interface NavLinkItem {
  label: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'What We Do',    href: '#what-we-do',     id: 'what-we-do' },
  { label: 'How It Works',  href: '#how-it-works',   id: 'how-it-works' },
  { label: 'Why SmartServe', href: '#why-smartserve', id: 'why-smartserve' },
  { label: 'Get Started',   href: '#get-started',    id: 'get-started' },
  { label: 'Contact',       href: '#contact',        id: 'contact' },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Desktop indicator geometry
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  const navContainerRef = useRef<HTMLElement | null>(null);
  const navItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Guard flag to prevent scroll-spy jitter when user clicks a nav link
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Precise section detection on scroll ──
  const updateActiveSectionOnScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 20);

    if (isClickScrolling.current) return;

    // If near the top (Hero section), no section is active
    if (scrollY < 120) {
      setActiveSection(null);
      return;
    }

    // If scrolled close to bottom, activate last section ('contact')
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    if (windowHeight + scrollY >= docHeight - 90) {
      setActiveSection(SECTION_IDS[SECTION_IDS.length - 1]);
      return;
    }

    // Detection line: aligned with navbar offset (-96px) + comfortable reading trigger
    const detectionLine = scrollY + 185;
    let foundSection: string | null = null;

    for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
      const id = SECTION_IDS[i];
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      if (detectionLine >= top) {
        foundSection = id;
        break;
      }
    }

    setActiveSection(foundSection || SECTION_IDS[0]);
  }, []);

  // ── Scroll listener (syncs with native and Lenis) ──
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSectionOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial check
    updateActiveSectionOnScroll();

    // Hook into Lenis scroll emitter if initialized
    const lenis = getLenis();
    lenis?.on('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      lenis?.off('scroll', onScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [updateActiveSectionOnScroll]);

  // ── Smooth geometry measurement for Desktop Golden Indicator ──
  const updateIndicatorPosition = useCallback(() => {
    if (!activeSection) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const buttonEl = navItemRefs.current[activeSection];
    const containerEl = navContainerRef.current;

    if (buttonEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const buttonRect = buttonEl.getBoundingClientRect();

      // Slightly inset the line width for a more refined, tailored look
      const inset = 6;
      const left = buttonRect.left - containerRect.left + inset;
      const width = Math.max(buttonRect.width - inset * 2, 24);

      setIndicatorStyle({
        left,
        width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicatorPosition);
    return () => window.removeEventListener('resize', updateIndicatorPosition);
  }, [updateIndicatorPosition]);

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

  // ── Escape key closes mobile menu ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Click navigation handler (smooth scroll + lock to prevent indicator jitter) ──
  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');

    // Set active section immediately for instantaneous UI feedback
    setActiveSection(id);

    // Prevent scroll spy from bouncing through intermediate sections during scroll
    isClickScrolling.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
      updateActiveSectionOnScroll();
    }, 1250);

    const selector = href.startsWith('#') ? href : `#${href}`;
    setTimeout(() => scrollToEl(selector), 50);
  }, [updateActiveSectionOnScroll]);

  const handleLogoClick = useCallback(() => {
    setMenuOpen(false);
    setActiveSection(null);
    scrollToTop();
  }, []);

  const activeSectionIndex = activeSection ? SECTION_IDS.indexOf(activeSection) : -1;

  return (
    <>
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? 'rgba(15, 18, 16, 0.96)'
            : 'rgba(18, 22, 19, 0.92)',
          boxShadow: scrolled
            ? '0 4px 24px -2px rgba(0, 0, 0, 0.45), 0 1px 4px rgba(0, 0, 0, 0.25)'
            : '0 2px 16px -2px rgba(0, 0, 0, 0.3)',
          borderBottomColor: scrolled
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(255, 255, 255, 0.08)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 clamp(1rem, 3vw, 2rem)',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              minHeight: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="SmartServe – scroll to top"
          >
            <span
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: '1.45rem',
                fontWeight: 400,
                color: '#52A35C',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              Smart
            </span>
            <span
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: '1.45rem',
                fontWeight: 400,
                color: '#C9A15A',
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              Serve
            </span>
          </button>

          {/* Desktop Links Container with Golden Moving Indicator */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-1.5 h-full relative"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.href}
                  ref={(el) => { navItemRefs.current[link.id] = el; }}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.55rem 0.95rem',
                    minHeight: 'auto',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 700 : 500,
                    color: '#FFFFFF',
                    opacity: isActive ? 1 : 0.85,
                    borderRadius: 8,
                    transition: 'color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255, 255, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = isActive ? '1' : '0.85';
                    (e.currentTarget as HTMLButtonElement).style.background = isActive ? 'rgba(255, 255, 255, 0.08)' : 'none';
                  }}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Thin Golden Moving Indicator under active section */}
            <motion.div
              initial={false}
              animate={{
                x: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 32,
                mass: 0.7,
              }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 2.5,
                borderRadius: '3px 3px 0 0',
                background: 'linear-gradient(90deg, #D4AF37 0%, #C9A15A 50%, #E5C378 100%)',
                boxShadow: '0 -1px 8px rgba(201, 161, 90, 0.65), 0 0 4px rgba(201, 161, 90, 0.9)',
                pointerEvents: 'none',
              }}
            />
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNavClick('#get-started')}
            className="hidden lg:flex items-center gap-1.5"
            style={{
              background: '#2F5233',
              color: '#FAF7F0',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: 9999,
              padding: '0.6rem 1.4rem',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background 0.2s, box-shadow 0.2s, border-color 0.2s',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3), 0 0 12px rgba(47, 82, 51, 0.35)',
              minHeight: 'auto',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#3D6B42';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255, 255, 255, 0.28)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4), 0 0 16px rgba(61, 107, 66, 0.45)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#2F5233';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255, 255, 255, 0.16)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3), 0 0 12px rgba(47, 82, 51, 0.35)';
            }}
          >
            Get Started →
          </button>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Main menu"
            aria-expanded={menuOpen}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 8,
              padding: '0.4rem',
              cursor: 'pointer',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'auto',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Golden Section Indicator along navbar bottom divider */}
        <div
          className="lg:hidden absolute bottom-0 left-0 right-0 h-[2.5px] bg-transparent pointer-events-none overflow-hidden"
        >
          <motion.div
            initial={false}
            animate={{
              x: activeSectionIndex >= 0 ? `${activeSectionIndex * 100}%` : '0%',
              width: activeSectionIndex >= 0 ? '20%' : '0%',
              opacity: activeSectionIndex >= 0 ? 1 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 32,
            }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #D4AF37 0%, #C9A15A 50%, #E5C378 100%)',
              boxShadow: '0 0 8px rgba(201, 161, 90, 0.6)',
              borderRadius: '2px 2px 0 0',
            }}
          />
        </div>
      </motion.nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-[72px] inset-x-0 z-40 overflow-hidden lg:hidden"
            style={{
              background: 'rgba(15, 18, 16, 0.98)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'none',
                      border: 'none',
                      borderRadius: 10,
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 700 : 500,
                      color: '#FFFFFF',
                      opacity: isActive ? 1 : 0.85,
                      minHeight: 'auto',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderLeft: isActive ? '3px solid #C9A15A' : '3px solid transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#C9A15A',
                        }}
                      />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick('#get-started')}
                style={{
                  background: '#2F5233',
                  color: '#FAF7F0',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: 9999,
                  padding: '0.85rem 1.5rem',
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  marginTop: '0.75rem',
                  width: '100%',
                  minHeight: 'auto',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3), 0 0 12px rgba(47, 82, 51, 0.35)',
                }}
              >
                Get Started →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(31,42,30,0.3)' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
