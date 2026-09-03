import { useEffect, useState } from "react";
import { chapters } from "@/data/investigation";

export function ProgressRail() {
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id));
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.42;
      let idx = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? window.scrollY / h : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="pointer-events-none fixed bottom-6 left-6 z-50 hidden select-none md:block">
      <div className="flex flex-col gap-2">
        {chapters.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="pointer-events-auto group flex items-center gap-2.5"
          >
            <span
              className={`h-px transition-all duration-500 ${
                i === active ? "w-7 bg-signal" : "w-3 bg-border group-hover:w-5"
              }`}
            />
            <span
              className={`tele-sm transition-colors duration-500 ${
                i === active ? "text-signal" : "text-muted-foreground/50"
              }`}
            >
              {c.index} {c.label}
            </span>
          </a>
        ))}
      </div>
      <div className="mt-4 h-px w-32 bg-border">
        <div
          className="h-px bg-signal-dim transition-[width] duration-150"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <p className="tele-sm mt-2 text-muted-foreground/40">
        {(pct * 100).toFixed(0).padStart(3, "0")}% TRAVERSE
      </p>
    </aside>
  );
}
