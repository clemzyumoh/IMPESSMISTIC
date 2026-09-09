"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({
  value,
  duration = 15000,
}: {
  value: string; // e.g. "312", "$41M", "11 days"
  duration?: number;
}) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const numMatch = value.match(/[\d.]+/);
    if (!numMatch) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(numMatch[0]);
    const prefix = value.slice(0, numMatch.index);
    const suffix = value.slice((numMatch.index ?? 0) + numMatch[0].length);

    let start: number | null = null;
    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const current = Math.floor(progress * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    }
    requestAnimationFrame(step);
  }, [value, duration]);

  return <div ref={ref}>{display}</div>;
}
