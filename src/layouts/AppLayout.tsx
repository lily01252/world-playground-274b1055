import { NavLink, Outlet, useLocation } from "react-router-dom";
import { PLAYER } from "@/data/world";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/", label: "今日", en: "Today" },
  { to: "/goals", label: "目标关卡", en: "Goals" },
  { to: "/map", label: "地图", en: "Map" },
  { to: "/chronicle", label: "编年史", en: "Chronicle" },
];

export default function AppLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen relative z-0">
      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 px-4 md:px-10 h-16 border-b-2 border-foreground bg-card/95 backdrop-blur">
        <div className="flex items-baseline gap-2 md:gap-3 min-w-0">
          <h1 className="font-serif-en text-base md:text-xl tracking-wide truncate">
            World · Playground
          </h1>
          <span className="font-hand text-sm md:text-base text-muted-foreground hidden sm:inline">
            世界是一个游乐场
          </span>
        </div>

        <nav className="flex border-2 border-foreground rounded-sm overflow-hidden">
          {TABS.map((t) => {
            const active =
              t.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(t.to);
            return (
              <NavLink
                key={t.to}
                to={t.to}
                className={cn(
                  "px-2 md:px-4 py-1.5 text-[11px] md:text-xs tracking-wider border-r-2 border-foreground last:border-r-0 transition-colors",
                  active
                    ? "bg-foreground text-background"
                    : "bg-transparent text-foreground hover:bg-secondary",
                )}
              >
                <span className="hidden md:inline">{t.label}</span>
                <span className="md:hidden">{t.en}</span>
              </NavLink>
            );
          })}
        </nav>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 md:gap-3 pl-2 pr-1 md:pr-3 py-1 rounded-sm border-2 transition-colors",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-transparent hover:border-foreground/40",
            )
          }
        >
          <div className="hidden md:flex flex-col gap-0.5 items-end">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              XP
            </span>
            <div className="w-20 h-1.5 border border-foreground bg-secondary overflow-hidden rounded-sm">
              <div
                className="h-full bg-accent"
                style={{ width: `${(PLAYER.xp / PLAYER.xpMax) * 100}%` }}
              />
            </div>
          </div>
          <div className="w-7 h-7 rounded-full border-2 border-foreground bg-accent flex items-center justify-center font-serif-en text-xs font-bold">
            {PLAYER.level}
          </div>
        </NavLink>
      </header>

      <main className="relative z-0">
        <Outlet />
      </main>
    </div>
  );
}
