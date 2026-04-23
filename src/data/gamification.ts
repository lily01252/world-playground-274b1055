// 游戏化数据层：稀有度、属性、称号、碎片、BOSS、连击
import type { QuestCategory } from "./world";

export type Rarity = "common" | "rare" | "epic" | "legendary";

export const RARITY_META: Record<
  Rarity,
  { label: string; color: string; glow: string; xpMul: number }
> = {
  common: {
    label: "普通",
    color: "hsl(var(--ink-faded))",
    glow: "hsl(var(--ink-faded) / 0.25)",
    xpMul: 1,
  },
  rare: {
    label: "稀有",
    color: "hsl(var(--sky))",
    glow: "hsl(var(--sky) / 0.45)",
    xpMul: 1.5,
  },
  epic: {
    label: "史诗",
    color: "hsl(var(--seal))",
    glow: "hsl(var(--seal) / 0.5)",
    xpMul: 2,
  },
  legendary: {
    label: "传说",
    color: "hsl(var(--gold))",
    glow: "hsl(var(--gold-bright) / 0.7)",
    xpMul: 3,
  },
};

// 玩家四属性 — 对应四类副本
export type Traits = Record<QuestCategory, number>;

export const PLAYER_TRAITS: Traits = {
  courage: 62,
  flourish: 48,
  create: 35,
  solitude: 71,
};

// 称号——按属性阈值解锁
export type Title = {
  id: string;
  name: string;
  desc: string;
  unlocked: boolean;
  active?: boolean;
};

export const TITLES: Title[] = [
  { id: "t-1", name: "夜行者", desc: "独处属性 ≥ 70", unlocked: true, active: true },
  { id: "t-2", name: "破壁人", desc: "勇气属性 ≥ 60", unlocked: true },
  { id: "t-3", name: "拾光人", desc: "丰容属性 ≥ 40", unlocked: true },
  { id: "t-4", name: "织字者", desc: "创造属性 ≥ 50", unlocked: false },
  { id: "t-5", name: "无名旅人", desc: "初始称号", unlocked: true },
  { id: "t-6", name: "山海开荒者", desc: "点亮 20 处足迹", unlocked: false },
];

// 化身演化阶段——按等级
export const AVATAR_STAGES = [
  { lv: 1, sigil: "·", desc: "微光" },
  { lv: 5, sigil: "✧", desc: "初芒" },
  { lv: 10, sigil: "✦", desc: "聚光" },
  { lv: 20, sigil: "❖", desc: "结晶" },
  { lv: 30, sigil: "✶", desc: "星轨" },
];

// 心境护符——可装备 buff（同时只能 1 个）
export type Charm = {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  effect: string;
  owned: boolean;
  equipped?: boolean;
};

export const CHARMS: Charm[] = [
  {
    id: "c-1",
    name: "苔之心",
    emoji: "🌿",
    desc: "走出门时，世界更柔软。",
    effect: "丰容副本 +20% XP",
    owned: true,
    equipped: true,
  },
  {
    id: "c-2",
    name: "锈火胆",
    emoji: "🔥",
    desc: "说出口的那一刻，世界在听。",
    effect: "勇气副本 +20% XP",
    owned: true,
  },
  {
    id: "c-3",
    name: "夜光镜",
    emoji: "🪞",
    desc: "独处时，回声更清晰。",
    effect: "独处副本 +20% XP",
    owned: false,
  },
  {
    id: "c-4",
    name: "金线笔",
    emoji: "✒️",
    desc: "随手记一笔，便有星光。",
    effect: "创造副本 +20% XP",
    owned: false,
  },
];

// 印记碎片——副本完成随机掉落，可在图鉴中合成徽章
export type Fragment = {
  id: string;
  name: string;
  emoji: string;
  category: QuestCategory;
  count: number; // 已收集
  need: number; // 合成所需
  forms: string; // 合成后形态
};

export const FRAGMENTS: Fragment[] = [
  { id: "f-1", name: "苔之碎片", emoji: "🌱", category: "flourish", count: 4, need: 5, forms: "苔原徽章" },
  { id: "f-2", name: "火之碎片", emoji: "🔥", category: "courage", count: 3, need: 5, forms: "火山徽章" },
  { id: "f-3", name: "光之碎片", emoji: "✨", category: "create", count: 2, need: 5, forms: "疏林徽章" },
  { id: "f-4", name: "湖之碎片", emoji: "💧", category: "solitude", count: 5, need: 5, forms: "深湖徽章" },
];

// 连击：连续记录天数
export const COMBO = {
  current: 4,
  best: 9,
  // mock 最近 14 天打卡情况
  last14: [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
};

// 每周 BOSS — 心魔
export type WeeklyBoss = {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  hp: number;
  hpMax: number;
  weakness: QuestCategory; // 完成对应类别副本造成更高伤害
  reward: string;
  endsIn: string;
};

export const WEEKLY_BOSS: WeeklyBoss = {
  id: "b-w17",
  name: "拖延巨兽",
  emoji: "🦣",
  desc: "它最怕你今天就动一下。每完成一个勇气或创造副本，造成额外伤害。",
  hp: 38,
  hpMax: 100,
  weakness: "courage",
  reward: "★ 锈火胆 +1 / 解锁称号「破壁人」",
  endsIn: "3 天 14 时",
};
