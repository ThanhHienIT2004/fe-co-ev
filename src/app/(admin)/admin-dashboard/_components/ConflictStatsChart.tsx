import { MonthlyStatChart } from "./MontlyStatsChart";

export function ConflictStatsChart() {
  return (
    <MonthlyStatChart
      title="Xung đột đặt xe"
      apiMonthly="http://localhost:8085/booking/conflict/stats/by-month"
      apiTotal="http://localhost:8085/booking/conflict/stats/total"
      color="#ef4444"
    />
  );
}
