import { useState } from "react";
import WorldMap from "./WorldMap";
import InnerTerrain from "./InnerTerrain";

// 地图栏目：顶部 Tab 切换 世界地图 / 内心地图
const MapHub = () => {
  const [tab, setTab] = useState<"world" | "inner">("world");

  return (
    <div>
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-6 flex justify-center">
        <div className="flex border-2 border-foreground rounded-sm overflow-hidden bg-card">
          <button
            onClick={() => setTab("world")}
            className={`px-5 md:px-8 py-2 text-xs md:text-sm tracking-widest border-r-2 border-foreground transition-colors ${
              tab === "world"
                ? "bg-foreground text-background"
                : "hover:bg-secondary"
            }`}
          >
            🗺️ 世界地图
          </button>
          <button
            onClick={() => setTab("inner")}
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
