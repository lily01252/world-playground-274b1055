// 手绘墨线图标库 —— 替代页面里的 emoji
// 全部用 currentColor，保持与文字同色（便于按类别 / 主题着色）
// 风格：细线条 + 略带颤抖的手绘感 + 偶尔点缀
import { type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (extra?: string) =>
  `inline-block flex-shrink-0 ${extra ?? ""}`.trim();

const wrap = (
  { size = 16, className, children, ...rest }: IconProps & { children: React.ReactNode },
) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={base(className)}
    {...rest}
  >
    {children}
  </svg>
);

/* ============ 四类副本 ============ */
export const IconTree = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M12 21v-6" />
        <path d="M12 15c-3 0-5-2-5-4.5C7 8 9 6 12 6s5 2 5 4.5C17 13 15 15 12 15z" />
        <path d="M9 9.5c.6.5 1.4.8 2.2.8M14.6 11.2c-.6.4-1.4.6-2.1.6" />
        <path d="M10.4 17.5h3.2" />
      </>
    ),
  });

export const IconSword = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M14.5 4.5l5 5-9 9H6v-4.5z" />
        <path d="M5 19l3-3" />
        <path d="M9 13.5l1.5 1.5" />
      </>
    ),
  });

export const IconBrush = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M4 20c2.5.5 4-1 4-3 0-1.2-1-2-2-2s-2 .8-2 2c0 1 .5 2 0 3z" />
        <path d="M8 15l9-9 3 3-9 9" />
        <path d="M14 8l3 3" />
      </>
    ),
  });

export const IconWave = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M3 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </>
    ),
  });

/* ============ 元素 / 道具 ============ */
export const IconLeaf = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M5 19c0-7 5-13 14-14-1 9-7 14-14 14z" />
        <path d="M5 19c3-3 6-5 10-7" />
      </>
    ),
  });

export const IconFlame = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M12 3c0 4 4 5 4 10a4 4 0 11-8 0c0-2 1-3 2-4-1 0-2-1-2-3 1 0 4-1 4-3z" />
        <path d="M12 17.5c1 0 1.5-.6 1.5-1.5" />
      </>
    ),
  });

export const IconSpark = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        <path d="M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
      </>
    ),
  });

export const IconDroplet = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M12 3c2 4 6 7 6 11a6 6 0 11-12 0c0-4 4-7 6-11z" />
        <path d="M9 15c.5 1.5 1.5 2.4 3 2.5" />
      </>
    ),
  });

export const IconMapPin = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M12 21c-4-5-7-8-7-12a7 7 0 0114 0c0 4-3 7-7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
  });

export const IconScroll = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M5 5h11v13a2 2 0 002 2H8a2 2 0 01-2-2v-1h10" />
        <path d="M5 5a2 2 0 012-2h2v4H5z" />
        <path d="M9 9h5M9 12h5" />
      </>
    ),
  });

export const IconMap = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
        <path d="M9 4v16M15 6v16" />
      </>
    ),
  });

export const IconCompass = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5L13 13l-3.5 1.5L11 11z" />
      </>
    ),
  });

export const IconClock = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  });

export const IconCalendar = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="1" />
        <path d="M4 9h16M9 3v4M15 3v4" />
      </>
    ),
  });

export const IconHourglass = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M6 3h12M6 21h12" />
        <path d="M7 3c0 5 5 6 5 9 0-3 5-4 5-9" />
        <path d="M7 21c0-5 5-6 5-9 0 3 5 4 5 9" />
      </>
    ),
  });

export const IconQuill = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M20 4c-7 1-12 5-14 12l3 3c7-2 11-7 12-14z" />
        <path d="M9 19l-3 1 1-3" />
        <path d="M14 7c-3 1-6 4-7 7" />
      </>
    ),
  });

export const IconStar = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M12 3l2.5 5.5L20 9.5l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z" />
      </>
    ),
  });

export const IconStarFour = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M12 3v18M3 12h18" />
        <path d="M12 8c1 2 2 3 4 4-2 1-3 2-4 4-1-2-2-3-4-4 2-1 3-2 4-4z" />
      </>
    ),
  });

export const IconLock = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <rect x="5" y="11" width="14" height="9" rx="1" />
        <path d="M8 11V8a4 4 0 018 0v3" />
        <circle cx="12" cy="15.5" r="1" />
      </>
    ),
  });

export const IconKey = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <circle cx="8" cy="14" r="4" />
        <path d="M11 12l9-9M16 7l3 3M14 9l3 3" />
      </>
    ),
  });

export const IconLotus = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M12 20c-5 0-9-3-9-7 3 0 6 1 9 7 3-6 6-7 9-7 0 4-4 7-9 7z" />
        <path d="M12 20c-1-5 0-9 0-13 0 4 1 8 0 13z" />
        <path d="M12 20c-3-3-3-7-2-10 1 3 1 7 2 10zM12 20c3-3 3-7 2-10-1 3-1 7-2 10z" />
      </>
    ),
  });

export const IconSunrise = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M3 18h18" />
        <path d="M6 18a6 6 0 0112 0" />
        <path d="M12 5v3M5 9l2 2M19 9l-2 2M3 14h2M19 14h2" />
      </>
    ),
  });

