import { FaUserCheck, FaUserPlus, FaClock, FaPlane, FaCheckCircle } from "react-icons/fa"
import StatsCard from "@/components/ui/StatsCard"
import PageHeader from "@/components/ui/PageHeader"

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard Overview" description="Monitor your overseas worker management system performance" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Pengguna Aktif"
          value="2,847"
          change="+12%"
          changeType="positive"
          icon={<FaUserCheck className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Pendaftar Baru"
          value="342"
          change="+8%"
          changeType="positive"
          icon={<FaUserPlus className="text-red-700" />}
          iconBg="bg-red-200"
          gradient={true}
        />

        <StatsCard
          title="Dalam Proses"
          value="156"
          change="-3%"
          changeType="negative"
          icon={<FaClock className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />

        <StatsCard
          title="Telah Berangkat"
          value="1,289"
          change="+15%"
          changeType="positive"
          icon={<FaPlane className="text-blue-700" />}
          iconBg="bg-blue-200"
        />
      </div>

      {/* Welcome Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
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
