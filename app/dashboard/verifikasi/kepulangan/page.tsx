import { FaHotel, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"

export default function KepulanganPage() {
  const returns = [
    {
      id: 1,
      name: "Dewi Sartika",
      origin: "Tokyo, Japan",
      flightNumber: "JL719",
      returnDate: "2024-02-15",
      returnTime: "18:45",
      status: "scheduled",
      reason: "Contract Completed",
      duration: "2 years",
    },
    {
      id: 2,
      name: "Andi Wijaya",
      origin: "Osaka, Japan",
      flightNumber: "GA873",
      returnDate: "2024-02-18",
      returnTime: "21:30",
      status: "confirmed",
      reason: "Emergency Return",
      duration: "1.5 years",
    },
    {
      id: 3,
      name: "Rina Kusuma",
      origin: "Nagoya, Japan",
      flightNumber: "NH835",
      returnDate: "2024-02-20",
      returnTime: "15:20",
      status: "pending",
      reason: "Contract Completed",
      duration: "3 years",
    },
  ]

  return (
    <>
      <PageHeader title="Verifikasi Kepulangan" description="Kelola jadwal kepulangan dan proses repatriasi pekerja">
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Tambah Kepulangan
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Kepulangan"
          value="89"
          change="+12%"
          changeType="positive"
          icon={<FaHotel className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        <StatsCard
          title="Bulan Ini"
          value="15"
          change="+5"
          changeType="positive"
          icon={<FaCalendarAlt className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Pending Konfirmasi"
          value="6"
          change="-1"
          changeType="negative"
          icon={<FaUsers className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />

        <StatsCard
          title="Emergency Returns"
          value="3"
          change="+1"
          changeType="positive"
          icon={<FaMapMarkerAlt className="text-red-600" />}
          iconBg="bg-red-100"
        />
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Jadwal Kepulangan</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua jadwal kepulangan pekerja</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari nama/asal..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Status</option>
                <option>Scheduled</option>
                <option>Confirmed</option>
                <option>Pending</option>
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
                  Asal
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Penerbangan
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal & Waktu
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alasan
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durasi Kerja
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
              {returns.map((returnItem) => (
                <tr key={returnItem.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{returnItem.name}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{returnItem.origin}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{returnItem.flightNumber}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{returnItem.returnDate}</div>
                    <div className="text-xs text-gray-500">{returnItem.returnTime}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{returnItem.reason}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{returnItem.duration}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        returnItem.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : returnItem.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {returnItem.status === "confirmed"
                        ? "Confirmed"
                        : returnItem.status === "scheduled"
                          ? "Scheduled"
                          : "Pending"}
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
