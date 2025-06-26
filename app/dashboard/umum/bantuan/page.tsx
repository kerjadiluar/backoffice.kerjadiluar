import { FaLifeRing, FaPhoneAlt, FaExclamationTriangle, FaCheckCircle, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function BantuanPage() {
  const emergencyCases = [
    {
      id: 1,
      caseNumber: "EMG-2024-001",
      workerName: "Ahmad Rizki",
      location: "Tokyo, Japan",
      emergencyType: "Medical Emergency",
      severity: "High",
      status: "In Progress",
      reportedDate: "2024-01-15 14:30",
      assignedTo: "Emergency Team A",
    },
    {
      id: 2,
      caseNumber: "EMG-2024-002", 
      workerName: "Siti Nurhaliza",
      location: "Osaka, Japan",
      emergencyType: "Workplace Accident",
      severity: "Medium",
      status: "Resolved",
      reportedDate: "2024-01-14 09:15",
      assignedTo: "Emergency Team B",
    },
    {
      id: 3,
      caseNumber: "EMG-2024-003",
      workerName: "Budi Santoso", 
      location: "Nagoya, Japan",
      emergencyType: "Legal Issue",
      severity: "Low",
      status: "Under Review",
      reportedDate: "2024-01-13 16:45",
      assignedTo: "Legal Team",
    },
  ]

  const emergencyContacts = [
    { type: "Medical Emergency", number: "+81-119", available: "24/7" },
    { type: "Police", number: "+81-110", available: "24/7" },
    { type: "Embassy Indonesia", number: "+81-3-3441-4201", available: "Business Hours" },
    { type: "Emergency Hotline", number: "+62-21-1234-5678", available: "24/7" },
  ]

  return (
    <>
      <PageHeader
        title="Bantuan Darurat"
        description="Kelola kasus darurat dan sistem bantuan untuk pekerja di luar negeri"
      >
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Lapor Darurat
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Total kasus darurat yang tercatat dalam sistem.">
          <StatsCard
            title="Total Kasus"
            value="45"
            change="+3"
            changeType="positive"
            icon={<FaLifeRing className="text-red-600" />}
            iconBg="bg-red-100"
          />
        </Tooltip>
        <Tooltip content="Kasus darurat yang masih dalam penanganan.">
          <StatsCard
            title="Kasus Aktif"
            value="12"
            change="+2"
            changeType="positive"
            icon={<FaExclamationTriangle className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Kasus darurat yang sudah berhasil diselesaikan.">
          <StatsCard
            title="Terselesaikan"
            value="28"
            change="+5"
            changeType="positive"
            icon={<FaCheckCircle className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Rata-rata waktu respon tim bantuan terhadap kasus darurat.">
          <StatsCard
            title="Response Time"
            value="15 min"
            change="-5 min"
            changeType="positive"
            icon={<FaPhoneAlt className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Kontak Darurat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-900 mb-2">{contact.type}</h4>
              <p className="text-lg font-bold text-red-800 mb-1">{contact.number}</p>
              <p className="text-xs text-red-600">{contact.available}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Cases Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Kasus Darurat</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua kasus darurat dan bantuan</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari kasus..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Status</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Under Review</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. Kasus
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pekerja
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis Darurat
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tingkat
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Lapor
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emergencyCases.map((emergencyCase) => (
                <tr key={emergencyCase.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{emergencyCase.caseNumber}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{emergencyCase.workerName}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{emergencyCase.location}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{emergencyCase.emergencyType}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        emergencyCase.severity === "High"
                          ? "bg-red-100 text-red-800"
                          : emergencyCase.severity === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {emergencyCase.severity}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        emergencyCase.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : emergencyCase.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {emergencyCase.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{emergencyCase.reportedDate}</div>
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
