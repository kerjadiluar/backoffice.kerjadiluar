import { FaEye, FaMousePointer, FaUsers, FaChartLine } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function PemasaranPage() {
  const campaigns = [
    {
      id: 1,
      name: "Rekrutmen Pekerja Jepang Q1 2024",
      type: "Digital Marketing",
      budget: "Rp 50,000,000",
      status: "active",
      performance: "85%",
    },
    {
      id: 2,
      name: "Program Magang Jepang",
      type: "Social Media",
      budget: "Rp 25,000,000",
      status: "paused",
      performance: "72%",
    },
    {
      id: 3,
      name: "Pelatihan Bahasa Jepang",
      type: "Content Marketing",
      budget: "Rp 15,000,000",
      status: "completed",
      performance: "91%",
    },
    {
      id: 4,
      name: "Webinar Kerja di Jepang",
      type: "Event Marketing",
      budget: "Rp 10,000,000",
      status: "scheduled",
      performance: "-",
    },
  ]

  return (
    <>
      <PageHeader
        title="Pemasaran & Rekrutmen"
        description="Kelola kampanye pemasaran dan strategi rekrutmen calon pekerja"
      >
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors">
          Buat Kampanye Baru
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Tooltip content="Jumlah total impresi yang didapat dari seluruh channel pemasaran bulan ini.">
          <StatsCard
            title="Total Impressions"
            value="1.2M"
            change="+18%"
            changeType="positive"
            icon={<FaEye className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>

        <Tooltip content="Persentase klik yang didapat dibandingkan dengan total impresi (Click-Through Rate).">
          <StatsCard
            title="Click Rate"
            value="3.4%"
            change="+0.8%"
            changeType="positive"
            icon={<FaMousePointer className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>

        <Tooltip content="Jumlah calon pekerja yang berhasil mengisi form atau menghubungi tim pemasaran (Leads Generated).">
          <StatsCard
            title="Leads Generated"
            value="456"
            change="+25%"
            changeType="positive"
            icon={<FaUsers className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>

        <Tooltip content="Persentase leads yang berhasil dikonversi menjadi pendaftar atau peserta (Conversion Rate).">
          <StatsCard
            title="Conversion Rate"
            value="12.8%"
            change="+2.1%"
            changeType="positive"
            icon={<FaChartLine className="text-purple-600" />}
            iconBg="bg-purple-100"
          />
        </Tooltip>
      </div>

      {/* Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Budget</span>
              <span className="text-sm font-semibold text-gray-900">Rp 100,000,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Spent This Month</span>
              <span className="text-sm font-semibold text-gray-900">Rp 35,000,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Campaigns</span>
              <span className="text-sm font-semibold text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Performance</span>
              <span className="text-sm font-semibold text-green-600">82.7%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Channels</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Social Media</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Google Ads</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Content Marketing</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">23%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Kampanye Marketing</h3>
          <p className="text-sm text-gray-600 mt-1">Kelola semua kampanye pemasaran dan rekrutmen</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kampanye
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipe
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.type}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.budget}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.performance}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === "active"
                          ? "bg-green-100 text-green-800"
                          : campaign.status === "paused"
                            ? "bg-yellow-100 text-yellow-800"
                            : campaign.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {campaign.status === "active"
                        ? "Aktif"
                        : campaign.status === "paused"
                          ? "Dijeda"
                          : campaign.status === "completed"
                            ? "Selesai"
                            : "Terjadwal"}
                    </span>
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
