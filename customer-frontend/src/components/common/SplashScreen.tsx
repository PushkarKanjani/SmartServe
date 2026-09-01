import { FC, useEffect, useRef } from 'react';

interface SplashScreenProps {
  durationMs?: number;
  onFinish?: () => void;
}

export const SplashScreen: FC<SplashScreenProps> = ({
  durationMs = 5400,
  onFinish,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check session storage first
    // platform:web
    const seen = sessionStorage.getItem('smartserve_splash_seen');
    if (seen === 'true') {
      if (onFinish) onFinish();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGrad.addColorStop(0, '#0F172A');
      bgGrad.addColorStop(0.5, '#1E293B');
      bgGrad.addColorStop(1, '#0F172A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 - 20;

      // Draw hand-drawn "S" icon box in center
      const iconSize = 80;
      const boxProgress = Math.min(progress / 0.4, 1);

      if (boxProgress > 0) {
        ctx.save();
        ctx.translate(cx, cy);

        // Outer glow
        const glowGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, iconSize);
        glowGrad.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
        glowGrad.addColorStop(1, 'rgba(37, 99, 235, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(0, 0, iconSize * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Rounded Box Container
        ctx.beginPath();
        const r = 20;
        const w = iconSize * boxProgress;
        const h = iconSize * boxProgress;
        ctx.roundRect(-w / 2, -h / 2, w, h, r * boxProgress);
        ctx.fillStyle = '#2563EB';
        ctx.fill();

        // Progressive "S" stroke drawing
        if (progress > 0.2) {
          const sProgress = Math.min((progress - 0.2) / 0.5, 1);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 8;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.beginPath();
          // Draw S curve
          const p1 = { x: 18, y: -20 };
          const p2 = { x: -10, y: -20 };
          const p3 = { x: -14, y: 0 };
          const p4 = { x: 14, y: 0 };
          const p5 = { x: 10, y: 20 };
          const p6 = { x: -18, y: 20 };

          ctx.moveTo(p1.x, p1.y);
          if (sProgress > 0.2) ctx.lineTo(p2.x, p2.y);
          if (sProgress > 0.4) ctx.quadraticCurveTo(-18, -10, p3.x, p3.y);
          if (sProgress > 0.6) ctx.lineTo(p4.x, p4.y);
          if (sProgress > 0.8) ctx.quadraticCurveTo(18, 10, p5.x, p5.y);
          if (sProgress >= 1.0) ctx.lineTo(p6.x, p6.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw wordmark text "SmartServe"
      if (progress > 0.5) {
        const textProgress = Math.min((progress - 0.5) / 0.4, 1);
        ctx.save();
        ctx.globalAlpha = textProgress;
        ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('SmartServe', cx, cy + 90);

        ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText('Professional Services Made Simple', cx, cy + 115);
        ctx.restore();
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        // platform:web
        sessionStorage.setItem('smartserve_splash_seen', 'true');
        if (onFinish) onFinish();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [durationMs, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
