import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CATEGORY_META, INNER_REGIONS, RECORDS, type QuestCategory } from "@/data/world";
import NightMapCanvas, { Lantern } from "@/components/NightMapCanvas";

// 内心地形图：极光夜空 + 心境地形作为光池 + 闪烁的心之灯
const InnerTerrain = () => {
  const [params] = useSearchParams();
  const lit = params.get("lit")?.split(",");
  const cat = params.get("cat") as QuestCategory | null;
  const [showNew, setShowNew] = useState(false);
  const [phase, setPhase] = useState<"new" | "waxing" | "full">("waxing");

  useEffect(() => {
    if (lit && lit.length === 2) {
      setShowNew(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const t = setTimeout(() => setShowNew(false), 6500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const topOverlay = (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p
          className="font-hand text-xs tracking-[0.4em] uppercase"
          style={{ color: "hsl(var(--ink-faded))" }}
        >
          Inner Terrain
        </p>
        <h2 className="text-2xl md:text-3xl font-serif-en mt-1 text-foreground">
          心之地理
        </h2>
        <div className="flex gap-1 mt-3">
          {(["new", "waxing", "full"] as const).map((y) => (
            <button
              key={y}
              onClick={() => setPhase(y)}
              className="px-3 py-1 text-xs rounded-full font-hand transition-colors"
              style={{
                background: phase === y ? "hsl(var(--ink) / 0.1)" : "hsl(var(--cream) / 0.6)",
                border: `1px solid hsl(var(--ink) / ${phase === y ? 0.55 : 0.25})`,
                color: "hsl(var(--ink))",
              }}
            >
              {y === "new" ? "🌑 新月" : y === "waxing" ? "🌓 半月" : "🌕 满月"}
            </button>
          ))}
        </div>
      </div>
      <button
        className="px-3 py-1.5 text-xs rounded-full font-hand"
        style={{
          background: "hsl(var(--cream) / 0.7)",
          border: "1px solid hsl(var(--ink) / 0.4)",
          color: "hsl(var(--ink))",
        }}
      >
        分享
      </button>
    </div>
  );

  // 内心地图保持原本副本色板（复古暖色系）
  const innerColor = (c: QuestCategory) => {
    const map: Record<QuestCategory, string> = {
      flourish: "hsl(var(--moss))",
      courage: "hsl(var(--rust))",
      create: "hsl(var(--gold))",
      solitude: "hsl(var(--sky))",
    };
    return map[c];
  };

  return (
    <article className="max-w-6xl mx-auto px-5 md:px-10 py-8">
      <header className="mb-4 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="font-hand text-base text-muted-foreground">Inner Terrain</p>
          <h2 className="text-3xl md:text-4xl font-serif-en">内心地形 · 心之地理</h2>
          <p className="text-sm text-muted-foreground mt-1">
            每一笔记录都会落进对应的地形，化作一盏心之灯。
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {INNER_REGIONS.map((r) => {
            const m = CATEGORY_META[r.category];
            return (
              <span
                key={r.name}
                className="ink-tag font-hand"
                style={{ borderColor: m.color, color: m.color }}
              >
                {m.emoji} {r.name}
              </span>
            );
          })}
        </div>
      </header>

      <div className="ink-card p-3 md:p-5">
        <NightMapCanvas palette="inner" aspectRatio="16 / 11" topOverlay={topOverlay}>
          {/* 四块心境地形 — 深色地图上化为发光的"光池" */}
          <svg
            viewBox="0 0 100 62"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden
          >
            <defs>
              {INNER_REGIONS.map((r) => (
                <radialGradient
                  key={r.name}
                  id={`pool-${r.category}`}
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor={innerColor(r.category)} stopOpacity="0.55" />
                  <stop offset="60%" stopColor={innerColor(r.category)} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={innerColor(r.category)} stopOpacity="0" />
                </radialGradient>
              ))}
            </defs>
            {INNER_REGIONS.map((r) => (
              <g key={r.name}>
                <circle cx={r.cx} cy={r.cy * 0.62} r={r.r} fill={`url(#pool-${r.category})`} />
                <circle
                  cx={r.cx}
                  cy={r.cy * 0.62}
                  r={r.r * 0.65}
                  fill="none"
                  stroke={innerColor(r.category)}
                  strokeWidth="0.18"
                  strokeDasharray="0.6 0.8"
                  opacity="0.5"
                />
              </g>
            ))}

            {/* 自我之井 */}
            <circle cx="50" cy="31" r="2.4" fill="hsl(var(--inner-night))" stroke="hsl(var(--inner-text) / 0.7)" strokeWidth="0.3" />
            <circle cx="50" cy="31" r="0.9" fill="hsl(var(--inner-lantern-glow))" />
          </svg>

          {/* 地形名 */}
          {INNER_REGIONS.map((r) => (
            <span
              key={r.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 font-serif-en text-sm md:text-base pointer-events-none"
              style={{
                left: `${r.cx}%`,
                top: `${r.cy}%`,
                color: innerColor(r.category),
                textShadow: "0 1px 8px hsl(var(--inner-night-deep) / 0.9)",
              }}
            >
              {CATEGORY_META[r.category].emoji} {r.name}
            </span>
          ))}

          {/* 中心标 */}
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 font-hand text-[11px] pointer-events-none"
            style={{
              left: "50%",
              top: "57%",
              color: "hsl(var(--inner-text) / 0.85)",
              textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)",
            }}
          >
            自我之井
          </span>

          {/* 记录光点（心之灯） */}
          {RECORDS.filter((r) => r.innerPos).map((r) => {
            const c = r.category ? innerColor(r.category) : "hsl(var(--inner-lantern))";
            return (
              <Lantern
                key={r.id}
                x={r.innerPos!.x}
                y={r.innerPos!.y}
                color={c}
                glow={c}
                size={9}
                label={`${r.date} · ${r.feeling}`}
              />
            );
          })}

          {/* 新光点亮起动画 */}
          {showNew && lit && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `${lit[0]}%`, top: `${lit[1]}%` }}
            >
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 130,
                  height: 130,
                  background: `radial-gradient(circle, ${
                    cat ? innerColor(cat) : "hsl(var(--inner-lantern-glow))"
                  } 0%, transparent 65%)`,
                  animation: "litBurst 2s ease-out infinite",
                  opacity: 0.8,
                }}
              />
              <span
                className="block w-4 h-4 rounded-full relative"
                style={{
                  background: cat ? innerColor(cat) : "hsl(var(--inner-lantern-glow))",
                  boxShadow: `0 0 24px 6px ${
                    cat ? innerColor(cat) : "hsl(var(--inner-lantern))"
                  }, 0 0 60px 12px hsl(var(--inner-lantern-glow) / 0.5)`,
                }}
              />
              <span
                className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-hand text-[11px] px-2 py-1 rounded-sm"
                style={{
                  top: "100%",
                  background: "hsl(var(--inner-night) / 0.9)",
                  color: cat ? innerColor(cat) : "hsl(var(--inner-lantern-glow))",
                  border: `1px solid ${
                    cat ? innerColor(cat) : "hsl(var(--inner-lantern) / 0.6)"
                  }`,
                }}
              >
                ✦ {cat ? `${CATEGORY_META[cat].emoji} ${CATEGORY_META[cat].terrain}长出了新光点` : "新印记"}
              </span>
            </div>
          )}
        </NightMapCanvas>

        {/* 地形小档 */}
        <div className="grid md:grid-cols-4 gap-3 mt-4">
          {INNER_REGIONS.map((r) => {
            const m = CATEGORY_META[r.category];
            const count = RECORDS.filter((rec) => rec.category === r.category).length;
            return (
              <div key={r.name} className="ink-card p-4" style={{ borderColor: m.color }}>
                <p className="font-hand text-sm" style={{ color: m.color }}>
                  {m.emoji} {r.name}
                </p>
                <p className="font-serif-en text-base mt-1">{m.label}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{m.hand}</p>
                <p className="font-hand text-xs mt-3">已积累 {count} 笔印记</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI 叙事卡 */}
      <section className="ink-card p-6 mt-8 bg-secondary/40">
        <p className="font-hand text-sm text-muted-foreground mb-2">
          ✧ 编年史叙事者 · 自动生成
        </p>
        <h3 className="font-serif-en text-xl mb-3">这片地形最近在生长</h3>
        <p className="text-sm leading-relaxed text-foreground/85">
          这一个月里，你最常驻足在「锈红火山」——你正在和"说出口"反复练习。
          「深蓝湖泽」也悄悄涨水：你给了自己 3 次独处。
          「光之疏林」还安静着，也许下一个副本可以朝那里走。
        </p>
        <div className="flex gap-3 mt-4">
          <Link
            to="/"
            className="text-sm font-hand underline underline-offset-4 hover:text-accent-foreground"
          >
            → 让 AI 推荐一个朝向光林的副本
          </Link>
        </div>
      </section>
    </article>
  );
};

export default InnerTerrain;
