import { FaCertificate, FaUsers, FaClipboardList, FaTrophy, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function TesPage() {
  const tests = [
    {
      id: 1,
      name: "JLPT N4 Preparation",
      type: "Language Test",
      duration: "120 minutes",
      participants: 45,
      passRate: "78%",
      nextSchedule: "2024-01-25",
      status: "active",
    },
    {
      id: 2,
      name: "Basic Safety Training",
      type: "Safety Certification",
      duration: "90 minutes",
      participants: 32,
      passRate: "92%",
      nextSchedule: "2024-01-28",
      status: "active",
    },
    {
      id: 3,
      name: "Cultural Awareness Test",
      type: "Cultural Test",
      duration: "60 minutes",
      participants: 28,
      passRate: "85%",
      nextSchedule: "2024-02-01",
      status: "scheduled",
    },
  ]

  return (
    <>
      <PageHeader title="Tes & Sertifikasi" description="Kelola tes kemampuan dan program sertifikasi pekerja">
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Buat Tes Baru
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Jumlah tes/ujian yang tersedia.">
          <StatsCard
            title="Total Tes"
            value="24"
            change="+3"
            changeType="positive"
            icon={<FaClipboardList className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah peserta tes pada bulan ini.">
          <StatsCard
            title="Peserta Bulan Ini"
            value="156"
            change="+12"
            changeType="positive"
            icon={<FaUsers className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah sertifikat yang telah diterbitkan dari tes.">
          <StatsCard
            title="Sertifikat Diterbitkan"
            value="89"
            change="+8"
            changeType="positive"
            icon={<FaCertificate className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Persentase peserta yang lulus dari seluruh tes.">
          <StatsCard
            title="Tingkat Kelulusan"
            value="85%"
            change="+3%"
            changeType="positive"
            icon={<FaTrophy className="text-purple-600" />}
            iconBg="bg-purple-100"
          />
        </Tooltip>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daftar Tes & Sertifikasi</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua tes dan program sertifikasi</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari tes..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Tipe</option>
                <option>Language Test</option>
                <option>Safety Certification</option>
                <option>Cultural Test</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Tes
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipe
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durasi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peserta
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pass Rate
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jadwal Berikutnya
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
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{test.name}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{test.type}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{test.duration}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{test.participants} orang</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{test.passRate}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{test.nextSchedule}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        test.status === "active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {test.status === "active" ? "Aktif" : "Terjadwal"}
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
