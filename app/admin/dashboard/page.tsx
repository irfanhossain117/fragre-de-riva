import DashboardCard from "@/app/components/admin/DashboardCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <div>



        <p className="text-gray-500 mt-2">
          Welcome back Admin
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Revenue"
          value="৳0"
        />

        <DashboardCard
          title="Orders"
          value={0}
        />

        <DashboardCard
          title="Customers"
          value={0}
        />

        <DashboardCard
          title="Products"
          value={0}
        />

      </div>

    </div>
  );
}