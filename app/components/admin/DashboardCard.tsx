import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: DashboardCardProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>
        </div>

        {/* Icon Badge (Jodi Icon dewa thake) */}
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#A88442]">
            <Icon size={24} />
          </div>
        )}
      </div>

      {/* Subtitle or Trend */}
      {(subtitle || trend) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {trend && (
            <span className="font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
              {trend}
            </span>
          )}
          {subtitle && <span className="text-gray-400">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}