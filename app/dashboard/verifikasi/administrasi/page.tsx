import { FaUserShield, FaFileAlt, FaCheck, FaTimes, FaEye } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function AdministrasiPage() {
  const pendingDocuments = [
    { id: 1, name: "Ahmad Rizki", document: "KTP & KK", submitted: "2 hours ago", status: "pending" },
    { id: 2, name: "Siti Nurhaliza", document: "Ijazah & Transkrip", submitted: "4 hours ago", status: "pending" },
    { id: 3, name: "Budi Santoso", document: "Surat Sehat", submitted: "1 day ago", status: "review" },
    { id: 4, name: "Maya Sari", document: "SKCK", submitted: "2 days ago", status: "pending" },
  ]

  return (
    <>
      <PageHeader
        title="Verifikasi Administrasi"
        description="Kelola dan verifikasi dokumen administrasi calon pekerja"
      >
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors">
          Export Report
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Total dokumen administrasi yang masuk ke sistem.">
          <StatsCard
            title="Total Dokumen"
            value="1,247"
            change="+5%"
            changeType="positive"
            icon={<FaFileAlt className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah dokumen yang masih menunggu proses verifikasi.">
          <StatsCard
            title="Menunggu Verifikasi"
            value="89"
            change="+12%"
            changeType="positive"
            icon={<FaUserShield className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah dokumen yang sudah diverifikasi dan disetujui.">
          <StatsCard
            title="Terverifikasi"
            value="1,098"
            change="+8%"
            changeType="positive"
            icon={<FaCheck className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah dokumen yang ditolak setelah proses verifikasi.">
          <StatsCard
            title="Ditolak"
            value="60"
            change="-15%"
            changeType="negative"
            icon={<FaTimes className="text-red-600" />}
            iconBg="bg-red-100"
          />
        </Tooltip>
      </div>

      {/* Pending Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Dokumen Menunggu Verifikasi</h3>
          <p className="text-sm text-gray-600 mt-1">Daftar dokumen yang perlu diverifikasi</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Calon
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dokumen
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu Submit
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
              {pendingDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doc.document}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{doc.submitted}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        doc.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {doc.status === "pending" ? "Pending" : "Review"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaCheck />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTimes />
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
