import { CATEGORY_META } from "@/data/world";
import { WEEKLY_BOSS } from "@/data/gamification";

// 每周心魔卡：水彩雾团 + 印章 HP 槽，统一地图风格
const WeeklyBossCard = () => {
  const bossPct = (WEEKLY_BOSS.hp / WEEKLY_BOSS.hpMax) * 100;
  const weak = CATEGORY_META[WEEKLY_BOSS.weakness];

  return (
    <section
      className="ink-card p-5 pt-6 relative overflow-hidden"
      style={{
        borderColor: "hsl(var(--seal))",
        background:
          "radial-gradient(120% 80% at 100% 0%, hsl(var(--cream)) 0%, hsl(var(--parchment)) 55%, hsl(var(--parchment-dark)) 100%)",
        filter: "sepia(0.12) saturate(0.95)",
      }}
    >
      <span
        className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] tracking-widest font-bold border-2 rounded-sm z-10"
        style={{
          borderColor: "hsl(var(--seal))",
          background: "hsl(var(--cream))",
          color: "hsl(var(--seal))",
        }}
      >
        本周心魔
      </span>

      <div className="flex items-start gap-4">
        {/* 水彩雾团 — 心魔的形态 */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <defs>
              <filter id="boss-bleed">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
                <feDisplacementMap in="SourceGraphic" scale="2.4" />
                <feGaussianBlur stdDeviation="0.4" />
              </filter>
              <radialGradient id="boss-fog">
                <stop offset="0%" stopColor="hsl(var(--seal))" stopOpacity="0.55" />
                <stop offset="60%" stopColor="hsl(var(--rust))" stopOpacity="0.32" />
                <stop offset="100%" stopColor="hsl(var(--seal))" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="boss-core">
                <stop offset="0%" stopColor="hsl(var(--ink))" stopOpacity="0.85" />
                <stop offset="100%" stopColor="hsl(var(--seal))" stopOpacity="0.3" />
              </radialGradient>
            </defs>
            {/* 外雾 — 慢速漂动 */}
            <g style={{ animation: "bossFog 8s ease-in-out infinite", transformOrigin: "40px 40px" }}>
              <circle cx="40" cy="40" r="34" fill="url(#boss-fog)" filter="url(#boss-bleed)" />
              <circle cx="32" cy="36" r="22" fill="url(#boss-fog)" filter="url(#boss-bleed)" opacity="0.7" />
              <circle cx="48" cy="44" r="18" fill="url(#boss-fog)" filter="url(#boss-bleed)" opacity="0.6" />
            </g>
            {/* 核心 — 缓慢呼吸 */}
            <g style={{ animation: "bossCore 4s ease-in-out infinite", transformOrigin: "40px 40px" }}>
              <circle cx="40" cy="40" r="9" fill="url(#boss-core)" />
              <circle cx="40" cy="40" r="5" fill="hsl(var(--ink))" opacity="0.7" />
              {/* 一双眼 */}
              <circle cx="37" cy="39" r="0.9" fill="hsl(var(--gold-bright))" />
              <circle cx="43" cy="39" r="0.9" fill="hsl(var(--gold-bright))" />
            </g>
            {/* 边框：印章圈 */}
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="hsl(var(--seal) / 0.5)"
              strokeWidth="0.6"
              strokeDasharray="1.5 2"
            />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-serif-en text-lg leading-tight" style={{ color: "hsl(var(--seal))" }}>
            {WEEKLY_BOSS.name}
          </p>
          <p className="text-xs text-foreground/70 leading-snug mt-1">
            {WEEKLY_BOSS.desc}
          </p>
        </div>
      </div>

      {/* HP 槽：墨绘卷轴样式 */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 gap-2">
          <span>HP</span>
          <span className="font-hand normal-case tracking-normal text-[11px]">
            {WEEKLY_BOSS.hp} / {WEEKLY_BOSS.hpMax} · 还剩 {WEEKLY_BOSS.endsIn}
          </span>
        </div>
        <div
          className="h-2.5 border border-foreground rounded-sm overflow-hidden relative"
          style={{ background: "hsl(var(--parchment-deep) / 0.6)" }}
        >
          <div
            className="h-full transition-all relative"
            style={{
              width: `${bossPct}%`,
              background:
                "linear-gradient(90deg, hsl(var(--seal)), hsl(var(--rust)) 60%, hsl(var(--gold)))",
            }}
          >
            {/* 流光 */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--cream) / 0.5), transparent)",
                animation: "bossShine 2.6s linear infinite",
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-hand text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: weak.color }}
          />
          弱点 · {weak.label}
        </span>
        <span className="text-foreground/30">·</span>
        <span>奖励 · {WEEKLY_BOSS.reward}</span>
      </div>

      <style>{`
        @keyframes bossFog {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(8deg) scale(1.05); }
        }
        @keyframes bossCore {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes bossShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
};

export default WeeklyBossCard;
