"use client"

import { FaUserCheck, FaUserPlus, FaClock, FaPlane, FaCheckCircle, FaChartLine, FaChartBar, FaChartPie, FaChartArea } from "react-icons/fa"
import StatsCard from "@/components/ui/StatsCard"
import PageHeader from "@/components/ui/PageHeader"
import Tooltip from "@/components/ui/Tooltip"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts"

const activeUsersData = [
  { month: "Jan", users: 2100 },
  { month: "Feb", users: 2300 },
  { month: "Mar", users: 2500 },
  { month: "Apr", users: 2700 },
  { month: "May", users: 2847 },
]

const registrationsData = [
  { month: "Jan", registrations: 120 },
  { month: "Feb", registrations: 180 },
  { month: "Mar", registrations: 220 },
  { month: "Apr", registrations: 300 },
  { month: "May", registrations: 342 },
]

const processStatusData = [
  { name: "Dalam Proses", value: 156 },
  { name: "Selesai", value: 1020 },
  { name: "Gagal", value: 45 },
]
const processStatusColors = ["#facc15", "#22c55e", "#ef4444"]

const departuresData = [
  { month: "Jan", departures: 800 },
  { month: "Feb", departures: 950 },
  { month: "Mar", departures: 1100 },
  { month: "Apr", departures: 1200 },
  { month: "May", departures: 1289 },
]

export default function DashboardPage() {
  return (
    <>
      {/* <PageHeader title="Dashboard Overview" description="Monitor your overseas worker management system performance" /> */}

      <div className="space-y-8">
        {/* Section: Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Tooltip content="Jumlah pengguna yang aktif dalam sistem saat ini.">
            <StatsCard
              title="Total Pengguna Aktif"
              value="2,847"
              change="+12%"
              changeType="positive"
              icon={<FaUserCheck className="text-green-600" />}
              iconBg="bg-green-100"
            />
          </Tooltip>
          <Tooltip content="Jumlah pengguna baru yang mendaftar bulan ini.">
            <StatsCard
              title="Pendaftar Baru"
              value="342"
              change="+8%"
              changeType="positive"
              icon={<FaUserPlus className="text-red-700" />}
              iconBg="bg-red-200"
              gradient={true}
            />
          </Tooltip>
          <Tooltip content="Jumlah aplikasi atau proses yang sedang berjalan.">
            <StatsCard
              title="Dalam Proses"
              value="156"
              change="-3%"
              changeType="negative"
              icon={<FaClock className="text-yellow-600" />}
              iconBg="bg-yellow-100"
            />
          </Tooltip>
          <Tooltip content="Jumlah pekerja yang sudah diberangkatkan ke luar negeri.">
            <StatsCard
              title="Telah Berangkat"
              value="1,289"
              change="+15%"
              changeType="positive"
              icon={<FaPlane className="text-blue-700" />}
              iconBg="bg-blue-200"
            />
          </Tooltip>
        </div>

        {/* Section: Grafik Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col min-h-[320px]">
            <div className="flex items-center mb-2">
              <FaChartLine className="text-blue-500 mr-2 text-lg" />
              <h3 className="font-bold text-base">Tren Pengguna Aktif</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={activeUsersData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip wrapperClassName="!rounded-xl !shadow-lg !border !border-gray-200" />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#fff', stroke: '#dc2626', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                  isAnimationActive={true}
                  animationDuration={900}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col min-h-[320px]">
            <div className="flex items-center mb-2">
              <FaChartBar className="text-green-500 mr-2 text-lg" />
              <h3 className="font-bold text-base">Pendaftar Baru per Bulan</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={registrationsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip wrapperClassName="!rounded-xl !shadow-lg !border !border-gray-200" />
                <Bar
                  dataKey="registrations"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={900}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section: Grafik Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col min-h-[320px] items-center">
            <div className="flex items-center mb-2">
              <FaChartPie className="text-yellow-500 mr-2 text-lg" />
              <h3 className="font-bold text-base">Distribusi Status Aplikasi</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={processStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={32}
                  fill="#facc15"
                  label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                  isAnimationActive={true}
                  animationDuration={900}
                >
                  {processStatusData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={processStatusColors[idx % processStatusColors.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={32} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <ChartTooltip wrapperClassName="!rounded-xl !shadow-lg !border !border-gray-200" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col min-h-[320px]">
            <div className="flex items-center mb-2">
              <FaChartArea className="text-purple-500 mr-2 text-lg" />
              <h3 className="font-bold text-base">Keberangkatan Pekerja per Bulan</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={departuresData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDepartures" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a21caf" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#a21caf" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip wrapperClassName="!rounded-xl !shadow-lg !border !border-gray-200" />
                <Area
                  type="monotone"
                  dataKey="departures"
                  stroke="#a21caf"
                  fill="url(#colorDepartures)"
                  strokeWidth={3}
                  isAnimationActive={true}
                  animationDuration={900}
                  dot={{ r: 4, fill: '#fff', stroke: '#a21caf', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Welcome Section & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Selamat Datang di Dashboard Admin</h3>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full whitespace-nowrap">
                System Online
              </span>
            </div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
            Ini adalah halaman dashboard untuk mengelola sistem backoffice Kejadiluar. Gunakan menu di sidebar untuk
            navigasi ke berbagai fitur admin dan kelola seluruh proses administrasi dengan mudah.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                <FaClock className="mr-2 text-sm" />
                Quick Actions
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Verifikasi dokumen pending</li>
                <li>• Review aplikasi baru</li>
                <li>• Update status kandidat</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <FaCheckCircle className="mr-2 text-sm" />
                Recent Updates
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• System backup completed</li>
                <li>• New security patch applied</li>
                <li>• Database optimized</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">New user registered</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">Document verified</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">Training scheduled</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">Departure confirmed</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}