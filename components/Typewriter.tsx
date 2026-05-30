"use client";
import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;  // ms per character
  delay?: number;  // ms before typing starts
}

export default function Typewriter({ text, speed = 40, delay = 0 }: Props) {
  const [index, setIndex]     = useState(0);
  const [started, setStarted] = useState(delay === 0);

  // Honour initial delay before first keystroke
  useEffect(() => {
    if (delay === 0) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  // Advance one character at a time
  useEffect(() => {
    if (!started || index >= text.length) return;
    const t = setTimeout(() => setIndex((i) => i + 1), speed);
    return () => clearTimeout(t);
  }, [started, index, text, speed]);

  const done = started && index >= text.length;

  return (
    <>
      {text.slice(0, index)}
      {started && (
        <span
          aria-hidden="true"
          className={done ? "cursor-blink" : ""}
          style={{
            display: "inline-block",
            width: "2px",
            height: "0.8em",
            verticalAlign: "middle",
            backgroundColor: "currentColor",
            marginLeft: "2px",
          }}
        />
      )}
    </>
  );
}