export const IconSun = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5" />
      </>
    ),
  });

export const IconCloudSun = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <circle cx="8" cy="9" r="3" />
        <path d="M8 3v2M3 9h2M5 4l1.5 1.5" />
        <path d="M11 17h7a3 3 0 000-6 5 5 0 00-9 1" />
      </>
    ),
  });

export const IconRain = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M6 14a5 5 0 014-8 5 5 0 019 3 3.5 3.5 0 01-1 7H7a3 3 0 01-1-2z" />
        <path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3" />
      </>
    ),
  });

export const IconMoon = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M20 14a8 8 0 01-10-10 8 8 0 1010 10z" />
      </>
    ),
  });

export const IconCamera = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7l2-3h4l2 3" />
        <circle cx="12" cy="13.5" r="3.5" />
      </>
    ),
  });

export const IconMic = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 12a7 7 0 0014 0M12 19v3" />
      </>
    ),
  });

export const IconTag = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M3 12V4h8l10 10-8 8z" />
        <circle cx="7.5" cy="7.5" r="1.2" />
      </>
    ),
  });

export const IconMegaphone = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M3 10v4l13 6V4z" />
        <path d="M16 8a4 4 0 010 8" />
        <path d="M6 14v4h3v-4" />
      </>
    ),
  });

export const IconEnvelope = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="1" />
        <path d="M3 7l9 7 9-7" />
      </>
    ),
  });

export const IconUsers = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <circle cx="9" cy="9" r="3" />
        <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
        <circle cx="17" cy="8" r="2.2" />
        <path d="M15 14c4 0 6 2 6 5" />
      </>
    ),
  });

export const IconMountain = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M3 19l6-10 4 6 2-3 6 7z" />
        <path d="M9 9l1.5 2" />
      </>
    ),
  });

export const IconSwimmer = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <circle cx="17" cy="6" r="1.6" />
        <path d="M5 11l5-3 4 4 4-1" />
        <path d="M3 16c2-1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 3-1" />
        <path d="M3 20c2-1 3 1 5 0s3-1 5 0 3 1 5 0 3-1 3-1" />
      </>
    ),
  });

export const IconBook = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M4 5a2 2 0 012-2h13v15H6a2 2 0 00-2 2z" />
        <path d="M4 20a2 2 0 012-2h13" />
        <path d="M8 7h7M8 10h7" />
      </>
    ),
  });

export const IconQuestion = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9.5a3 3 0 015.5 1.5c0 1.5-2 2-2 3.5" />
        <circle cx="12.5" cy="17.5" r="0.6" fill="currentColor" />
      </>
    ),
  });

export const IconCheck = (p: IconProps) =>
  wrap({
    ...p,
    children: <path d="M5 12.5l4 4 10-10" />,
  });

export const IconArrowRight = (p: IconProps) =>
  wrap({
    ...p,
    children: (
      <>
        <path d="M4 12h16" />
        <path d="M14 6l6 6-6 6" />
      </>
    ),
  });

/* ============ 类别 → 图标映射（用于 CATEGORY_META.icon） ============ */
import type { QuestCategory } from "@/data/world";

export const CategoryIcon = ({
  category,
  size = 14,
  className,
}: {
  category: QuestCategory;
  size?: number;
  className?: string;
}) => {
  const map = {
    flourish: IconLeaf,
    courage: IconFlame,
    create: IconBrush,
    solitude: IconWave,
  } as const;
  const C = map[category];
  return <C size={size} className={className} />;
};

/* ============ 天气符号 ============ */
export const WeatherIcon = ({
  symbol,
  size = 14,
  className,
}: {
  symbol: string;
  size?: number;
  className?: string;
}) => {
  switch (symbol) {
    case "☀️":
      return <IconSun size={size} className={className} />;
    case "⛅":
      return <IconCloudSun size={size} className={className} />;
    case "🌧️":
      return <IconRain size={size} className={className} />;
    case "🌙":
      return <IconMoon size={size} className={className} />;
    default:
      return <IconSun size={size} className={className} />;
  }
};

/* ============ 头像 / 字符徽章：把 emoji 头像替换成 ink 字母章 ============ */
export const InkAvatar = ({
  label,
  size = 28,
  tone = "ink",
  className,
}: {
  label: string;
  size?: number;
  tone?: "ink" | "gold" | "moss" | "rust" | "sky" | "seal";
  className?: string;
}) => {
  // 取首个非 emoji 字符；emoji 头像 → 用名字首字
  const stripped = label.replace(
    /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,
    "",
  ).trim();
  const ch = (stripped || label).slice(0, 1).toUpperCase();
  const toneVar = {
    ink: "var(--ink)",
    gold: "var(--gold)",
    moss: "var(--moss)",
    rust: "var(--rust)",
    sky: "var(--sky)",
    seal: "var(--seal)",
  }[tone];
  return (
    <span
      className={base(className)}
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        border: `1.5px solid hsl(${toneVar})`,
        background: "hsl(var(--cream))",
        color: `hsl(${toneVar})`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'IM Fell English', Georgia, serif",
        fontSize: size * 0.5,
        lineHeight: 1,
      }}
    >
      {ch || "·"}
    </span>
  );
};
