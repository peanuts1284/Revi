"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  end: number;
  suffix?: string;
  duration?: number;  // ms
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function CounterStat({ end, suffix = "", duration = 1500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount]       = useState(0);
  const [triggered, setTriggered] = useState(false);

  // Trigger when the element enters the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Count up using rAF once triggered
  useEffect(() => {
    if (!triggered) return;
    const startTime = performance.now();
    let raf: number;
    const step = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutCubic(progress) * end));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [triggered, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}
