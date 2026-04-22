import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CATEGORY_META, INNER_REGIONS, RECORDS, type QuestCategory } from "@/data/world";

// 内心地形图：抽象的心境地理 — 火山 / 苔原 / 光林 / 深湖
const InnerTerrain = () => {
  const [params] = useSearchParams();
  const lit = params.get("lit")?.split(",");
  const cat = params.get("cat") as QuestCategory | null;
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    if (lit && lit.length === 2) {
      setShowNew(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const t = setTimeout(() => setShowNew(false), 6500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <article className="max-w-6xl mx-auto px-5 md:px-10 py-8">
      <header className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="font-hand text-base text-muted-foreground">Inner Terrain</p>
          <h2 className="text-3xl md:text-4xl font-serif-en">内心地形 · 心之地理</h2>
          <p className="text-sm text-muted-foreground mt-1">
            和外部地图一样，这里也有山、湖、林、原。每一笔记录都会落进对应的地形。
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
        <div
          className="relative w-full rounded-sm overflow-hidden bg-[hsl(var(--cream))]"
          style={{ aspectRatio: "16 / 10" }}
        >
          <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="terrainGrain" width="2" height="2" patternUnits="userSpaceOnUse">
                <circle cx="0.5" cy="0.5" r="0.3" fill="hsl(var(--ink) / 0.05)" />
              </pattern>
              {INNER_REGIONS.map((r) => (
                <radialGradient key={r.name} id={`g-${r.category}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={CATEGORY_META[r.category as QuestCategory].color} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={CATEGORY_META[r.category as QuestCategory].color} stopOpacity="0" />
                </radialGradient>
              ))}
            </defs>

            <rect width="100" height="62" fill="hsl(var(--cream))" />
            <rect width="100" height="62" fill="url(#terrainGrain)" />

            {/* 四块心境地形 */}
            {INNER_REGIONS.map((r) => (
              <g key={r.name}>
                <circle cx={r.cx} cy={r.cy * 0.62} r={r.r} fill={`url(#g-${r.category})`} />
                {/* 边界等高线 */}
                <circle
                  cx={r.cx}
                  cy={r.cy * 0.62}
                  r={r.r * 0.7}
                  fill="none"
                  stroke={CATEGORY_META[r.category as QuestCategory].color}
                  strokeWidth="0.15"
                  strokeDasharray="0.5 0.5"
                  opacity="0.6"
                />
                <circle
                  cx={r.cx}
                  cy={r.cy * 0.62}
                  r={r.r * 0.4}
                  fill="none"
                  stroke={CATEGORY_META[r.category as QuestCategory].color}
                  strokeWidth="0.15"
                  strokeDasharray="0.5 0.5"
                  opacity="0.4"
                />
              </g>
            ))}

            {/* 中心：自我之井 */}
            <circle cx="50" cy="31" r="3" fill="hsl(var(--cream))" stroke="hsl(var(--ink))" strokeWidth="0.4" />
            <circle cx="50" cy="31" r="1" fill="hsl(var(--ink))" />

            {/* 记录之间的连线 */}
            {RECORDS.filter((r) => r.innerPos).map((r, i, arr) => {
              if (i === arr.length - 1) return null;
              const a = r.innerPos!;
              const b = arr[i + 1].innerPos!;
              return (
                <line
                  key={r.id}
                  x1={a.x}
                  y1={a.y * 0.62}
                  x2={b.x}
                  y2={b.y * 0.62}
                  stroke="hsl(var(--ink) / 0.3)"
                  strokeWidth="0.2"
                  strokeDasharray="0.6 0.6"
                />
              );
            })}
          </svg>

          {/* 地形名 */}
          {INNER_REGIONS.map((r) => {
            const m = CATEGORY_META[r.category];
            return (
              <span
                key={r.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 font-serif-en text-sm md:text-base pointer-events-none"
                style={{ left: `${r.cx}%`, top: `${r.cy}%`, color: m.color }}
              >
                {m.emoji} {r.name}
              </span>
            );
          })}

          {/* 中心标 */}
          <span
            className="absolute -translate-x-1/2 -translate-y-1/2 font-hand text-xs text-muted-foreground"
            style={{ left: "50%", top: "57%" }}
          >
            自我之井
          </span>

          {/* 记录光点 */}
          {RECORDS.filter((r) => r.innerPos).map((r) => {
            const m = r.category ? CATEGORY_META[r.category] : null;
            return (
              <button
                key={r.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${r.innerPos!.x}%`, top: `${r.innerPos!.y}%` }}
                title={r.text}
              >
                <span
                  className="block w-2.5 h-2.5 rounded-full border border-foreground"
                  style={{ background: m?.color ?? "hsl(var(--ink))" }}
                />
                <span className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap font-hand text-[11px] bg-card/95 border border-foreground/60 px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 max-w-[200px] truncate">
                  {r.date} · {r.feeling}
                </span>
              </button>
            );
          })}

          {/* 新光点亮起动画 */}
          {showNew && lit && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `${lit[0]}%`, top: `${lit[1]}%` }}
            >
              <span
                className="absolute inset-0 -m-12 rounded-full animate-[litPulse_2s_ease-out_infinite]"
                style={{ background: cat ? `${CATEGORY_META[cat].color}` : "hsl(var(--gold))", opacity: 0.25 }}
              />
              <span
                className="absolute inset-0 -m-6 rounded-full animate-[litPulse_2s_ease-out_0.3s_infinite]"
                style={{ background: cat ? `${CATEGORY_META[cat].color}` : "hsl(var(--gold-bright))", opacity: 0.45 }}
              />
              <span
                className="block w-3.5 h-3.5 rounded-full border-2 border-[hsl(var(--cream))] relative"
                style={{
                  background: cat ? CATEGORY_META[cat].color : "hsl(var(--gold-bright))",
                  boxShadow: `0 0 18px 3px ${cat ? CATEGORY_META[cat].color : "hsl(var(--gold))"}`,
                }}
              />
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-hand text-[11px] bg-foreground text-background px-2 py-0.5 rounded-sm animate-fade-in">
                ✦ {cat ? `${CATEGORY_META[cat].emoji} ${CATEGORY_META[cat].terrain}长出了新光点` : "新印记"}
              </span>
              <style>{`
                @keyframes litPulse {
                  0% { transform: scale(0.6); opacity: 0.9; }
                  100% { transform: scale(2.4); opacity: 0; }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>

      {/* 地形小档 */}
      <div className="grid md:grid-cols-4 gap-3 mt-6">
        {INNER_REGIONS.map((r) => {
          const m = CATEGORY_META[r.category];
          const count = RECORDS.filter((rec) => rec.category === r.category).length;
          return (
            <div
              key={r.name}
              className="ink-card p-4"
              style={{ borderColor: m.color }}
            >
              <p className="font-hand text-sm" style={{ color: m.color }}>
                {m.emoji} {r.name}
              </p>
              <p className="font-serif-en text-base mt-1">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {m.hand}
              </p>
              <p className="font-hand text-xs mt-3">
                已积累 {count} 笔印记
              </p>
            </div>
          );
        })}
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
