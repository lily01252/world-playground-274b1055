import { ReactNode } from "react";

// 一张"夜空地图"画布：深蓝夜空 + low-poly 远山 + 雾气 + 网格 + 灯台
// palette:
//   world      — 旧的羊皮纸暖色（兼容用，已不再用于 WorldMap）
//   inner      — 内心地图（暖金 + 极光）
//   worldNight — 外部世界夜空版（深蓝紫 + 暖灯，参考图）
export type MapPalette = "world" | "inner" | "worldNight";

const PALETTES: Record<
  MapPalette,
  {
    /** 画布底色 */
    base: string;
    /** 画布角落晕染色 */
    vignette: string;
    /** 雾气 */
    fog: string;
    /** 网格线 */
    grid: string;
    /** 远山 - 三层 */
    mountainFar: string;
    mountainMid: string;
    mountainNear: string;
    /** 山棱受光面 */
    mountainHighlight: string;
    /** 灯台暖光 */
    lantern: string;
    lanternGlow: string;
    /** 文字 */
    text: string;
    textSoft: string;
    /** 是否绘制极光（仅 inner） */
    aurora?: { a: string; b: string; c: string };
  }
> = {
  world: {
    base: "var(--cream)",
    vignette: "var(--parchment-deep)",
    fog: "var(--parchment-deep)",
    grid: "var(--ink)",
    mountainFar: "var(--ink-faded)",
    mountainMid: "var(--ink-soft)",
    mountainNear: "var(--rust)",
    mountainHighlight: "var(--gold)",
    lantern: "var(--gold)",
    lanternGlow: "var(--gold-bright)",
    text: "var(--ink)",
    textSoft: "var(--ink-faded)",
  },
  inner: {
    base: "var(--cream)",
    vignette: "var(--parchment-deep)",
    fog: "var(--parchment-dark)",
    grid: "var(--ink)",
    mountainFar: "var(--ink-faded)",
    mountainMid: "var(--moss)",
    mountainNear: "var(--sky)",
    mountainHighlight: "var(--moss-light)",
    lantern: "var(--seal)",        // 暗紫红，作为心灯主色
    lanternGlow: "var(--rust)",    // 暖橙光晕
    text: "var(--ink)",
    textSoft: "var(--ink-faded)",
    aurora: {
      a: "var(--moss-light)",
      b: "var(--seal)",
      c: "var(--sky)",
    },
  },
  // 夜空版外部地图 —— 深蓝紫底 + 暖金灯台 + low-poly 山脉
  worldNight: {
    base: "var(--night-base)",
    vignette: "var(--night-deep)",
    fog: "var(--night-fog)",
    grid: "var(--night-text)",
    mountainFar: "var(--night-mt-far)",
    mountainMid: "var(--night-mt-mid)",
    mountainNear: "var(--night-mt-near)",
    mountainHighlight: "var(--gold-bright)",
    lantern: "var(--gold-bright)",
    lanternGlow: "var(--gold)",
    text: "var(--night-text)",
    textSoft: "var(--night-text-soft)",
  },
};

