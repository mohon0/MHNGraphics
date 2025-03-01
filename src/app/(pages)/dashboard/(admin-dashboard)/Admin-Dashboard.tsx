import { useFetchAdminData } from "@/services/admin";
// Import dashboard components
import DurationToggle from "./DurationToggle";
import QuickStats from "./QuickStats";
import RecentActivity from "./RecentActivity";
import TopPerformingDesigns from "./TopPerformingDesigns";
import RecentUsers from "./RecentUsers";

/**
 * AdminDashboard Component
 *
 * Main dashboard layout that organizes and displays all dashboard widgets:
 * - Quick statistics (designs, applications, subscribers, etc.)
 * - Free application toggle
 * - Recent activity feed
 * - Top performing designs
 */
export default function AdminDashboard() {
  // Fetch main dashboard data
  const { isLoading, data } = useFetchAdminData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-6 grid grid-cols-2 gap-2 md:gap-6 lg:grid-cols-4">
        <QuickStats isLoading={isLoading} data={data} />
        <DurationToggle />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <TopPerformingDesigns />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <RecentUsers />
        {/* <RecentComments /> */}
      </div>
    </div>
  );
}
