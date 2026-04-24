import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "@/assets/cover-fairytale.png";

const Cover1 = () => {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav("/intro/2"), 3000);
    return () => clearTimeout(t);
  }, [nav]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <p className="relative font-serif-en text-center px-8 max-w-md text-[hsl(var(--cream))] leading-loose text-lg md:text-xl paper-in drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
        很久以前，这片世界，<br />
        曾漫有漫天星光，<br />
        万物繁盛，生机盎然。
      </p>
    </div>
  );
};
export default Cover1;
