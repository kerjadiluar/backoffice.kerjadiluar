"use client"

import { useState } from "react"
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBookOpen,
  FaCertificate,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaUpload,
} from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import UserModal from "../components/modals/PengajarModal"
import DeleteModal from "../components/DeleteModal"
import BulkActionModal from "../components/BulkActionModal"

export default function PengajarPage() {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specializationFilter, setSpecializationFilter] = useState("all")

  const teachers = [
    {
      id: 1,
      name: "Tanaka Hiroshi",
      email: "tanaka@kejadiluar.com",
      specialization: "Bahasa Jepang",
      experience: "8 years",
      students: 45,
      courses: 3,
      rating: 4.8,
      phone: "+81-90-1234-5678",
      location: "Tokyo, Japan",
      certification: "JLPT N1, Teaching License",
      status: "active",
    },
    {
      id: 2,
      name: "Yamada Yuki",
      email: "yamada@kejadiluar.com",
      specialization: "Budaya Kerja",
      experience: "5 years",
      students: 32,
      courses: 2,
      rating: 4.6,
      phone: "+81-90-2345-6789",
      location: "Osaka, Japan",
      certification: "Cultural Training Certificate",
      status: "active",
    },
    {
      id: 3,
      name: "Sato Kenji",
      email: "sato@kejadiluar.com",
      specialization: "Keselamatan Kerja",
      experience: "10 years",
      students: 28,
      courses: 4,
      rating: 4.9,
      phone: "+81-90-3456-7890",
      location: "Kyoto, Japan",
      certification: "Safety Training Expert",
      status: "inactive",
    },
  ]

  const pengajarFields = [
    { name: "name", label: "Nama Lengkap", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Nomor Telepon", type: "tel", required: true },
    {
      name: "specialization",
      label: "Spesialisasi",
      type: "select",
      required: true,
      options: [
        { value: "Bahasa Jepang", label: "Bahasa Jepang" },
        { value: "Budaya Kerja", label: "Budaya Kerja" },
        { value: "Keselamatan Kerja", label: "Keselamatan Kerja" },
        { value: "Keterampilan Teknis", label: "Keterampilan Teknis" },
        { value: "Soft Skills", label: "Soft Skills" },
      ],
    },
    { name: "experience", label: "Pengalaman", type: "text", required: true },
    { name: "location", label: "Lokasi", type: "text", required: true },
    { name: "certification", label: "Sertifikasi", type: "text", required: true },
    { name: "students", label: "Jumlah Siswa", type: "number", required: true },
    { name: "courses", label: "Jumlah Kursus", type: "number", required: true },
    { name: "rating", label: "Rating", type: "number", required: true, min: 1, max: 5, step: 0.1 },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "active", label: "Aktif" },
        { value: "inactive", label: "Tidak Aktif" },
      ],
    },
  ]

  const handleCreate = () => {
    setModalMode("create")
    setSelectedTeacher(null)
    setShowModal(true)
  }

  const handleEdit = (teacher: any) => {
    setModalMode("edit")
    setSelectedTeacher(teacher)
    setShowModal(true)
  }

  const handleDelete = (teacher: any) => {
    setSelectedTeacher(teacher)
    setShowDeleteModal(true)
  }

  const handleBulkAction = () => {
    setShowBulkModal(true)
  }

  const handleSelectTeacher = (id: number) => {
    setSelectedTeachers((prev) => (prev.includes(id) ? prev.filter((teacherId) => teacherId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    setSelectedTeachers(selectedTeachers.length === teachers.length ? [] : teachers.map((teacher) => teacher.id))
  }

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || teacher.status === statusFilter
    const matchesSpecialization = specializationFilter === "all" || teacher.specialization === specializationFilter

    return matchesSearch && matchesStatus && matchesSpecialization
  })

  return (
    <>
      <PageHeader title="Manajemen Pengajar" description="Kelola data pengajar dan instruktur pelatihan">
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <FaUpload className="mr-2" />
            Import
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <FaDownload className="mr-2" />
            Export
          </button>
          <button
            onClick={handleCreate}
            className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" />
            Tambah Pengajar
          </button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Pengajar"
          value="24"
          change="+3"
          changeType="positive"
          icon={<FaChalkboardTeacher className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        <StatsCard
          title="Pengajar Aktif"
          value="20"
          change="+1"
          changeType="positive"
          icon={<FaUsers className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Total Kursus"
          value="45"
          change="+5"
          changeType="positive"
          icon={<FaBookOpen className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />

        <StatsCard
          title="Sertifikasi"
          value="18"
          change="+2"
          changeType="positive"
          icon={<FaCertificate className="text-purple-600" />}
          iconBg="bg-purple-100"
        />
      </div>

      {/* Filters and Search */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pengajar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Semua Spesialisasi</option>
              <option value="Bahasa Jepang">Bahasa Jepang</option>
              <option value="Budaya Kerja">Budaya Kerja</option>
              <option value="Keselamatan Kerja">Keselamatan Kerja</option>
              <option value="Keterampilan Teknis">Keterampilan Teknis</option>
              <option value="Soft Skills">Soft Skills</option>
            </select>
          </div>

          {selectedTeachers.length > 0 && (
            <button
              onClick={handleBulkAction}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
            >
              <FaFilter className="mr-2" />
              Aksi Massal ({selectedTeachers.length})
            </button>
          )}
        </div>
      </div> */}

      {/* Teachers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daftar Pengajar</h3>
              <p className="text-sm text-gray-600 mt-1">
                Menampilkan {filteredTeachers.length} dari {teachers.length} pengajar
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTeachers.length === teachers.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengajar
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spesialisasi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengalaman
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Siswa
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
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
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedTeachers.includes(teacher.id)}
                      onChange={() => handleSelectTeacher(teacher.id)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.specialization}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.experience}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{teacher.students} siswa</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{teacher.rating}</span>
                      <span className="text-yellow-400 ml-1">★</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        teacher.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {teacher.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(teacher)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Detail">
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <UserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        mode={modalMode}
        title={modalMode === "create" ? "Tambah Pengajar" : "Edit Pengajar"}
        fields={pengajarFields}
        initialData={selectedTeacher}
        onSubmit={(data) => {
          console.log("Submit:", data)
          setShowModal(false)
        }}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          console.log("Delete:", selectedTeacher)
          setShowDeleteModal(false)
        }}
        title="Hapus Pengajar"
        message={`Apakah Anda yakin ingin menghapus pengajar "${selectedTeacher?.name}"?`}
      />

      <BulkActionModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedCount={selectedTeachers.length}
        onBulkAction={(action) => {
          console.log("Bulk action:", action, selectedTeachers)
          setShowBulkModal(false)
          setSelectedTeachers([])
        }}
      />
    </>
  )
}
