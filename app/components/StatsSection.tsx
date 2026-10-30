import { Stats } from "@/app/components/Stats";
import { getDueForecast, getStats } from "@/lib/stats";

export default async function StatsSection() {
  const [stats, due] = await Promise.all([getStats(), getDueForecast()]);
  return <Stats {...stats} due={due} />;
}
