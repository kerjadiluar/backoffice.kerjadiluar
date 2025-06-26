import { FaPassport, FaCalendarAlt, FaCheckCircle, FaEdit, FaTrash, FaEye, FaPlus, FaClock } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function VisaPage() {
  const visaApplications = [
    {
      id: 1,
      applicantName: "Ahmad Rizki",
      visaType: "Work Visa",
      country: "Japan",
      applicationDate: "2024-01-10",
      expiryDate: "2027-01-10",
      status: "approved",
      processingTime: "14 days",
      embassy: "Embassy of Japan",
      permitNumber: "JP-2024-001",
    },
    {
      id: 2,
      applicantName: "Siti Nurhaliza",
      visaType: "Training Visa",
      country: "Japan",
      applicationDate: "2024-01-15",
      expiryDate: "2025-01-15",
      status: "processing",
      processingTime: "7 days",
      embassy: "Embassy of Japan",
      permitNumber: "JP-2024-002",
    },
    {
      id: 3,
      applicantName: "Budi Santoso",
      visaType: "Work Visa",
      country: "South Korea",
      applicationDate: "2024-01-08",
      expiryDate: "2026-01-08",
      status: "rejected",
      processingTime: "21 days",
      embassy: "Embassy of South Korea",
      permitNumber: "KR-2024-001",
    },
    {
      id: 4,
      applicantName: "Maya Sari",
      visaType: "Internship Visa",
      country: "Taiwan",
      applicationDate: "2024-01-12",
      expiryDate: "2025-07-12",
      status: "pending",
      processingTime: "5 days",
      embassy: "Taipei Economic Office",
      permitNumber: "TW-2024-001",
    },
  ]

  const visaTypes = [
    { type: "Work Visa", duration: "3 years", fee: "$150", requirements: 8 },
    { type: "Training Visa", duration: "1 year", fee: "$100", requirements: 6 },
    { type: "Internship Visa", duration: "6 months", fee: "$75", requirements: 5 },
    { type: "Specialist Visa", duration: "5 years", fee: "$200", requirements: 10 },
  ]

  const upcomingExpirations = [
    { name: "Dewi Sartika", visaType: "Work Visa", expiryDate: "2024-02-15", daysLeft: 20 },
    { name: "Andi Wijaya", visaType: "Training Visa", expiryDate: "2024-02-28", daysLeft: 33 },
    { name: "Rina Kusuma", visaType: "Work Visa", expiryDate: "2024-03-10", daysLeft: 44 },
  ]

  return (
    <>
      <PageHeader title="Visa & Izin" description="Kelola aplikasi visa dan izin kerja untuk pekerja luar negeri">
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Ajukan Visa
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Jumlah aplikasi visa yang diajukan.">
          <StatsCard
            title="Total Aplikasi"
            value="156"
            change="+12"
            changeType="positive"
            icon={<FaPassport className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah aplikasi visa yang telah disetujui.">
          <StatsCard
            title="Visa Disetujui"
            value="128"
            change="+8"
            changeType="positive"
            icon={<FaCheckCircle className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Aplikasi visa yang masih dalam proses.">
          <StatsCard
            title="Dalam Proses"
            value="18"
            change="+3"
            changeType="positive"
            icon={<FaClock className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah visa yang akan segera berakhir masa berlakunya.">
          <StatsCard
            title="Akan Berakhir"
            value="12"
            change="+2"
            changeType="positive"
            icon={<FaCalendarAlt className="text-red-600" />}
            iconBg="bg-red-100"
          />
        </Tooltip>
      </div>

      {/* Visa Types & Upcoming Expirations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Visa Types */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Jenis Visa</h3>
          <div className="space-y-4">
            {visaTypes.map((visa, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{visa.type}</h4>
                  <span className="text-sm font-medium text-red-600">{visa.fee}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>Durasi: {visa.duration}</div>
                  <div>Syarat: {visa.requirements} dokumen</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Expirations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Visa Akan Berakhir</h3>
          <div className="space-y-4">
            {upcomingExpirations.map((expiry, index) => (
              <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{expiry.name}</h4>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      expiry.daysLeft <= 30 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {expiry.daysLeft} hari lagi
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div>{expiry.visaType}</div>
                  <div>Berakhir: {expiry.expiryDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visa Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Aplikasi Visa</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua aplikasi visa dan izin kerja</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari aplikasi..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Status</option>
                <option>Approved</option>
                <option>Processing</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pemohon
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis Visa
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Negara
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. Izin
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Aplikasi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Berakhir
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu Proses
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
              {visaApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                    <div className="text-xs text-gray-500">{application.embassy}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.visaType}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.country}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.permitNumber}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.applicationDate}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.expiryDate}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.processingTime}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        application.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : application.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : application.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.status === "approved"
                        ? "Disetujui"
                        : application.status === "processing"
                          ? "Diproses"
                          : application.status === "pending"
                            ? "Pending"
                            : "Ditolak"}
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
