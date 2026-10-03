"use client";

import { useEffect, useRef } from "react";

type CounterProps = {
  /** The number to count up to. */
  to: number;
  /** The real text, rendered on the server and landed on at the end. */
  fallback: string;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  /** Wait this long after the number scrolls into view before starting. */
  delayMs?: number;
};

/**
 * Counts up to a number once it scrolls into view.
 *
 * `fallback` is rendered on the server, so the real value is in the HTML for
 * search engines and for anyone who never triggers the animation. The count
 * writes straight to the DOM node rather than through React state: four
 * counters re-rendering on every frame is what made this stutter on load.
 */
export function Counter({
  to,
  fallback,
  prefix = "",
  suffix = "",
  durationMs = 1800,
  delayMs = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer = 0;
    let startedAt = 0;

    const step = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / durationMs);
      /* easeOutQuart: quick off the mark, and it settles rather than snapping. */
      const eased = 1 - Math.pow(1 - progress, 4);
      node.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        node.textContent = fallback;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        node.textContent = `${prefix}0${suffix}`;
        /* Let the card finish fading in before the number starts moving. */
        timer = window.setTimeout(() => {
          frame = requestAnimationFrame(step);
        }, delayMs);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [to, prefix, suffix, durationMs, delayMs, fallback]);

  return <span ref={ref}>{fallback}</span>;
}
