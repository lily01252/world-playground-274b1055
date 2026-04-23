import { Link } from "react-router-dom";
import { CATEGORY_META, type QuestCategory } from "@/data/world";
import { FRAGMENTS, RARITY_META } from "@/data/gamification";
import { toast } from "sonner";
import {
  CategoryIcon,
  IconDroplet,
  IconFlame,
  IconLeaf,
  IconLock,
  IconMapPin,
  IconQuestion,
  IconSpark,
  IconStarFour,
} from "@/components/HandIcon";

const FragmentGlyph = ({
  category,
  size = 22,
}: {
  category: QuestCategory;
  size?: number;
}) => {
  const map = {
    flourish: IconLeaf,
    courage: IconFlame,
    create: IconSpark,
    solitude: IconDroplet,
  } as const;
  const C = map[category];
  return <C size={size} />;
};

const Codex = () => {
  const forgedBadges = [
    { id: "bg-1", name: "深湖徽章", desc: "由 5 枚湖之碎片凝成", category: "solitude" as const },
  ];

  const rarityCollection = [
    { rarity: "common" as const, owned: 12, total: 30 },
    { rarity: "rare" as const, owned: 5, total: 12 },
    { rarity: "epic" as const, owned: 2, total: 6 },
    { rarity: "legendary" as const, owned: 1, total: 3 },
  ];

  const hiddenPlaces = [
    { name: "雾中灯塔", hint: "在某个下雨的傍晚走到城市最高处。", found: false },
    { name: "无名小馆", hint: "和一个许久没见的人吃一顿饭。", found: false },
    { name: "黎明山道", hint: "在 5 点之前出门。", found: true },
  ];

  return (
    <article className="max-w-5xl mx-auto px-5 md:px-10 py-8">
      <header className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="font-hand text-base text-muted-foreground">Codex</p>
          <h2 className="text-3xl md:text-4xl font-serif-en">图鉴 · 收藏</h2>
          <p className="text-sm text-muted-foreground mt-1">
            每完成一个副本，都会随机掉落一枚碎片。集齐五枚，可以凝成徽章。
          </p>
        </div>
        <Link
          to="/profile"
          className="font-hand text-sm text-muted-foreground hover:text-foreground hand-link"
        >
          ← 回到角色面板
        </Link>
      </header>

      {/* 印记碎片 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        印记碎片
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {FRAGMENTS.map((f) => {
          const m = CATEGORY_META[f.category];
          const pct = (f.count / f.need) * 100;
          const ready = f.count >= f.need;
          return (
            <section
              key={f.id}
              className="ink-card p-5"
              style={{ borderColor: m.color }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-14 h-14 rounded-sm border-2 flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: m.color,
                    background: `${m.color}15`,
                    color: m.color,
                  }}
                >
                  <FragmentGlyph category={f.category} size={26} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif-en text-lg leading-tight">
                    {f.name}
                  </p>
                  <p
                    className="font-hand text-xs inline-flex items-center gap-1.5"
                    style={{ color: m.color }}
                  >
                    <CategoryIcon category={f.category} size={11} />
                    来自 {m.label} 副本
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-[10px] tracking-widest text-muted-foreground mb-1">
                      <span>{f.count} / {f.need}</span>
                      <span>合成 → {f.forms}</span>
                    </div>
                    <div className="h-1.5 border border-foreground/40 bg-secondary overflow-hidden rounded-sm">
                      <div
                        className="h-full transition-all"
                        style={{ width: `${pct}%`, background: m.color }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: f.need }).map((_, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 border border-foreground/40 rounded-sm flex items-center justify-center"
                        style={
                          i < f.count
                            ? { background: m.color, color: "hsl(var(--cream))" }
                            : { background: "hsl(var(--secondary))" }
                        }
                      >
                        {i < f.count && <FragmentGlyph category={f.category} size={11} />}
                      </span>
                    ))}
                  </div>
                  <button
                    disabled={!ready}
                    onClick={() => toast(`✦ ${f.forms} 已凝成。`)}
                    className={`mt-3 px-3 py-1 text-xs border-2 rounded-sm transition-colors inline-flex items-center gap-1 ${
                      ready
                        ? "border-foreground bg-foreground text-background hover:bg-ink-soft"
                        : "border-foreground/30 text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {ready ? (
                      <>
                        <IconStarFour size={11} /> 凝成 {f.forms}
                      </>
                    ) : (
                      `还差 ${f.need - f.count} 枚`
                    )}
                  </button>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 已合成徽章 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        已凝成的徽章
        <span className="flex-1 h-px bg-secondary" />
        <span className="font-hand text-xs text-muted-foreground">
          {forgedBadges.length} / {FRAGMENTS.length}
        </span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {FRAGMENTS.map((f) => {
          const got = forgedBadges.find((b) => b.category === f.category);
          const m = CATEGORY_META[f.category];
          return (
            <div
              key={f.id}
              className={`ink-card p-4 text-center ${got ? "" : "opacity-40"}`}
              style={got ? { borderColor: m.color } : {}}
            >
              <div
                className="w-14 h-14 mx-auto rounded-full border-2 flex items-center justify-center mb-2"
                style={{
                  borderColor: got ? m.color : "hsl(var(--ink) / 0.3)",
                  background: got ? `${m.color}20` : "hsl(var(--secondary))",
                  color: got ? m.color : "hsl(var(--ink) / 0.4)",
                }}
              >
                {got ? <FragmentGlyph category={f.category} size={26} /> : <IconQuestion size={22} />}
              </div>
              <p className="font-serif-en text-sm">
                {got ? got.name : "?? 徽章"}
              </p>
              <p className="font-hand text-[11px] text-muted-foreground mt-0.5">
                {got ? got.desc : "尚未凝成"}
              </p>
            </div>
          );
        })}
      </div>

      {/* 稀有度图鉴 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        稀有度图鉴
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {rarityCollection.map((rc) => {
          const r = RARITY_META[rc.rarity];
          return (
            <div
              key={rc.rarity}
              className="ink-card p-4"
              style={{
                borderColor: r.color,
                boxShadow: `4px 4px 0 hsl(var(--foreground)), 0 0 14px ${r.glow}`,
              }}
            >
              <p
                className="font-serif-en text-lg inline-flex items-center gap-1.5"
                style={{ color: r.color }}
              >
                <IconStarFour size={14} /> {r.label}
              </p>
              <p className="font-hand text-2xl mt-1">
                {rc.owned}
                <span className="text-sm text-muted-foreground">
                  /{rc.total}
                </span>
              </p>
              <p className="font-hand text-[11px] text-muted-foreground">
                ×{r.xpMul} XP 加成
              </p>
            </div>
          );
        })}
      </div>

      {/* 隐藏地点 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        隐藏地点 · 待解锁
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid md:grid-cols-3 gap-3 mb-10">
        {hiddenPlaces.map((p, i) => (
          <div
            key={i}
            className={`ink-card p-4 ${p.found ? "" : "opacity-65"}`}
          >
            <p className="font-serif-en text-base inline-flex items-center gap-1.5">
              {p.found ? <IconMapPin size={14} /> : <IconQuestion size={14} />}
              {p.found ? p.name : "???"}
            </p>
            <p className="font-hand text-xs text-muted-foreground mt-1 italic">
              线索：{p.hint}
            </p>
            {p.found && (
              <p className="font-hand text-[11px] text-[hsl(var(--gold))] mt-1 inline-flex items-center gap-1">
                <IconStarFour size={10} /> 已点亮
              </p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
};

export default Codex;
