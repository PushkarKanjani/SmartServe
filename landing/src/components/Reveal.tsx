/**
 * Reveal.tsx — Scroll-triggered fade-slide-blur entrance primitive
 *
 * Usage:
 *   <Reveal delay={0.1}><h2>Title</h2></Reveal>
 *
 * Reduced-motion: opacity-only (no y/blur). Once per viewport entry.
 */
import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

const PRM =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Extra translateY at start (default 28px) */
  y?: number;
  /** Additional className forwarded to the wrapper div */
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, delay = 0, y = 28, className, style }: RevealProps) {
  const initial = PRM
    ? { opacity: 0 }
    : { opacity: 0, y, filter: 'blur(6px)' };

  const animate = PRM
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
