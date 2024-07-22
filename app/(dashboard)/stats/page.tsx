import { getStatsAction } from "@/utils/actions";

async function StatsPage() {
  const stats = await getStatsAction();
  return <div></div>;
}

export default StatsPage;
