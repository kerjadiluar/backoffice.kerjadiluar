import { FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaCertificate } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function PelatihanPage() {
  const trainingSchedule = [
    {
      id: 1,
      course: "Bahasa Jepang Dasar",
      instructor: "Tanaka Sensei",
      date: "2024-01-15",
      participants: 25,
      status: "ongoing",
    },
    {
      id: 2,
      course: "Budaya Kerja Jepang",
      instructor: "Yamada Sensei",
      date: "2024-01-18",
      participants: 30,
      status: "scheduled",
    },
    {
      id: 3,
      course: "Keselamatan Kerja",
      instructor: "Sato Sensei",
      date: "2024-01-20",
      participants: 20,
      status: "scheduled",
    },
    {
      id: 4,
      course: "Komunikasi Bisnis",
      instructor: "Suzuki Sensei",
      date: "2024-01-22",
      participants: 15,
      status: "completed",
    },
  ]

  return (
    <>
      <PageHeader title="Verifikasi Pelatihan" description="Kelola program pelatihan dan sertifikasi calon pekerja">
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors">
          Tambah Pelatihan
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Jumlah total program pelatihan yang tersedia.">
          <StatsCard
            title="Total Pelatihan"
            value="156"
            change="+8%"
            changeType="positive"
            icon={<FaChalkboardTeacher className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah peserta aktif yang mengikuti pelatihan.">
          <StatsCard
            title="Peserta Aktif"
            value="342"
            change="+15%"
            changeType="positive"
            icon={<FaUsers className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah jadwal pelatihan yang berlangsung bulan ini.">
          <StatsCard
            title="Jadwal Bulan Ini"
            value="24"
            change="+5%"
            changeType="positive"
            icon={<FaCalendarAlt className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Jumlah sertifikat yang telah diterbitkan dari pelatihan.">
          <StatsCard
            title="Sertifikat Diterbitkan"
            value="289"
            change="+12%"
            changeType="positive"
            icon={<FaCertificate className="text-purple-600" />}
            iconBg="bg-purple-100"
          />
        </Tooltip>
      </div>

      {/* Training Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Jadwal Pelatihan</h3>
          <p className="text-sm text-gray-600 mt-1">Daftar pelatihan yang akan datang dan sedang berlangsung</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kursus
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instruktur
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peserta
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trainingSchedule.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{training.course}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{training.instructor}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{training.date}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{training.participants} orang</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        training.status === "ongoing"
                          ? "bg-green-100 text-green-800"
                          : training.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {training.status === "ongoing"
                        ? "Berlangsung"
                        : training.status === "scheduled"
                          ? "Terjadwal"
                          : "Selesai"}
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
