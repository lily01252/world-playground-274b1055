import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WorldMap from "./WorldMap";
import InnerTerrain from "./InnerTerrain";

// 地图栏目：顶部 Tab 切换 世界地图 / 内心地图
// 支持 ?surface=world|inner&lit=x,y 来自记录页跳转，触发"新光点亮起"动画
const MapHub = () => {
  const [params, setParams] = useSearchParams();
  const initial = params.get("surface") === "inner" ? "inner" : "world";
  const [tab, setTab] = useState<"world" | "inner">(initial);

  // 当跳转过来时，把 tab 同步成 query 指定的
  useEffect(() => {
    const s = params.get("surface");
    if (s === "world" || s === "inner") setTab(s);
  }, [params]);

  const switchTab = (t: "world" | "inner") => {
    setTab(t);
    // 切 tab 时清掉 lit 参数，避免反复触发
    const next = new URLSearchParams(params);
    next.set("surface", t);
    next.delete("lit");
    next.delete("place");
    next.delete("cat");
    setParams(next, { replace: true });
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-6 flex justify-center">
        <div className="flex border-2 border-foreground rounded-sm overflow-hidden bg-card">
          <button
            onClick={() => switchTab("world")}
            className={`px-5 md:px-8 py-2 text-xs md:text-sm tracking-widest border-r-2 border-foreground transition-colors ${
              tab === "world"
                ? "bg-foreground text-background"
                : "hover:bg-secondary"
            }`}
          >
            🗺️ 世界地图
          </button>
          <button
            onClick={() => switchTab("inner")}
            className={`px-5 md:px-8 py-2 text-xs md:text-sm tracking-widest transition-colors ${
              tab === "inner"
                ? "bg-foreground text-background"
                : "hover:bg-secondary"
            }`}
          >
            ✦ 内心地图
          </button>
        </div>
      </div>

      <div className="-mt-2">
        {tab === "world" ? <WorldMap /> : <InnerTerrain />}
      </div>
    </div>
  );
};

export default MapHub;
