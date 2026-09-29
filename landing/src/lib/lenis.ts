/**
 * lenis.ts — Singleton smooth-scroll instance for SmartServe Landing
 *
 * Guards:
 *  - prefers-reduced-motion → never instantiated; native browser scroll used
 *  - SSR safe (typeof window check)
 *
 * Usage:
 *  import { getLenis, scrollToEl, scrollToTop } from '@/lib/lenis';
 */

import Lenis from 'lenis';

const PRM =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let _lenis: Lenis | null = null;
let _rafId: number | null = null;

/** Return or create the singleton Lenis instance. Returns null under PRM. */
export function getLenis(): Lenis | null {
  if (PRM || typeof window === 'undefined') return null;
  if (!_lenis) {
    _lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });
    startRaf();
  }
  return _lenis;
}

function startRaf() {
  if (!_lenis) return;
  function raf(time: number) {
    _lenis!.raf(time);
    _rafId = requestAnimationFrame(raf);
  }
  _rafId = requestAnimationFrame(raf);
}

/** Destroy the singleton (call on App unmount). */
export function destroyLenis() {
  if (_rafId !== null) {
    cancelAnimationFrame(_rafId);
    _rafId = null;
  }
  if (_lenis) {
    _lenis.destroy();
    _lenis = null;
  }
}

/**
 * Smooth-scroll to a CSS selector or element.
 * Falls back to native scrollIntoView under PRM.
 * @param target  CSS selector (e.g. '#what-we-do') or HTMLElement
 * @param offset  Vertical offset in px (default: -96 to clear fixed navbar)
 */
export function scrollToEl(
  target: string | HTMLElement,
  offset = -96
): void {
  const el =
    typeof target === 'string'
      ? (document.querySelector(target) as HTMLElement | null)
      : target;
  if (!el) return;

  if (PRM) {
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
    return;
  }

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/** Scroll to top (logo click, post-splash). */
export function scrollToTop(): void {
  if (PRM) { window.scrollTo({ top: 0 }); return; }
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
