import { FaHotel, FaMapMarkerAlt, FaUsers, FaCheckCircle, FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"

export default function OnboardingPage() {
  const onboardingPrograms = [
    {
      id: 1,
      programName: "Tokyo Orientation Program",
      location: "Tokyo, Japan",
      participants: 25,
      duration: "7 days",
      startDate: "2024-02-01",
      endDate: "2024-02-07",
      coordinator: "Tanaka Hiroshi",
      status: "scheduled",
      accommodation: "Tokyo Guest House",
    },
    {
      id: 2,
      programName: "Osaka Integration Program",
      location: "Osaka, Japan",
      participants: 18,
      duration: "5 days",
      startDate: "2024-01-20",
      endDate: "2024-01-24",
      coordinator: "Yamada Yuki",
      status: "ongoing",
      accommodation: "Osaka Residence",
    },
    {
      id: 3,
      programName: "Nagoya Welcome Program",
      location: "Nagoya, Japan",
      participants: 22,
      duration: "6 days",
      startDate: "2024-01-10",
      endDate: "2024-01-15",
      coordinator: "Sato Kenji",
      status: "completed",
      accommodation: "Nagoya Dormitory",
    },
  ]

  const onboardingSteps = [
    { step: 1, title: "Airport Pickup", description: "Penjemputan di bandara", status: "completed" },
    { step: 2, title: "Accommodation Check-in", description: "Check-in akomodasi", status: "completed" },
    { step: 3, title: "City Orientation", description: "Orientasi kota dan fasilitas", status: "in-progress" },
    { step: 4, title: "Bank Account Setup", description: "Pembukaan rekening bank", status: "pending" },
    { step: 5, title: "Phone & Internet", description: "Setup komunikasi", status: "pending" },
    { step: 6, title: "Workplace Visit", description: "Kunjungan tempat kerja", status: "pending" },
  ]

  return (
    <>
      <PageHeader
        title="Onboarding & Residensi"
        description="Kelola program onboarding dan akomodasi untuk pekerja baru"
      >
        <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
          <FaPlus className="mr-2" />
          Buat Program
        </button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Program Aktif"
          value="12"
          change="+2"
          changeType="positive"
          icon={<FaHotel className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        <StatsCard
          title="Peserta Bulan Ini"
          value="89"
          change="+15"
          changeType="positive"
          icon={<FaUsers className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Lokasi Tersedia"
          value="8"
          change="+1"
          changeType="positive"
          icon={<FaMapMarkerAlt className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />

        <StatsCard
          title="Completion Rate"
          value="94%"
          change="+3%"
          changeType="positive"
          icon={<FaCheckCircle className="text-purple-600" />}
          iconBg="bg-purple-100"
        />
      </div>

      {/* Onboarding Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Tahapan Onboarding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {onboardingSteps.map((step) => (
            <div key={step.step} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                    step.status === "completed"
                      ? "bg-green-500"
                      : step.status === "in-progress"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                  }`}
                >
                  {step.step}
                </div>
                <h4 className="font-semibold text-gray-900">{step.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{step.description}</p>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  step.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : step.status === "in-progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {step.status === "completed" ? "Selesai" : step.status === "in-progress" ? "Berlangsung" : "Menunggu"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Programs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Program Onboarding</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua program onboarding dan residensi</p>
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
                  Lokasi
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
                  Koordinator
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akomodasi
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
              {onboardingPrograms.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{program.programName}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.location}</div>
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
                    <div className="text-sm text-gray-900">{program.coordinator}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{program.accommodation}</div>
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
