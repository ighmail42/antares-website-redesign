"use client";

import { useEffect, useRef } from "react";
import styles from "./starfield.module.css";

type StarfieldProps = {
  /** Roughly how many stars per million pixels of canvas. */
  density?: number;
  className?: string;
};

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  drift: number;
};

/**
 * A slow, twinkling starfield painted on a canvas behind the hero.
 *
 * It sizes itself to its parent, redraws on resize, pauses when the tab is
 * hidden, and renders nothing at all when the reader prefers reduced motion.
 */
export function Starfield({ density = 90, className }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.round((width * height) / 1_000_000 * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.25,
        baseAlpha: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.0012 + 0.0003,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.012,
      }));
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase) * 0.35 + 0.65;
        star.x += star.drift;
        if (star.x < -2) star.x = width + 2;
        if (star.x > width + 2) star.x = -2;

        context.globalAlpha = Math.max(0, Math.min(1, star.baseAlpha * twinkle));
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = star.radius > 1.1 ? "#f2de8b" : "#eef1f8";
        context.fill();
      }
      context.globalAlpha = 1;
      if (running) frame = requestAnimationFrame(draw);
    };

    build();
    frame = requestAnimationFrame(draw);

    const observer = new ResizeObserver(build);
    observer.observe(canvas);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`${styles.canvas}${className ? ` ${className}` : ""}`} aria-hidden="true" />;
}
