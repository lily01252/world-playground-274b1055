import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CATEGORY_META, INNER_REGIONS, RECORDS, type QuestCategory } from "@/data/world";
import NightMapCanvas from "@/components/NightMapCanvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WeatherIcon, IconMapPin } from "@/components/HandIcon";

// 内心地形图：羊皮纸水彩 · 一段叙事性的心智探索之旅
const InnerTerrain = () => {
  const [params] = useSearchParams();
  const lit = params.get("lit")?.split(",");
  const cat = params.get("cat") as QuestCategory | null;
  const [showNew, setShowNew] = useState(false);
  const [phase, setPhase] = useState<"new" | "waxing" | "full">("waxing");
  const [openCat, setOpenCat] = useState<QuestCategory | null>(null);

  useEffect(() => {
    if (lit && lit.length === 2) {
      setShowNew(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const t = setTimeout(() => setShowNew(false), 6500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // 副本 → 复古暖色
  const innerColor = (c: QuestCategory) => {
    const map: Record<QuestCategory, string> = {
      flourish: "hsl(var(--moss))",
      courage: "hsl(var(--rust))",
      create: "hsl(var(--gold))",
      solitude: "hsl(var(--sky))",
    };
    return map[c];
  };

  // —— 顶部叠加：标题 + 月相 + 分享，全部统一为羊皮纸古典样式 ——
  const topOverlay = (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p
          className="font-hand text-[10px] tracking-[0.45em] uppercase"
          style={{ color: "hsl(var(--ink-faded))" }}
        >
          Inner Terrain · Carte du Cœur
        </p>
        <h2 className="text-xl md:text-2xl font-serif-en mt-1 text-foreground">
          心之地理
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {/* 月相：图例式胶囊 */}
        <div
          className="flex rounded-full overflow-hidden"
          style={{
            border: "1px solid hsl(var(--ink) / 0.35)",
            background: "hsl(var(--cream) / 0.7)",
          }}
        >
          {(["new", "waxing", "full"] as const).map((y, i) => (
            <button
              key={y}
              onClick={() => setPhase(y)}
              className="px-2.5 py-1 text-[11px] font-hand transition-colors"
              style={{
                background: phase === y ? "hsl(var(--ink) / 0.12)" : "transparent",
                color: "hsl(var(--ink))",
                borderLeft: i === 0 ? "none" : "1px solid hsl(var(--ink) / 0.2)",
              }}
              title={y === "new" ? "新月" : y === "waxing" ? "半月" : "满月"}
            >
              {y === "new" ? "🌑" : y === "waxing" ? "🌓" : "🌕"}
            </button>
          ))}
        </div>
        <button
          className="px-2.5 py-1 text-[11px] rounded-full font-hand inline-flex items-center gap-1"
          style={{
            background: "hsl(var(--cream) / 0.7)",
            border: "1px solid hsl(var(--ink) / 0.35)",
            color: "hsl(var(--ink))",
          }}
        >
          ✒ 分享
        </button>
      </div>
    </div>
  );

  return (
    <article className="max-w-6xl mx-auto px-5 md:px-10 py-8">
      <header className="mb-4 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="font-hand text-base text-muted-foreground">Inner Terrain</p>
          <h2 className="text-3xl md:text-4xl font-serif-en">内心地形 · 心之地理</h2>
          <p className="text-sm text-muted-foreground mt-1">
            每一笔记录都会落进对应的地形，化作一处水彩晕染。
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
        {/* 地图本体 — sepia 滤镜统一暖色叙事感 */}
        <div style={{ filter: "sepia(0.18) saturate(0.92)" }}>
          <NightMapCanvas palette="inner" aspectRatio="16 / 11" topOverlay={topOverlay}>
            {/* —— 心境地形：水彩晕染 —— */}
            <svg
              viewBox="0 0 100 62"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden
            >
              <defs>
                {/* 噪点滤镜：让晕染的边缘有手绘水彩的呼吸感 */}
                <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.9"
                    numOctaves="2"
                    seed="4"
                    result="noise"
                  />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" />
                  <feGaussianBlur stdDeviation="0.35" />
                </filter>
                {INNER_REGIONS.map((r) => (
                  <radialGradient
                    key={r.name}
                    id={`pool-${r.category}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop offset="0%" stopColor={innerColor(r.category)} stopOpacity="0.42" />
                    <stop offset="55%" stopColor={innerColor(r.category)} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={innerColor(r.category)} stopOpacity="0" />
                  </radialGradient>
                ))}
              </defs>

              {/* 水彩晕染（缩小+柔和；去掉硬朗的虚线圆） */}
              <g filter="url(#watercolor)">
                {INNER_REGIONS.map((r) => {
                  const rr = r.r * 0.72; // 缩小覆盖
                  return (
                    <g key={r.name}>
                      {/* 主晕染 */}
                      <ellipse
                        cx={r.cx}
                        cy={r.cy * 0.62}
                        rx={rr}
                        ry={rr * 0.78}
                        fill={`url(#pool-${r.category})`}
                      />
                      {/* 一圈内沿，形成水彩沉淀的暗边 */}
                      <ellipse
                        cx={r.cx}
                        cy={r.cy * 0.62}
                        rx={rr * 0.55}
                        ry={rr * 0.42}
                        fill={innerColor(r.category)}
                        opacity="0.06"
                      />
                    </g>
                  );
                })}
              </g>

              {/* —— 自我之井：stylized 古井 pool —— */}
              <g transform="translate(50, 31)">
                {/* 井水水面：浅金光 */}
                <ellipse rx="2.4" ry="2.4" fill="hsl(var(--cream))" opacity="0.85" />
                <ellipse rx="2.0" ry="2.0" fill="hsl(var(--gold) / 0.35)" />
                <ellipse rx="2.0" ry="2.0" fill="none" stroke="hsl(var(--ink) / 0.45)" strokeWidth="0.18" />
                {/* 水波 */}
                <ellipse rx="1.3" ry="0.5" fill="none" stroke="hsl(var(--ink) / 0.35)" strokeWidth="0.12" />
                <ellipse rx="0.7" ry="0.25" fill="none" stroke="hsl(var(--ink) / 0.35)" strokeWidth="0.1" />
                {/* 井口石环（八边形暗示，避免一个黑圆的沉重） */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i / 8) * Math.PI * 2;
                  const x1 = Math.cos(a) * 2.6;
                  const y1 = Math.sin(a) * 2.6;
                  const x2 = Math.cos(a) * 3.1;
                  const y2 = Math.sin(a) * 3.1;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(var(--ink) / 0.55)"
                      strokeWidth="0.18"
                    />
                  );
                })}
                {/* 中心微光 */}
                <circle r="0.45" fill="hsl(var(--gold-bright))" opacity="0.85" />
              </g>
            </svg>

            {/* —— 地形名签：贴近水彩中心的小羊皮纸标签 —— */}
            {INNER_REGIONS.map((r) => (
              <span
                key={r.name}
                className="absolute -translate-x-1/2 font-hand text-[11px] pointer-events-none whitespace-nowrap"
                style={{
                  left: `${r.cx}%`,
                  // 让文字略低于地形圆心，避免压在最深处
                  top: `${r.cy + 4}%`,
                  color: "hsl(var(--ink))",
                  background: "hsl(var(--cream) / 0.78)",
                  border: "1px solid hsl(var(--ink) / 0.35)",
                  padding: "1px 6px",
                  borderRadius: "2px",
                  boxShadow: "1px 1px 0 hsl(var(--ink) / 0.2)",
                }}
              >
                <span style={{ color: innerColor(r.category) }}>
                  {CATEGORY_META[r.category].emoji}
                </span>{" "}
                {r.name}
              </span>
            ))}

            {/* 自我之井小标 */}
            <span
              className="absolute -translate-x-1/2 font-hand text-[10px] pointer-events-none tracking-widest"
              style={{
                left: "50%",
                top: "calc(50% + 22px)",
                color: "hsl(var(--ink) / 0.7)",
              }}
            >
              · 自我之井 ·
            </span>

            {/* —— 记录点：统一的小羊皮纸标签 —— */}
            {RECORDS.filter((r) => r.innerPos).map((r) => {
              const c = r.category ? innerColor(r.category) : "hsl(var(--ink))";
              return (
                <button
                  key={r.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${r.innerPos!.x}%`, top: `${r.innerPos!.y}%` }}
                  title={r.text}
                >
                  {/* 点位本体：小封蜡圆点 */}
                  <span
                    className="block rounded-full relative"
                    style={{
                      width: 8,
                      height: 8,
                      background: c,
                      border: "1.2px solid hsl(var(--ink))",
                      boxShadow: `0 0 6px ${c}`,
                    }}
                  />
                  {/* 标签：日期 · 心境，常驻显示但小巧 */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap font-hand text-[10px] px-1.5 py-px rounded-sm pointer-events-none transition-opacity"
                    style={{
                      top: "100%",
                      color: "hsl(var(--ink))",
                      background: "hsl(var(--cream) / 0.85)",
                      border: "1px solid hsl(var(--ink) / 0.3)",
                      boxShadow: "1px 1px 0 hsl(var(--ink) / 0.18)",
                    }}
                  >
                    {r.date.slice(5)} · {r.feeling}
                  </span>
                </button>
              );
            })}

            {/* —— 新光点亮起动画 —— */}
            {showNew && lit && (
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                style={{ left: `${lit[0]}%`, top: `${lit[1]}%` }}
              >
                <span
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 110,
                    height: 110,
                    background: `radial-gradient(circle, ${
                      cat ? innerColor(cat) : "hsl(var(--gold-bright))"
                    } 0%, transparent 65%)`,
                    animation: "litBurst 2s ease-out infinite",
                    opacity: 0.55,
                  }}
                />
                <span
                  className="block w-3 h-3 rounded-full relative"
                  style={{
                    background: cat ? innerColor(cat) : "hsl(var(--gold-bright))",
                    border: "1.2px solid hsl(var(--ink))",
                    boxShadow: `0 0 16px 4px ${
                      cat ? innerColor(cat) : "hsl(var(--gold))"
                    }`,
                  }}
                />
                <span
                  className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap font-hand text-[11px] px-2 py-0.5 rounded-sm"
                  style={{
                    top: "100%",
                    background: "hsl(var(--cream) / 0.9)",
                    color: "hsl(var(--ink))",
                    border: `1px solid ${
                      cat ? innerColor(cat) : "hsl(var(--ink) / 0.5)"
                    }`,
                    boxShadow: "1px 1px 0 hsl(var(--ink) / 0.2)",
                  }}
                >
                  ✦ {cat ? `${CATEGORY_META[cat].emoji} ${CATEGORY_META[cat].terrain}长出了新印记` : "新印记"}
                </span>
              </div>
            )}
          </NightMapCanvas>
        </div>

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
