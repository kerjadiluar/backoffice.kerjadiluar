import { FaPlane, FaShieldAlt, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function PerjalananPage() {
  const travelRecords = [
    {
      id: 1,
      workerName: "Ahmad Rizki",
      destination: "Tokyo, Japan",
      departureDate: "2024-02-01",
      returnDate: "2027-02-01",
      flightNumber: "JL720",
      airline: "Japan Airlines",
      insuranceProvider: "AXA Insurance",
      insurancePolicy: "POL-2024-001",
      coverageAmount: "$50,000",
      status: "active",
      travelType: "Work Travel",
    },
    {
      id: 2,
      workerName: "Siti Nurhaliza",
      destination: "Osaka, Japan",
      departureDate: "2024-01-28",
      returnDate: "2025-01-28",
      flightNumber: "GA874",
      airline: "Garuda Indonesia",
      insuranceProvider: "Allianz",
      insurancePolicy: "POL-2024-002",
      coverageAmount: "$45,000",
      status: "pending",
      travelType: "Training",
    },
    {
      id: 3,
      workerName: "Budi Santoso",
      destination: "Seoul, South Korea",
      departureDate: "2024-01-15",
      returnDate: "2026-01-15",
      flightNumber: "KE627",
      airline: "Korean Air",
      insuranceProvider: "Prudential",
      insurancePolicy: "POL-2024-003",
      coverageAmount: "$40,000",
      status: "completed",
      travelType: "Work Travel",
    },
  ]

  const insuranceTypes = [
    {
      type: "Basic Coverage",
      coverage: "$25,000",
      premium: "$150/year",
      benefits: ["Medical Emergency", "Accident Coverage", "Repatriation"],
    },
    {
      type: "Standard Coverage",
      coverage: "$50,000",
      premium: "$250/year",
      benefits: ["Medical Emergency", "Accident Coverage", "Repatriation", "Personal Liability"],
    },
    {
      type: "Premium Coverage",
      coverage: "$100,000",
      premium: "$400/year",
      benefits: ["Medical Emergency", "Accident Coverage", "Repatriation", "Personal Liability", "Trip Cancellation"],
    },
  ]

  const upcomingTrips = [
    {
      id: 1,
      worker: "Maya Sari",
      destination: "Tokyo, Japan",
      departureDate: "2024-02-05",
      flightNumber: "JL720",
      status: "confirmed",
    },
    {
      id: 2,
      worker: "Andi Wijaya",
      destination: "Taipei, Taiwan",
      departureDate: "2024-02-08",
      flightNumber: "CI752",
      status: "pending",
    },
    {
      id: 3,
      worker: "Rina Kusuma",
      destination: "Singapore",
      departureDate: "2024-02-12",
      flightNumber: "SQ966",
      status: "confirmed",
    },
  ]

  return (
    <>
      <PageHeader
        title="Perjalanan & Asuransi"
        description="Kelola perjalanan, tiket pesawat, dan asuransi perjalanan pekerja"
      >
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Booking Perjalanan
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Jumlah perjalanan yang tercatat dalam sistem.">
          <StatsCard
            title="Total Perjalanan"
            value="156"
            change="+12"
            changeType="positive"
            icon={<FaPlane className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah polis asuransi perjalanan yang masih aktif.">
          <StatsCard
            title="Asuransi Aktif"
            value="142"
            change="+8"
            changeType="positive"
            icon={<FaShieldAlt className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah perjalanan yang dilakukan bulan ini.">
          <StatsCard
            title="Perjalanan Bulan Ini"
            value="24"
            change="+6"
            changeType="positive"
            icon={<FaCalendarAlt className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah destinasi perjalanan yang sedang aktif.">
          <StatsCard
            title="Destinasi Aktif"
            value="8"
            change="+1"
            changeType="positive"
            icon={<FaMapMarkerAlt className="text-purple-600" />}
            iconBg="bg-purple-100"
          />
        </Tooltip>
      </div>

      {/* Insurance Types & Upcoming Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Insurance Types */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Paket Asuransi</h3>
          <div className="space-y-4">
            {insuranceTypes.map((insurance, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{insurance.type}</h4>
                  <div className="text-right">
                    <div className="text-sm font-medium text-red-600">{insurance.coverage}</div>
                    <div className="text-xs text-gray-500">{insurance.premium}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  {insurance.benefits.map((benefit, idx) => (
                    <div key={idx} className="text-xs text-gray-600 flex items-center">
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Trips */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Perjalanan Mendatang</h3>
          <div className="space-y-4">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{trip.worker}</h4>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      trip.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {trip.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center mb-1">
                    <FaMapMarkerAlt className="mr-2 text-xs" />
                    {trip.destination}
                  </div>
                  <div className="flex items-center mb-1">
                    <FaCalendarAlt className="mr-2 text-xs" />
                    {trip.departureDate}
                  </div>
                  <div className="flex items-center">
                    <FaPlane className="mr-2 text-xs" />
                    {trip.flightNumber}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Records Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Catatan Perjalanan</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua perjalanan dan asuransi pekerja</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari perjalanan..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Completed</option>
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
                  Periode
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asuransi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coverage
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis
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
              {travelRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.workerName}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.destination}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.flightNumber}</div>
                    <div className="text-xs text-gray-500">{record.airline}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.departureDate}</div>
                    <div className="text-xs text-gray-500">s/d {record.returnDate}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.insuranceProvider}</div>
                    <div className="text-xs text-gray-500">{record.insurancePolicy}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.coverageAmount}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.travelType}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === "active"
                          ? "bg-green-100 text-green-800"
                          : record.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {record.status === "active" ? "Aktif" : record.status === "pending" ? "Pending" : "Selesai"}
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
