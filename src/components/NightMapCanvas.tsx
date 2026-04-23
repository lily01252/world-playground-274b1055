import { ReactNode } from "react";

// 一张"夜空羊皮纸"地图画布：深色夜空 + 雾气 + 远山轮廓 + 网格 + 内容层
// 通过 palette 切换"外部世界（暖色灯台）"和"内心地图（极光紫青）"两种调色
export type MapPalette = "world" | "inner";

const PALETTES: Record<
  MapPalette,
  {
    night: string;
    nightDeep: string;
    fog: string;
    fogLight: string;
    grid: string;
    mountainFar: string;
    mountainMid: string;
    mountainNear: string;
    lantern: string;
    lanternGlow: string;
    text: string;
    auroraA?: string;
    auroraB?: string;
    auroraC?: string;
  }
> = {
  world: {
    night: "var(--map-night)",
    nightDeep: "var(--map-night-deep)",
    fog: "var(--map-fog)",
    fogLight: "var(--map-fog-light)",
    grid: "var(--map-grid)",
    mountainFar: "var(--map-mountain-far)",
    mountainMid: "var(--map-mountain-mid)",
    mountainNear: "var(--map-mountain-near)",
    lantern: "var(--map-lantern)",
    lanternGlow: "var(--map-lantern-glow)",
    text: "var(--map-text)",
  },
  inner: {
    night: "var(--inner-night)",
    nightDeep: "var(--inner-night-deep)",
    fog: "var(--inner-fog)",
    fogLight: "var(--inner-fog-light)",
    grid: "var(--inner-grid)",
    mountainFar: "var(--inner-night)",
    mountainMid: "var(--inner-fog)",
    mountainNear: "var(--inner-fog-light)",
    lantern: "var(--inner-lantern)",
    lanternGlow: "var(--inner-lantern-glow)",
    text: "var(--inner-text)",
    auroraA: "var(--inner-aurora-1)",
    auroraB: "var(--inner-aurora-2)",
    auroraC: "var(--inner-aurora-3)",
  },
};

interface Props {
  palette?: MapPalette;
  /** 16/9 之类，默认 16/10 */
  aspectRatio?: string;
  /** 顶部叠加：标题/年份切换/分享按钮等 */
  topOverlay?: ReactNode;
  /** 画布之上、灯台之下，可放装饰（旗帜、问号等） */
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

