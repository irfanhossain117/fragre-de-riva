interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
}: DashboardCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm text-gray-400">
          {subtitle}
        </p>
      )}

    </div>
  );
}