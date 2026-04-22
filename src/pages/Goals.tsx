import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORY_META } from "@/data/world";
import { GOALS, FRIEND_QUESTS, type Goal } from "@/data/goals";
import StarTrailCelebration from "@/components/StarTrailCelebration";
import { toast } from "sonner";

const Goals = () => {
  const [tab, setTab] = useState<"mine" | "friends">("mine");
  const [celebrate, setCelebrate] = useState<{ show: boolean; subtitle?: string }>({
    show: false,
  });
  const [goals, setGoals] = useState<Goal[]>(GOALS);
  const [composing, setComposing] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftIntent, setDraftIntent] = useState("");

  const toggleMilestone = (goalId: string, mId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        return {
          ...g,
          milestones: g.milestones.map((m) => {
            if (m.id !== mId) return m;
            const next = !m.done;
            if (next) {
              // 触发庆祝
              setCelebrate({
                show: true,
                subtitle: `「${g.title}」· 里程碑「${m.title}」已点亮`,
              });
            }
            return { ...m, done: next };
          }),
        };
      }),
    );
  };

  const submitNewGoal = () => {
    if (!draftTitle.trim()) {
      toast("先给目标起一个名字。");
      return;
    }
    const newGoal: Goal = {
      id: `g-${Date.now()}`,
      title: draftTitle,
      intent: draftIntent || "（还没想清楚动机，也没关系）",
      category: "flourish",
      cover: "✦",
      createdAt: new Date().toISOString().slice(0, 10),
      milestones: [{ id: "m-1", title: "迈出第一步", done: false }],
    };
    setGoals((prev) => [newGoal, ...prev]);
    setDraftTitle("");
    setDraftIntent("");
    setComposing(false);
    toast("已立下。AI 会帮你拆出第一个副本。");
  };

  return (
    <article className="max-w-5xl mx-auto px-5 md:px-10 py-8">
      <StarTrailCelebration
        show={celebrate.show}
        subtitle={celebrate.subtitle}
        onDone={() => setCelebrate({ show: false })}
      />

      <header className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="font-hand text-base text-muted-foreground">Goals · Quests</p>
          <h2 className="text-3xl md:text-4xl font-serif-en">目标关卡</h2>
          <p className="text-sm text-muted-foreground mt-1">
            想做的事，拆成可以走过去的路。每点亮一步，都是一次庆祝。
          </p>
        </div>
        <div className="flex border-2 border-foreground rounded-sm overflow-hidden">
          {(["mine", "friends"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-xs tracking-widest border-r-2 border-foreground last:border-r-0 transition-colors ${
                tab === t
                  ? "bg-foreground text-background"
                  : "bg-transparent hover:bg-secondary"
              }`}
            >
              {t === "mine" ? "我的目标" : "找搭子"}
            </button>
          ))}
        </div>
      </header>

      {tab === "mine" && (
        <>
          {/* 新建目标 */}
          {composing ? (
            <section className="ink-card p-5 mb-6">
              <p className="font-hand text-sm text-muted-foreground mb-2">
                ✧ 立下一个目标
              </p>
              <Input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                placeholder="比如：学会做意大利面 / 去一次西藏"
                className="bg-card border-foreground/40 mb-3"
              />
              <Textarea
                value={draftIntent}
                onChange={(e) => setDraftIntent(e.target.value)}
                placeholder="为什么想做这件事？（一句话就好）"
                rows={2}
                className="bg-card border-foreground/40 mb-3"
              />
              <div className="dashed-frame p-3 text-xs text-muted-foreground mb-4">
                <span className="font-hand">✧ AI 会帮你做：</span>
                自动拆出 3 - 5 个里程碑副本 · 推荐相关的今日小副本 · 在地图上标记目的地
              </div>
              <div className="flex gap-2">
                <Button onClick={submitNewGoal} className="bg-foreground text-background rounded-sm">
                  立下
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setComposing(false)}
                  className="font-hand text-muted-foreground"
                >
                  再想想
                </Button>
              </div>
            </section>
          ) : (
            <button
              onClick={() => setComposing(true)}
              className="dashed-frame w-full p-5 mb-6 text-center font-hand text-base text-muted-foreground hover:bg-secondary/40 transition-colors rounded-sm"
            >
              + 立下一个新目标
            </button>
          )}

          <div className="grid md:grid-cols-2 gap-5">
            {goals.map((g) => {
              const m = CATEGORY_META[g.category];
              const doneCount = g.milestones.filter((x) => x.done).length;
              const pct = (doneCount / g.milestones.length) * 100;
              return (
                <section
                  key={g.id}
                  className="ink-card p-5"
                  style={{ borderColor: m.color }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-sm border-2 border-foreground bg-secondary flex items-center justify-center text-2xl"
                        style={{ borderColor: m.color }}
                      >
                        {g.cover}
                      </div>
                      <div>
                        <h3 className="font-serif-en text-lg leading-tight">{g.title}</h3>
                        <p className="font-hand text-xs text-muted-foreground">
                          {m.emoji} {m.label}
                          {g.targetDate ? ` · 目标 ${g.targetDate}` : ""}
                        </p>
                      </div>
                    </div>
                    <span className="font-hand text-xs text-muted-foreground whitespace-nowrap">
                      {doneCount}/{g.milestones.length}
                    </span>
                  </div>

                  <p className="text-sm text-foreground/75 italic border-l-2 border-secondary pl-3 mb-4">
                    "{g.intent}"
                  </p>

                  {/* 进度条：星轨样式 */}
                  <div className="relative h-2 bg-secondary rounded-sm overflow-hidden mb-4 border border-foreground/30">
                    <div
                      className="absolute inset-y-0 left-0 transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${m.color}, hsl(var(--gold-bright)))`,
                      }}
                    />
                  </div>

                  {/* 里程碑列表 */}
                  <ol className="space-y-1.5 mb-4">
                    {g.milestones.map((mile) => (
                      <li key={mile.id} className="flex items-start gap-2">
                        <button
                          onClick={() => toggleMilestone(g.id, mile.id)}
                          className={`mt-0.5 w-4 h-4 border-2 border-foreground rounded-sm flex-shrink-0 flex items-center justify-center text-[10px] transition-colors ${
                            mile.done ? "text-background" : "bg-card"
                          }`}
                          style={mile.done ? { background: m.color } : {}}
                        >
                          {mile.done ? "✓" : ""}
                        </button>
                        <span
                          className={`text-sm leading-snug ${
                            mile.done ? "line-through text-muted-foreground" : "text-foreground/85"
                          }`}
                        >
                          {mile.title}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="flex gap-2 flex-wrap text-xs">
                    <Link
                      to="/map"
                      className="ink-tag font-hand hover:bg-secondary"
                    >
                      🗺️ 地图
                    </Link>
                    <Link
                      to="/chronicle"
                      className="ink-tag font-hand hover:bg-secondary"
                    >
                      📜 编年史
                    </Link>
                    <Link
                      to="/"
                      className="ink-tag font-hand hover:bg-secondary"
                    >
                      ✦ 派生今日副本
                    </Link>
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}

      {tab === "friends" && <FriendsCircle />}
    </article>
  );
};

const FriendsCircle = () => {
  const [posting, setPosting] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <>
      {/* 发布 */}
      {posting ? (
        <section className="ink-card p-5 mb-6">
          <p className="font-hand text-sm text-muted-foreground mb-2">
            ✧ 发到搭子广场 · 让大家自选加入
          </p>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="想找大理旅行搭子 / 找雅思 7 搭子 / 想 8 月跑半马……"
            rows={3}
            className="bg-card border-foreground/40 mb-3"
          />
          <div className="flex gap-2 flex-wrap items-center">
            <span className="ink-tag font-hand">📍 地点</span>
            <span className="ink-tag font-hand">📅 周期</span>
            <span className="ink-tag font-hand">👥 人数</span>
            <span className="ink-tag font-hand">✦ AI 拆里程碑</span>
            <Button
              onClick={() => {
                if (!draft.trim()) return toast("写一句你想找搭子做的事。");
                toast("已发到搭子广场。");
                setDraft("");
                setPosting(false);
              }}
              className="ml-auto bg-foreground text-background rounded-sm"
            >
              发布
            </Button>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setPosting(true)}
            className="dashed-frame p-4 text-left hover:bg-secondary/40 transition-colors rounded-sm"
          >
            <p className="font-hand text-sm">📣 发到搭子广场</p>
            <p className="text-xs text-muted-foreground mt-1">
              "想找……搭子"——可拆解的长期事
            </p>
          </button>
          <button
            onClick={() => toast("挑一个朋友，邀请 ta 一起完成一件事。")}
            className="dashed-frame p-4 text-left hover:bg-secondary/40 transition-colors rounded-sm"
          >
            <p className="font-hand text-sm">✉️ 定向邀请朋友</p>
            <p className="text-xs text-muted-foreground mt-1">
              一对一 · 一起做一件长期的事
            </p>
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {FRIEND_QUESTS.map((fq) => {
          const m = CATEGORY_META[fq.category];
          const isInvite = fq.kind === "invite";
          const peopleCount = isInvite
            ? fq.invitees?.length ?? 0
            : fq.joiners?.length ?? 0;

          return (
            <section key={fq.id} className="ink-card p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-foreground bg-secondary flex items-center justify-center text-base">
                    {fq.author.avatar}
                  </div>
                  <div>
                    <p className="font-hand text-sm">{fq.author.name}</p>
                    <p className="text-[10px] text-muted-foreground tracking-widest">
                      {isInvite ? "✉️ 定向邀请" : "📣 搭子广场"}
                    </p>
                  </div>
                </div>
                <span
                  className="font-hand text-xs px-2 py-0.5 border rounded-sm"
                  style={{ borderColor: m.color, color: m.color }}
                >
                  {m.emoji} {m.label}
                </span>
              </div>

              <h4 className="font-serif-en text-lg mb-1">{fq.title}</h4>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                {fq.desc}
              </p>

              <div className="text-xs text-muted-foreground space-y-1 mb-3">
                {fq.place && <p>📍 {fq.place}</p>}
                <p>🕐 {fq.date}</p>
                {fq.duration && <p>⏳ 预估 {fq.duration}</p>}
              </div>

              {/* 里程碑预览 */}
              {fq.milestones && fq.milestones.length > 0 && (
                <div className="dashed-frame p-2.5 mb-3">
                  <p className="font-hand text-[11px] text-muted-foreground mb-1.5">
                    ✧ AI 已拆出 {fq.milestones.length} 个里程碑
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {fq.milestones.map((mi, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-1.5 py-0.5 bg-secondary/60 rounded-sm"
                      >
                        {i + 1}. {mi}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 参与者 */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-1.5">
                  {(isInvite ? fq.invitees : fq.joiners)?.map((p, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-foreground bg-card flex items-center justify-center text-xs"
                      title={p.name}
                    >
                      {p.avatar}
                    </div>
                  ))}
                </div>
                <span className="font-hand text-xs text-muted-foreground">
                  {isInvite
                    ? `${peopleCount} 位被邀请`
                    : `${peopleCount}${fq.capacity ? `/${fq.capacity}` : ""} 已加入`}
                </span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {isInvite ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => toast("已接受。期待和 " + fq.author.name + " 一起。")}
                      className="bg-foreground text-background rounded-sm"
                    >
                      接受邀请
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast("已委婉拒绝。")}
                      className="border-2 border-foreground rounded-sm"
                    >
                      下次吧
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      onClick={() => toast("我也去！已加入。")}
                      className="bg-foreground text-background rounded-sm"
                    >
                      ✦ 我也去
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="font-hand text-muted-foreground"
                    >
                      留言
                    </Button>
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default Goals;
