import { Link } from "react-router-dom";

const Letter = () => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[hsl(var(--night-deep))] py-8 px-4">
      {/* 星点背景 */}
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, hsl(var(--cream)) 50%, transparent), radial-gradient(1px 1px at 70% 60%, hsl(var(--gold-bright)) 50%, transparent), radial-gradient(1.5px 1.5px at 40% 80%, hsl(var(--cream)/0.7) 50%, transparent), radial-gradient(1px 1px at 85% 15%, hsl(var(--cream)) 50%, transparent)",
          backgroundSize: "300px 300px",
        }}
      />
      <article
        className="relative max-w-md mx-auto p-7 md:p-10 rounded-sm paper-in"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--parchment)) 100%)",
          border: "1.5px solid hsl(var(--gold) / 0.6)",
          boxShadow:
            "0 0 60px hsl(var(--gold) / 0.25), 0 12px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div className="text-center mb-5">
          <p className="font-serif-en tracking-[0.3em] text-xs text-[hsl(var(--ink-faded))]">
            A LETTER FROM THE STAR TOWER
          </p>
          <div className="mt-2 inline-block w-16 h-px bg-[hsl(var(--gold))]" />
        </div>

        <div className="font-serif-en text-[15px] leading-[2] text-[hsl(var(--ink))] space-y-4 text-left">
          <p>每位女性，都是行走在人间的独行旅人。</p>
          <p>
            我们被结构囚禁，被规训挤压，习惯了用献祭换认可。<br />
            但那个在夹缝里长出自己的人，<br />
            <span className="font-hand text-xl text-[hsl(var(--seal))]">比任何规训都强大！</span>
          </p>
          <p>
            在这里，你的每一次拒绝、每一次说不，<br />
            每一次发出声音，都会被鼓掌、被拥抱、被存档。<br />
            看见自己的那一刻，<br />
            就是光冲破囚笼的那一天。
          </p>
          <p>
            在世界这个游乐场，你是绝对主角，尽情体验人生无限。<br />
            而我们很荣幸能陪你一段~
          </p>
          <p className="font-hand text-lg text-[hsl(var(--gold))]">
            来这里，记录那些你成为自己的瞬间。
          </p>
        </div>

        <div className="mt-7 flex justify-end">
          <span className="stamp">星之塔 · 守光人</span>
        </div>

        <Link
          to="/login"
          className="mt-8 block w-full text-center px-6 py-4 rounded-sm font-serif-en tracking-widest text-base transition-transform hover:-translate-y-0.5"
          style={{
            background: "hsl(var(--ink))",
            color: "hsl(var(--gold-bright))",
            border: "1.5px solid hsl(var(--gold))",
            boxShadow: "0 4px 0 hsl(var(--ink-soft)), 0 0 20px hsl(var(--gold)/0.4)",
          }}
        >
          ✦ 开启我的勇者旅程
        </Link>
      </article>
    </div>
  );
};
export default Letter;
