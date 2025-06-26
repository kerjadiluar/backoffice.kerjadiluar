"use client"

import { useState } from "react"
import {
  FaUserTie,
  FaUsers,
  FaBriefcase,
  FaBuilding,
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
import UserModal from "../components/modals/KaryawanModal"
import DeleteModal from "../components/DeleteModal"
import BulkActionModal from "../components/BulkActionModal"

export default function KaryawanPage() {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const employees = [
    {
      id: 1,
      name: "Andi Pratama",
      email: "andi@kejadiluar.com",
      position: "HR Manager",
      department: "Human Resources",
      employeeId: "EMP001",
      joinDate: "2022-03-15",
      salary: "Rp 12,000,000",
      phone: "+62 812-3456-7890",
      address: "Jakarta Selatan",
      status: "active",
    },
    {
      id: 2,
      name: "Sari Dewi",
      email: "sari@kejadiluar.com",
      position: "Finance Analyst",
      department: "Finance",
      employeeId: "EMP002",
      joinDate: "2021-08-20",
      salary: "Rp 9,500,000",
      phone: "+62 813-4567-8901",
      address: "Jakarta Pusat",
      status: "active",
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi@kejadiluar.com",
      position: "IT Support",
      department: "Information Technology",
      employeeId: "EMP003",
      joinDate: "2023-01-10",
      salary: "Rp 8,000,000",
      phone: "+62 814-5678-9012",
      address: "Tangerang",
      status: "inactive",
    },
  ]

  const karyawanFields = [
    { name: "name", label: "Nama Lengkap", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Nomor Telepon", type: "tel", required: true },
    { name: "employeeId", label: "ID Karyawan", type: "text", required: true },
    { name: "position", label: "Posisi", type: "text", required: true },
    {
      name: "department",
      label: "Departemen",
      type: "select",
      required: true,
      options: [
        { value: "Human Resources", label: "Human Resources" },
        { value: "Finance", label: "Finance" },
        { value: "Information Technology", label: "Information Technology" },
        { value: "Operations", label: "Operations" },
        { value: "Marketing", label: "Marketing" },
      ],
    },
    { name: "salary", label: "Gaji", type: "text", required: true },
    { name: "joinDate", label: "Tanggal Bergabung", type: "date", required: true },
    { name: "address", label: "Alamat", type: "textarea", required: true },
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
    setSelectedEmployee(null)
    setShowModal(true)
  }

  const handleEdit = (employee: any) => {
    setModalMode("edit")
    setSelectedEmployee(employee)
    setShowModal(true)
  }

  const handleDelete = (employee: any) => {
    setSelectedEmployee(employee)
    setShowDeleteModal(true)
  }

  const handleBulkAction = () => {
    setShowBulkModal(true)
  }

  const handleSelectEmployee = (id: number) => {
    setSelectedEmployees((prev) => (prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    setSelectedEmployees(selectedEmployees.length === employees.length ? [] : employees.map((emp) => emp.id))
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  return (
    <>
      <PageHeader title="Manajemen Karyawan" description="Kelola data karyawan internal perusahaan">
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
            Tambah Karyawan
          </button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatsCard
          title="Total Karyawan"
          value="45"
          change="+3"
          changeType="positive"
          icon={<FaUserTie className="text-blue-600" />}
          iconBg="bg-blue-100"
        />

        <StatsCard
          title="Karyawan Aktif"
          value="42"
          change="+2"
          changeType="positive"
          icon={<FaUsers className="text-green-600" />}
          iconBg="bg-green-100"
        />

        <StatsCard
          title="Departemen"
          value="8"
          change="0"
          changeType="neutral"
          icon={<FaBuilding className="text-yellow-600" />}
          iconBg="bg-yellow-100"
        />

        <StatsCard
          title="Posisi Tersedia"
          value="12"
          change="+2"
          changeType="positive"
          icon={<FaBriefcase className="text-purple-600" />}
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
                placeholder="Cari karyawan..."
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
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Semua Departemen</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Operations">Operations</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          {selectedEmployees.length > 0 && (
            <button
              onClick={handleBulkAction}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
            >
              <FaFilter className="mr-2" />
              Aksi Massal ({selectedEmployees.length})
            </button>
          )}
        </div>
      </div> */}

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daftar Karyawan</h3>
              <p className="text-sm text-gray-600 mt-1">
                Menampilkan {filteredEmployees.length} dari {employees.length} karyawan
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
                    checked={selectedEmployees.length === employees.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Karyawan
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Karyawan
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posisi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departemen
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
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => handleSelectEmployee(employee.id)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.employeeId}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.position}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.salary}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(employee)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(employee)}
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
        title={modalMode === "create" ? "Tambah Karyawan" : "Edit Karyawan"}
        userData={selectedEmployee}
        onSave={(data) => {
          console.log("Submit:", data)
          setShowModal(false)
        }}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          console.log("Delete:", selectedEmployee)
          setShowDeleteModal(false)
        }}
        userName={selectedEmployee?.name || ""}
        userType="Karyawan"
      />

      <BulkActionModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedUsers={employees.filter((emp) => selectedEmployees.includes(emp.id))}
        onBulkAction={(action) => {
          console.log("Bulk action:", action, selectedEmployees)
          setShowBulkModal(false)
          setSelectedEmployees([])
        }}
        userType="karyawan"
      />
    </>
  )
}
