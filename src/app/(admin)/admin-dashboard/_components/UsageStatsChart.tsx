import { MonthlyStatChart } from "./MontlyStatsChart";

export function UsageRecordStatsChart() {
  return (
    <MonthlyStatChart
      title="Lượt sử dụng xe"
      apiMonthly="http://localhost:8085/booking/usage/stats/by-month"
      apiTotal="http://localhost:8085/booking/usage/stats/total"
      color="#10b981"
    />
  );
}
