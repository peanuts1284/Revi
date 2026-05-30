"use client";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;     // ms before transition starts
  initialY?: number;  // starting translateY in px — positive = from below, negative = from above
  duration?: number;  // transition duration in ms
  easing?: string;    // CSS easing function
}

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  initialY = 10,
  duration = 450,
  easing = "cubic-bezier(0.16,1,0.3,1)",
}: Props) {
  const { ref, inView } = useInView();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before JS mounts: no inline styles → SSR HTML is visible by default.
  // After mount: fade + slide in when the element enters the viewport.
  const style = mounted
    ? {
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${initialY}px)`,
        transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
        willChange: "opacity, transform",
      }
    : undefined;

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
