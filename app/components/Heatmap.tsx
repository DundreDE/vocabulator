"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useRef, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

const DAYS = 90;
const BLOCK_MARGIN = 4;
const LABEL_WIDTH = 34;

const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const toLevel = (n: number) =>
  n === 0 ? 0 : n < 5 ? 1 : n < 10 ? 2 : n < 20 ? 3 : 4;

export default function StudyHeatmap() {
  const [blockSize, setBlockSize] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Activity[]>([]);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: rows, error } = await supabase.rpc("daily_review_counts", {
        days: DAYS,
      });
      if (error) {
        console.error("Failed to fetch daily review counts:", error.message);
        return;
      }
      const counts = new Map<string, number>(
        (rows ?? []).map((r: { day: string; count: number }) => [
          r.day,
          r.count,
        ]),
      );

      const result: Activity[] = [];
      const d = new Date();
      d.setDate(d.getDate() - (DAYS - 1));

      for (let i = 0; i < DAYS; i++) {
        const date = fmt(d);
        const count = counts.get(date) ?? 0;
        result.push({ date, count, level: toLevel(count) });
        d.setDate(d.getDate() + 1);
      }
      setData(result);
    })();
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || data.length === 0) return;

    const first = new Date(data[0].date);
    const offset = (first.getDay() + 6) % 7;
    const weeks = Math.ceil((DAYS + offset) / 7);

    const update = () => {
      const free = el.clientWidth - LABEL_WIDTH;
      const size = Math.floor(free / weeks - BLOCK_MARGIN);
      setBlockSize(Math.max(8, Math.min(size, 24)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [data]);

  if (data.length === 0) return null;

  return (
    <div className="rounded-xl border border-stone-800 p-4">
      <h2 className="mb-3 text-lg text-lg font-semibold">Study Days</h2>
      <div ref={boxRef} className="w-full">
        {blockSize > 0 && (
          <ActivityCalendar
            data={data}
            weekStart={1}
            blockSize={blockSize}
            blockMargin={BLOCK_MARGIN}
            showWeekdayLabels
            style={{ width: "100%", height: "auto" }}
            theme={{
              light: ["#ebedf0", "#bbf7d0", "#4ade80", "#16a34a", "#166534"],
              dark: ["#1f2937", "#14532d", "#15803d", "#22c55e", "#86efac"],
            }}
          />
        )}
      </div>
    </div>
  );
}
