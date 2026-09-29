import { useMotionValue, useSpring } from 'framer-motion';
import { useRef, useCallback } from 'react';

interface TiltValues {
  rotateX: ReturnType<typeof useSpring>;
  rotateY: ReturnType<typeof useSpring>;
  scale: ReturnType<typeof useSpring>;
  glareX: ReturnType<typeof useSpring>;
  glareY: ReturnType<typeof useSpring>;
  glareOpacity: ReturnType<typeof useSpring>;
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

const springCfg = { stiffness: 150, damping: 20, mass: 0.5 };

export function useTilt(): TiltValues {
  const cardRef = useRef<HTMLElement | null>(null);

  // Check if tilt should be enabled
  const isEnabled =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const scaleRaw = useMotionValue(1);
  const glareXRaw = useMotionValue(50);
  const glareYRaw = useMotionValue(50);
  const glareOpacityRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, springCfg);
  const rotateY = useSpring(rotateYRaw, springCfg);
  const scale = useSpring(scaleRaw, springCfg);
  const glareX = useSpring(glareXRaw, { stiffness: 200, damping: 25 });
  const glareY = useSpring(glareYRaw, { stiffness: 200, damping: 25 });
  const glareOpacity = useSpring(glareOpacityRaw, { stiffness: 200, damping: 30 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isEnabled) return;
      const el = e.currentTarget;
      cardRef.current = el;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxTilt = 8;
      const rx = (-dy / (rect.height / 2)) * maxTilt;
      const ry = (dx / (rect.width / 2)) * maxTilt;

      rotateXRaw.set(rx);
      rotateYRaw.set(ry);
      scaleRaw.set(1.03);

      // Glare position as percentage
      glareXRaw.set(((e.clientX - rect.left) / rect.width) * 100);
      glareYRaw.set(((e.clientY - rect.top) / rect.height) * 100);
      glareOpacityRaw.set(0.15);
    },
    [isEnabled, rotateXRaw, rotateYRaw, scaleRaw, glareXRaw, glareYRaw, glareOpacityRaw]
  );

  const onMouseLeave = useCallback(() => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
    scaleRaw.set(1);
    glareOpacityRaw.set(0);
  }, [rotateXRaw, rotateYRaw, scaleRaw, glareOpacityRaw]);

  return {
    rotateX,
    rotateY,
    scale,
    glareX,
    glareY,
    glareOpacity,
    onMouseMove,
    onMouseLeave,
  };
}
