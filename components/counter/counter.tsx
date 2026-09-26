"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  /** The number to count up to. */
  to: number;
  /** Text shown instead of the number when motion is reduced or JS is off. */
  fallback: string;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

/**
 * Counts up to a number once it scrolls into view. Renders `fallback`
 * immediately on the server so the real value is in the HTML for search
 * engines and for anyone who never triggers the animation.
 */
export function Counter({ to, fallback, prefix = "", suffix = "", durationMs = 1400 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / durationMs);
          // easeOutExpo: fast at first, settles onto the final number.
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setDisplay(`${prefix}${Math.round(to * eased)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, prefix, suffix, durationMs]);

  return <span ref={ref}>{display ?? fallback}</span>;
}
