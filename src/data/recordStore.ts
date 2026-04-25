// 用户新增的足迹（来自每日副本完成时的 QuestRecord 提交）
// 通过 localStorage 持久化，让"外部世界"和"内心地形"都能即时显示。
import { useEffect, useState } from "react";
import type { JourneyRecord } from "./world";

const KEY = "world-play.userRecords.v1";
const EVT = "world-play:records-changed";

export const loadUserRecords = (): JourneyRecord[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as JourneyRecord[]) : [];
  } catch {
    return [];
  }
};

export const saveUserRecord = (rec: JourneyRecord) => {
  const all = loadUserRecords();
  // 去重（按 id）
  const next = [rec, ...all.filter((r) => r.id !== rec.id)];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVT));
};

export const deleteUserRecord = (id: string) => {
  const next = loadUserRecords().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVT));
};

// React hook：响应式获取所有用户提交记录
export const useUserRecords = (): JourneyRecord[] => {
  const [list, setList] = useState<JourneyRecord[]>(() => loadUserRecords());
  useEffect(() => {
    const onChange = () => setList(loadUserRecords());
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return list;
};
