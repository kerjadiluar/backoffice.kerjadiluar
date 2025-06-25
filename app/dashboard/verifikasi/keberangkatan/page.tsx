import { FaPlane, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"

export default function KeberangkatanPage() {
  const departures = [
    {
      id: 1,
      name: "Ahmad Rizki",
      destination: "Tokyo, Japan",
      flightNumber: "JL720",
      departureDate: "2024-01-25",
      departureTime: "14:30",
      status: "confirmed",
      documents: "Complete",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      destination: "Osaka, Japan",
      flightNumber: "GA874",
      departureDate: "2024-01-28",
      departureTime: "09:15",
      status: "pending",
      documents: "Incomplete",
    },
    {
      id: 3,
      name: "Budi Santoso",
      destination: "Nagoya, Japan",
      flightNumber: "NH836",
      departureDate: "2024-01-30",
      departureTime: "16:45",
      status: "confirmed",
      documents: "Complete",
    },
    {
      id: 4,
      name: "Maya Sari",
      destination: "Fukuoka, Japan",
      flightNumber: "JL331",
      departureDate: "2024-02-02",
      departureTime: "11:20",
      status: "delayed",
      documents: "Complete",
    },
  ]

  return (
    <>
      <PageHeader
        title="Verifikasi Keberangkatan"
        description="Kelola jadwal keberangkatan dan verifikasi dokumen perjalanan"
      >
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Tambah Keberangkatan
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Keberangkatan"
          value="156"
          change="+8%"
          changeType="positive"
          icon={<FaPlane className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        <StatsCard
          title="Hari Ini"
          value="12"
          change="+3"
          changeType="positive"
          icon={<FaCalendarAlt className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Pending Verifikasi"
          value="8"
          change="-2"
          changeType="negative"
          icon={<FaUsers className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />

        <StatsCard
          title="Destinasi Aktif"
          value="5"
          change="0"
          changeType="neutral"
          icon={<FaMapMarkerAlt className="text-purple-600" />}
          iconBg="bg-purple-100"
        />
      </div>

      {/* Departures Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Jadwal Keberangkatan</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua jadwal keberangkatan pekerja</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari nama/destinasi..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Delayed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pekerja
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destinasi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Penerbangan
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal & Waktu
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dokumen
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
              {departures.map((departure) => (
                <tr key={departure.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{departure.name}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{departure.destination}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{departure.flightNumber}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{departure.departureDate}</div>
                    <div className="text-xs text-gray-500">{departure.departureTime}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        departure.documents === "Complete" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {departure.documents}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        departure.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : departure.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {departure.status === "confirmed"
                        ? "Confirmed"
                        : departure.status === "pending"
                          ? "Pending"
                          : "Delayed"}
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
