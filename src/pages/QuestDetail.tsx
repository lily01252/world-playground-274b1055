import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CATEGORY_META, QUESTS } from "@/data/world";

const QuestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quest = QUESTS.find((q) => q.id === id) ?? QUESTS[0];
  const m = CATEGORY_META[quest.category];

  return (
    <article className="max-w-3xl mx-auto px-5 md:px-10 py-10">
      <Link to="/" className="font-hand text-sm text-muted-foreground hover:text-foreground">
        ← 回到今日
      </Link>

      <section className="ink-card p-6 md:p-8 mt-4 relative">
        <span
          className="absolute -top-3 left-6 border border-foreground px-3 py-0.5 text-[11px] tracking-widest font-bold"
          style={{ background: m.color, color: "hsl(var(--cream))" }}
        >
          {m.emoji} {m.label}
        </span>

        <h2 className="font-serif-en text-3xl mt-2 mb-3">{quest.title}</h2>
        <p className="text-base leading-relaxed text-foreground/85 border-l-[3px] pl-4 mb-6" style={{ borderColor: m.color }}>
          {quest.desc}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">难度</p>
            <p className="font-hand text-base">{quest.difficulty}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">奖励</p>
            <p className="font-hand text-base" style={{ color: "hsl(var(--gold))" }}>
              +{quest.xp} XP
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">将留下</p>
            <p className="font-hand text-base" style={{ color: m.color }}>
              {m.terrain}印记
            </p>
          </div>
        </div>

        <div className="dashed-frame bg-secondary/40 p-4 mb-6 relative">
          <span className="absolute -top-2.5 left-3 bg-secondary px-2 font-hand text-xs text-muted-foreground">
            ✧ AI 引导 · 进入前的三个问题
          </span>
          <ul className="text-sm space-y-2 text-foreground/80 mt-1">
            <li>· 你最希望今天结束时，自己变成什么样子？</li>
            <li>· 如果它失败了，你愿意怎么对自己说？</li>
            <li>· 1-10 分，你现在的勇气有几分？</li>
          </ul>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={() => navigate(`/quest/${quest.id}/record`)}
            className="bg-foreground text-background hover:bg-ink-soft rounded-sm"
          >
            出发 · 进入副本
          </Button>
          <Button asChild variant="outline" className="border-2 border-foreground rounded-sm">
            <Link to={`/quest/${quest.id}/record`}>跳过出发 · 直接记录</Link>
          </Button>
        </div>
      </section>
    </article>
  );
};

export default QuestDetail;
