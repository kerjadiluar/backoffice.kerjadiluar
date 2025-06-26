import { FaNetworkWired, FaUsers, FaComments, FaCalendarAlt, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function KomunitasPage() {
  const communities = [
    {
      id: 1,
      name: "Pekerja Indonesia Tokyo",
      location: "Tokyo, Japan",
      members: 245,
      admin: "Ahmad Rizki",
      category: "Regional",
      status: "active",
      lastActivity: "2024-01-15",
      events: 12,
    },
    {
      id: 2,
      name: "Grup Bantuan Osaka",
      location: "Osaka, Japan", 
      members: 189,
      admin: "Siti Nurhaliza",
      category: "Support",
      status: "active",
      lastActivity: "2024-01-14",
      events: 8,
    },
    {
      id: 3,
      name: "Komunitas Pelatihan",
      location: "Online",
      members: 156,
      admin: "Budi Santoso",
      category: "Education",
      status: "inactive",
      lastActivity: "2024-01-10",
      events: 5,
    },
  ]

  const recentActivities = [
    { id: 1, user: "Ahmad Rizki", action: "Created new event", community: "Pekerja Indonesia Tokyo", time: "2 hours ago" },
    { id: 2, user: "Siti Nurhaliza", action: "Posted announcement", community: "Grup Bantuan Osaka", time: "4 hours ago" },
    { id: 3, user: "Maya Sari", action: "Joined community", community: "Komunitas Pelatihan", time: "6 hours ago" },
    { id: 4, user: "Budi Santoso", action: "Shared resource", community: "Pekerja Indonesia Tokyo", time: "8 hours ago" },
  ]

  return (
    <>
      <PageHeader
        title="Manajemen Komunitas"
        description="Kelola komunitas pekerja dan platform komunikasi"
      >
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Buat Komunitas
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Jumlah komunitas pekerja yang terdaftar.">
          <StatsCard
            title="Total Komunitas"
            value="24"
            change="+3"
            changeType="positive"
            icon={<FaNetworkWired className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
        <Tooltip content="Total anggota dari seluruh komunitas.">
          <StatsCard
            title="Total Anggota"
            value="1,245"
            change="+45"
            changeType="positive"
            icon={<FaUsers className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah pesan yang dikirim di komunitas hari ini.">
          <StatsCard
            title="Pesan Hari Ini"
            value="156"
            change="+23"
            changeType="positive"
            icon={<FaComments className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah event komunitas yang sedang berlangsung.">
          <StatsCard
            title="Event Aktif"
            value="8"
            change="+2"
            changeType="positive"
            icon={<FaCalendarAlt className="text-purple-600" />}
            iconBg="bg-purple-100"
          />
        </Tooltip>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {activity.user.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action} in{" "}
                  <span className="font-medium text-red-600">{activity.community}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Communities Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daftar Komunitas</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua komunitas dan grup pekerja</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari komunitas..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Kategori</option>
                <option>Regional</option>
                <option>Support</option>
                <option>Education</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Komunitas
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anggota
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Events
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {communities.map((community) => (
                <tr key={community.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{community.name}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{community.location}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{community.members} anggota</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{community.admin}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{community.category}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{community.events} events</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        community.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {community.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
