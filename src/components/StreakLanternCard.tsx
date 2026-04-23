import { COMBO } from "@/data/gamification";

// 连击卡：14 盏灯笼沿一条墨线点亮，已点亮的灯有呼吸光晕，未点亮的为空灯影
const StreakLanternCard = () => {
  const total = COMBO.last14.length;
  return (
    <section
      className="ink-card p-5 pt-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 0% 0%, hsl(var(--cream)) 0%, hsl(var(--parchment)) 60%, hsl(var(--parchment-dark)) 100%)",
        filter: "sepia(0.12) saturate(0.95)",
      }}
    >
      <span
        className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] tracking-widest font-bold border-2 rounded-sm"
        style={{
          borderColor: "hsl(var(--ink))",
          background: "hsl(var(--cream))",
          color: "hsl(var(--ink))",
        }}
      >
        连续记录
      </span>

      <div className="flex items-end justify-between mb-3 mt-1">
        <div>
          <p className="font-serif-en text-4xl leading-none">
            {COMBO.current}
            <span className="font-hand text-base text-muted-foreground ml-1.5">
              天
            </span>
          </p>
          <p className="font-hand text-[11px] text-muted-foreground mt-1.5 tracking-wider">
            最长 {COMBO.best} 天 · 留白也算节奏
          </p>
        </div>
        <p
          className="font-hand text-[10px] tracking-[0.4em] uppercase"
          style={{ color: "hsl(var(--ink-faded))" }}
        >
          Last 14
        </p>
      </div>

      {/* 灯笼串：SVG 一条墨线挂 14 盏 */}
      <svg
        viewBox="0 0 280 64"
        className="w-full h-16"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="streak-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <radialGradient id="streak-glow">
            <stop offset="0%" stopColor="hsl(var(--gold-bright))" stopOpacity="0.95" />
            <stop offset="60%" stopColor="hsl(var(--gold))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="streak-lantern">
            <stop offset="0%" stopColor="hsl(var(--gold-bright))" />
            <stop offset="80%" stopColor="hsl(var(--gold))" />
            <stop offset="100%" stopColor="hsl(var(--rust))" />
          </radialGradient>
        </defs>

        {/* 悬挂线：手绘弧线 */}
        <path
          d="M 6 14 Q 70 22, 140 18 T 274 14"
          fill="none"
          stroke="hsl(var(--ink) / 0.55)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        />

        {COMBO.last14.map((d, i) => {
          const x = 6 + ((274 - 6) / (total - 1)) * i;
          // 估算曲线上的 y
          const t = i / (total - 1);
          const y = 14 + Math.sin(t * Math.PI) * 4;
          const lit = d === 1;
          return (
            <g key={i} style={{ animation: lit ? `lanternBreath 3.${i}s ease-in-out ${i * 0.1}s infinite` : undefined, transformOrigin: `${x}px ${y}px` }}>
              {/* 挂绳 */}
              <line
                x1={x}
                y1={y}
                x2={x}
                y2={y + 8}
                stroke="hsl(var(--ink) / 0.5)"
                strokeWidth="0.4"
              />
              {lit && (
                <circle cx={x} cy={y + 18} r="13" fill="url(#streak-glow)" filter="url(#streak-blur)" />
              )}
              {/* 灯身 */}
              <ellipse
                cx={x}
                cy={y + 18}
                rx="5"
                ry="6.5"
                fill={lit ? "url(#streak-lantern)" : "hsl(var(--parchment-deep) / 0.4)"}
                stroke="hsl(var(--ink))"
                strokeWidth="0.7"
              />
              {/* 灯顶/底 */}
              <line x1={x - 3.5} y1={y + 12} x2={x + 3.5} y2={y + 12} stroke="hsl(var(--ink))" strokeWidth="0.7" />
              <line x1={x - 3.5} y1={y + 24} x2={x + 3.5} y2={y + 24} stroke="hsl(var(--ink))" strokeWidth="0.7" />
              {/* 流苏 */}
              <line x1={x} y1={y + 24} x2={x} y2={y + 28} stroke={lit ? "hsl(var(--rust))" : "hsl(var(--ink) / 0.4)"} strokeWidth="0.6" />
            </g>
          );
        })}
      </svg>

      <style>{`
        @keyframes lanternBreath {
          0%, 100% { opacity: 1; transform: translateY(0px); }
          50% { opacity: 0.78; transform: translateY(0.6px); }
        }
      `}</style>
    </section>
  );
};

export default StreakLanternCard;
