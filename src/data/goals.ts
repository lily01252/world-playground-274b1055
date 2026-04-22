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

// 好友圈：邀请制 + 自选广场 双轨
export type FriendQuest = {
  id: string;
  kind: "invite" | "open"; // 邀请制 / 广场自选
  author: { name: string; avatar: string };
  title: string;
  desc: string;
  category: QuestCategory;
  place?: string;
  date: string;
  // 邀请制：被邀请的好友
  invitees?: { name: string; avatar: string; status: "pending" | "joined" | "declined" }[];
  // 广场制：已加入的人
  joiners?: { name: string; avatar: string }[];
  capacity?: number;
};

export const FRIEND_QUESTS: FriendQuest[] = [
  {
    id: "fq-001",
    kind: "open",
    author: { name: "小柯", avatar: "🐱" },
    title: "想去吃潇湘阁",
    desc: "周五晚上，谁要一起？据说他们的剁椒鱼头能吃哭人。",
    category: "flourish",
    place: "潇湘阁 · 文三路店",
    date: "本周五 19:00",
    joiners: [
      { name: "阿原", avatar: "🦊" },
      { name: "Tina", avatar: "🐻" },
    ],
    capacity: 6,
  },
  {
    id: "fq-002",
    kind: "open",
    author: { name: "阿原", avatar: "🦊" },
    title: "想去大理旅游",
    desc: "5 月初有 4 天假，想找一两个人一起，节奏慢一点。",
    category: "flourish",
    place: "大理",
    date: "5 月 1 - 4 日",
    joiners: [{ name: "你", avatar: "✦" }],
    capacity: 3,
  },
  {
    id: "fq-003",
    kind: "invite",
    author: { name: "Mo", avatar: "🐼" },
    title: "周日早晨去爬城北山",
    desc: "想试试 6 点出发看日出，邀请你一起。",
    category: "courage",
    place: "城北山",
    date: "周日 06:00",
    invitees: [{ name: "你", avatar: "✦", status: "pending" }],
  },
  {
    id: "fq-004",
    kind: "invite",
    author: { name: "你", avatar: "✦" },
    title: "周六下午一起画画",
    desc: "在家随便画，谁带颜料谁带饼干。",
    category: "create",
    place: "我家",
    date: "周六 14:00",
    invitees: [
      { name: "小柯", avatar: "🐱", status: "joined" },
      { name: "Tina", avatar: "🐻", status: "pending" },
    ],
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
