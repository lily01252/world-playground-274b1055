// 目标关卡：用户"想做的事"——长期/中期主线，可拆为多个副本作为里程碑
import type { QuestCategory } from "./world";

export type GoalMilestone = {
  id: string;
  title: string;
  done: boolean;
  questId?: string; // 关联到一个具体副本
  recordId?: string; // 完成后留下的记录
};

export type Goal = {
  id: string;
  title: string;
  intent: string; // 一句话动机
  category: QuestCategory;
  cover: string; // emoji 封面
  createdAt: string;
  targetDate?: string;
  milestones: GoalMilestone[];
  // 关联到外部地图的目的地坐标（可选）
  mapPos?: { x: number; y: number };
  place?: string;
};

export const GOALS: Goal[] = [
  {
    id: "g-001",
    title: "去大理旅行一次",
    intent: "想看看洱海，想一个人在古城里走走。",
    category: "flourish",
    cover: "🏔️",
    createdAt: "2026-03-10",
    targetDate: "2026-06-30",
    place: "大理",
    mapPos: { x: 12, y: 70 },
    milestones: [
      { id: "m-1", title: "请下假", done: true, recordId: "r-1" },
      { id: "m-2", title: "订机票和酒店", done: true },
      { id: "m-3", title: "列出想去的 5 个地方", done: false },
      { id: "m-4", title: "出发", done: false },
      { id: "m-5", title: "回来后写一篇小记", done: false },
    ],
  },
  {
    id: "g-002",
    title: "学会自由泳",
    intent: "想在水里不再害怕呼吸。",
    category: "courage",
    cover: "🏊",
    createdAt: "2026-02-01",
    milestones: [
      { id: "m-1", title: "办游泳卡", done: true },
      { id: "m-2", title: "连续去 3 次", done: true },
      { id: "m-3", title: "不戴鼻夹换气一次", done: false },
      { id: "m-4", title: "游完 50 米", done: false },
    ],
  },
  {
    id: "g-003",
    title: "把那本一直想读的书读完",
    intent: "《存在与时间》——买了两年了。",
    category: "solitude",
    cover: "📖",
    createdAt: "2026-04-01",
    milestones: [
      { id: "m-1", title: "读完前言", done: true },
      { id: "m-2", title: "读到第 1 章", done: false },
      { id: "m-3", title: "读到第 3 章", done: false },
      { id: "m-4", title: "写一段读后感", done: false },
    ],
  },
];

// 好友搭子：长期/可拆解的事 — 旅行、备考、健身……
// 邀请制（定向） + 广场自选（公开）双轨
export type FriendQuest = {
  id: string;
  kind: "invite" | "open";
  author: { name: string; avatar: string };
  title: string;
  desc: string;
  category: QuestCategory;
  place?: string;
  date: string;
  // 长期项：预估周期 / 拆出几个里程碑
  duration?: string;
  milestones?: string[];
  invitees?: { name: string; avatar: string; status: "pending" | "joined" | "declined" }[];
  joiners?: { name: string; avatar: string }[];
  capacity?: number;
};

export const FRIEND_QUESTS: FriendQuest[] = [
  {
    id: "fq-001",
    kind: "open",
    author: { name: "阿原", avatar: "🦊" },
    title: "找大理旅行搭子",
    desc: "5 月初有 4 天假，节奏慢一点，想找一两个人一起住民宿、骑行、看日落。",
    category: "flourish",
    place: "大理",
    date: "5 月 1 - 4 日",
    duration: "4 天 · 1 次出发",
    milestones: ["定行程", "订机票酒店", "出发", "回来写小记"],
    joiners: [{ name: "你", avatar: "✦" }],
    capacity: 3,
  },
  {
    id: "fq-002",
    kind: "open",
    author: { name: "Lin", avatar: "🦉" },
    title: "找雅思搭子（目标 7）",
    desc: "想找 1 - 2 个人组个小群，每周固定打卡口语、互相批作文。",
    category: "courage",
    place: "线上 · 每周日",
    date: "持续 3 个月",
    duration: "约 12 周",
    milestones: ["定学习计划", "每周口语对练", "全真模考", "出分"],
    joiners: [{ name: "Tina", avatar: "🐻" }],
    capacity: 3,
  },
  {
    id: "fq-003",
    kind: "invite",
    author: { name: "Mo", avatar: "🐼" },
    title: "一起备战半马",
    desc: "想 8 月跑一次半马，邀你做训练搭子。每周末长距离 + 一次配速训练。",
    category: "courage",
    place: "城北体育场 + 滨江",
    date: "5 月 - 8 月",
    duration: "约 16 周",
    milestones: ["10km 不停", "15km 完成", "半马模拟", "正式比赛"],
    invitees: [{ name: "你", avatar: "✦", status: "pending" }],
  },
  {
    id: "fq-004",
    kind: "invite",
    author: { name: "你", avatar: "✦" },
    title: "一起共创一本小册子",
    desc: "三个月，一人写一章，最后凑成一本送给彼此。",
    category: "create",
    place: "线上协作",
    date: "5 月 - 7 月",
    duration: "约 12 周",
    milestones: ["定主题", "每月一章", "互改", "成册"],
    invitees: [
      { name: "小柯", avatar: "🐱", status: "joined" },
      { name: "Tina", avatar: "🐻", status: "pending" },
    ],
  },
];

// 小型即时社交副本：吃饭、共读、看电影—— 放在「今日副本」上下文里
export type SocialQuest = {
  id: string;
  author: { name: string; avatar: string };
  title: string;
  desc: string;
  category: QuestCategory;
  place: string;
  date: string;
  joiners: { name: string; avatar: string }[];
  capacity: number;
};

export const SOCIAL_QUESTS: SocialQuest[] = [
  {
    id: "sq-001",
    author: { name: "小柯", avatar: "🐱" },
    title: "想去吃潇湘阁",
    desc: "周五晚上，谁要一起？据说他们的剁椒鱼头能吃哭人。",
    category: "flourish",
    place: "潇湘阁 · 文三路店",
    date: "本周五 19:00",
    joiners: [{ name: "阿原", avatar: "🦊" }, { name: "Tina", avatar: "🐻" }],
    capacity: 6,
  },
  {
    id: "sq-002",
    author: { name: "Tina", avatar: "🐻" },
    title: "周六下午共读半小时",
    desc: "随便带本书来，谁也不用说话。读完聊 10 分钟。",
    category: "solitude",
    place: "山顶书店",
    date: "周六 15:00",
    joiners: [{ name: "你", avatar: "✦" }],
    capacity: 4,
  },
  {
    id: "sq-003",
    author: { name: "Mo", avatar: "🐼" },
    title: "今晚一起看《在路上》",
    desc: "线上同步看，弹幕聊。",
    category: "create",
    place: "线上",
    date: "今晚 21:00",
    joiners: [],
    capacity: 8,
  },
];

// 鼓励语库——星轨庆祝时随机抽
export const ENCOURAGEMENTS = [
  "你又把世界推开了一寸。",
  "今天的你，比昨天的你多走了一步。",
  "这一笔会留下来，不会消失。",
  "做完了。是真的做完了。",
  "你不是一个人在走这条路。",
  "完成本身就是奖赏。",
  "这件事，被你认真对待过了。",
  "光从你做这件事的地方升起。",
];
