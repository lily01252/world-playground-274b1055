// 共享 mock 数据 + 类型定义
// 后续接入 Lovable Cloud / AI Gateway 时，这里替换成真实数据源即可。

export type QuestCategory = "flourish" | "courage" | "create" | "solitude";

export const CATEGORY_META: Record<
  QuestCategory,
  { label: string; hand: string; color: string; emoji: string; terrain: string }
> = {
  flourish: {
    label: "丰容人类",
    hand: "出门走走 · 让世界进来",
    color: "hsl(var(--quest-flourish))",
    emoji: "🌳",
    terrain: "苔原",
  },
  courage: {
    label: "勇气试炼",
    hand: "说出 · 拒绝 · 走进",
    color: "hsl(var(--quest-courage))",
    emoji: "⚔️",
    terrain: "火山",
  },
  create: {
    label: "创造工坊",
    hand: "随手记一笔",
    color: "hsl(var(--quest-create))",
    emoji: "🎨",
    terrain: "光林",
  },
  solitude: {
    label: "精神自留地",
    hand: "独处 · 沉默 · 与自己",
    color: "hsl(var(--quest-solitude))",
    emoji: "🌊",
    terrain: "深湖",
  },
};

export type Quest = {
  id: string;
  category: QuestCategory;
  title: string;
  desc: string;
  difficulty: "易" | "中" | "难";
  xp: number;
  status: "available" | "in_progress" | "done";
};

export const QUESTS: Quest[] = [
  {
    id: "q-001",
    category: "flourish",
    title: "向西走 1 公里",
    desc: "找一条从未走过的小路，走到尽头再回头。允许迷路。",
    difficulty: "易",
    xp: 20,
    status: "available",
  },
  {
    id: "q-002",
    category: "courage",
    title: "说出那句憋了很久的话",
    desc: "给一个你想联系但没联系的人发条消息。不必完美。",
    difficulty: "中",
    xp: 40,
    status: "available",
  },
  {
    id: "q-003",
    category: "create",
    title: "三分钟速写",
    desc: "画一个今天遇到的人、物或一个表情。丑也算。",
    difficulty: "易",
    xp: 15,
    status: "available",
  },
  {
    id: "q-004",
    category: "solitude",
    title: "在某处坐 15 分钟",
    desc: "不刷手机，不带任务。只是坐着，看一样东西。",
    difficulty: "易",
    xp: 25,
    status: "available",
  },
  {
    id: "q-005",
    category: "courage",
    title: "拒绝一件不想做的事",
    desc: "今天有一件你想拒绝的事吗？说出口。",
    difficulty: "难",
    xp: 60,
    status: "available",
  },
];

export type JourneyRecord = {
  id: string;
  date: string; // ISO
  weather: "☀️" | "⛅" | "🌧️" | "🌙";
  questId?: string;
  category?: QuestCategory;
  place: string;
  text: string;
  tags: string[];
  feeling: "轻盈" | "平静" | "沉重" | "混沌" | "明亮";
  echo: string; // AI 回声
  // 外部地图坐标 (相对画布百分比)
  mapPos?: { x: number; y: number };
  // 内心地形坐标
  innerPos?: { x: number; y: number };
};

export const RECORDS: JourneyRecord[] = [
  {
    id: "r-1",
    date: "2026-04-20",
    weather: "☀️",
    questId: "q-002",
    category: "courage",
    place: "公司会议室",
    text: "今天终于鼓起勇气在周会上说了那个憋了两周的想法，虽然声音有点抖，但同事居然点头了。",
    tags: ["边界建立", "勇气试炼场"],
    feeling: "明亮",
    echo: "今天你扩张了自己的领地。",
    mapPos: { x: 62, y: 38 },
    innerPos: { x: 70, y: 35 },
  },
  {
    id: "r-2",
    date: "2026-04-18",
    weather: "⛅",
    questId: "q-004",
    category: "solitude",
    place: "滨江公园",
    text: "第三次来滨江公园，芦苇比上次又高了一些。坐了很久，什么也没想。",
    tags: ["精神自留地", "丰容人类"],
    feeling: "平静",
    echo: "公园记得你今天来过。",
    mapPos: { x: 28, y: 64 },
    innerPos: { x: 25, y: 70 },
  },
  {
    id: "r-3",
    date: "2026-04-15",
    weather: "🌧️",
    place: "家",
    text: "今天好累。没做什么事，就是累。",
    tags: ["情绪"],
    feeling: "沉重",
    echo: "听到了。累也是今天的一部分。",
    innerPos: { x: 45, y: 80 },
  },
  {
    id: "r-4",
    date: "2026-04-10",
    weather: "☀️",
    category: "courage",
    place: "城北拳馆",
    text: "拳馆教练说我出拳终于不像在打空气了。练了三个月，第一次被这样夸。",
    tags: ["勇气试炼场", "技能成长"],
    feeling: "明亮",
    echo: "你的身体也在记录。",
    mapPos: { x: 50, y: 22 },
    innerPos: { x: 78, y: 42 },
  },
  {
    id: "r-5",
    date: "2026-04-05",
    weather: "⛅",
    questId: "q-003",
    category: "create",
    place: "家",
    text: "画了一张水彩，虽然很丑，但是画完心情意外地好。",
    tags: ["创造工坊"],
    feeling: "轻盈",
    echo: "丑也是一种认真。",
    innerPos: { x: 55, y: 25 },
  },
  {
    id: "r-6",
    date: "2026-03-28",
    weather: "☀️",
    category: "flourish",
    place: "家",
    text: "和妈妈通了电话，聊了快一个小时。上次这样聊还是去年春天。",
    tags: ["关系", "丰容人类"],
    feeling: "平静",
    echo: "那个电话，终于被打了。",
    innerPos: { x: 35, y: 50 },
  },
];

// 外部地图上的 "已点亮地点"
export const MAP_PLACES = [
  { name: "滨江公园", x: 28, y: 64, count: 3 },
  { name: "城北拳馆", x: 50, y: 22, count: 8 },
  { name: "老城区咖啡馆", x: 72, y: 58, count: 2 },
  { name: "山顶书店", x: 18, y: 30, count: 1 },
  { name: "植物园", x: 80, y: 78, count: 1 },
  { name: "公司会议室", x: 62, y: 38, count: 1 },
];

// 内心地形：四块抽象区域
export const INNER_REGIONS: {
  category: QuestCategory;
  cx: number;
  cy: number;
  r: number;
  name: string;
}[] = [
  { category: "courage", cx: 75, cy: 38, r: 22, name: "锈红火山" },
  { category: "flourish", cx: 30, cy: 55, r: 24, name: "苔原平野" },
  { category: "create", cx: 55, cy: 22, r: 18, name: "光之疏林" },
  { category: "solitude", cx: 25, cy: 78, r: 20, name: "深蓝湖泽" },
];

export const PLAYER = {
  name: "无名旅人",
  level: 7,
  xp: 240,
  xpMax: 400,
  placesLit: 8,
  records: RECORDS.length,
};
