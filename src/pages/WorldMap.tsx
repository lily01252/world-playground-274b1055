import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CATEGORY_META, MAP_PLACES, RECORDS } from "@/data/world";
import NightMapCanvas, { Lantern } from "@/components/NightMapCanvas";

// 外部世界地图：夜空羊皮纸 + 远山 + 闪烁灯台 + 雾气
const WorldMap = () => {
  const litRecords = RECORDS.filter((r) => r.mapPos);
  const [params] = useSearchParams();
  const lit = params.get("lit")?.split(",");
  const newPlace = params.get("place");
  const [showNew, setShowNew] = useState(false);
  const [year, setYear] = useState<"2024" | "2025" | "2026">("2026");

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
          style={{ color: "hsl(var(--map-text) / 0.7)" }}
        >
          Fog Map
        </p>
        <h2
          className="text-2xl md:text-3xl font-serif-en mt-1"
          style={{ color: "hsl(var(--map-text))", textShadow: "0 2px 8px hsl(0 0% 0% / 0.6)" }}
        >
          你的版图
        </h2>
        <div className="flex gap-1 mt-3">
          {(["2024", "2025", "2026"] as const).map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className="px-3 py-1 text-xs rounded-full font-hand transition-colors"
              style={{
                background:
                  year === y ? "hsl(var(--map-text) / 0.18)" : "transparent",
                border: `1px solid hsl(var(--map-text) / ${year === y ? 0.5 : 0.2})`,
                color: "hsl(var(--map-text))",
              }}
            >
              {y} 年
            </button>
          ))}
        </div>
      </div>
      <button
        className="px-3 py-1.5 text-xs rounded-full font-hand"
        style={{
          background: "hsl(var(--map-text) / 0.14)",
          border: "1px solid hsl(var(--map-text) / 0.3)",
          color: "hsl(var(--map-text))",
        }}
      >
        分享
      </button>
    </div>
  );

  return (
    <article className="max-w-6xl mx-auto px-5 md:px-10 py-8">
      <header className="mb-4 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="font-hand text-base text-muted-foreground">Fog Map</p>
          <h2 className="text-3xl md:text-4xl font-serif-en">外部世界 · 你的版图</h2>
          <p className="text-sm text-muted-foreground mt-1">
            每完成一次副本，就在地图上点亮一座灯台。雾气会慢慢退去。
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
        <NightMapCanvas palette="world" aspectRatio="16 / 11" topOverlay={topOverlay}>
          {/* 已点亮地点：灯台闪烁 */}
          {MAP_PLACES.map((p, i) => (
            <Lantern
              key={p.name}
              x={p.x}
              y={p.y}
              label={p.name}
              size={i === 1 ? 14 : 10}
              flag={i === 1}
            />
          ))}

          {/* 路径连线 */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden
          >
            <polyline
              points={MAP_PLACES.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="hsl(var(--map-lantern) / 0.35)"
              strokeWidth="0.25"
              strokeDasharray="0.8 1.2"
            />
          </svg>

          {/* 未探索问号 */}
          {[
            { x: 12, y: 22 },
            { x: 90, y: 50 },
            { x: 42, y: 80 },
          ].map((q, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center font-serif-en text-sm"
              style={{
                left: `${q.x}%`,
                top: `${q.y}%`,
                background: "hsl(var(--map-night) / 0.55)",
                border: "1px solid hsl(var(--map-text) / 0.3)",
                color: "hsl(var(--map-text) / 0.65)",
              }}
            >
              ?
            </span>
          ))}

          {/* 新光点亮起动画 */}
          {showNew && lit && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
              style={{ left: `${lit[0]}%`, top: `${lit[1]}%` }}
            >
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 120,
                  height: 120,
                  background:
                    "radial-gradient(circle, hsl(var(--map-lantern-glow) / 0.7) 0%, transparent 65%)",
                  animation: "litBurst 2s ease-out infinite",
                }}
              />
              <span
                className="block w-4 h-4 rounded-full relative"
                style={{
                  background: "hsl(var(--map-lantern-glow))",
                  boxShadow:
                    "0 0 24px 6px hsl(var(--map-lantern) / 0.9), 0 0 60px 12px hsl(var(--map-lantern-glow) / 0.5)",
                }}
              />
              <span
                className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-hand text-xs px-2 py-1 rounded-sm"
                style={{
                  top: "100%",
                  background: "hsl(var(--map-night) / 0.85)",
                  color: "hsl(var(--map-lantern-glow))",
                  border: "1px solid hsl(var(--map-lantern) / 0.6)",
                }}
              >
                ✦ {newPlace || "新足迹"} · 已点亮
              </span>
            </div>
          )}

          {/* 罗盘 */}
          <div
            className="absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center font-serif-en text-xs"
            style={{
              background: "hsl(var(--map-night) / 0.7)",
              border: "1px solid hsl(var(--map-text) / 0.4)",
              color: "hsl(var(--map-text))",
            }}
          >
            <span className="absolute top-0.5 text-[10px]">N</span>
            <span>✦</span>
          </div>
        </NightMapCanvas>

        {/* 底部统计 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
          <div className="dashed-frame p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">已点亮</p>
            <p className="font-hand text-lg">{MAP_PLACES.length} 座灯台</p>
          </div>
          <div className="dashed-frame p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">最远</p>
            <p className="font-hand text-lg">向西北 87 km</p>
          </div>
          <div className="dashed-frame p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">最近一次</p>
            <p className="font-hand text-lg">
              {RECORDS[0].date} · {RECORDS[0].place}
            </p>
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
              <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">{r.text}</p>
            </Link>
          );
        })}
      </div>
    </article>
  );
};

export default WorldMap;
