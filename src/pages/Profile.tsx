import { Link } from "react-router-dom";
import { CATEGORY_META, PLAYER, RECORDS, MAP_PLACES } from "@/data/world";
import { GOALS } from "@/data/goals";

// 个人页面：玩家信息 / 成就 / 记录 / 数据织锦
const Profile = () => {
  const totalMilestones = GOALS.reduce((s, g) => s + g.milestones.length, 0);
  const doneMilestones = GOALS.reduce(
    (s, g) => s + g.milestones.filter((m) => m.done).length,
    0,
  );

  // 各类别记录数
  const categoryCounts = (
    Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[]
  ).map((k) => ({
    key: k,
    count: RECORDS.filter((r) => r.category === k).length,
  }));

  // 成就徽章 — mock
  const achievements = [
    { id: "a-1", emoji: "🌅", name: "破晓初行", desc: "完成第一个副本", got: true },
    { id: "a-2", emoji: "🗝️", name: "勇气钥匙", desc: "完成 5 次勇气试炼", got: true },
    { id: "a-3", emoji: "🪷", name: "静水深流", desc: "连续 7 天独处记录", got: true },
    { id: "a-4", emoji: "🧭", name: "拓荒者", desc: "点亮 10 处足迹", got: false, progress: "8/10" },
    { id: "a-5", emoji: "📚", name: "织字者", desc: "累计 30 篇记录", got: false, progress: "6/30" },
    { id: "a-6", emoji: "🌋", name: "火山苏醒", desc: "完成 1 个长期目标", got: false, progress: "0/1" },
  ];

  return (
    <article className="max-w-5xl mx-auto px-5 md:px-10 py-8">
      {/* 玩家头部 */}
      <header className="ink-card p-6 md:p-8 mb-8 flex items-center gap-5 flex-wrap">
        <div className="w-20 h-20 rounded-sm border-2 border-foreground bg-accent flex items-center justify-center font-serif-en text-3xl flex-shrink-0">
          ✦
        </div>
        <div className="flex-1 min-w-[200px]">
          <p className="font-hand text-sm text-muted-foreground">Player</p>
          <h2 className="text-2xl md:text-3xl font-serif-en">{PLAYER.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            等级 {PLAYER.level} · 已点亮 {PLAYER.placesLit} 处 · 写下{" "}
            {PLAYER.records} 笔
          </p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              <span>XP</span>
              <span>
                {PLAYER.xp} / {PLAYER.xpMax}
              </span>
            </div>
            <div className="h-2 border border-foreground bg-secondary overflow-hidden rounded-sm">
              <div
                className="h-full bg-accent"
                style={{ width: `${(PLAYER.xp / PLAYER.xpMax) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* 数据织锦 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        数据织锦
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <div className="dashed-frame p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            足迹
          </p>
          <p className="font-hand text-xl mt-1">{MAP_PLACES.length} 处</p>
        </div>
        <div className="dashed-frame p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            记录
          </p>
          <p className="font-hand text-xl mt-1">{RECORDS.length} 笔</p>
        </div>
        <div className="dashed-frame p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            目标
          </p>
          <p className="font-hand text-xl mt-1">{GOALS.length} 个</p>
        </div>
        <div className="dashed-frame p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            里程碑
          </p>
          <p className="font-hand text-xl mt-1">
            {doneMilestones}/{totalMilestones}
          </p>
        </div>
      </div>

      {/* 四类印记分布 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        四类印记分布
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid md:grid-cols-4 gap-3 mb-10">
        {categoryCounts.map(({ key, count }) => {
          const m = CATEGORY_META[key];
          const max = Math.max(...categoryCounts.map((c) => c.count), 1);
          return (
            <div
              key={key}
              className="ink-card p-4"
              style={{ borderColor: m.color }}
            >
              <p className="font-hand text-sm" style={{ color: m.color }}>
                {m.emoji} {m.label}
              </p>
              <div className="h-1.5 bg-secondary rounded-sm overflow-hidden mt-2 mb-2 border border-foreground/30">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${(count / max) * 100}%`,
                    background: m.color,
                  }}
                />
              </div>
              <p className="font-hand text-xs text-muted-foreground">
                {count} 笔印记
              </p>
            </div>
          );
        })}
      </div>

      {/* 成就 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        成就 · 徽章
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`ink-card p-4 flex items-center gap-3 ${
              a.got ? "" : "opacity-55"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-sm border-2 border-foreground flex items-center justify-center text-2xl flex-shrink-0 ${
                a.got ? "bg-accent" : "bg-secondary"
              }`}
            >
              {a.got ? a.emoji : "?"}
            </div>
            <div className="min-w-0">
              <p className="font-serif-en text-base leading-tight">{a.name}</p>
              <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                {a.desc}
              </p>
              {!a.got && a.progress && (
                <p className="font-hand text-[11px] text-muted-foreground mt-1">
                  进度 {a.progress}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 我的记录 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        我的记录
        <span className="flex-1 h-px bg-secondary" />
        <Link
          to="/chronicle"
          className="font-hand text-sm text-muted-foreground hover:text-foreground"
        >
          翻开编年史 →
        </Link>
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {RECORDS.map((r) => {
          const m = r.category ? CATEGORY_META[r.category] : null;
          return (
            <div key={r.id} className="ink-card p-4">
              <div className="flex items-baseline justify-between mb-1">
                <p className="font-hand text-xs text-muted-foreground">
                  {r.date} · {r.weather} · 📍 {r.place}
                </p>
                {m && (
                  <span
                    className="font-hand text-[11px]"
                    style={{ color: m.color }}
                  >
                    {m.emoji}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed line-clamp-2 mb-2">
                {r.text}
              </p>
              <p className="font-hand text-xs border-t border-dashed border-foreground/30 pt-2 text-muted-foreground">
                ↳ {r.echo}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default Profile;
