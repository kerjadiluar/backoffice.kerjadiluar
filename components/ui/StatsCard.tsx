import type { ReactNode } from "react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: ReactNode
  iconBg?: string
  gradient?: boolean
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  iconBg = "bg-blue-100",
  gradient = false,
}: StatsCardProps) {
  const changeColors = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600",
  }

  return (
    <div
      className={`p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
        gradient ? "bg-gradient-to-br from-red-50 to-red-100 border-red-200" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 text-sm font-medium truncate">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${changeColors[changeType]}`}>{change}</span>
              <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 ${iconBg} rounded-xl flex-shrink-0`}>
          <div className="text-xl md:text-2xl">{icon}</div>
        </div>
      </div>
    </div>
  )
}
