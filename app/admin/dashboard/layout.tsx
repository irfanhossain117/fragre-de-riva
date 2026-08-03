import Sidebar from "@/app/components/admin/Sidebar";
import Header from "@/app/components/admin/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F7F5F1]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}