import { useEffect, useRef, useState } from "react";

/**
 * Scroll progress (0..1) of an element travelling through the viewport,
 * measured from "element top hits viewport top" to "element bottom hits
 * viewport bottom". Designed for tall pinned/sticky cinematic sections.
 */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      progressRef.current = p;
      setProgress(p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress, progressRef };
}

/** Reveal state once an element enters the viewport. */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Map a value from [a,b] into 0..1, clamped. */
export const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

/** Fade band: 0 before `a`, 1 across the plateau, 0 after `d`. */
export const band = (v: number, a: number, b: number, c: number, d: number) =>
  Math.min(range(v, a, b), 1 - range(v, c, d));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
