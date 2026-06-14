import DashboardLayout from "@/layouts/DashboardLayout";
import Header from "@/components/dashboard/Header";
import StatsSection from "@/components/dashboard/StatsSection";
import WeeklyActivity from "@/components/dashboard/WeeklyActivity";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SalesTrend from "@/components/dashboard/SalesTrend";
import PaymentMethod from "@/components/dashboard/PaymentMethod";
import LowStockAlert from "@/components/dashboard/LowStockAlert";

import TopProducts from "@/components/dashboard/TopProducts";
import CategoryChart from "@/components/dashboard/CategoryChart";
import TopCustomers from "@/components/dashboard/TopCustomers";
import QuickActions from "../../components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Header />

      <StatsSection />

      {/* Weekly Activity + Recent Transactions */}
      <div className="mt-6 grid grid-cols-12 gap-5">
        <div className="col-span-8">
          <WeeklyActivity />
        </div>

        <div className="col-span-4">
          <RecentTransactions />
        </div>
      </div>

      {/* Sales Trend + Payment + Low Stock */}
      <div className="mt-6 grid grid-cols-12 gap-5">
        <div className="col-span-6">
          <SalesTrend />
        </div>

        <div className="col-span-3">
          <PaymentMethod />
        </div>

        <div className="col-span-3">
          <LowStockAlert />
        </div>
      </div>

      {/* Top Products + Category Chart */}
      <div className="mt-6 grid grid-cols-12 gap-5">
        <div className="col-span-8">
          <TopProducts />
        </div>

        <div className="col-span-4">
          <CategoryChart />
        </div>
      </div>

      {/* Top Customers + Quick Actions */}
      <div className="mt-6 grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <TopCustomers />
        </div>

        <div className="col-span-9">
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
}