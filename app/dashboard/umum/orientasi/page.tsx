import { FaBookOpen, FaUsers, FaClipboardList, FaCertificate, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function OrientasiPage() {
  const orientationPrograms = [
    {
      id: 1,
      programName: "Workplace Safety Orientation",
      company: "Toyota Manufacturing",
      participants: 35,
      duration: "2 days",
      startDate: "2024-02-05",
      endDate: "2024-02-06",
      instructor: "Sato Kenji",
      status: "scheduled",
      completionRate: "0%",
      location: "Toyota Training Center",
    },
    {
      id: 2,
      programName: "Company Culture Training",
      company: "Honda Motors",
      participants: 28,
      duration: "3 days",
      startDate: "2024-01-22",
      endDate: "2024-01-24",
      instructor: "Yamada Yuki",
      status: "ongoing",
      completionRate: "67%",
      location: "Honda Headquarters",
    },
    {
      id: 3,
      programName: "Quality Control Orientation",
      company: "Panasonic Corp",
      participants: 22,
      duration: "1 day",
      startDate: "2024-01-15",
      endDate: "2024-01-15",
      instructor: "Tanaka Hiroshi",
      status: "completed",
      completionRate: "100%",
      location: "Panasonic Factory",
    },
  ]

  const orientationModules = [
    { id: 1, title: "Company Introduction", duration: "2 hours", status: "mandatory" },
    { id: 2, title: "Safety Procedures", duration: "3 hours", status: "mandatory" },
    { id: 3, title: "Work Ethics & Culture", duration: "2 hours", status: "mandatory" },
    { id: 4, title: "Communication Guidelines", duration: "1.5 hours", status: "optional" },
    { id: 5, title: "Emergency Procedures", duration: "1 hour", status: "mandatory" },
    { id: 6, title: "Quality Standards", duration: "2.5 hours", status: "mandatory" },
  ]

  return (
    <>
      <PageHeader title="Orientasi Kerja" description="Kelola program orientasi dan pelatihan kerja untuk pekerja baru">
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Buat Program
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Jumlah program orientasi kerja yang sedang berjalan.">
          <StatsCard
            title="Program Aktif"
            value="18"
            change="+3"
            changeType="positive"
            icon={<FaBookOpen className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
        <Tooltip content="Total peserta yang mengikuti program orientasi.">
          <StatsCard
            title="Peserta Total"
            value="245"
            change="+28"
            changeType="positive"
            icon={<FaUsers className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah modul pelatihan/orientasi yang tersedia.">
          <StatsCard
            title="Modul Tersedia"
            value="24"
            change="+2"
            changeType="positive"
            icon={<FaClipboardList className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah sertifikat yang telah diterbitkan.">
          <StatsCard
            title="Sertifikat Diterbitkan"
            value="189"
            change="+15"
            changeType="positive"
            icon={<FaCertificate className="text-purple-600" />}
            iconBg="bg-purple-100"
          />
        </Tooltip>
      </div>

      {/* Orientation Modules */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Modul Orientasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orientationModules.map((module) => (
            <div key={module.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{module.title}</h4>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    module.status === "mandatory" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {module.status === "mandatory" ? "Wajib" : "Opsional"}
                </span>
              </div>
              <p className="text-sm text-gray-600">Durasi: {module.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Orientation Programs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Program Orientasi</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua program orientasi kerja</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari program..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Status</option>
                <option>Scheduled</option>
                <option>Ongoing</option>
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
                  Nama Program
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perusahaan
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peserta
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durasi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periode
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instruktur
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
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
              {orientationPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{program.programName}</div>
                    <div className="text-xs text-gray-500">{program.location}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.company}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.participants} orang</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.duration}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.startDate}</div>
                    <div className="text-xs text-gray-500">s/d {program.endDate}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.instructor}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.completionRate}</div>
                    <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-red-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: program.completionRate }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        program.status === "ongoing"
                          ? "bg-blue-100 text-blue-800"
                          : program.status === "scheduled"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {program.status === "ongoing"
                        ? "Berlangsung"
                        : program.status === "scheduled"
                          ? "Terjadwal"
                          : "Selesai"}
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
