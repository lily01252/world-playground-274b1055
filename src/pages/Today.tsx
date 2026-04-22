import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CATEGORY_META, QUESTS, RECORDS, PLAYER } from "@/data/world";

const Today = () => {
  const main = QUESTS[1]; // 主线副本：勇气
  const sides = [QUESTS[0], QUESTS[2], QUESTS[4]];
  const recent = RECORDS.slice(0, 2);
  const today = new Date().toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <article className="max-w-4xl mx-auto px-5 md:px-10 py-10 md:py-14">
      <header className="flex items-start justify-between mb-8">
        <div>
          <p className="font-hand text-base text-muted-foreground">{today}</p>
          <h2 className="text-3xl md:text-4xl font-serif-en mt-1">
            Today's Playground
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            等级 {PLAYER.level} · 已点亮 {PLAYER.placesLit} 处 · 记下{" "}
            {PLAYER.records} 笔
          </p>
        </div>
        <span className="stamp">每日一封 · 等你拆开</span>
      </header>

      {/* 主线副本 */}
      <section className="ink-card p-6 md:p-8 mb-8">
        <span className="absolute -top-3 left-6 bg-accent border border-foreground px-3 py-0.5 text-[11px] tracking-widest font-bold">
          今日副本
        </span>
        <p className="font-hand text-sm flex items-center gap-2 mb-2" style={{ color: CATEGORY_META[main.category].color }}>
          <span className="inline-block w-5 h-px bg-current" />
          {CATEGORY_META[main.category].emoji} {CATEGORY_META[main.category].label} · {CATEGORY_META[main.category].hand}
        </p>
        <h3 className="font-serif-en text-2xl mb-3">{main.title}</h3>
        <p className="text-[0.95rem] leading-relaxed text-foreground/80 border-l-[3px] border-secondary pl-4 mb-6">
          {main.desc}
        </p>

        <div className="flex gap-6 mb-6 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              难度
            </p>
            <p className="font-hand text-base text-[hsl(var(--rust))]">
              {main.difficulty}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              经验
            </p>
            <p className="font-hand text-base text-accent-foreground" style={{ color: "hsl(var(--gold))" }}>
              +{main.xp} XP
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              留下
            </p>
            <p className="font-hand text-base">勇气印记 · 火山领地</p>
          </div>
        </div>

        <div className="dashed-frame bg-secondary/40 p-4 mb-6 relative">
          <span className="absolute -top-2.5 left-3 bg-secondary px-2 font-hand text-xs text-muted-foreground">
            来自 AI 的小提示
          </span>
          <p className="text-sm italic text-foreground/80 leading-relaxed">
            不必完美。你最近写过两次"想说但没说"——今天可以是那个"说"。
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button asChild className="bg-foreground text-background hover:bg-ink-soft rounded-sm">
            <Link to={`/quest/${main.id}`}>接受副本</Link>
          </Button>
          <Button asChild variant="outline" className="border-2 border-foreground rounded-sm">
            <Link to={`/quest/${main.id}/record`}>已经做了 · 直接记录</Link>
          </Button>
          <Button variant="ghost" className="border border-dashed border-foreground/40 rounded-sm text-muted-foreground">
            换一个
          </Button>
        </div>
      </section>

      {/* 支线 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        支线 · 三选一
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {sides.map((q) => {
          const m = CATEGORY_META[q.category];
          return (
            <Link
              key={q.id}
              to={`/quest/${q.id}`}
              className="ink-card p-5 hover:-translate-y-0.5 transition-transform"
            >
              <p className="font-hand text-xs mb-2" style={{ color: m.color }}>
                {m.emoji} {m.label}
              </p>
              <h4 className="font-serif-en text-lg mb-2">{q.title}</h4>
              <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
                {q.desc}
              </p>
              <p className="mt-3 font-hand text-xs text-muted-foreground">
                {q.difficulty} · +{q.xp} XP
              </p>
            </Link>
          );
        })}
      </div>

      {/* 近期足迹预览 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        最近的足迹
        <span className="flex-1 h-px bg-secondary" />
        <Link to="/chronicle" className="font-hand text-sm text-muted-foreground hover:text-foreground">
          翻开编年史 →
        </Link>
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {recent.map((r) => (
          <div key={r.id} className="ink-card p-5">
            <p className="font-hand text-xs text-muted-foreground mb-1">
              {r.date} · {r.weather} · 📍 {r.place}
            </p>
            <p className="text-sm text-foreground/85 leading-relaxed line-clamp-2 mb-2">
              {r.text}
            </p>
            <p className="font-hand text-sm border-t border-dashed border-foreground/30 pt-2">
              ↳ {r.echo}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Today;
