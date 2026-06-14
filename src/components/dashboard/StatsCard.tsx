import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  icon: string;
  highlight?: boolean;
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "trending-up": TrendingUp,
  users: Users,
  package: Package,
  "shopping-cart": ShoppingCart,
};

export default function StatsCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  highlight = false,
}: StatsCardProps) {
  const Icon = iconMap[icon] ?? TrendingUp;
  const isPositive = (trend ?? 0) >= 0;

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-5 shadow-sm
        ${highlight ? "bg-[#FF6B00] text-white" : "bg-white text-slate-800"}
      `}
    >
      {/* Icon badge */}
      <div
        className={`
          absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl
          ${highlight ? "bg-white/20" : "bg-orange-50"}
        `}
      >
        <Icon
          size={20}
          className={highlight ? "text-white" : "text-orange-500"}
        />
      </div>

      <p className={`text-sm ${highlight ? "text-orange-100" : "text-slate-400"}`}>
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold leading-tight">
        {value}
      </h2>

      <div className="mt-3 flex items-center gap-2">
        {trend !== undefined && (
          <span
            className={`
              flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold
              ${
                highlight
                  ? isPositive
                    ? "bg-white/20 text-white"
                    : "bg-white/20 text-white"
                  : isPositive
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }
            `}
          >
            {isPositive ? (
              <ArrowUpRight size={12} />
            ) : (
              <ArrowDownRight size={12} />
            )}
            {Math.abs(trend)}%
          </span>
        )}

        {subtitle && (
          <p className={`text-xs ${highlight ? "text-orange-100" : "text-slate-400"}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
