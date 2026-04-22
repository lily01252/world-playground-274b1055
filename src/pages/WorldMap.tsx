import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CATEGORY_META, MAP_PLACES, RECORDS } from "@/data/world";

// 外部世界地图：抽象大陆 + 已点亮足迹 + 迷雾
const WorldMap = () => {
  const litRecords = RECORDS.filter((r) => r.mapPos);
  const [params] = useSearchParams();
  const lit = params.get("lit")?.split(",");
  const newPlace = params.get("place");
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
          <p className="font-hand text-base text-muted-foreground">Fog Map</p>
          <h2 className="text-3xl md:text-4xl font-serif-en">外部世界 · 你的版图</h2>
          <p className="text-sm text-muted-foreground mt-1">
            每完成一次副本，就在地图上点亮一处。迷雾会慢慢退去。
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(CATEGORY_META).map(([k, m]) => (
            <span
              key={k}
              className="ink-tag font-hand"
              style={{ borderColor: m.color, color: m.color }}
            >
              ● {m.label}
            </span>
          ))}
        </div>
      </header>

      <div className="ink-card p-3 md:p-5">
        <div className="relative w-full rounded-sm overflow-hidden bg-[hsl(var(--parchment-dark))]" style={{ aspectRatio: "16 / 9" }}>
          {/* 大陆轮廓 SVG */}
          <svg viewBox="0 0 100 56" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="fog" width="3" height="3" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.6" fill="hsl(var(--ink) / 0.08)" />
              </pattern>
              <radialGradient id="lit" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--gold) / 0.45)" />
                <stop offset="100%" stopColor="hsl(var(--gold) / 0)" />
              </radialGradient>
            </defs>

            {/* 海 / 雾底 */}
            <rect width="100" height="56" fill="hsl(var(--parchment-dark))" />
            <rect width="100" height="56" fill="url(#fog)" />

            {/* 主大陆 */}
            <path
              d="M8 28 Q14 14 28 12 Q42 8 54 16 Q68 12 80 22 Q92 28 88 38 Q82 48 66 48 Q50 52 36 46 Q22 50 14 42 Q4 36 8 28 Z"
              fill="hsl(var(--cream))"
              stroke="hsl(var(--ink))"
              strokeWidth="0.4"
            />
            {/* 小岛 */}
            <ellipse cx="22" cy="48" rx="6" ry="2.5" fill="hsl(var(--cream))" stroke="hsl(var(--ink))" strokeWidth="0.3" />
            <ellipse cx="86" cy="14" rx="5" ry="2" fill="hsl(var(--cream))" stroke="hsl(var(--ink))" strokeWidth="0.3" />

            {/* 山脉手绘 */}
            <path d="M30 22 l3 -4 l3 4 M36 22 l3 -5 l3 5" fill="none" stroke="hsl(var(--ink-faded))" strokeWidth="0.3" />
            {/* 河 */}
            <path d="M50 20 Q56 28 52 36 Q48 42 60 46" fill="none" stroke="hsl(var(--sky))" strokeWidth="0.5" opacity="0.6" />

            {/* 已点亮足迹光晕 */}
            {MAP_PLACES.map((p) => (
              <circle key={p.name} cx={p.x} cy={p.y * 0.56} r="6" fill="url(#lit)" />
            ))}

            {/* 路径连线（虚线） */}
            <polyline
              points={MAP_PLACES.map((p) => `${p.x},${p.y * 0.56}`).join(" ")}
              fill="none"
              stroke="hsl(var(--ink) / 0.5)"
              strokeWidth="0.25"
              strokeDasharray="0.8 0.8"
            />
          </svg>

          {/* 足迹标记 */}
          {MAP_PLACES.map((p) => (
            <button
              key={p.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="block w-3 h-3 rounded-full bg-foreground border-2 border-[hsl(var(--cream))] shadow-[0_0_0_2px_hsl(var(--gold)/0.4)]" />
              <span className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap font-hand text-xs bg-card/90 border border-foreground/60 px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {p.name} · {p.count}
              </span>
            </button>
          ))}

          {/* 未探索问号 */}
          {[
            { x: 12, y: 22 },
            { x: 90, y: 50 },
            { x: 42, y: 80 },
          ].map((q, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 font-serif-en text-base text-foreground/30"
              style={{ left: `${q.x}%`, top: `${q.y}%` }}
            >
              ?
            </span>
          ))}

          {/* 新光点亮起动画 — 来自记录页跳转 */}
          {showNew && lit && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `${lit[0]}%`, top: `${lit[1]}%` }}
            >
              {/* 多层光晕 */}
              <span className="absolute inset-0 -m-12 rounded-full bg-[hsl(var(--gold))]/30 animate-[litPulse_2s_ease-out_infinite]" />
              <span className="absolute inset-0 -m-6 rounded-full bg-[hsl(var(--gold-bright))]/40 animate-[litPulse_2s_ease-out_0.3s_infinite]" />
              <span className="block w-4 h-4 rounded-full bg-[hsl(var(--gold-bright))] border-2 border-[hsl(var(--cream))] shadow-[0_0_20px_4px_hsl(var(--gold)/0.8)] relative" />
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-hand text-xs bg-foreground text-background px-2 py-1 rounded-sm animate-fade-in">
                ✦ {newPlace || "新足迹"} · 已点亮
              </span>
              <style>{`
                @keyframes litPulse {
                  0% { transform: scale(0.6); opacity: 0.9; }
                  100% { transform: scale(2.4); opacity: 0; }
                }
              `}</style>
            </div>
          )}


          <div className="absolute bottom-3 right-3 w-14 h-14 rounded-full border-2 border-foreground bg-card/90 flex items-center justify-center font-serif-en text-xs">
            <span className="absolute top-1 text-[10px]">N</span>
            <span>✦</span>
          </div>
        </div>

        {/* 底部统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
          <div className="dashed-frame p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">已点亮</p>
            <p className="font-hand text-lg">{MAP_PLACES.length} 处足迹</p>
          </div>
          <div className="dashed-frame p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">最远</p>
            <p className="font-hand text-lg">向西北 87 km</p>
          </div>
          <div className="dashed-frame p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">最近一次</p>
            <p className="font-hand text-lg">{RECORDS[0].date} · {RECORDS[0].place}</p>
          </div>
          <div className="dashed-frame p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">迷雾还剩</p>
            <p className="font-hand text-lg">大约 73%</p>
          </div>
        </div>
      </div>

      {/* 足迹列表 */}
      <h3 className="font-serif-en text-lg mt-10 mb-4 flex items-center gap-3">
        足迹清单
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {litRecords.map((r) => {
          const m = r.category ? CATEGORY_META[r.category] : null;
          return (
            <Link
              key={r.id}
              to="/chronicle"
              className="ink-card p-4 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-baseline justify-between mb-1">
                <p className="font-serif-en text-base">📍 {r.place}</p>
                <span className="font-hand text-xs text-muted-foreground">
                  {r.date} · {r.weather}
                </span>
              </div>
              {m && (
                <p className="font-hand text-xs mb-1" style={{ color: m.color }}>
                  {m.emoji} 在此留下了 {m.label} 的印记
                </p>
              )}
              <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
                {r.text}
              </p>
            </Link>
          );
        })}
      </div>
    </article>
  );
};

export default WorldMap;
