import { COMBO } from "@/data/gamification";

const StreakLanternCard = () => {
  const total = COMBO.last14.length;
  const W = 320;
  const H = 88;
  const padX = 14;

  return (
    <section
      className="ink-card p-5 relative"
      style={{
        background:
          "radial-gradient(120% 80% at 0% 0%, hsl(var(--cream)) 0%, hsl(var(--parchment)) 60%, hsl(var(--parchment-dark)) 100%)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="ink-tag font-hand text-[11px] leading-none">连续记录</span>
        <p
          className="font-hand text-[10px] tracking-[0.35em] uppercase whitespace-nowrap"
          style={{ color: "hsl(var(--ink-faded))" }}
        >
          Last 14
        </p>
      </div>

      <div className="flex items-end justify-between mb-3 gap-3">
        <div>
          <p className="font-serif-en text-4xl leading-none ink-bloom">
            {COMBO.current}
            <span className="font-hand text-base text-muted-foreground ml-1.5">天</span>
          </p>
          <p className="font-hand text-[11px] text-muted-foreground mt-1.5 tracking-wider">
            最长 {COMBO.best} 天 · 留白也算节奏
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-sm border border-foreground/15 bg-background/20 px-2 py-2">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="streak-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
            <radialGradient id="streak-glow">
              <stop offset="0%" stopColor="hsl(var(--gold-bright))" stopOpacity="0.9" />
              <stop offset="60%" stopColor="hsl(var(--gold))" stopOpacity="0.34" />
              <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="streak-lantern" cx="50%" cy="40%">
              <stop offset="0%" stopColor="hsl(var(--gold-bright))" />
              <stop offset="80%" stopColor="hsl(var(--gold))" />
              <stop offset="100%" stopColor="hsl(var(--rust))" />
            </radialGradient>
          </defs>

          <path
            d={`M ${padX} 18 Q ${W / 2} 28, ${W - padX} 18`}
            fill="none"
            stroke="hsl(var(--ink) / 0.55)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />

          {COMBO.last14.map((d, i) => {
            const x = padX + ((W - padX * 2) / (total - 1)) * i;
            const t = i / (total - 1);
            const yLine = 18 + Math.sin(t * Math.PI) * 5;
            const cy = yLine + 22;
            const lit = d === 1;
            return (
              <g
                key={i}
                style={{
                  animation: lit
                    ? `lanternBreath 2.${4 + (i % 6)}s ease-in-out ${i * 0.13}s infinite`
                    : undefined,
                  transformOrigin: `${x}px ${cy}px`,
                }}
              >
                <line
                  x1={x}
                  y1={yLine}
                  x2={x}
                  y2={yLine + 10}
                  stroke="hsl(var(--ink) / 0.5)"
                  strokeWidth="0.5"
                />
                {lit && (
                  <circle
                    cx={x}
                    cy={cy}
                    r="11.5"
                    fill="url(#streak-glow)"
                    filter="url(#streak-blur)"
                  />
                )}
                <line
                  x1={x - 4}
                  y1={cy - 6}
                  x2={x + 4}
                  y2={cy - 6}
                  stroke="hsl(var(--ink))"
                  strokeWidth="0.8"
                />
                <ellipse
                  cx={x}
                  cy={cy}
                  rx="5"
                  ry="6.5"
                  fill={lit ? "url(#streak-lantern)" : "hsl(var(--parchment-deep) / 0.4)"}
                  stroke="hsl(var(--ink))"
                  strokeWidth="0.8"
                />
                <line
                  x1={x - 4}
                  y1={cy + 6}
                  x2={x + 4}
                  y2={cy + 6}
                  stroke="hsl(var(--ink))"
                  strokeWidth="0.8"
                />
                <line
                  x1={x}
                  y1={cy + 6}
                  x2={x}
                  y2={cy + 10}
                  stroke={lit ? "hsl(var(--rust))" : "hsl(var(--ink) / 0.4)"}
                  strokeWidth="0.7"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <style>{`
        @keyframes lanternBreath {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default StreakLanternCard;
