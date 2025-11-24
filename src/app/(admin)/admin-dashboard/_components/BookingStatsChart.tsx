import { MonthlyStatChart } from "./MontlyStatsChart";

export function BookingStatsChart() {
  return (
    <MonthlyStatChart
      title="Lượt đặt xe"
      apiMonthly="http://localhost:8085/booking/stats/by-month"
      apiTotal="http://localhost:8085/booking/stats/total"
      color="#0ea5e9"
    />
  );
}
