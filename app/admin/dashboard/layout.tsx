import Sidebar from "@/app/components/admin/Sidebar";
import Header from "@/app/components/admin/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 bg-[#F7F5F1]">

        <Header />

        <main className="p-10">

          {children}

        </main>

      </div>

    </div>
  );
}