  return (
    <div
      className={`relative w-full overflow-hidden rounded-sm border-2 border-foreground ${className}`}
      style={{
        aspectRatio,
        background: `radial-gradient(120% 80% at 50% 110%, hsl(${p.fog} / 0.55), hsl(${p.nightDeep}) 70%)`,
      }}
    >
      {/* 远景星点 / 飘散光斑 */}
      <svg
        viewBox="0 0 100 62"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          {/* 网格 */}
          <pattern id={`grid-${palette}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke={`hsl(${p.grid} / 0.10)`} strokeWidth="0.12" />
          </pattern>
          {/* 雾气 */}
          <radialGradient id={`fogA-${palette}`} cx="20%" cy="40%" r="60%">
            <stop offset="0%" stopColor={`hsl(${p.fogLight} / 0.55)`} />
            <stop offset="100%" stopColor={`hsl(${p.fog} / 0)`} />
          </radialGradient>
          <radialGradient id={`fogB-${palette}`} cx="80%" cy="30%" r="55%">
            <stop offset="0%" stopColor={`hsl(${p.fogLight} / 0.45)`} />
            <stop offset="100%" stopColor={`hsl(${p.fog} / 0)`} />
          </radialGradient>
          {/* 极光（仅 inner） */}
          {palette === "inner" && (
            <>
              <linearGradient id="auroraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={`hsl(${p.auroraA} / 0)`} />
                <stop offset="35%" stopColor={`hsl(${p.auroraA} / 0.55)`} />
                <stop offset="65%" stopColor={`hsl(${p.auroraB} / 0.55)`} />
                <stop offset="100%" stopColor={`hsl(${p.auroraC} / 0)`} />
              </linearGradient>
            </>
          )}
          {/* 灯台光晕 */}
          <radialGradient id={`lantern-${palette}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsl(${p.lanternGlow} / 0.95)`} />
            <stop offset="40%" stopColor={`hsl(${p.lantern} / 0.55)`} />
            <stop offset="100%" stopColor={`hsl(${p.lantern} / 0)`} />
          </radialGradient>
        </defs>

        {/* 网格 */}
        <rect width="100" height="62" fill={`url(#grid-${palette})`} />

        {/* 极光带 - inner 专属 */}
        {palette === "inner" && (
          <>
            <path
              d="M -10 18 Q 30 6 60 14 T 110 12 L 110 26 Q 70 22 40 28 T -10 30 Z"
              fill="url(#auroraGrad)"
              opacity="0.55"
              style={{ animation: "auroraFlow 18s ease-in-out infinite" }}
            />
            <path
              d="M -10 8 Q 40 0 70 6 T 110 4 L 110 14 Q 60 14 30 18 T -10 18 Z"
              fill="url(#auroraGrad)"
              opacity="0.35"
              style={{ animation: "auroraFlow 24s ease-in-out infinite reverse" }}
            />
          </>
        )}

        {/* 远山 - 多层 low-poly 山脊 */}
        <g>
          {/* 远层 */}
          <path
            d="M 0 38 L 8 32 L 14 36 L 22 28 L 30 34 L 38 26 L 46 32 L 54 24 L 62 30 L 70 22 L 78 30 L 86 24 L 94 32 L 100 28 L 100 62 L 0 62 Z"
            fill={`hsl(${p.mountainFar})`}
            opacity="0.85"
          />
          {/* 中层 */}
          <path
            d="M 0 46 L 6 42 L 12 46 L 20 38 L 28 44 L 36 36 L 44 42 L 52 34 L 60 42 L 68 36 L 76 44 L 84 38 L 92 46 L 100 40 L 100 62 L 0 62 Z"
            fill={`hsl(${p.mountainMid})`}
            opacity="0.78"
          />
          {/* 中层光面 - 模拟暖光照过的山棱 */}
          <path
            d="M 28 44 L 36 36 L 44 42 L 52 34 L 60 42 L 68 36 L 76 44 L 76 62 L 28 62 Z"
            fill={`hsl(${p.mountainNear} / 0.35)`}
          />
          {/* 近层 */}
          <path
            d="M 0 54 L 10 50 L 18 54 L 28 48 L 38 54 L 50 46 L 60 54 L 70 50 L 82 56 L 92 50 L 100 54 L 100 62 L 0 62 Z"
            fill={`hsl(${p.mountainNear} / 0.55)`}
          />
        </g>

        {/* 雾气球 */}
        <rect width="100" height="62" fill={`url(#fogA-${palette})`} />
        <rect width="100" height="62" fill={`url(#fogB-${palette})`} />

        {/* 散落星点 / 远萤 */}
        {Array.from({ length: 26 }).map((_, i) => {
          const x = (i * 137.5) % 100;
          const y = (i * 53.3) % 38;
          const r = ((i % 3) + 1) * 0.18;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill={`hsl(${p.lanternGlow} / 0.55)`}
              style={{
                animation: `twinkle ${4 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* 内容层（灯台、标记） */}
      <div className="absolute inset-0">{children}</div>

      {/* 顶部叠加 */}
      {topOverlay && <div className="absolute inset-x-0 top-0 p-4 md:p-5">{topOverlay}</div>}

      {/* 共用 keyframes */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }
        @keyframes auroraFlow {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.4; }
          50% { transform: translateX(-4%) translateY(2%); opacity: 0.7; }
        }
        @keyframes lanternBlink {
          0%, 100% { opacity: 1; filter: brightness(1); }
          45% { opacity: 0.85; filter: brightness(1.4); }
          55% { opacity: 0.7; filter: brightness(0.9); }
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
}: {
  x: number;
  y: number;
  label?: string;
  color?: string; // 完整 hsl(...) 字符串，可选
  glow?: string;
  size?: number;
  flag?: boolean;
}) => {
  const c = color ?? "hsl(var(--map-lantern))";
  const g = glow ?? "hsl(var(--map-lantern-glow))";
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
          animation: "lanternHalo 3.2s ease-in-out infinite",
        }}
      />
      {flag ? (
        <span className="relative block" style={{ width: size, height: size * 1.6 }}>
          {/* 旗杆 */}
          <span
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px"
            style={{ height: size * 1.6, background: c }}
          />
          {/* 旗面 */}
          <span
            className="absolute left-1/2 top-0 block"
            style={{
              width: size * 0.9,
              height: size * 0.55,
              background: c,
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
            boxShadow: `0 0 ${size}px ${size / 2}px ${g}`,
            animation: "lanternBlink 2.4s ease-in-out infinite",
          }}
        />
      )}
      {label && (
        <span
          className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap font-hand text-[11px] px-1.5 py-0.5 rounded-sm pointer-events-none"
          style={{
            top: "100%",
            color: c,
            textShadow: "0 1px 4px hsl(0 0% 0% / 0.8)",
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
};

export default NightMapCanvas;
