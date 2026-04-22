import { useEffect, useState } from "react";
import { ENCOURAGEMENTS } from "@/data/goals";

type Props = {
  show: boolean;
  message?: string;
  subtitle?: string;
  onDone?: () => void;
};

// 完成时的全屏星轨庆祝：金色光点从中心向外发散，连成轨迹
const StarTrailCelebration = ({ show, message, subtitle, onDone }: Props) => {
  const [encouragement, setEncouragement] = useState("");

  useEffect(() => {
    if (!show) return;
    setEncouragement(
      message ?? ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)],
    );
    const t = setTimeout(() => onDone?.(), 3200);
    return () => clearTimeout(t);
  }, [show, message, onDone]);

  if (!show) return null;

  // 16 条星轨，从中心向四周发散
  const trails = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const dist = 38 + (i % 3) * 6;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      delay: 0.05 * i,
    };
  });

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in"
      onClick={onDone}
    >
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
        {/* SVG 星轨 */}
        <svg viewBox="-50 -50 100 100" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--gold-bright))" stopOpacity="1" />
              <stop offset="60%" stopColor="hsl(var(--gold))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 中心光晕 */}
          <circle cx="0" cy="0" r="14" fill="url(#starGlow)" className="origin-center animate-scale-in" />

          {/* 星轨连线 */}
          {trails.map((t, i) => (
            <g key={i} style={{ animation: `trailFade 2.4s ease-out ${t.delay}s forwards`, opacity: 0 }}>
              <line
                x1="0"
                y1="0"
                x2={t.x}
                y2={t.y}
                stroke="hsl(var(--gold-bright))"
                strokeWidth="0.4"
                strokeLinecap="round"
                opacity="0.7"
              />
              <circle cx={t.x} cy={t.y} r="1.2" fill="hsl(var(--gold-bright))" />
            </g>
          ))}

          {/* 中心星 */}
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fontSize="10"
            fill="hsl(var(--cream))"
            className="font-serif-en"
          >
            ✦
          </text>
        </svg>

        {/* 文案 */}
        <div className="relative text-center px-6 z-10 mt-48">
          <p className="font-hand text-base text-[hsl(var(--gold-bright))] tracking-widest mb-2 animate-fade-in">
            ✧ 完成 ✧
          </p>
          <h2 className="font-serif-en text-2xl md:text-3xl text-[hsl(var(--cream))] leading-snug drop-shadow-lg animate-fade-in">
            {encouragement}
          </h2>
          {subtitle && (
            <p className="font-hand text-sm text-[hsl(var(--cream))]/80 mt-3 animate-fade-in">
              {subtitle}
            </p>
          )}
          <p className="font-hand text-xs text-[hsl(var(--cream))]/60 mt-6 tracking-widest">
            点一下继续
          </p>
        </div>
      </div>

      <style>{`
        @keyframes trailFade {
          0% { opacity: 0; transform: scale(0.2); }
          40% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.5; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default StarTrailCelebration;
