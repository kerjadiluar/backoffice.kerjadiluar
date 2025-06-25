import { FaFileContract, FaCalendarAlt, FaMoneyBill, FaCheckCircle, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"

export default function KontrakPage() {
  const contracts = [
    {
      id: 1,
      contractNumber: "CTR-2024-001",
      workerName: "Ahmad Rizki",
      company: "Toyota Manufacturing",
      position: "Assembly Worker",
      startDate: "2024-02-01",
      endDate: "2027-02-01",
      salary: "¥180,000",
      status: "active",
      renewalDate: "2027-01-01",
    },
    {
      id: 2,
      contractNumber: "CTR-2024-002",
      workerName: "Siti Nurhaliza",
      company: "Honda Motors",
      position: "Quality Control",
      startDate: "2024-01-15",
      endDate: "2027-01-15",
      salary: "¥175,000",
      status: "pending",
      renewalDate: "2026-12-15",
    },
    {
      id: 3,
      contractNumber: "CTR-2023-045",
      workerName: "Budi Santoso",
      company: "Panasonic Corp",
      position: "Technician",
      startDate: "2023-06-01",
      endDate: "2026-06-01",
      salary: "¥185,000",
      status: "expired",
      renewalDate: "2026-05-01",
    },
  ]

  const contractTemplates = [
    { id: 1, name: "Manufacturing Contract", category: "Manufacturing", usage: 45 },
    { id: 2, name: "Service Contract", category: "Service", usage: 32 },
    { id: 3, name: "Technical Contract", category: "Technical", usage: 28 },
    { id: 4, name: "Internship Contract", category: "Training", usage: 15 },
  ]

  return (
    <>
      <PageHeader
        title="Manajemen Kontrak"
        description="Kelola kontrak kerja dan perjanjian dengan perusahaan mitra"
      >
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Buat Kontrak
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Kontrak"
          value="156"
          change="+12"
          changeType="positive"
          icon={<FaFileContract className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        <StatsCard
          title="Kontrak Aktif"
          value="128"
          change="+8"
          changeType="positive"
          icon={<FaCheckCircle className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Akan Berakhir"
          value="15"
          change="+3"
          changeType="positive"
          icon={<FaCalendarAlt className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />

        <StatsCard
          title="Nilai Total"
          value="¥28.5M"
          change="+15%"
          changeType="positive"
          icon={<FaMoneyBill className="text-purple-600" />}
          iconBg="bg-purple-100"
        />
      </div>

      {/* Contract Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Template Kontrak</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contractTemplates.map((template) => (
            <div key={template.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
              <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{template.category}</p>
              <p className="text-xs text-gray-500">{template.usage} kontrak menggunakan template ini</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daftar Kontrak</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua kontrak kerja pekerja</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari kontrak..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Expired</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. Kontrak
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pekerja
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perusahaan
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posisi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periode
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gaji
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
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contract.contractNumber}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.workerName}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.company}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.position}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.startDate}</div>
                    <div className="text-xs text-gray-500">s/d {contract.endDate}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contract.salary}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        contract.status === "active"
                          ? "bg-green-100 text-green-800"
                          : contract.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {contract.status === "active" ? "Aktif" : contract.status === "pending" ? "Pending" : "Expired"}
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
