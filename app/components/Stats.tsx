type Props = {
  streak: number;
  longest: number;
  studiedToday: boolean;
  total: number;
  accuracy: number;
  due: { today: number; tomorrow: number; week: number };
};

export function StatsPage({
  streak,
  longest,
  studiedToday,
  total,
  accuracy,
  due,
}: Props) {
  const items = [
    {
      label: "Streak",
      value: `${streak} days`,
      sub: studiedToday
        ? `Longest days in a streak : ${longest}`
        : "Heute noch lernen!",
    },
    { label: "Cards learned", value: total },
    { label: "Accuracy", value: `${accuracy} %` },
    {
      label: "Due today",
      value: due.today,
      sub: `Tomorrow: ${due.tomorrow}, Week: ${due.week}`,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
      {items.map((i) => (
        <div key={i.label} className="rounded-xl border p-4">
          <p className="text-sm text-neutral-500">{i.label}</p>
          <p className="text-2xl font-semibold">{i.value}</p>
          {i.sub && <p className="text-sm text-neutral-400">{i.sub}</p>}
        </div>
      ))}
    </div>
  );
}