interface Props {
  palette?: MapPalette;
  aspectRatio?: string;
  topOverlay?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const NightMapCanvas = ({
  palette = "world",
  aspectRatio = "16 / 10",
  topOverlay,
  children,
  className = "",
}: Props) => {
  const p = PALETTES[palette];
  const isNight = palette === "worldNight";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border-2 border-foreground ${className}`}
      style={{
        aspectRatio,
        background: isNight
          ? `
            radial-gradient(120% 70% at 50% 100%, hsl(${p.vignette} / 0.85), transparent 70%),
            radial-gradient(70% 55% at 22% 18%, hsl(${p.fog} / 0.55), transparent 65%),
            radial-gradient(60% 45% at 82% 12%, hsl(var(--gold) / 0.18), transparent 60%),
            linear-gradient(180deg, hsl(${p.base}) 0%, hsl(${p.vignette}) 100%)
          `
          : `
            radial-gradient(120% 80% at 50% 100%, hsl(${p.vignette} / 0.55), transparent 70%),
            radial-gradient(80% 60% at 50% 0%, hsl(${p.fog} / 0.35), transparent 60%),
            hsl(${p.base})
          `,
      }}
    >
      {/* 纸/夜 纹理叠层 */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isNight ? "mix-blend-screen opacity-25" : "mix-blend-multiply opacity-60"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 100 62"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          {/* 经纬网格 */}
          <pattern id={`grid-${palette}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke={`hsl(${p.grid} / ${isNight ? 0.05 : 0.07})`}
              strokeWidth="0.1"
            />
          </pattern>
          {/* 雾气球 */}
          <radialGradient id={`fogA-${palette}`} cx="22%" cy="38%" r="55%">
            <stop offset="0%" stopColor={`hsl(${p.fog} / ${isNight ? 0.35 : 0.6})`} />
            <stop offset="100%" stopColor={`hsl(${p.fog} / 0)`} />
          </radialGradient>
          <radialGradient id={`fogB-${palette}`} cx="78%" cy="28%" r="50%">
            <stop offset="0%" stopColor={`hsl(${p.fog} / ${isNight ? 0.3 : 0.5})`} />
            <stop offset="100%" stopColor={`hsl(${p.fog} / 0)`} />
          </radialGradient>
          {/* 极光（inner） */}
          {p.aurora && (
            <linearGradient id="auroraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={`hsl(${p.aurora.a} / 0)`} />
              <stop offset="35%" stopColor={`hsl(${p.aurora.a} / 0.35)`} />
              <stop offset="65%" stopColor={`hsl(${p.aurora.b} / 0.32)`} />
              <stop offset="100%" stopColor={`hsl(${p.aurora.c} / 0)`} />
            </linearGradient>
          )}
          {/* 夜空银河带 */}
          {isNight && (
            <linearGradient id="milkyWay" x1="0%" y1="0%" x2="100%" y2="20%">
              <stop offset="0%" stopColor={`hsl(${p.fog} / 0)`} />
              <stop offset="40%" stopColor={`hsl(var(--sky) / 0.18)`} />
              <stop offset="65%" stopColor={`hsl(var(--gold-bright) / 0.12)`} />
              <stop offset="100%" stopColor={`hsl(${p.fog} / 0)`} />
            </linearGradient>
          )}
        </defs>

        {/* 夜空：银河带 + 远星 */}
        {isNight && (
          <>
            <path
              d="M -10 8 Q 30 4 60 10 T 110 14 L 110 22 Q 70 18 40 22 T -10 24 Z"
              fill="url(#milkyWay)"
              style={{ animation: "auroraFlow 30s ease-in-out infinite" }}
            />
            {/* 远处星点（独立于近萤，更小更冷） */}
            {Array.from({ length: 60 }).map((_, i) => {
              const x = (i * 73.13) % 100;
              const y = (i * 29.7) % 38;
              const r = ((i % 4) + 1) * 0.08;
              return (
                <circle
                  key={`star-${i}`}
                  cx={x}
                  cy={y}
                  r={r}
                  fill={`hsl(var(--night-text) / ${0.35 + (i % 3) * 0.2})`}
                  style={{
                    animation: `twinkle ${3 + (i % 6)}s ease-in-out ${(i * 0.17) % 4}s infinite`,
                  }}
                />
              );
            })}
          </>
        )}

        {/* 网格 */}
        <rect width="100" height="62" fill={`url(#grid-${palette})`} />

        {/* 极光带 - inner 专属，复古淡彩 */}
        {p.aurora && (
          <>
            <path
              d="M -10 16 Q 30 6 60 12 T 110 10 L 110 24 Q 70 20 40 26 T -10 28 Z"
              fill="url(#auroraGrad)"
              opacity="0.5"
              style={{ animation: "auroraFlow 22s ease-in-out infinite" }}
            />
            <path
              d="M -10 6 Q 40 0 70 4 T 110 2 L 110 14 Q 60 12 30 16 T -10 18 Z"
              fill="url(#auroraGrad)"
              opacity="0.3"
              style={{ animation: "auroraFlow 28s ease-in-out infinite reverse" }}
            />
          </>
        )}

        {/* 远山 - 三层 low-poly + 墨线轮廓 */}
        <g>
          {/* 远层 */}
          <path
            d="M 0 38 L 8 32 L 14 36 L 22 28 L 30 34 L 38 26 L 46 32 L 54 24 L 62 30 L 70 22 L 78 30 L 86 24 L 94 32 L 100 28 L 100 62 L 0 62 Z"
            fill={`hsl(${p.mountainFar} / ${isNight ? 0.55 : 0.28})`}
            stroke={`hsl(${p.grid} / ${isNight ? 0.18 : 0.35})`}
            strokeWidth="0.18"
          />
          {/* 中层 */}
          <path
            d="M 0 46 L 6 42 L 12 46 L 20 38 L 28 44 L 36 36 L 44 42 L 52 34 L 60 42 L 68 36 L 76 44 L 84 38 L 92 46 L 100 40 L 100 62 L 0 62 Z"
            fill={`hsl(${p.mountainMid} / ${isNight ? 0.7 : 0.32})`}
            stroke={`hsl(${p.grid} / ${isNight ? 0.22 : 0.45})`}
            strokeWidth="0.2"
          />
          {/* 中层暖光面 */}
          <path
            d="M 28 44 L 36 36 L 44 42 L 52 34 L 60 42 L 68 36 L 76 44 L 76 62 L 28 62 Z"
            fill={`hsl(${p.mountainHighlight} / ${isNight ? 0.22 : 0.18})`}
          />
          {/* 近层 */}
          <path
            d="M 0 54 L 10 50 L 18 54 L 28 48 L 38 54 L 50 46 L 60 54 L 70 50 L 82 56 L 92 50 L 100 54 L 100 62 L 0 62 Z"
            fill={`hsl(${p.mountainNear} / ${isNight ? 0.85 : 0.28})`}
            stroke={`hsl(${p.grid} / ${isNight ? 0.3 : 0.5})`}
            strokeWidth="0.22"
          />
          {/* 山顶小三角点缀（更地图味） */}
          {[
            [22, 28],
            [38, 26],
            [54, 24],
            [70, 22],
            [86, 24],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M ${x - 1.2} ${y + 1.5} L ${x} ${y - 0.6} L ${x + 1.2} ${y + 1.5} Z`}
              fill="none"
              stroke={`hsl(${p.grid} / ${isNight ? 0.35 : 0.55})`}
              strokeWidth="0.18"
            />
          ))}
        </g>

        {/* 雾气 */}
        <rect width="100" height="62" fill={`url(#fogA-${palette})`} />
        <rect width="100" height="62" fill={`url(#fogB-${palette})`} />

        {/* 远萤 / 飘散光斑 */}
        {Array.from({ length: 18 }).map((_, i) => {
          const x = (i * 137.5) % 100;
          const y = (i * 53.3) % 32;
          const r = ((i % 3) + 1) * 0.18;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={`hsl(${p.lanternGlow} / ${isNight ? 0.85 : 0.65})`}
              style={{
                animation: `twinkle ${4 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* 内容层 */}
      <div className="absolute inset-0">{children}</div>

      {/* 顶部叠加 */}
      {topOverlay && <div className="absolute inset-x-0 top-0 p-4 md:p-5">{topOverlay}</div>}

      {/* 共用 keyframes */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.25); }
        }
        @keyframes auroraFlow {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.4; }
          50% { transform: translateX(-3%) translateY(1.5%); opacity: 0.65; }
        }
        @keyframes lanternBlink {
          0%, 100% { opacity: 1; filter: brightness(1); }
          45% { opacity: 0.85; filter: brightness(1.35); }
          55% { opacity: 0.75; filter: brightness(0.95); }
        }
        @keyframes lanternHalo {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.25); opacity: 0.9; }
        }
        @keyframes litBurst {
          0% { transform: scale(0.4); opacity: 0; }
          25% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

/** 灯台/光点 — 闪烁的暖光（或自定义颜色） */
export const Lantern = ({
  x,
  y,
  label,
  color,
  glow,
  size = 12,
  flag = false,
  labelColor,
  labelBg,
  labelBorder,
}: {
  x: number;
  y: number;
  label?: string;
  color?: string;
  glow?: string;
  size?: number;
  flag?: boolean;
  labelColor?: string;
  labelBg?: string;
  labelBorder?: string;
}) => {
  const c = color ?? "hsl(var(--gold))";
  const g = glow ?? "hsl(var(--gold-bright))";
  const lc = labelColor ?? "hsl(var(--ink))";
  const lbg = labelBg ?? "hsl(var(--cream) / 0.85)";
  const lbd = labelBorder ?? "hsl(var(--ink) / 0.4)";
  return (
    <button
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* 外光晕 */}
      <span
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: size * 4,
          height: size * 4,
          background: `radial-gradient(circle, ${g} 0%, transparent 65%)`,
          opacity: 0.7,
          animation: "lanternHalo 3.2s ease-in-out infinite",
        }}
      />
      {flag ? (
        <span className="relative block" style={{ width: size, height: size * 1.6 }}>
          {/* 旗杆 */}
          <span
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px"
            style={{ height: size * 1.6, background: lc }}
          />
          {/* 旗面 */}
          <span
            className="absolute left-1/2 top-0 block"
            style={{
              width: size * 0.9,
              height: size * 0.55,
              background: c,
              border: `1px solid ${lc}`,
              clipPath: "polygon(0 0, 100% 0, 75% 50%, 100% 100%, 0 100%)",
              animation: "lanternBlink 2.2s ease-in-out infinite",
            }}
          />
        </span>
      ) : (
        <span
          className="relative block rounded-full"
          style={{
            width: size,
            height: size,
            background: c,
            border: `1.5px solid ${lc}`,
            boxShadow: `0 0 ${size * 0.8}px ${size / 3}px ${g}`,
            animation: "lanternBlink 2.4s ease-in-out infinite",
          }}
        />
      )}
      {label && (
        <span
          className="absolute left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap font-hand text-[11px] px-1.5 py-0.5 rounded-sm pointer-events-none"
          style={{
            top: "100%",
            color: lc,
            background: lbg,
            border: `1px solid ${lbd}`,
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
};

export default NightMapCanvas;

